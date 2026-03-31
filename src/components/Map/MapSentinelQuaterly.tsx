import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import { RotateCcw, Plus, Minus, Home, Satellite, ChevronDown, ChevronRight, ChevronLeft, Calendar, X } from 'lucide-react';
import * as pmtiles from 'pmtiles';

import { TAB_CONTENT, Points_Data } from '../MapCompare/pointData';

// PMTiles protocol (safe to re-add; guard against duplicates)
import { cogProtocol, setColorFunction } from '@geomatico/maplibre-cog-protocol';
// ...
try {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
    maplibregl.addProtocol('cog', cogProtocol);
} catch (_) { /* already registered */ }

// ─── Planetary Computer (PC) Mosaic API ────────────────────────────────────
const PC_MOSAIC_REGISTER = 'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/register';
const PC_TILE_BASE = 'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/tiles';

const ODISHA_BBOX = [81.3883, 17.8124, 87.4770, 22.5674];
const PC_RENDER_PARAMS = 'assets=B04&assets=B03&assets=B02&color_formula=Gamma%20RGB%203.2%20Saturation%200.8%20Sigmoidal%20RGB%2025%200.35&collection=sentinel-2-l2a&format=png';


const LULC_RGBA: Record<number, number[]> = {
    1: [65, 155, 223, 255],     // Water (#419BDF)
    2: [57, 125, 73, 255],      // Trees (#397D49)
    3: [0, 0, 0, 0],            // Empty (#000000)
    4: [122, 135, 198, 255],    // Flooded (#7A87C6)
    5: [228, 150, 53, 255],     // Crops (#E49635)
    6: [0, 0, 0, 0],            // Empty (#000000)
    7: [196, 40, 27, 255],      // Built (#C4281B)
    8: [240, 207, 14, 255],     // Bare Ground/Rangeland (merged #F0CF0E)
    9: [0, 0, 0, 0],            // Empty/Snow (#000000)
    10: [0, 0, 0, 0],           // Empty/Cloud (#000000)
    11: [240, 207, 14, 255],    // Bare Ground/Rangeland (merged #F0CF0E)
};

type LulcCategory = number | 'all' | 'merged-bare-range';

interface LulcLegendItem {
    label: string;
    color: string;
    value: LulcCategory;
}

const LULC_LEGEND: LulcLegendItem[] = [
    { label: 'Water', color: '#419BDF', value: 1 },
    { label: 'Trees', color: '#397D49', value: 2 },
    { label: 'Flooded vegetation', color: '#7A87C6', value: 4 },
    { label: 'Crops', color: '#E49635', value: 5 },
    { label: 'Built area', color: '#C4281B', value: 7 },
    { label: 'Bare Ground/Rangeland', color: '#F0CF0E', value: 'merged-bare-range' },
];

interface Quarter {
    key: string;
    label: string;
    time: string;
    year: number;
    q: number;
}

function generateQuarters(startYear: number, endYear: number): Quarter[] {
    const quarters: Quarter[] = [];
    const monthDefs = [
        { q: 1, label: 'March', start: '-01-01', end: '-03-31' },
        { q: 2, label: 'June', start: '-04-01', end: '-06-30' },
        { q: 3, label: 'September', start: '-07-01', end: '-09-30' },
        { q: 4, label: 'December', start: '-10-01', end: '-12-31' },
    ];
    for (let year = startYear; year <= endYear; year++) {
        for (const md of monthDefs) {
            quarters.push({
                key: `${year}-M${md.q}`,
                label: `${md.label} ${year}`,
                time: `${year}${md.start}/${year}${md.end}`,
                year,
                q: md.q,
            });
        }
    }
    return quarters;
}

const QUARTERS = generateQuarters(2018, 2024);
const PMTILES_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/od_district_pop_total_2036.pmtiles';
const ODISHA_CENTER: [number, number] = [84.8, 20.5];
const ODISHA_BOUNDS: maplibregl.LngLatBoundsLike = [[81.3883, 17.8124], [87.4770, 22.5674]];
const SUBDISTRICT_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/od_subdistrict_pop_total_2036.pmtiles';

const qColors: Record<number, string> = {
    1: '#4ade80', // spring
    2: '#facc15', // summer
    3: '#fb923c', // autumn
    4: '#818cf8', // winter
};

