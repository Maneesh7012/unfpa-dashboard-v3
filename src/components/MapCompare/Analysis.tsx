import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { PMTiles, Protocol as PMTilesProtocol } from 'pmtiles';
import { cogProtocol } from '@geomatico/maplibre-cog-protocol';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DISTRICT_NAME_VARIANTS } from '../../data/comparativeData';

const PMTILES_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/unfpa_od_population_data.pmtiles';
const PMTILES_URL_POINTS = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_change_analysis_point.pmtiles';
// Data URLs with Params
const DATA_CONFIG: any = {
    nightlight: {
        urls: {
            '2012': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/NTL_2012.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/NTL_2024.tif'
        },
        params: '#color:["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da"],0,20,c' // Light
    },
    urbansprawl: {
        urls: {
            "2011": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2010.pmtiles",
            "2024": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2025.pmtiles"
        },
        params: '#color:["#0868ac","#0868ac","#0868ac","#0868ac","#0868ac"],0,3000,c' // Pop

    },
    roads: {
        urls: {
            "2015": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/od_road_2015.pmtiles",
            "2025": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/od_road_2025.pmtiles"
        },
        params: '#color:["#fee0d2","#fcbba1","#fc9272","#ef3b2c","#67000d"],0,3000,c' // Pop
    },
    barren: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_barren_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_barren_2024.tif'
        },
        params: '#color:["#91908e","#91908e"],8,8'
    },
    builtup: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_builtup_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_builtup_2024.tif'
        },
        params: '#color:["#ED022A","#ED022A"],7,7'
    },
    cropland: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_cropland_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_cropland_2024.tif'
        },
        params: '#color:["#FFDB5C","#FFDB5C"],5,5'
    },
    forest: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_forest_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_forest_2024.tif'
        },
        params: '#color:["#358221","#358221"],2,2'
    },
    scrub: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_scrub_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_scrub_2024.tif'
        },
        params: '#color:["#666666","#666666"],4,4'
    },
    water: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_water_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_water_2024.tif'
        },
        params: '#color:["#1A5BAB","#1A5BAB"],1,1'
    },
    wetlands: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_wetlands_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_wetlands_2024.tif'
        },
        params: '#color:["#87D19E","#87D19E"],11,11'
    },
};