interface MapSentinelQuaterlyProps {
    targetDistrict?: string;
    targetBounds?: any;
}

export const MapSentinelQuaterly: React.FC<MapSentinelQuaterlyProps> = ({
    targetDistrict = 'Odisha',
    targetBounds,
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [selectedIdx, setSelectedIdx] = useState(QUARTERS.length - 1);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [isPlaying, setIsPlaying] = useState(false); // Removed play state
    const [pmtilesBounds, setPmtilesBounds] = useState<maplibregl.LngLatBoundsLike | null>(null);
    const accumulatedFeaturesRef = useRef<Map<string, any[]>>(new Map());
    const [cacheVersion, setCacheVersion] = useState(0);
    const lastFittedDistrictRef = useRef<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const mosaicCacheRef = useRef<Record<string, string>>({});
    const [tileStatus, setTileStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

    // LULC states
    const [showLulc, setShowLulc] = useState(false);
    const [selectedLulcCategory, setSelectedLulcCategory] = useState<LulcCategory>('all');
    const [lulcStatus, setLulcStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

    // Points states
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [lastSelectedPoint, setLastSelectedPoint] = useState<number | null>(null);
    const [activeModalTab, setActiveModalTab] = useState<'What' | 'How' | 'Why'>('What');
    const prePointClickState = useRef<{ center: maplibregl.LngLatLike; zoom: number } | null>(null);

    const currentQuarter = QUARTERS[selectedIdx];

    const getOrCreateMosaicUrl = useCallback(async (q: Quarter): Promise<string | null> => {
        if (mosaicCacheRef.current[q.key]) {
            return `${PC_TILE_BASE}/${mosaicCacheRef.current[q.key]}/WebMercatorQuad/{z}/{x}/{y}@2x.png?${PC_RENDER_PARAMS}`;
        }
        const [startDate, endDate] = q.time.split('/');
        const body = {
            collections: ['sentinel-2-l2a'],
            bbox: ODISHA_BBOX,
            datetime: `${startDate}T00:00:00Z/${endDate}T23:59:59Z`,
            query: { "eo:cloud_cover": { "lt": 40 } },
            sortby: [{ field: 'eo:cloud_cover', direction: 'asc' }]
        };
        const res = await fetch(PC_MOSAIC_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) return null;
        const json = await res.json();
        const mosaicId: string = json.searchid ?? json.id;
        if (!mosaicId) return null;
        mosaicCacheRef.current[q.key] = mosaicId;
        return `${PC_TILE_BASE}/${mosaicId}/WebMercatorQuad/{z}/{x}/{y}@2x.png?${PC_RENDER_PARAMS}`;
    }, []);

    const switchToQuarter = useCallback(async (idx: number) => {
        const map = mapRef.current;
        if (!map) return;

        // Change status to loading immediately for instant UI feedback
        setTileStatus('loading');

        if (!map.isStyleLoaded()) {
            await new Promise<void>(resolve => map.once('idle', () => resolve()));
        }
        const q = QUARTERS[idx];
        const sourceId = 'sentinel-quarterly-source';
        const layerId = 'sentinel-quarterly-layer';

        try {
            const tileUrl = await getOrCreateMosaicUrl(q);
            if (!tileUrl) { setTileStatus('error'); return; }

            const bboxToUse = targetBounds ? [targetBounds[0][0], targetBounds[0][1], targetBounds[1][0], targetBounds[1][1]] : ODISHA_BBOX;

            if (map.getLayer(layerId)) map.removeLayer(layerId);
            if (map.getSource(sourceId)) map.removeSource(sourceId);

            map.addSource(sourceId, {
                type: 'raster',
                tiles: [tileUrl],
                tileSize: 256,
                minzoom: 0,
                maxzoom: 14,
                bounds: bboxToUse as any,
                attribution: 'Sentinel-2 L2A © ESA / Copernicus via Microsoft Planetary Computer',
            });

            const beforeLayer = map.getLayer('lulc-cog-layer')
                ? 'lulc-cog-layer'
                : (map.getLayer('district-mask-layer')
                    ? 'district-mask-layer'
                    : (map.getLayer('district-outline-quarterly') ? 'district-outline-quarterly' : undefined));

            map.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: {
                    'raster-opacity': 1,
                    'raster-fade-duration': 200,
                    'raster-resampling': 'linear'
                },
            }, beforeLayer);

            // Wait for map to be idle (fully rendered) before setting ready
            map.once('idle', () => {
                setTileStatus('ready');
            });
        } catch (err) {
            setTileStatus('error');
        }
    }, [getOrCreateMosaicUrl]);

    useEffect(() => {
        if (!mapRef.current || !isLoaded) return;
        const map = mapRef.current;

        // Masking logic: Show only the selected district
        if (map.getLayer('district-mask-layer')) {
            const isOdisha = !targetDistrict || targetDistrict.toLowerCase() === 'odisha';
            map.setPaintProperty('district-mask-layer', 'fill-opacity', isOdisha ? 0 : 1.0);

            if (!isOdisha) {
                map.setPaintProperty('district-mask-layer', 'fill-opacity', [
                    'case',
                    ['any',
                        ['==', ['get', 'district_name'], targetDistrict],
                        ['==', ['get', 'NAME'], targetDistrict],
                        ['==', ['get', 'name'], targetDistrict]
                    ], 0,
                    1.0
                ]);
            }
        }

        // Only fit bounds if the district has actually changed or it's the first load
        const districtKey = `${targetDistrict}-${targetBounds ? JSON.stringify(targetBounds) : 'none'}`;
        if (lastFittedDistrictRef.current === districtKey) return;
        lastFittedDistrictRef.current = districtKey;

        if (targetBounds) {
            map.fitBounds(targetBounds, { padding: 80, duration: 1500 });
            // Update maxBounds to focus on the selected district
            const padding = 0.5; // allow some room to move
            const districtMaxBounds: maplibregl.LngLatBoundsLike = [
                [targetBounds[0][0] - padding, targetBounds[0][1] - padding],
                [targetBounds[1][0] + padding, targetBounds[1][1] + padding]
            ];
            map.setMaxBounds(districtMaxBounds);
        } else if (targetDistrict?.toLowerCase() === 'odisha' || !targetDistrict) {
            map.fitBounds(pmtilesBounds || ODISHA_BOUNDS, { padding: 40, duration: 1500 });
            map.setMaxBounds([[79.277344, 16.232218], [90.0, 24.058806]]);
        } else {
            const features = accumulatedFeaturesRef.current.get(targetDistrict.toLowerCase()) || [];
            if (features.length > 0) {
                const bounds = new maplibregl.LngLatBounds();
                const extend = (coords: any) => {
                    if (typeof coords[0] === 'number') bounds.extend(coords as [number, number]);
                    else coords.forEach(extend);
                };
                features.forEach((f: any) => f.geometry?.coordinates && extend(f.geometry.coordinates));
                if (!bounds.isEmpty()) {
                    map.fitBounds(bounds, { padding: 40, duration: 1500 });
                    const b = bounds.toArray();
                    const padding = 0.5;
                    map.setMaxBounds([
                        [b[0][0] - padding, b[0][1] - padding],
                        [b[1][0] + padding, b[1][1] + padding]
                    ]);
                }
            } else {
                // If features aren't loaded yet, try again when cacheVersion changes
                lastFittedDistrictRef.current = null; // allow retry
                map.fitBounds(pmtilesBounds || ODISHA_BOUNDS, { padding: 40, duration: 1500 });
                map.setMaxBounds([[79.277344, 16.232218], [90.0, 24.058806]]);
            }
        }
    }, [targetDistrict, targetBounds, isLoaded, cacheVersion, pmtilesBounds]);

    useEffect(() => {
        if (!mapContainerRef.current) return;
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: {
                version: 8,
                glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
                sources: {},
                layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#0f1923' } }],
            },
            center: ODISHA_CENTER,
            zoom: 6.2,
            minZoom: 5,
            maxZoom: 14,
            maxBounds: [[79.277344, 16.232218], [90.0, 24.058806]],
            attributionControl: false,
        });

        map.on('load', async () => {
            // District Layers
            map.addSource('district-source-quarterly', { type: 'vector', url: `pmtiles://${PMTILES_URL}` });
            map.addLayer({
                id: 'district-outline-quarterly',
                type: 'line',
                source: 'district-source-quarterly',
                'source-layer': 'zcta',
                paint: { 'line-color': '#000000', 'line-width': 1.2, 'line-opacity': 0.9 },
            });
            map.addLayer({
                id: 'district-mask-layer',
                type: 'fill',
                source: 'district-source-quarterly',
                'source-layer': 'zcta',
                paint: {
                    'fill-color': '#FEFEFE',
                    'fill-opacity': 0
                },
            }, 'district-outline-quarterly');

            // points GeoJSON
            const pointsGeoJSON = {
                type: 'FeatureCollection' as const,
                features: Points_Data.map((item: any) => ({
                    type: 'Feature' as const,
                    geometry: {
                        type: 'Point' as const,
                        coordinates: [item.cord[1], item.cord[0]]
                    },
                    properties: {
                        id: item.id
                    }
                }))
            };

            map.addSource('points-source', {
                type: 'geojson',
                data: pointsGeoJSON
            });

            map.addLayer({
                id: 'points-layer',
                type: 'circle',
                source: 'points-source',
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#F96000',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#FFFFFF',
                    'circle-opacity': 1,
                    'circle-stroke-opacity': 1
                }
            });

            map.addLayer({
                id: 'points-layer-highlight',
                type: 'circle',
                source: 'points-source',
                paint: {
                    'circle-radius': 6,
                    'circle-color': 'transparent',
                    'circle-stroke-width': 4,
                    'circle-stroke-color': '#0868ac',
                    'circle-stroke-opacity': 1
                },
                filter: ['==', 'id', -999]
            });

            map.on('click', 'points-layer', (e) => {
                if (e.features && e.features.length > 0) {
                    const props = e.features[0].properties;
                    if (props) {
                        setSelectedPoint(Number(props.id));
                        setActiveModalTab('What');
                    }
                }
            });

            map.on('mouseenter', 'points-layer', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'points-layer', () => {
                map.getCanvas().style.cursor = '';
            });

            map.addLayer({
                id: 'district-hover-layer',
                type: 'fill',
                source: 'district-source-quarterly',
                'source-layer': 'zcta',
                paint: { 'fill-color': '#ffffff', 'fill-opacity': 0 },
            });

            // Subdistrict Layers
            map.addSource('subdistrict-source-quarterly', { type: 'vector', url: `pmtiles://${SUBDISTRICT_URL}` });
            map.addLayer({
                id: 'subdistrict-outline-quarterly',
                type: 'line',
                source: 'subdistrict-source-quarterly',
                'source-layer': 'zcta',
                paint: { 'line-color': '#edededff', 'line-width': 0.8, 'line-opacity': 0.5 },
            });
            map.addLayer({
                id: 'subdistrict-hover-layer',
                type: 'fill',
                source: 'subdistrict-source-quarterly',
                'source-layer': 'zcta',
                paint: { 'fill-color': '#ffffff', 'fill-opacity': 0 },
            });

            const popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                className: 'map-tooltip'
            });

            // Tooltip handler
            const showTooltip = (e: any, type: 'district' | 'subdistrict') => {
                const feature = e.features?.[0];
                if (!feature) return;

                map.getCanvas().style.cursor = 'pointer';
                const props = feature.properties;

                let content = '';
                if (type === 'district') {
                    const name = props.district_name || props.NAME || props.name || 'Unknown District';
                    content = `<div style="padding: 6px 10px; font-weight: 700; font-size: 11px; color: #1a202c; text-transform: uppercase; letter-spacing: 0.05em;">${name}</div>`;
                } else {
                    const subName = props.subdistrict_name || props.SUBDIST_NAM || 'Unknown Subdistrict';
                    const distName = props.district_name || props.DIST_NAME || 'Unknown District';
                    content = `
                        <div style="padding: 8px 12px; min-width: 140px;">
                            <div style="font-size: 12px; font-weight: 800; color: #1a202c; margin-bottom: 2px; text-transform: uppercase;">${subName}</div>
                            <div style="font-size: 9px; font-weight: 600; color: #718096; text-transform: uppercase; letter-spacing: 0.02em;">District: ${distName}</div>
                        </div>
                    `;
                }

                popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
            };

            const hideTooltip = () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            };

            map.on('mousemove', 'district-hover-layer', (e) => showTooltip(e, 'district'));
            map.on('mouseleave', 'district-hover-layer', hideTooltip);
            map.on('mousemove', 'subdistrict-hover-layer', (e) => showTooltip(e, 'subdistrict'));
            map.on('mouseleave', 'subdistrict-hover-layer', hideTooltip);

            try {
                const p = new pmtiles.PMTiles(PMTILES_URL);
                const header = await p.getHeader();
                if (header.minLon !== undefined) {
                    const b: maplibregl.LngLatBoundsLike = [[header.minLon, header.minLat], [header.maxLon, header.maxLat]];
                    setPmtilesBounds(b);
                    map.fitBounds(b, { padding: 40, duration: 0 });
                }
            } catch { /* ignore */ }
            setIsLoaded(true);
            setTimeout(() => switchToQuarter(QUARTERS.length - 1), 50);
        });

        map.on('sourcedata', (e) => {
            if (e.sourceId === 'district-source-quarterly' && e.isSourceLoaded) {
                const features = map.querySourceFeatures('district-source-quarterly', { sourceLayer: 'zcta' });
                let changed = false;
                features.forEach((f: any) => {
                    const rawName = f.properties?.district_name || f.properties?.NAME || f.properties?.name;
                    if (!rawName) return;
                    const key = rawName.toLowerCase();
                    if (!accumulatedFeaturesRef.current.has(key)) accumulatedFeaturesRef.current.set(key, []);

                    const existing = accumulatedFeaturesRef.current.get(key)!;
                    // Check for duplicates using first bit of coordinates to keep it efficient
                    const coords = (f.geometry as any).coordinates?.toString().substring(0, 80);
                    if (!existing.some((ef: any) => (ef.geometry as any).coordinates?.toString().substring(0, 80) === coords)) {
                        existing.push(f);
                        changed = true;
                    }
                });
                if (changed) setCacheVersion(v => v + 1);
            }
        });

        mapRef.current = map;

        // Background Pre-registration of all mosaics to improve switching speed
        const preRegisterAll = async () => {
            // Divide into chunks to avoid overwhelming the server
            const chunks = [];
            for (let i = 0; i < QUARTERS.length; i += 4) {
                chunks.push(QUARTERS.slice(i, i + 4));
            }
            for (const chunk of chunks) {
                await Promise.all(chunk.map(q => getOrCreateMosaicUrl(q)));
            }
        };
        preRegisterAll();

        return () => { map.remove(); mapRef.current = null; };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        const timer = setTimeout(() => switchToQuarter(selectedIdx), 100);
        return () => clearTimeout(timer);
    }, [selectedIdx, isLoaded, switchToQuarter, targetDistrict]);

    useEffect(() => {
        const m = mapRef.current;
        if (!m || !isLoaded) return;
        const sourceId = 'lulc-cog-source';
        const layerId = 'lulc-cog-layer';

        if (!showLulc) {
            if (m.getLayer(layerId)) m.removeLayer(layerId);
            if (m.getSource(sourceId)) m.removeSource(sourceId);
            setLulcStatus('idle');
            return;
        }

        const lulcYear = currentQuarter.year;
        const baseLulcUrl = `https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc/odisha_lulc_${lulcYear}.tif`;
        setColorFunction(baseLulcUrl, (pixel: any, color: any, metadata: any) => {
            const val = pixel[0];
            if (val === metadata.noData || val < 1 || val > 11) { color.set([0, 0, 0, 0]); return; }
            const rgba = [...(LULC_RGBA[val] || [0, 0, 0, 0])];
            let isVisible = selectedLulcCategory === 'all';
            if (selectedLulcCategory === 'merged-bare-range') isVisible = val === 8 || val === 11;
            else if (typeof selectedLulcCategory === 'number') isVisible = val === selectedLulcCategory;
            if (!isVisible) rgba[3] = 0;
            color.set(rgba);
        });

        setLulcStatus('loading');
        try {
            if (m.getLayer(layerId)) m.removeLayer(layerId);
            if (m.getSource(sourceId)) m.removeSource(sourceId);
            m.addSource(sourceId, { type: 'raster', url: `cog://${baseLulcUrl}`, tileSize: 256 });
            const beforeLayer = m.getLayer('district-mask-layer')
                ? 'district-mask-layer'
                : (m.getLayer('district-outline-quarterly') ? 'district-outline-quarterly' : undefined);
            m.addLayer({ id: layerId, type: 'raster', source: sourceId, paint: { 'raster-opacity': 0.85, 'raster-fade-duration': 300 } }, beforeLayer);
            m.on('idle', () => setLulcStatus('ready'));
        } catch { setLulcStatus('error'); }
    }, [isLoaded, showLulc, selectedIdx, selectedLulcCategory]);

    // Removed load-aware playback logic

    // Effect to handle Point selection flyTo/Highlighting
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        if (map.getLayer('points-layer-highlight')) {
            map.setFilter('points-layer-highlight', ['==', 'id', selectedPoint !== null ? selectedPoint : -999]);
        }

        if (selectedPoint !== null && selectedPoint !== lastSelectedPoint) {
            if (prePointClickState.current === null) {
                prePointClickState.current = {
                    center: map.getCenter(),
                    zoom: map.getZoom()
                };
            }

            const point = Points_Data.find(p => p.id === selectedPoint);
            if (point && point.cord) {
                map.resize(); // accommodate sidebar space
                map.flyTo({
                    center: [point.cord[1], point.cord[0]],
                    zoom: 14,
                    duration: 1500,
                    padding: { right: window.innerWidth * 0.35 } as any // offset to center in visible area
                });
            }
            setLastSelectedPoint(selectedPoint);
        } else if (selectedPoint === null) {
            setLastSelectedPoint(null);
        }
    }, [selectedPoint, lastSelectedPoint]);

    const handleReset = () => mapRef.current?.fitBounds(pmtilesBounds || ODISHA_BOUNDS, { padding: 40, duration: 1500 });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Satellite className="w-6 h-6" />
                        Satellite Timelapse – Quarterly
                    </h2>
                    <p className="text-[13px] text-gray-500 mt-1 font-medium ">Sentinel-2 True Color (TCI) imagery for March, June, September, and December (2018–2024).</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50/50 p-1.5 px-3 rounded-lg border border-gray-100 relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="px-4 py-1.5 text-[11px] font-black tracking-wide bg-white text-gray-600 border border-gray-400 rounded-md transition-all min-w-[130px] flex items-center justify-between shadow-sm cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: qColors[currentQuarter.q] }} />
                            {currentQuarter.label}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-[190]" onClick={() => setIsDropdownOpen(false)} />
                            <div className="absolute right-0 top-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-[200] min-w-[180px] max-h-[400px] overflow-y-auto custom-scrollbar">
                                {QUARTERS.slice().reverse().map((q, idx) => {
                                    const originalIdx = QUARTERS.length - 1 - idx;
                                    return (
                                        <button key={q.key} onClick={() => { setSelectedIdx(originalIdx); setIsDropdownOpen(false); }} className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between rounded-lg ${selectedIdx === originalIdx ? 'bg-orange-50 text-[#F96000]' : 'text-gray-600'}`}>
                                            <span className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: qColors[q.q] }} />
                                                <span className="text-[11px] font-bold">{q.label}</span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl h-[700px] relative">
                <div ref={mapContainerRef} className="w-full h-full" />

                {isLoaded && (
                    <div className="absolute top-8 left-8 bottom-8 w-[300px] text-gray-900 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-6 shadow-2xl z-[60] flex flex-col gap-6 overflow-y-auto custom-scrollbar">

                        <button
                            onClick={() => setShowLulc(!showLulc)}
                            className={`w-full py-2.5 rounded-lg text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 border ${showLulc ? 'bg-[#F96000] text-white border-orange-600 shadow-lg' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                        >
                            <Satellite className="w-4 h-4" />
                            {showLulc ? 'Hide LULC Data' : 'Show LULC Data'}
                        </button>

                        <div className="flex-1 transition-all">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2 flex justify-between items-center">
                                Land Categories
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${showLulc ? 'bg-orange-100 text-[#F96000]' : 'bg-gray-100 text-gray-400'}`}>
                                    Year: {currentQuarter.year}
                                </span>
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <button onClick={() => setSelectedLulcCategory('all')} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selectedLulcCategory === 'all' ? 'bg-orange-50 border-[#F96000] text-[#F96000]' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                                    <span className="text-[10px] font-black uppercase">All Classes</span>
                                    {selectedLulcCategory === 'all' && <div className="w-2 h-2 rounded-full bg-[#F96000]" />}
                                </button>
                                {LULC_LEGEND.map(item => (
                                    <button key={item.label} onClick={() => setSelectedLulcCategory(item.value)} className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selectedLulcCategory === item.value ? 'bg-orange-50 border-[#F96000] text-[#F96000]' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-sm ring-1 ring-gray-200" style={{ backgroundColor: item.color }} />
                                            <span className="text-[10px] font-bold capitalize">{item.label}</span>
                                        </div>
                                        {selectedLulcCategory === item.value && <div className="w-2 h-2 rounded-full bg-[#F96000]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {isLoaded && (
                    <div className="absolute bottom-8 left-[352px] right-8 z-50 flex items-center gap-4">
                        {/* Timeline Slider */}
                        <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-5 px-6 shadow-2xl flex items-center gap-6">
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                                    disabled={selectedIdx === 0}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F96000] text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-black"
                                    title="Previous Quarter"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => setSelectedIdx(prev => Math.min(QUARTERS.length - 1, prev + 1))}
                                    disabled={selectedIdx === QUARTERS.length - 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F96000] text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-black"
                                    title="Next Quarter"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-gray-400">Timeline Control</span>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <span className="text-[#F96000] text-lg font-mono font-bold leading-none">{currentQuarter.label.split(' ')[0]}</span>
                                        <span className="text-gray-700 text-sm font-mono font-bold">{currentQuarter.year}</span>
                                    </div>
                                </div>

                                <div className="relative group/track py-1">
                                    {/* Background Track with Tick Scale */}
                                    <div className="relative h-2 bg-gray-100 rounded-full overflow-visible">
                                        <div className="absolute h-full rounded-full transition-all duration-300" style={{ width: `${(selectedIdx / (QUARTERS.length - 1)) * 100}%`, backgroundColor: qColors[currentQuarter.q] }} />

                                        {/* Tick Marks & Labels Container */}
                                        <div className="absolute inset-0 flex justify-between items-center px-0.5 pointer-events-none">
                                            {QUARTERS.map((q, idx) => (
                                                <div key={q.key} className="relative flex flex-col items-center">
                                                    <div className={`w-[2px] h-3 rounded-full mb-1 transition-all ${idx === selectedIdx ? 'bg-orange-500 h-4' : 'bg-gray-300'}`} />

                                                    {/* Year Indicator Above (Only on Q1) */}
                                                    {q.q === 1 && (
                                                        <div className="absolute -top-6 whitespace-nowrap">
                                                            <span className="text-[10px] font-black text-gray-800 tracking-tighter opacity-70">{q.year}</span>
                                                        </div>
                                                    )}

                                                    {/* Month Initials Below */}
                                                    <div className="absolute -bottom-5">
                                                        <span className={`text-[8px] font-bold transition-all ${idx === selectedIdx ? 'text-[#F96000] scale-110' : 'text-gray-400 opacity-60'}`}>
                                                            {q.label.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Invisible Interactive Input */}
                                    <input
                                        type="range"
                                        min="0"
                                        max={QUARTERS.length - 1}
                                        value={selectedIdx}
                                        onChange={e => { setSelectedIdx(parseInt(e.target.value)); }}
                                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                                <div className="h-2" /> {/* spacing for bottom labels */}
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <button onClick={() => setSelectedIdx(0)} className="text-gray-300 hover:text-[#F96000] transition-colors p-1" title="Reset Timeline"><RotateCcw className="w-5 h-5" /></button>
                            </div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex flex-col gap-2 shrink-0">
                            <button onClick={handleReset} className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F96000] hover:border-[#F96000] transition-all active:scale-90" title="Reset View">
                                <Home className="w-4 h-4" />
                            </button>
                            <button onClick={() => mapRef.current?.zoomIn()} className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F96000] hover:border-[#F96000] transition-all active:scale-90" title="Zoom In">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button onClick={() => mapRef.current?.zoomOut()} className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F96000] hover:border-[#F96000] transition-all active:scale-90" title="Zoom Out">
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {(!isLoaded || tileStatus === 'loading' || lulcStatus === 'loading') && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-[100]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-14 h-14">
                                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                                <div className="absolute inset-0 border-4 border-[#F96000] border-t-transparent rounded-full animate-spin" />
                                {/* <Satellite className="absolute inset-0 m-auto w-6 h-6 text-[#F96000] animate-pulse" /> */}
                            </div>
                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">{!isLoaded ? '' : ''}</p>
                        </div>
                    </div>
                )}
                {/* Point Analysis Sidebar */}
                {selectedPoint && (
                    <div className="absolute top-0 right-0 h-full w-full md:w-[45%] lg:w-[35%] bg-white border-l border-gray-200 shadow-2xl z-[150] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
                        {/* Header Tabs & Close */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center flex-1 mr-4">
                                {(['What', 'How', 'Why'] as const).map((tab, index) => (
                                    <div key={tab} className="flex-1 flex items-center justify-center relative">
                                        <button
                                            onClick={() => setActiveModalTab(tab)}
                                            className="flex items-center cursor-pointer justify-center space-x-3 py-2 w-full transition-all group"
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all duration-300 ${activeModalTab === tab
                                                ? 'bg-[#F96000] border-[#F96000] text-white'
                                                : 'bg-gray-100 border-gray-200 text-gray-700 group-hover:border-gray-400 group-hover:text-gray-600'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeModalTab === tab
                                                ? 'text-black'
                                                : 'text-gray-400 group-hover:text-gray-600'
                                                }`}>
                                                {tab}
                                            </span>
                                        </button>
                                        {index < 2 && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-gray-600 z-10">
                                                <ChevronRight className="w-4 h-4" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedPoint(null);
                                    if (prePointClickState.current && mapRef.current) {
                                        mapRef.current.flyTo({
                                            center: prePointClickState.current.center,
                                            zoom: prePointClickState.current.zoom,
                                            duration: 1500,
                                            padding: { right: 0 } as any
                                        });
                                    }
                                    prePointClickState.current = null;
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:bg-orange-100 hover:text-[#F96000] text-gray-400 rounded-full transition-colors group shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Sidebar Body */}
                        <div className="flex flex-col flex-1 overflow-y-auto p-5 custom-scrollbar">
                            {(() => {
                                const currentContent = (TAB_CONTENT as any)[activeModalTab]?.find((c: any) => c.id === selectedPoint);
                                if (!currentContent) return <p className="text-gray-400 p-4">No data available for this point.</p>;

                                return (
                                    <div className="flex flex-col w-full text-gray-800">
                                        <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight leading-tight uppercase font-mono">
                                            {currentContent.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2 font-mono">
                                            <Calendar className="w-3.5 h-3.5 text-[#F96000]" strokeWidth={2.5} />
                                            <span>{currentContent.place}</span>
                                        </div>

                                        <div className="w-full h-px bg-gray-100 my-4" />

                                        {currentContent.content ? (
                                            currentContent.content.map((block: any, idx: number) => {
                                                if (block.type === 'heading') {
                                                    return (
                                                        <h4 key={idx} className="text-sm font-black text-gray-900 mb-3 mt-2 border-l-4 border-[#F96000] pl-2">
                                                            {block.value}
                                                        </h4>
                                                    );
                                                } else if (block.type === 'text') {
                                                    return (
                                                        <div key={idx} className="text-[13px] leading-relaxed text-gray-600 mb-6 bg-gray-50/30 p-3 rounded-lg">
                                                            {block.value}
                                                        </div>
                                                    );
                                                } else if (block.type === 'image') {
                                                    return (
                                                        <div key={idx} className="mb-6">
                                                            <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                                                <img src={block.url} alt="" className="w-full h-auto" />
                                                            </div>
                                                            {block.desc && <p className="text-[10px] text-gray-500 italic mt-2">{block.desc}</p>}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <div className="text-[13px] leading-relaxed text-gray-600">
                                                {currentContent.desc}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MapSentinelQuaterly;