const TAB_CONTENT = {
    What: [
        { id: 1, title: 'Mining projects completed in the Kaliakata', desc: 'The satellite imagery above shows the creation of new coal processing plants in Kaliakata Town.' },
        { id: 2, title: 'Infrastructure Development in the sub-district areas of Handapa', desc: 'The construction of new roads and railway lines has played a crucial role. For example, projects to improve National Highway 55, which passes through Anugul, and the development of new railway lines aim to better connect the region\'s industrial and mining centers. These improved transportation links make it easier to move goods and people, encouraging the growth of new settlements and industries. In late 2022, the Chief Minister of Odisha launched numerous development projects in Anugul, including improved irrigation, new bus terminals, and bridges, further boosting the district\'s infrastructure.' },
        { id: 3, title: 'Infrastructure Development in the sub-district areas of Anugul', desc: 'The construction of new roads and railway lines has played a crucial role. For example, projects to improve National Highway 55, which passes through Anugul, and the development of new railway lines aim to better connect the region\'s industrial and mining centers. These improved transportation links make it easier to move goods and people, encouraging the growth of new settlements and industries. In late 2022, the Chief Minister of Odisha launched numerous development projects in Anugul, including improved irrigation, new bus terminals, and bridges, further boosting the district\'s infrastructure.' },
        { id: 4, title: 'Built-up area expansion in Handidua Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
        { id: 5, title: 'Built-up area expansion in Kulo Jungle Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
        { id: 6, title: 'Built-up area expansion in Takua Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
        { id: 7, title: 'Reduction in Agricultural Land in Mandabereni', desc: 'Agricultural land in Anugul has seen a notable decline since 2011, coinciding with the launch of multiple large-scale industrial and mining projects. This transformation has contributed to population redistribution, as many agricultural communities experienced displacement, relocation, and shifts in their traditional livelihoods. As an example, satellite imageries from 2012 and 2024 for the Mandabereni region illustrate these changes, showcasing the visible reduction in agricultural areas over time.' },
        { id: 8, title: 'Built-up area expansion in ghantapada Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
        { id: 9, title: 'Urban sprawl in the sub-district areas of Anugul', desc: 'Urban sprawl describes the expansion of cities and towns into surrounding rural areas. In Anugul, this has been a defining feature of its development over the past few decades. Instead of growing in a compact, organized way, the urban areas have spread out, often in a scattered and unplanned manner.' },
        { id: 10, title: 'Urban sprawl in the sub-district areas of Colliery', desc: 'Urban sprawl describes the expansion of cities and towns into surrounding rural areas. In Anugul, this has been a defining feature of its development over the past few decades. Instead of growing in a compact, organized way, the urban areas have spread out, often in a scattered and unplanned manner.' },
    ],
    How: [
        { id: 1, title: 'How 1', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
        { id: 2, title: 'How 2', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
        { id: 3, title: 'How 3', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
    ],
    Why: [
        { id: 1, title: 'Why 1', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
        { id: 2, title: 'Why 2', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
        { id: 3, title: 'Why 3', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
    ]
};

const imageMap: Record<number, string> = {
    1: new URL('../../assets/images/1.webp', import.meta.url).href,
    2: new URL('../../assets/images/2.webp', import.meta.url).href,
    3: new URL('../../assets/images/3.webp', import.meta.url).href,
    4: new URL('../../assets/images/4.webp', import.meta.url).href,
    5: new URL('../../assets/images/5.webp', import.meta.url).href,
    6: new URL('../../assets/images/6.webp', import.meta.url).href,
    7: new URL('../../assets/images/7.webp', import.meta.url).href,
    8: new URL('../../assets/images/8.webp', import.meta.url).href,
    9: new URL('../../assets/images/9.webp', import.meta.url).href,
    10: new URL('../../assets/images/10.webp', import.meta.url).href,
};


// Helper to add protocol only once
let protocolsAdded = false;

interface MapCompareProps {
    targetBounds?: maplibregl.LngLatBoundsLike;
    targetDistrict?: string;
    onDistrictSelect?: (district: string) => void;
    activeLayer?: string;
    onLayerSelect?: (layer: string, pixel?: number | null) => void;
    activeLulcPixel?: number | null;
    year1?: string;
    year2?: string;
    resetTrigger?: number;
}

export default function Analysis({ targetBounds, targetDistrict, activeLayer = 'lulc', onLayerSelect, activeLulcPixel, year1, year2, resetTrigger }: MapCompareProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftMapRef = useRef<HTMLDivElement>(null);

    // Default Fallback Center (used if PMTiles header fails)
    const odishaCenter: [number, number] = [85.0985, 20.9517];
    const initialZoom = 6;
    const initialBoundsRef = useRef<maplibregl.LngLatBoundsLike | null>(null);
    const prePointClickState = useRef<{ center: maplibregl.LngLatLike; zoom: number } | null>(null);

    // Map Instances
    const leftMapObj = useRef<maplibregl.Map | null>(null);

    const [selectedDistrict, setSelectedDistrict] = useState<string>('Odisha');
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [lastSelectedPoint, setLastSelectedPoint] = useState<number | null>(null);
    const [activeModalTab, setActiveModalTab] = useState<'What' | 'How' | 'Why'>('What');
    const [isLoading, setIsLoading] = useState(true);

    const layerInfoRef = useRef({ currentLayerKey: '', y1: '', y2: '', rawUrl1: '', rawUrl2: '' });



    // Update selected district when prop changes
    useEffect(() => {
        if (targetDistrict) {
            setSelectedDistrict(targetDistrict);
        }
    }, [targetDistrict]);

    // Derived State for Current Config
    let resolvedLayerKey = activeLayer || 'water';

    if (resolvedLayerKey === 'nightlight_medium' || resolvedLayerKey === 'nightlight_low') {
        resolvedLayerKey = 'nightlight';
    }

    if (resolvedLayerKey === 'lulc' && activeLulcPixel !== null && activeLulcPixel !== undefined) {
        const lulcMap: Record<number, string> = {
            1: "water",
            2: "forest",
            4: "scrub",
            5: "cropland",
            7: "builtup",
            8: "barren",
            11: "wetlands"
        };
        resolvedLayerKey = lulcMap[activeLulcPixel] || 'water';
    }

    const currentLayerKey = DATA_CONFIG[resolvedLayerKey] ? resolvedLayerKey : 'water';

    const config = DATA_CONFIG[currentLayerKey];

    // Determine Years with Fallbacks
    const availableYears = Object.keys(config.urls).sort();

    let y1 = year1;
    if (!y1 || !config.urls[y1]) y1 = availableYears[0];

    let y2 = year2;
    if (!y2 || !config.urls[y2]) y2 = availableYears[availableYears.length - 1];

    // Construct full URLs
    const getLayerUrl = (year: string) => {
        const baseUrl = config?.urls[year];
        if (!baseUrl) return '';

        if (currentLayerKey === 'urbansprawl' || currentLayerKey === 'roads') {
            return `pmtiles://${baseUrl}`;
        }

        const params = config.params;
        return `cog://${baseUrl}${params}`;
    };

    const leftUrl = getLayerUrl(y1);
    const rightUrl = getLayerUrl(y2);

    // Refs to track current URLs for async load events
    const urlsRef = useRef({ left: leftUrl, right: rightUrl });
    useEffect(() => {
        urlsRef.current = { left: leftUrl, right: rightUrl };
        layerInfoRef.current = {
            currentLayerKey,
            y1,
            y2,
            rawUrl1: config?.urls[y1] || '',
            rawUrl2: config?.urls[y2] || ''
        };
    }, [leftUrl, rightUrl, currentLayerKey, y1, y2, config]);

    // Register Protocols
    useEffect(() => {
        if (!protocolsAdded) {
            try {
                if (!maplibregl.addProtocol.toString().includes('cog')) { // Check if not added or handle via try-catch
                    maplibregl.addProtocol('cog', cogProtocol);
                }
                const pmtilesProtocol = new PMTilesProtocol();
                maplibregl.addProtocol('pmtiles', pmtilesProtocol.tile);
            } catch (e) {
                // Ignore protocol already added errors
            }
            protocolsAdded = true;
        }
    }, []);


    // Helper: Reset View
    const handleResetView = () => {
        if (initialBoundsRef.current) {
            const options: any = { padding: 20, duration: 1200 };
            // Only move Left Map; Right Map will sync automatically
            leftMapObj.current?.fitBounds(initialBoundsRef.current, options);
        } else {
            leftMapObj.current?.flyTo({ center: odishaCenter, zoom: initialZoom });
        }
    };

    // Shared Helper to Update/Switch Layers
    const updateMainLayer = async (map: maplibregl.Map, side: 'left' | 'right', url: string, type: 'raster' | 'vector', activeLayerKey: string) => {
        const sourceId = `main-source-${side}`;
        const layerId = `main-layer-${side}`;

        // Always fully remove first to ensure clean state transition
        if (map.getLayer(layerId)) {
            map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
            map.removeSource(sourceId);
        }

        // Add New
        setIsLoading(true);
        if (type === 'raster') {
            map.addSource(sourceId, {
                type: 'raster',
                url: url,
                tileSize: 256
            });
            map.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: { 'raster-opacity': 1 },
            }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
        } else {
            // Vector
            map.addSource(sourceId, {
                type: 'vector',
                url: url
            });

            // We need to know the source-layer. Fetch metadata.
            // URL is pmtiles://... -> remove protocol
            const httpUrl = url.replace('pmtiles://', '');
            try {
                const p = new PMTiles(httpUrl);
                // const header = await p.getHeader(); // Unused
                const metadata = await p.getMetadata() as any;

                // Guess layer name
                let sourceLayerName = 'layer'; // Default
                if (metadata && metadata.vector_layers && metadata.vector_layers.length > 0) {
                    sourceLayerName = metadata.vector_layers[0].id;
                }

                if (map.getSource(sourceId)) { // Check if source still exists (async safety)
                    if (activeLayerKey === 'roads') {
                        map.addLayer({
                            id: layerId,
                            type: 'line',
                            source: sourceId,
                            'source-layer': 'zcta',
                            paint: {
                                'line-color': '#ff0000',
                                'line-width': 1
                            }
                        }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
                    } else {
                        map.addLayer({
                            id: layerId,
                            type: 'fill',
                            source: sourceId,
                            'source-layer': sourceLayerName,
                            paint: {
                                'fill-color': '#F58220',
                                'fill-opacity': 0.6,
                                'fill-outline-color': '#ffffff'
                            }
                        }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
                    }
                }
            } catch (e) {
                console.error("Failed to load vector metadata", e);
            }
        }
    };

    // Initialize Maps
    const [mapsLoadedCount, setMapsLoadedCount] = useState(0);

    useEffect(() => {
        // Cleanup existing maps if any
        if (leftMapObj.current) leftMapObj.current.remove();

        const satelliteStyle = {
            version: 8,
            sources: {
                'esri-grey': {
                    type: 'raster',
                    tiles: [
                        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    ],
                    tileSize: 256,
                    attribution: '© Esri'
                }
            },
            layers: [
                {
                    id: 'background',
                    type: 'background',
                    paint: { 'background-color': '#000000' }
                },
                {
                    id: 'esri-grey-layer',
                    type: 'raster',
                    source: 'esri-grey',
                    minzoom: 0,
                    maxzoom: 22
                }
            ]
        } as maplibregl.StyleSpecification;

        // Fetch PMTiles Metadata for Initial Bounds
        const fetchMetadata = async () => {
            try {
                const p = new PMTiles(PMTILES_URL);
                const header = await p.getHeader();
                if (header.minLon !== undefined) {
                    initialBoundsRef.current = [
                        [header.minLon, header.minLat],
                        [header.maxLon, header.maxLat]
                    ];
                    // Apply initial fit if map ready
                    if (leftMapObj.current) leftMapObj.current.fitBounds(initialBoundsRef.current, { duration: 0, padding: 40 });
                }
            } catch (e) {
                console.warn('Failed to fetch PMTiles metadata', e);
            }
        };
        fetchMetadata();

        // Initialize Left Map if ref exists
        if (leftMapRef.current) {
            leftMapObj.current = new maplibregl.Map({
                container: leftMapRef.current,
                style: satelliteStyle,
                center: odishaCenter,
                zoom: initialZoom,
                attributionControl: false
            });

            leftMapObj.current.on('load', () => {
                leftMapObj.current?.resize();

                // Fit bounds if metadata already fetched
                if (initialBoundsRef.current) {
                    leftMapObj.current?.fitBounds(initialBoundsRef.current, { duration: 0, padding: 20 });
                }

                // Initial Main Layer Load
                updateMainLayer(leftMapObj.current!, 'left', urlsRef.current.left, ['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster', currentLayerKey);

                // Vector Boundary Source
                if (!leftMapObj.current?.getSource('leftVector')) {
                    leftMapObj.current?.addSource('leftVector', {
                        type: 'vector',
                        url: `pmtiles://${PMTILES_URL}`
                    });

                    // Transparent Fill layer for Click Events
                    leftMapObj.current?.addLayer({
                        id: 'vector-fill-left',
                        type: 'fill',
                        source: 'leftVector',
                        'source-layer': 'zcta',
                        paint: { 'fill-color': 'transparent', 'fill-opacity': 0 }
                    });

                    // Outline Layer
                    leftMapObj.current?.addLayer({
                        id: 'vector-outline-left',
                        type: 'line',
                        source: 'leftVector',
                        'source-layer': 'zcta',
                        paint: {
                            'line-color': '#686868ff',
                            'line-width': 2
                        }
                    });

                    // Highlight Layer
                    leftMapObj.current?.addLayer({
                        id: 'vector-outline-highlight-left',
                        type: 'line',
                        source: 'leftVector',
                        'source-layer': 'zcta',
                        paint: {
                            'line-color': '#EF4444',   // Highlight color
                            'line-width': 3,
                            'line-opacity': 0          // hidden by default
                        },
                        filter: ['==', 'fid', '']
                    });

                    // Click Listener

                    leftMapObj.current?.on('mouseenter', 'vector-fill-left', () => { if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = 'pointer'; });
                    leftMapObj.current?.on('mouseleave', 'vector-fill-left', () => { if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = ''; });

                    // Points Source & Layer
                    leftMapObj.current?.addSource('points-source', {
                        type: 'vector',
                        url: `pmtiles://${PMTILES_URL_POINTS}`
                    });

                    leftMapObj.current?.addLayer({
                        id: 'points-layer',
                        type: 'circle',
                        source: 'points-source',
                        'source-layer': 'zcta',
                        paint: {
                            'circle-radius': 8,
                            'circle-color': '#F58220',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF'
                        }
                    });

                    // Highlight Layer for Points
                    leftMapObj.current?.addLayer({
                        id: 'points-layer-highlight',
                        type: 'circle',
                        source: 'points-source',
                        'source-layer': 'zcta',
                        paint: {
                            'circle-radius': 8,
                            'circle-color': 'transparent',
                            'circle-stroke-width': 4,
                            'circle-stroke-color': '#0868ac'
                        },
                        filter: ['==', 'id', ''] // hidden initially
                    });

                    leftMapObj.current?.on('click', 'points-layer', (e) => {
                        if (e.features && e.features.length > 0) {
                            const props = e.features[0].properties;
                            if (props && props.id) {
                                setSelectedPoint(Number(props.id));
                                setActiveModalTab('What'); // Reset to What on open
                            }
                        }
                    });

                    leftMapObj.current?.on('mouseenter', 'points-layer', () => { if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = 'pointer'; });
                    leftMapObj.current?.on('mouseleave', 'points-layer', () => { if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = ''; });
                }
                leftMapObj.current?.resize();
                setMapsLoadedCount(prev => prev + 1);
            });
            leftMapObj.current.on('idle', () => setIsLoading(false));
        }



        return () => {
            // Cleanup existing maps if any
            try {
                if (leftMapObj.current) {
                    leftMapObj.current.remove();
                    leftMapObj.current = null;
                }
            } catch (e) { console.warn('Left map cleanup error', e); }


        };
    }, []);
    useEffect(() => {
        if (!leftMapObj.current) return;

        const type = ['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster';

        updateMainLayer(leftMapObj.current, 'left', rightUrl, type, currentLayerKey);
    }, [rightUrl, currentLayerKey, activeLulcPixel]);

    // Handle Bounds Change
    useEffect(() => {
        if (!leftMapObj.current) return; // Right map syncs automatically

        if (targetBounds) {
            const options: any = { padding: 40, duration: 1200 };
            leftMapObj.current.fitBounds(targetBounds, options);
        } else {
            // If targetBounds is cleared (e.g. reset clicked in parent), reset view
            handleResetView();
        }
    }, [targetBounds, resetTrigger]);

    // Handle Point Highlight, Map Resize & FlyTo on point change
    useEffect(() => {
        if (!leftMapObj.current) return;

        // Update selection highlight
        if (leftMapObj.current.getLayer('points-layer-highlight')) {
            leftMapObj.current.setFilter('points-layer-highlight', ['==', 'id', selectedPoint !== null ? selectedPoint : -999]);
        }

        // Handle Map Zoom/Center when point selection changes
        if (selectedPoint !== null && selectedPoint !== lastSelectedPoint) {
            // Save current state if this is the FIRST point selection
            if (lastSelectedPoint === null && prePointClickState.current === null) {
                prePointClickState.current = {
                    center: leftMapObj.current.getCenter(),
                    zoom: leftMapObj.current.getZoom()
                };
            }

            // Find feature coordinates to fly to using querySourceFeatures
            const features = leftMapObj.current.querySourceFeatures('points-source', {
                sourceLayer: 'zcta',
                filter: ['==', 'id', selectedPoint]
            });

            if (features && features.length > 0) {
                const geom = features[0].geometry;
                if (geom.type === 'Point') {
                    leftMapObj.current.flyTo({
                        center: (geom as any).coordinates,
                        zoom: Math.max(leftMapObj.current.getZoom(), 12),
                        duration: 1000,
                        essential: true
                    });
                }
            } else {
                // FALLBACK: If querySourceFeatures returns nothing (tiles not loaded), 
                // we can't fly safely. But usually it works for loaded tiles.
            }
        }

        setLastSelectedPoint(selectedPoint);

        // Trigger resize when layout changes between 100% and 60%
        setTimeout(() => {
            leftMapObj.current?.resize();
        }, 100);
        setTimeout(() => {
            leftMapObj.current?.resize();
        }, 300);
    }, [selectedPoint]);

    // Handle Highlighting
    useEffect(() => {
        if (mapsLoadedCount < 1) return;

        const mapsToHighlight = [
            { map: leftMapObj.current, idx: 'left' },
        ];

        mapsToHighlight.forEach(({ map, idx }) => {
            if (!map || !map.getLayer(`vector-outline-highlight-${idx}`)) return;

            if (selectedDistrict === 'Odisha') {
                map.setPaintProperty(`vector-outline-highlight-${idx}`, 'line-opacity', 0);
                map.setFilter(`vector-outline-highlight-${idx}`, ['==', 'fid', '']);
            } else {
                const highlightCondition = [
                    'any',
                    ['==', ['get', 'district_name'], selectedDistrict],
                    ['==', ['get', 'DIST_NAME'], selectedDistrict],
                    ['==', ['get', 'District'], selectedDistrict],
                    ['==', ['get', 'NAME'], selectedDistrict],
                    ['==', ['get', 'name'], selectedDistrict],
                    ['==', ['get', 'district'], selectedDistrict],
                    ['==', ['get', 'district_name'], Object.keys(DISTRICT_NAME_VARIANTS).find(k => DISTRICT_NAME_VARIANTS[k] === selectedDistrict) || selectedDistrict]
                ];

                map.setPaintProperty(`vector-outline-highlight-${idx}`, 'line-opacity', 1);
                map.setFilter(`vector-outline-highlight-${idx}`, highlightCondition as any);
                if (map.getLayer(`vector-outline-highlight-${idx}`)) {
                    map.moveLayer(`vector-outline-highlight-${idx}`); // Always on top
                }
            }
        });
    }, [selectedDistrict, mapsLoadedCount]);

    const categories = [
        { id: 1, label: 'Water', layer: 'water', color: '#1A5BAB' },
        { id: 2, label: 'Forest', layer: 'forest', color: '#358221' },
        { id: 5, label: 'Cropland', layer: 'cropland', color: '#FFDB5C' },
        { id: 7, label: 'Builtup', layer: 'builtup', color: '#ED022A' },
        { id: 11, label: 'Wetlands', layer: 'wetlands', color: '#87D19E' },
        { id: -2, label: 'Urban Sprawl', layer: 'urbansprawl', color: '#F58220' },
        { id: -3, label: 'Night Light', layer: 'nightlight', color: '#eab308' },
        { id: -4, label: 'Roads', layer: 'roads', color: '#ff0000' }
    ];

    return (
        <div className={`flex flex-col md:flex-row gap-6 w-full ${selectedPoint ? 'items-start' : ''}`}>

            <div className={`flex flex-col gap-4 relative transition-all duration-300 ${selectedPoint ? 'w-full md:w-[60%]' : 'w-full'}`}>
                {/* Map Area */}
                <div className="relative w-full rounded-xl shadow-sm border border-gray-200">
                    {/* Category Filter Selection (Floating) */}
                    <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] flex flex-col gap-2">

                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map(cat => {
                                const isSelected = activeLayer === cat.layer;
                                return (
                                    <button
                                        key={cat.layer}
                                        onClick={() => {
                                            if (onLayerSelect) {
                                                onLayerSelect(cat.layer);
                                            }
                                        }}
                                        className={`px-3 py-1.5 text-[12px] font-bold tracking-wide transition-all rounded-md ${isSelected
                                            ? 'bg-[#bae4bc] text-[#0868ac] border border-[#0868ac]'
                                            : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                                            } cursor-pointer shadow-sm`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {cat.label}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        ref={containerRef}
                        className="relative w-full h-[600px] overflow-hidden select-none rounded-lg"
                    >
                        {/* MAP */}
                        <div
                            ref={leftMapRef}
                            className="relative w-full h-[600px] overflow-hidden select-none"
                        />

                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                                <div className="loading-spinner"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Sidebar instead of Modal */}
            {selectedPoint && (
                <div className="w-full md:w-[40%] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px] transition-all duration-300 animate-in slide-in-from-right-8 sticky top-4">

                    {/* Header Tabs & Close */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex w-full space-x-2 mr-4">
                            {(['What', 'How', 'Why'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveModalTab(tab)}
                                    className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeModalTab === tab
                                        ? 'bg-[#bae4bc] text-[#0868ac] shadow-sm'
                                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                setSelectedPoint(null);
                                prePointClickState.current = null;

                                // Wait for the sidebar to slide out and layout to expand
                                setTimeout(() => {
                                    if (leftMapObj.current) {
                                        leftMapObj.current.resize();
                                        if (initialBoundsRef.current) {
                                            leftMapObj.current.fitBounds(initialBoundsRef.current, {
                                                padding: 20,
                                                duration: 800
                                            });
                                        } else {
                                            leftMapObj.current.flyTo({
                                                center: odishaCenter,
                                                zoom: initialZoom,
                                                duration: 800
                                            });
                                        }
                                    }
                                }, 350);
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-400 rounded-full transition-colors group"
                            title="Close"
                        >
                            <X className="w-4 h-4 scale-100 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Sidebar Body */}
                    <div className="flex flex-col flex-1 overflow-y-auto p-5">
                        {/* Image area with Prev/Next buttons (Only on 'What' tab) */}
                        {activeModalTab === 'What' && imageMap[selectedPoint] && (
                            <div className="relative w-full rounded-xl overflow-hidden bg-gray-100/50 mb-6 flex items-center justify-center min-h-[600px] max-h-[600px] border border-gray-200 shadow-inner">
                                {/* Previous Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPoint(prev => prev ? (prev === 1 ? TAB_CONTENT.What.length : prev - 1) : 1);
                                        setActiveModalTab('What');
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 bg-white/90 hover:bg-[#bae4bc] hover:text-[#0868ac] text-gray-700 rounded-full transition-all border border-gray-200 hover:scale-110 shadow-md"
                                    title="Previous Point"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <img
                                    src={imageMap[selectedPoint]}
                                    alt={`Analysis ${selectedPoint}`}
                                    className="object-contain h-[600px]"
                                />

                                {/* Next Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPoint(prev => prev ? (prev === TAB_CONTENT.What.length ? 1 : prev + 1) : 1);
                                        setActiveModalTab('What');
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 bg-white/90 hover:bg-[#bae4bc] hover:text-[#0868ac] text-gray-700 rounded-full transition-all border border-gray-200 hover:scale-110 shadow-md"
                                    title="Next Point"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Title & Desc */}
                        <div className="flex flex-col w-full text-gray-800 px-1">
                            {(() => {
                                const currentContent = TAB_CONTENT[activeModalTab]?.find(c => c.id === selectedPoint);
                                return currentContent ? (
                                    <>
                                        <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                                            {currentContent.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            {currentContent.desc}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-400 p-4">No data available for this point.</p>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
