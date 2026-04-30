/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { motion } from 'framer-motion';
import maplibregl from 'maplibre-gl';
import {
  Plus,
  Minus,
  Home,
  Satellite,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  X,
  LineChart as LucideLineChart,
} from 'lucide-react';
import * as pmtiles from 'pmtiles';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Dot,
} from 'recharts';

import { createTrend } from 'trendline';

import { TAB_CONTENT, Points_Data } from '../MapCompare/pointData';

// PMTiles protocol (safe to re-add; guard against duplicates)
import {
  cogProtocol,
  setColorFunction,
} from '@geomatico/maplibre-cog-protocol';
import { DISTRICT_NAME_VARIANTS, LULC_STATS } from '../../data/comparativeData';

try {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
  maplibregl.addProtocol('cog', cogProtocol);
} catch (e) {
  console.log('e', e);
}

// ─── Planetary Computer (PC) Mosaic API ────────────────────────────────────
const PC_MOSAIC_REGISTER =
  'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/register';
const PC_TILE_BASE =
  'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/tiles';

const ODISHA_BBOX = [81.3883, 17.8124, 87.477, 22.5674];
const PC_RENDER_PARAMS =
  'assets=B04&assets=B03&assets=B02&color_formula=Gamma%20RGB%203.2%20Saturation%200.8%20Sigmoidal%20RGB%2025%200.35&collection=sentinel-2-l2a&format=png';

// Common district spelling variations in Odisha datasets
const DISTRICT_SYNONYMS: Record<string, string[]> = {
  angul: ['anugul'],
  balasore: ['baleswar'],
  bhadrak: ['bhadrakh'],
  bolangir: ['balangir'],
  deogarh: ['debagarh'],
  nabarangpur: ['nawarangpur'],
  subarnapur: ['sonepur'],
};

const LULC_RGBA: Record<number, number[]> = {
  0: [65, 155, 223, 255], // Water (#419BDF)
  1: [57, 125, 73, 255], // Trees (#397D49)
  2: [136, 176, 83, 255], // Grass (#88B053)
  3: [122, 135, 198, 255], // Flooded vegetation (#7A87C6)
  4: [228, 150, 53, 255], // Crops (#E49635)
  5: [223, 195, 90, 255], // Shrub & Scrub (#DFC35A)
  6: [196, 40, 27, 255], // Built (#C4281B)
  7: [165, 155, 143, 255], // Bare (#A59B8F)
};

type LulcCategory = number | 'all' | 'vegetation';

interface LulcLegendItem {
  label: string;
  color: string;
  value: LulcCategory;
  key: string;
}

const LULC_LEGEND: LulcLegendItem[] = [
  { label: 'Water', color: '#419BDF', value: 0, key: 'water' },
  { label: 'Trees', color: '#397D49', value: 1, key: 'trees' },
  { label: 'Grass', color: '#88B053', value: 2, key: 'grass' },
  {
    label: 'Flooded vegetation',
    color: '#7A87C6',
    value: 3,
    key: 'flooded_vegetation',
  },
  { label: 'Crops', color: '#E49635', value: 4, key: 'crops' },
  {
    label: 'Shrub & Scrub',
    color: '#DFC35A',
    value: 5,
    key: 'shrub_and_scrub',
  },
  { label: 'Built area', color: '#C4281B', value: 6, key: 'built' },
  { label: 'Bare Ground', color: '#A59B8F', value: 7, key: 'bare' },
];

const UI_LULC_LEGEND = [
  LULC_LEGEND.find((c) => c.value === 0),
  {
    label: 'Vegetation',
    color: '#397D49',
    value: 'vegetation',
    key: 'vegetation',
  },
  LULC_LEGEND.find((c) => c.value === 6),
  LULC_LEGEND.find((c) => c.value === 7),
].filter(Boolean) as any[];

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

const QUARTERS = [
  ...generateQuarters(2018, 2025),
  {
    key: '2026-M1',
    label: 'March 2026',
    time: '2026-01-01/2026-03-31',
    year: 2026,
    q: 1,
  },
];
const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc_quarterly/od_district_lulc_quarterly.pmtiles';
const ODISHA_CENTER: [number, number] = [84.8, 20.5];
const ODISHA_BOUNDS: maplibregl.LngLatBoundsLike = [
  [81.3883, 17.8124],
  [87.477, 22.5674],
];
const SUBDISTRICT_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/population_data/od_subdistrict_pop_total_2036.pmtiles';

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
  const timelineCardRef = useRef<HTMLDivElement>(null);
  const [timelineHeight, setTimelineHeight] = useState(180);
  const [selectedIdx, setSelectedIdx] = useState(QUARTERS.length - 1);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false); // Removed play state
  const [pmtilesBounds, setPmtilesBounds] =
    useState<maplibregl.LngLatBoundsLike | null>(null);
  const accumulatedFeaturesRef = useRef<Map<string, any[]>>(new Map());
  const [cacheVersion, setCacheVersion] = useState(0);
  const lastFittedDistrictRef = useRef<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mosaicCacheRef = useRef<Record<string, string>>({});
  const [tileStatus, setTileStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');

  // LULC states
  const [showChart, setShowChart] = useState(false);
  const [selectedLulcCategory, setSelectedLulcCategory] =
    useState<LulcCategory | null>(null);
  const [lulcStatus, setLulcStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');
  const showLulc = selectedLulcCategory !== null;

  useEffect(() => {
    if (!showLulc && showChart) {
      setShowChart(false);
    }
  }, [showLulc, showChart]);

  // Points states
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [lastSelectedPoint, setLastSelectedPoint] = useState<number | null>(
    null,
  );
  const [activeModalTab, setActiveModalTab] = useState<'What' | 'How' | 'Why'>(
    'What',
  );
  const prePointClickState = useRef<{
    center: maplibregl.LngLatLike;
    zoom: number;
  } | null>(null);
  const [districtLulcData, setDistrictLulcData] = useState<Record<
    string,
    any
  > | null>(null);

  const currentQuarter = QUARTERS[selectedIdx];

  const getOrCreateMosaicUrl = useCallback(
    async (q: Quarter, bbox: number[]): Promise<string | null> => {
      const bboxKey = bbox.map((v) => v.toFixed(4)).join(',');
      const cacheKey = `${q.key}_${bboxKey}`;

      if (mosaicCacheRef.current[cacheKey]) {
        return `${PC_TILE_BASE}/${mosaicCacheRef.current[cacheKey]}/WebMercatorQuad/{z}/{x}/{y}@2x.png?${PC_RENDER_PARAMS}`;
      }
      const [startDate, endDate] = q.time.split('/');
      const body = {
        collections: ['sentinel-2-l2a'],
        bbox: bbox,
        datetime: `${startDate}T00:00:00Z/${endDate}T23:59:59Z`,
        query: { 'eo:cloud_cover': { lt: 40 } },
        sortby: [{ field: 'eo:cloud_cover', direction: 'asc' }],
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
      mosaicCacheRef.current[cacheKey] = mosaicId;
      return `${PC_TILE_BASE}/${mosaicId}/WebMercatorQuad/{z}/{x}/{y}@2x.png?${PC_RENDER_PARAMS}`;
    },
    [],
  );

  //   const switchToQuarter = useCallback(
  //     async (idx: number) => {
  //       const map = mapRef.current;
  //       if (!map) return;

  //       // Change status to loading immediately for instant UI feedback
  //       setTileStatus('loading');

  //       if (!map.isStyleLoaded()) {
  //         await new Promise<void>((resolve) => map.once('idle', () => resolve()));
  //       }
  //       const q = QUARTERS[idx];
  //       const sourceId = 'sentinel-quarterly-source';
  //       const layerId = 'sentinel-quarterly-layer';

  //       try {
  //         const tileUrl = await getOrCreateMosaicUrl(q);
  //         if (!tileUrl) {
  //           setTileStatus('error');
  //           return;
  //         }

  //         const bboxToUse = targetBounds
  //           ? [
  //               targetBounds[0][0],
  //               targetBounds[0][1],
  //               targetBounds[1][0],
  //               targetBounds[1][1],
  //             ]
  //           : ODISHA_BBOX;

  //         if (map.getLayer(layerId)) map.removeLayer(layerId);
  //         if (map.getSource(sourceId)) map.removeSource(sourceId);

  //         map.addSource(sourceId, {
  //           type: 'raster',
  //           tiles: [tileUrl],
  //           tileSize: 256,
  //           minzoom: 0,
  //           maxzoom: 14,
  //           bounds: bboxToUse as any,
  //           attribution:
  //             'Sentinel-2 L2A © ESA / Copernicus via Microsoft Planetary Computer',
  //         });

  //         const beforeLayer = map.getLayer('lulc-cog-layer')
  //           ? 'lulc-cog-layer'
  //           : map.getLayer('district-mask-layer')
  //             ? 'district-mask-layer'
  //             : map.getLayer('district-outline-quarterly')
  //               ? 'district-outline-quarterly'
  //               : undefined;

  //         map.addLayer(
  //           {
  //             id: layerId,
  //             type: 'raster',
  //             source: sourceId,
  //             paint: {
  //               'raster-opacity': 1,
  //               'raster-fade-duration': 200,
  //               'raster-resampling': 'linear',
  //             },
  //           },
  //           beforeLayer,
  //         );

  //         // Wait for map to be idle (fully rendered) before setting ready
  //         map.once('idle', () => {
  //           setTileStatus('ready');
  //         });
  //       } catch (err) {
  //         setTileStatus('error');
  //       }
  //     },
  //     [getOrCreateMosaicUrl],
  //   );

  const switchToQuarter = useCallback(
    async (idx: number) => {
      const map = mapRef.current;
      if (!map) return;

      setTileStatus('loading');

      if (!map.isStyleLoaded()) {
        await new Promise<void>((resolve) => map.once('idle', () => resolve()));
      }

      const q = QUARTERS[idx];
      const sourceId = 'sentinel-quarterly-source';
      const layerId = 'sentinel-quarterly-layer';

      try {
        const bboxToUse = targetBounds
          ? [
              targetBounds[0][0],
              targetBounds[0][1],
              targetBounds[1][0],
              targetBounds[1][1],
            ]
          : ODISHA_BBOX;
        const tileUrl = await getOrCreateMosaicUrl(q, bboxToUse);
        // const tileUrl =
        //   'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/sentinel%C2%A0%202_tci/Anugul/Anugul_2018_q1.tif';

        if (!tileUrl) {
          setTileStatus('error');
          return;
        }

        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);

        const formatDistrictName = (name: string) =>
          name.replace(/\s+/g, '').trim();

        const formattedDistrict = formatDistrictName(targetDistrict);

        const year = q.year;
        const quarter = q.q;

        // Handle Odisha fallback (same pattern as LULC)
        const isOdisha =
          !targetDistrict || targetDistrict.toLowerCase() === 'odisha';

        //  dynamic Sentinel URL
        const sentinelUrl = isOdisha
          ? null // keep existing mosaic logic for Odisha
          : `https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/sentinel%C2%A0%202_tci/${formattedDistrict}/${formattedDistrict}_${year}_q${quarter}.tif`;

        // map.addSource(sourceId, {
        //   type: 'raster',
        //   tiles: [tileUrl],
        //   tileSize: 256,
        //   minzoom: 0,
        //   maxzoom: 14,
        //   bounds: bboxToUse as any,
        //   attribution:
        //     'Sentinel-2 L2A © ESA / Copernicus via Microsoft Planetary Computer',
        // });

        map.addSource(sourceId, {
          type: 'raster',
          url: sentinelUrl ? `cog://${sentinelUrl}` : tileUrl, // fallback to existing planetary computer logic
          tileSize: 256,
          minzoom: 0,
          maxzoom: 14,
          bounds: bboxToUse as any,
          attribution:
            'Sentinel-2 L2A © ESA / Copernicus via Microsoft Planetary Computer',
        });

        const beforeLayer = map.getLayer('lulc-cog-layer')
          ? 'lulc-cog-layer'
          : map.getLayer('district-mask-layer')
            ? 'district-mask-layer'
            : map.getLayer('district-outline-quarterly')
              ? 'district-outline-quarterly'
              : undefined;

        map.addLayer(
          {
            id: layerId,
            type: 'raster',
            source: sourceId,
            paint: {
              'raster-opacity': 1,
              'raster-fade-duration': 200,
              'raster-resampling': 'linear',
            },
          },
          beforeLayer,
        );

        map.once('idle', () => {
          setTileStatus('ready');
        });
      } catch (err) {
        console.log('err', err);
        setTileStatus('error');
      }
    },
    [
      getOrCreateMosaicUrl,
      targetBounds,
      ODISHA_BBOX,
      QUARTERS,
      setTileStatus, // safe even if stable
    ],
  );

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;

    // Masking logic: Show only the selected district
    if (map.getLayer('district-mask-layer')) {
      const isOdisha =
        !targetDistrict || targetDistrict.toLowerCase() === 'odisha';
      map.setPaintProperty(
        'district-mask-layer',
        'fill-opacity',
        isOdisha ? 0 : 1.0,
      );

      if (!isOdisha) {
        map.setPaintProperty('district-mask-layer', 'fill-opacity', [
          'case',
          [
            'any',
            ['==', ['get', 'district_name'], targetDistrict],
            ['==', ['get', 'NAME'], targetDistrict],
            ['==', ['get', 'name'], targetDistrict],
          ],
          0,
          1.0,
        ]);
      }
    }

    // Only fit bounds if the district has actually changed or it's the first load
    const districtKey = `${targetDistrict}-${targetBounds ? JSON.stringify(targetBounds) : 'none'}`;
    if (lastFittedDistrictRef.current === districtKey) return;
    lastFittedDistrictRef.current = districtKey;

    if (targetBounds) {
      const fitPadding = {
        top: 30,
        bottom: timelineHeight + 30,
        left: 310,
        right: selectedPoint ? 430 : 340,
      };
      map.fitBounds(targetBounds, { padding: fitPadding, duration: 1500 });
    } else if (targetDistrict?.toLowerCase() === 'odisha' || !targetDistrict) {
      const fitPadding = {
        top: 20,
        bottom: timelineHeight + 20,
        left: 310,
        right: selectedPoint ? 430 : 340,
      };
      map.fitBounds(pmtilesBounds || ODISHA_BOUNDS, {
        padding: fitPadding,
        duration: 1500,
      });
    } else {
      const features =
        accumulatedFeaturesRef.current.get(targetDistrict.toLowerCase()) || [];
      if (features.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        const extend = (coords: any) => {
          if (typeof coords[0] === 'number')
            bounds.extend(coords as [number, number]);
          else coords.forEach(extend);
        };
        features.forEach(
          (f: any) => f.geometry?.coordinates && extend(f.geometry.coordinates),
        );
        if (!bounds.isEmpty()) {
          const fitPadding = {
            top: 20,
            bottom: timelineHeight + 10,
            left: 250,
            right: selectedPoint ? 430 : 250,
          };
          map.fitBounds(bounds, { padding: fitPadding, duration: 1500 });
        }
      } else {
        // If features aren't loaded yet, try again when cacheVersion changes
        lastFittedDistrictRef.current = null; // allow retry
        map.fitBounds(pmtilesBounds || ODISHA_BOUNDS, {
          padding: 40,
          duration: 1500,
        });
        map.setMaxBounds([
          [79.277344, 16.232218],
          [90.0, 24.058806],
        ]);
      }
    }
  }, [targetDistrict, targetBounds, isLoaded, cacheVersion, pmtilesBounds]);

  // Extract LULC attributes for the selected district/state
  useEffect(() => {
    if (!isLoaded || !targetDistrict) return;

    const isOdisha = targetDistrict.toLowerCase() === 'odisha';

    // Helper to find a feature by name in our accumulated cache (more robust matching)
    const normalizeName = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, '');

    const findFeature = (name: string) => {
      const normalizedTarget = normalizeName(name);

      // 1. Try exact match in cache
      for (const [key, features] of accumulatedFeaturesRef.current.entries()) {
        if (normalizeName(key) === normalizedTarget && features.length > 0) {
          return features[0];
        }
      }

      // 2. Try synonyms
      for (const [canonical, synonyms] of Object.entries(DISTRICT_SYNONYMS)) {
        if (
          normalizeName(canonical) === normalizedTarget ||
          synonyms.some((s) => normalizeName(s) === normalizedTarget)
        ) {
          // Search for canonical or any synonym in the cache
          for (const term of [canonical, ...synonyms]) {
            const features = accumulatedFeaturesRef.current.get(
              term.toLowerCase(),
            );
            if (features && features.length > 0) return features[0];
          }
        }
      }
      return null;
    };

    if (isOdisha) {
      // Aggregate all unique features from the cache
      const aggregated: Record<string, number> = {};
      const uniqueFeatureIds = new Set<string>();

      accumulatedFeaturesRef.current.forEach((features) => {
        features.forEach((f) => {
          const rawName =
            f.properties?.district_name ||
            f.properties?.NAME ||
            f.properties?.name ||
            f.properties?.District_N;
          const id = rawName ? normalizeName(rawName) : null;
          if (id && !uniqueFeatureIds.has(id)) {
            uniqueFeatureIds.add(id);
            const props = f.properties;
            if (!props) return;
            Object.keys(props).forEach((key) => {
              if (key.startsWith('lulc_')) {
                aggregated[key] =
                  (aggregated[key] || 0) + (Number(props[key]) || 0);
              }
            });
          }
        });
      });
      setDistrictLulcData(
        Object.keys(aggregated).length > 0 ? aggregated : null,
      );
    } else {
      const feature = findFeature(targetDistrict);
      if (feature && feature.properties) {
        setDistrictLulcData(feature.properties);
      }
    }
  }, [targetDistrict, isLoaded, cacheVersion]);

  // Sync timeline height to adjust sidebar
  useEffect(() => {
    if (timelineCardRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setTimelineHeight(entry.target.clientHeight);
        }
      });
      resizeObserver.observe(timelineCardRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [isLoaded]);

  const chartData = useMemo(() => {
    if (!districtLulcData) return [];
    const data = QUARTERS.map((q, index) => {
      const item: any = {
        name: q.label,
        shortLabel: q.label.charAt(0) + q.year.toString().slice(-2),
        year: q.year,
        q: q.q,
        index: index,
      };
      LULC_LEGEND.forEach((cat) => {
        const attrKey = `lulc_${q.year}_q${q.q}_clipped_${cat.key}`;
        const rawVal = districtLulcData[attrKey];
        item[cat.key] =
          typeof rawVal === 'string' ? parseFloat(rawVal) : rawVal || 0;
      });
      // Calculate consolidated vegetation sum
      item['vegetation'] =
        (item['trees'] || 0) +
        (item['grass'] || 0) +
        (item['flooded_vegetation'] || 0) +
        (item['crops'] || 0) +
        (item['shrub_and_scrub'] || 0);
      return item;
    });

    if (data.length > 0) {
      LULC_LEGEND.forEach((cat) => {
        const trend = createTrend(data, 'index', cat.key);
        data.forEach((item, index) => {
          item[`${cat.key}_trend`] = trend.calcY(index);
          item[`${cat.key}_r2`] = trend.rSquared;
        });
      });

      // Calculate trend for consolidated vegetation
      const vegTrend = createTrend(data, 'index', 'vegetation');
      data.forEach((item, index) => {
        item[`vegetation_trend`] = vegTrend.calcY(index);
        item[`vegetation_r2`] = vegTrend.rSquared;
      });
    }

    return data;
  }, [districtLulcData]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#FFFFFF' },
          },
        ],
      },
      center: ODISHA_CENTER,
      zoom: 6.2,
      minZoom: 2,
      maxZoom: 18,
      attributionControl: false,
    });

    map.on('load', async () => {
      // District Layers
      map.addSource('district-source-quarterly', {
        type: 'vector',
        url: `pmtiles://${PMTILES_URL}`,
      });
      map.addLayer({
        id: 'district-outline-quarterly',
        type: 'line',
        source: 'district-source-quarterly',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#000000',
          'line-width': 1.2,
          'line-opacity': 0.9,
        },
      });
      map.addLayer(
        {
          id: 'district-mask-layer',
          type: 'fill',
          source: 'district-source-quarterly',
          'source-layer': 'zcta',
          paint: {
            'fill-color': '#FFFFFF',
            'fill-opacity': 0,
          },
        },
        'district-outline-quarterly',
      );

      // points GeoJSON
      // const pointsGeoJSON = {
      //   type: 'FeatureCollection' as const,
      //   features: Points_Data.map((item: any) => ({
      //     type: 'Feature' as const,
      //     geometry: {
      //       type: 'Point' as const,
      //       coordinates: [item.cord[1], item.cord[0]],
      //     },
      //     properties: {
      //       id: item.id,
      //     },
      //   })),
      // };

      // map.addSource('points-source', {
      //   type: 'geojson',
      //   data: pointsGeoJSON,
      // });

      // map.addLayer({
      //   id: 'points-layer',
      //   type: 'circle',
      //   source: 'points-source',
      //   paint: {
      //     'circle-radius': 7,
      //     'circle-color': '#F76000',
      //     'circle-stroke-width': 2,
      //     'circle-stroke-color': '#FFFFFF',
      //     'circle-opacity': 1,
      //     'circle-stroke-opacity': 1,
      //   },
      // });

      // map.addLayer({
      //   id: 'points-layer-highlight',
      //   type: 'circle',
      //   source: 'points-source',
      //   paint: {
      //     'circle-radius': 6,
      //     'circle-color': 'transparent',
      //     'circle-stroke-width': 4,
      //     'circle-stroke-color': '#0868ac',
      //     'circle-stroke-opacity': 1,
      //   },
      //   filter: ['==', 'id', -999],
      // });

      // map.on('click', 'points-layer', (e) => {
      //   if (e.features && e.features.length > 0) {
      //     const props = e.features[0].properties;
      //     console.log('props', props);
      //     if (props) {
      //       setSelectedPoint(Number(props.id));
      //       setActiveModalTab('What');
      //     }
      //   }
      // });

      // map.on('mouseenter', 'points-layer', () => {
      //   map.getCanvas().style.cursor = 'pointer';
      // });
      // map.on('mouseleave', 'points-layer', () => {
      //   map.getCanvas().style.cursor = '';
      // });

      map.addLayer({
        id: 'district-hover-layer',
        type: 'fill',
        source: 'district-source-quarterly',
        'source-layer': 'zcta',
        paint: { 'fill-color': '#ffffff', 'fill-opacity': 0 },
      });

      // Subdistrict Layers
      map.addSource('subdistrict-source-quarterly', {
        type: 'vector',
        url: `pmtiles://${SUBDISTRICT_URL}`,
      });
      map.addLayer({
        id: 'subdistrict-outline-quarterly',
        type: 'line',
        source: 'subdistrict-source-quarterly',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#edededff',
          'line-width': 0.8,
          'line-opacity': 0.5,
        },
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
        className: 'map-tooltip',
      });

      // Tooltip handler
      const showTooltip = (e: any, type: 'district' | 'subdistrict') => {
        const feature = e.features?.[0];
        if (!feature) return;

        map.getCanvas().style.cursor = 'pointer';
        const props = feature.properties;

        let content = '';
        if (type === 'district') {
          const name =
            props.district_name ||
            props.NAME ||
            props.name ||
            'Unknown District';
          content = `<div style="padding: 6px 10px; font-weight: 700; font-size: 11px; color: #1a202c; text-transform: uppercase; letter-spacing: 0.05em;">${name}</div>`;
        } else {
          const subName =
            props.subdistrict_name ||
            props.SUBDIST_NAM ||
            'Unknown Subdistrict';
          const distName =
            props.district_name || props.DIST_NAME || 'Unknown District';
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

      map.on('mousemove', 'district-hover-layer', (e) =>
        showTooltip(e, 'district'),
      );
      map.on('mouseleave', 'district-hover-layer', hideTooltip);
      map.on('mousemove', 'subdistrict-hover-layer', (e) =>
        showTooltip(e, 'subdistrict'),
      );
      map.on('mouseleave', 'subdistrict-hover-layer', hideTooltip);

      try {
        const p = new pmtiles.PMTiles(PMTILES_URL);
        const header = await p.getHeader();
        if (header.minLon !== undefined) {
          const b: maplibregl.LngLatBoundsLike = [
            [header.minLon, header.minLat],
            [header.maxLon, header.maxLat],
          ];
          setPmtilesBounds(b);
          map.fitBounds(b, { padding: 40, duration: 0 });
        }
      } catch {
        /* ignore */
      }
      setIsLoaded(true);
      setTimeout(() => switchToQuarter(QUARTERS.length - 1), 50);
    });

    map.on('sourcedata', (e) => {
      if (e.sourceId === 'district-source-quarterly' && e.isSourceLoaded) {
        const features = map.querySourceFeatures('district-source-quarterly', {
          sourceLayer: 'zcta',
        });
        let changed = false;
        features.forEach((f: any) => {
          const rawName =
            f.properties?.district_name ||
            f.properties?.NAME ||
            f.properties?.name;
          if (!rawName) return;
          const key = rawName.toLowerCase();
          if (!accumulatedFeaturesRef.current.has(key))
            accumulatedFeaturesRef.current.set(key, []);

          const existing = accumulatedFeaturesRef.current.get(key)!;
          // Check for duplicates using first bit of coordinates to keep it efficient
          const coords = (f.geometry as any).coordinates
            ?.toString()
            .substring(0, 80);
          if (
            !existing.some(
              (ef: any) =>
                (ef.geometry as any).coordinates
                  ?.toString()
                  .substring(0, 80) === coords,
            )
          ) {
            existing.push(f);
            changed = true;
          }
        });
        if (changed) setCacheVersion((v) => v + 1);
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
        await Promise.all(
          chunk.map((q) => getOrCreateMosaicUrl(q, ODISHA_BBOX)),
        );
      }
    };
    preRegisterAll();

    return () => {
      map.remove();
      mapRef.current = null;
    };
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
    const lulcQ = currentQuarter.q;
    // const baseLulcUrl = `https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc_quarterly/raster/lulc_${lulcYear}_q${lulcQ}.tif`;

    const formatDistrictName = (name: string) =>
      name.replace(/\s+/g, '').trim();

    const formattedDistrict = formatDistrictName(targetDistrict);

    const isOdisha = targetDistrict.toLowerCase() === 'odisha';

    const baseLulcUrl = isOdisha
      ? `https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc_quarterly/raster/lulc_${lulcYear}_q${lulcQ}.tif`
      : `https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc/${formattedDistrict}/${formattedDistrict}_${lulcYear}_q${lulcQ}_lulc.tif`;

    setColorFunction(baseLulcUrl, (pixel: any, color: any, metadata: any) => {
      const val = pixel[0];
      if (val === metadata.noData || val < 0 || val > 7) {
        color.set([0, 0, 0, 0]);
        return;
      }
      const rgba = [...(LULC_RGBA[val] || [0, 0, 0, 0])];
      let isVisible = selectedLulcCategory === 'all';
      if (typeof selectedLulcCategory === 'number') {
        isVisible = val === selectedLulcCategory;
      } else if (selectedLulcCategory === 'vegetation') {
        isVisible = [1, 2, 3, 4, 5].includes(val);
      }
      if (!isVisible) rgba[3] = 0;
      color.set(rgba);
    });

    setLulcStatus('loading');
    try {
      if (m.getLayer(layerId)) m.removeLayer(layerId);
      if (m.getSource(sourceId)) m.removeSource(sourceId);
      m.addSource(sourceId, {
        type: 'raster',
        url: `cog://${baseLulcUrl}`,
        tileSize: 256,
      });
      const beforeLayer = m.getLayer('district-mask-layer')
        ? 'district-mask-layer'
        : m.getLayer('district-outline-quarterly')
          ? 'district-outline-quarterly'
          : undefined;
      m.addLayer(
        {
          id: layerId,
          type: 'raster',
          source: sourceId,
          paint: { 'raster-opacity': 0.85, 'raster-fade-duration': 300 },
        },
        beforeLayer,
      );
      m.on('idle', () => setLulcStatus('ready'));
    } catch {
      setLulcStatus('error');
    }
  }, [isLoaded, showLulc, selectedIdx, selectedLulcCategory, targetDistrict]);

  // Removed load-aware playback logic

  // Effect to handle Point selection flyTo/Highlighting
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (map.getLayer('points-layer-highlight')) {
      map.setFilter('points-layer-highlight', [
        '==',
        'id',
        selectedPoint !== null ? selectedPoint : -999,
      ]);
    }

    if (selectedPoint !== null && selectedPoint !== lastSelectedPoint) {
      if (prePointClickState.current === null) {
        prePointClickState.current = {
          center: map.getCenter(),
          zoom: map.getZoom(),
        };
      }

      const point = Points_Data.find((p) => p.id === selectedPoint);
      if (point && point.cord) {
        map.resize(); // accommodate sidebar space
        map.flyTo({
          center: [point.cord[1], point.cord[0]],
          zoom: 14,
          duration: 1500,
          padding: { right: window.innerWidth * 0.35 } as any, // offset to center in visible area
        });
      }
      setLastSelectedPoint(selectedPoint);
    } else if (selectedPoint === null) {
      setLastSelectedPoint(null);
    }
  }, [selectedPoint, lastSelectedPoint]);

  const handleReset = () =>
    mapRef.current?.fitBounds(pmtilesBounds || ODISHA_BOUNDS, {
      padding: 40,
      duration: 1500,
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Satellite className="w-6 h-6" />
            Land Use Analysis – {targetDistrict}
          </h2>
          <p className="text-[13px] text-gray-500 mt-1 font-medium ">
            Analyze temporal shifts in landscape categories.
          </p>
        </div>
        <div className="hidden items-center gap-3 bg-gray-50/50 p-1.5 px-3 rounded-lg border border-gray-100 relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-1.5 text-[11px] font-black tracking-wide bg-white text-gray-600 border border-gray-400 rounded-md transition-all min-w-[130px] flex items-center justify-between shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#F76000' }}
              />
              {currentQuarter.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-[190]"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-[200] min-w-[180px] max-h-[400px] overflow-y-auto custom-scrollbar">
                {QUARTERS.slice()
                  .reverse()
                  .map((q, idx) => {
                    const originalIdx = QUARTERS.length - 1 - idx;
                    return (
                      <button
                        key={q.key}
                        onClick={() => {
                          setSelectedIdx(originalIdx);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between rounded-lg ${selectedIdx === originalIdx ? 'bg-orange-50 text-[#F76000]' : 'text-gray-600'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#F76000' }}
                          />
                          <span className="text-[11px] font-bold">
                            {q.label}
                          </span>
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
        <div className="w-full h-full relative z-0">
          <div ref={mapContainerRef} className="w-full h-full" />

          {(!isLoaded ||
            tileStatus === 'loading' ||
            lulcStatus === 'loading') && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center z-[100]">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#F76000] border-t-transparent rounded-full animate-spin" />
                  {/* <Satellite className="absolute inset-0 m-auto w-6 h-6 text-[#F76000] animate-pulse" /> */}
                </div>
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">
                  {!isLoaded ? '' : ''}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── LULC CHANGE SUMMARY (Top Right Overlay) ────────────────────── */}
        {!selectedPoint &&
          (() => {
            // Normalize district name to match LULC_STATS keys
            const normalizedDistrict =
              DISTRICT_NAME_VARIANTS[targetDistrict] || targetDistrict;
            const districtStats =
              LULC_STATS[normalizedDistrict] || LULC_STATS['Odisha'];

            if (!districtStats) return null;

            const availableYears = Object.keys(districtStats).sort();
            if (availableYears.length < 2) return null;

            const currentYear = currentQuarter.year.toString();
            const lastYear = availableYears[availableYears.length - 1];

            // Determine the start year: use selected if available, otherwise earliest
            const startYear = districtStats[currentYear]
              ? currentYear
              : availableYears[0];
            const endYear = lastYear;

            const rawStartData = districtStats[startYear];
            const rawEndData = districtStats[endYear];

            if (!rawStartData || !rawEndData) return null;

            // Helper to aggregate vegetation categories
            const aggregateData = (data: Record<string, number>) => {
              const result: Record<string, number> = {};
              let vegetationSum = 0;

              const vegKeys = [
                'trees',
                'flooded vegetation',
                'crops',
                'shrub & scrub',
                'grass',
                'rangeland',
              ];

              Object.keys(data).forEach((key) => {
                const lowerKey = key.toLowerCase();
                if (vegKeys.some((vk) => lowerKey.includes(vk))) {
                  vegetationSum += data[key] || 0;
                } else {
                  result[key] = data[key];
                }
              });

              result['Vegetation'] = vegetationSum;
              return result;
            };

            const startData = aggregateData(rawStartData);
            const endData = aggregateData(rawEndData);

            const getCategoryColor = (label: string) => {
              const lower = label.toLowerCase();
              if (lower === 'vegetation') return '#397D49';
              if (lower.includes('water')) return '#419BDF';
              if (lower.includes('built')) return '#C4281B';
              if (lower.includes('bare')) return '#A59B8F';
              return '#94a3b8';
            };

            const categories = [
              'Water',
              'Vegetation',
              'Built Area',
              'Bare Ground',
            ].filter(
              (cat) => (startData[cat] || 0) > 0 || (endData[cat] || 0) > 0,
            );

            return (
              <div className="absolute top-8 right-8 z-[110] bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-2xl p-5 w-64 max-h-[70%] overflow-y-auto custom-scrollbar">
                <div className="mb-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none border-b border-gray-100 pb-2">
                    Landscape Transformation
                  </h4>
                  <p className="text-[12px] text-gray-900 font-bold mt-3 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F76000]" />
                    {startYear === endYear
                      ? `Total Change (${availableYears[0]} - ${endYear})`
                      : `${startYear} → ${endYear}`}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium mt-0.5">
                    {startYear === endYear
                      ? 'Overall net area shift'
                      : `Change since ${startYear}`}
                  </p>
                </div>

                <div className="space-y-4">
                  {categories.map((cat) => {
                    const sYear =
                      startYear === endYear ? availableYears[0] : startYear;
                    const from = districtStats[sYear]?.[cat] || 0;
                    const to = endData[cat] || 0;
                    const diff = to - from;
                    const pct = from > 0 ? (diff / from) * 100 : 0;
                    const isGain = diff >= 0;
                    const color = getCategoryColor(cat);

                    return (
                      <div key={cat} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-sm shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-[10px] font-bold text-gray-700 truncate max-w-[110px]">
                              {cat}
                            </span>
                          </div>
                          <div
                            className={`text-[11px] font-black ${isGain ? 'text-emerald-600' : 'text-rose-500'}`}
                          >
                            {isGain ? '+' : ''}
                            {diff.toFixed(1)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(Math.abs(pct), 100)}%`,
                              }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              key={`${startYear}-${endYear}-${cat}`} // Force re-animate on change
                              className={`h-full rounded-full ${isGain ? 'bg-emerald-400' : 'bg-rose-400'}`}
                            />
                          </div>
                          <span
                            className={`text-[9px] font-black min-w-[32px] text-right ${isGain ? 'text-emerald-600' : 'text-rose-500'}`}
                          >
                            {isGain ? '+' : ''}
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[8px] font-black text-gray-400 uppercase">
                        Gain
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-[8px] font-black text-gray-400 uppercase">
                        Loss
                      </span>
                    </div>
                  </div>
                  <div className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">
                    LULC Trends
                  </div>
                </div>
              </div>
            );
          })()}

        <div
          className={`absolute top-8 left-8 w-75 h-fit transition-all duration-300 text-gray-900 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-6 shadow-2xl z-[60] flex flex-col gap-6 overflow-y-auto custom-scrollbar`}
          style={{ maxHeight: `calc(100% - ${timelineHeight + 100}px)` }}
        >
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
              Sentinel-2 TCI (RGB)
            </p>
          </div>

          <div className="flex-1 transition-all">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2 flex justify-between items-center">
              Land Categories
              {/* <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${showLulc ? 'bg-orange-100 text-[#F76000]' : 'bg-gray-100 text-gray-400'}`}>
                                    Year: {currentQuarter.year}
                                </span> */}
            </p>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() =>
                  setSelectedLulcCategory((prev) =>
                    prev === 'all' ? null : 'all',
                  )
                }
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selectedLulcCategory === 'all' ? 'bg-orange-50 border-[#F76000] shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${selectedLulcCategory === 'all' ? 'border-[#F76000]' : 'border-gray-200'}`}
                  >
                    {selectedLulcCategory === 'all' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F76000]" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase ${selectedLulcCategory === 'all' ? 'text-[#F76000]' : 'text-gray-600'}`}
                  >
                    All Classes
                  </span>
                </div>
              </button>
              {UI_LULC_LEGEND.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setSelectedLulcCategory((prev) =>
                      prev === item.value ? null : item.value,
                    )
                  }
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${selectedLulcCategory === item.value ? 'bg-orange-50 border-[#F76000] shadow-sm' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${selectedLulcCategory === item.value ? 'border-[#F76000]' : 'border-gray-200'}`}
                    >
                      {selectedLulcCategory === item.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F76000]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm ring-1 ring-gray-100"
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className={`text-[10px] font-bold capitalize ${selectedLulcCategory === item.value ? 'text-[#F76000]' : 'text-gray-600'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-8 z-50 flex items-center gap-4 transition-all duration-500 ease-in-out ${
            selectedPoint
              ? 'right-[calc(100%+32px)] md:right-[calc(45%+32px)] lg:right-[calc(35%+32px)]'
              : 'right-8'
          }`}
        >
          {/* Timeline Slider */}
          <div
            ref={timelineCardRef}
            className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-5 px-6 shadow-2xl flex items-center gap-6"
          >
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setSelectedIdx((prev) => Math.max(0, prev - 1))}
                disabled={selectedIdx === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F76000] text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-black"
                title="Previous Quarter"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setSelectedIdx((prev) =>
                    Math.min(QUARTERS.length - 1, prev + 1),
                  )
                }
                disabled={selectedIdx === QUARTERS.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F76000] text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all font-black"
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
                  <span className="text-[#F76000] text-lg font-mono font-bold leading-none">
                    {currentQuarter.label.split(' ')[0]}
                  </span>
                  <span className="text-gray-700 text-sm font-mono font-bold">
                    {currentQuarter.year}
                  </span>
                </div>
              </div>
              {/* LULC Chart - Only visible when chart is on */}
              {showChart && chartData.length > 0 && (
                <div className="h-24 w-full mt-2 mb-8 transition-all animate-in fade-in slide-in-from-bottom-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
                    >
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip
                        position={{ y: -50 }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-2.5 rounded-lg shadow-xl text-[10px]">
                                <p className="font-black text-gray-900 mb-1 border-b pb-1">
                                  {label}
                                </p>
                                {payload
                                  .filter(
                                    (p: any) => !p.dataKey.endsWith('_trend'),
                                  )
                                  .map((p: any) => (
                                    <div
                                      key={p.dataKey}
                                      className="flex items-center justify-between gap-4 py-0.5"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <div
                                          className="w-1.5 h-1.5 rounded-full"
                                          style={{ backgroundColor: p.color }}
                                        />
                                        <span className="font-bold text-gray-600 capitalize">
                                          {p.name.replace('_', ' ')}
                                        </span>
                                      </div>
                                      <span className="font-mono font-black text-[#F76000]">
                                        {Number(p.value).toFixed(1)}{' '}
                                        <span className="text-[8px] opacity-60">
                                          sqkm
                                        </span>
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {selectedLulcCategory === 'all' ? (
                        LULC_LEGEND.map((cat) => (
                          <React.Fragment key={cat.key}>
                            <Line
                              type="monotone"
                              dataKey={cat.key}
                              stroke={cat.color}
                              strokeWidth={2}
                              dot={false}
                              isAnimationActive={false}
                            />
                            <Line
                              type="monotone"
                              dataKey={`${cat.key}_trend`}
                              stroke={cat.color}
                              strokeWidth={1.5}
                              strokeDasharray="4 4"
                              dot={false}
                              isAnimationActive={false}
                            />
                          </React.Fragment>
                        ))
                      ) : selectedLulcCategory === 'vegetation' ? (
                        <>
                          <Line
                            type="monotone"
                            dataKey="vegetation"
                            stroke="#397D49"
                            strokeWidth={3}
                            dot={(props: any) => {
                              const { cx, cy, index } = props;
                              if (index === selectedIdx) {
                                return (
                                  <Dot
                                    key={`dot-${index}`}
                                    cx={cx}
                                    cy={cy}
                                    r={4}
                                    fill="#397D49"
                                    stroke="#FFFFFF"
                                    strokeWidth={2}
                                  />
                                );
                              }
                              return null;
                            }}
                            isAnimationActive={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="vegetation_trend"
                            stroke="#397D49"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            isAnimationActive={false}
                          />
                        </>
                      ) : (
                        <>
                          <Line
                            type="monotone"
                            dataKey={
                              LULC_LEGEND.find(
                                (c) => c.value === selectedLulcCategory,
                              )?.key || ''
                            }
                            stroke={
                              LULC_LEGEND.find(
                                (c) => c.value === selectedLulcCategory,
                              )?.color || '#F76000'
                            }
                            strokeWidth={3}
                            dot={(props: any) => {
                              const { cx, cy, index } = props;
                              if (index === selectedIdx) {
                                return (
                                  <Dot
                                    key={`dot-${index}`}
                                    cx={cx}
                                    cy={cy}
                                    r={4}
                                    fill="#F76000"
                                    stroke="#FFFFFF"
                                    strokeWidth={2}
                                  />
                                );
                              }
                              return null;
                            }}
                            isAnimationActive={false}
                          />
                          <Line
                            type="monotone"
                            dataKey={`${
                              LULC_LEGEND.find(
                                (c) => c.value === selectedLulcCategory,
                              )?.key || ''
                            }_trend`}
                            stroke={
                              LULC_LEGEND.find(
                                (c) => c.value === selectedLulcCategory,
                              )?.color || '#F76000'
                            }
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            isAnimationActive={false}
                          />
                        </>
                      )}
                      {/* Active Marker */}
                      <ReferenceLine
                        x={currentQuarter.label}
                        stroke="#F76000"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="relative group/track py-1">
                {/* Background Track with Tick Scale */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-visible">
                  <div
                    className="absolute h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(selectedIdx / (QUARTERS.length - 1)) * 100}%`,
                      backgroundColor: '#F76000',
                    }}
                  />

                  {/* Tick Marks & Labels Container */}
                  <div className="absolute inset-0 flex justify-between items-center px-0.5 pointer-events-none">
                    {QUARTERS.map((q, idx) => (
                      <div
                        key={q.key}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          className={`w-[2px] h-3 rounded-full mb-1 transition-all ${idx === selectedIdx ? 'bg-[#F76000] h-4' : 'bg-gray-300'}`}
                        />

                        {/* Year Indicator Above (Only on Q1) */}
                        {q.q === 1 && (
                          <div className="absolute -top-6 whitespace-nowrap">
                            <span className="text-[10px] font-black text-gray-800 tracking-tighter opacity-70">
                              {q.year}
                            </span>
                          </div>
                        )}

                        {/* Month Initials Below */}
                        <div className="absolute -bottom-5">
                          <span
                            className={`text-[8px] font-bold transition-all ${idx === selectedIdx ? 'text-[#F76000] scale-110' : 'text-gray-400 opacity-60'}`}
                          >
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
                  onChange={(e) => {
                    setSelectedIdx(parseInt(e.target.value));
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <div className="h-2" /> {/* spacing for bottom labels */}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => setShowChart(!showChart)}
                disabled={!showLulc}
                className={`transition-all p-2 rounded-lg ${showChart ? 'bg-orange-100 text-[#F76000]' : showLulc ? 'text-gray-400 hover:text-[#F76000]' : 'text-gray-200 cursor-not-allowed'}`}
                title={
                  !showLulc
                    ? 'Select a category first'
                    : showChart
                      ? 'Hide Chart'
                      : 'Show Chart'
                }
              >
                {showChart ? (
                  <X className="w-5 h-5" />
                ) : (
                  <LucideLineChart className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Zoom Controls - Aligned with the timeline bar bottom */}
          <div className="flex flex-col gap-2 shrink-0 self-end pb-1">
            <button
              onClick={handleReset}
              className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F76000] hover:border-[#F76000] transition-all active:scale-90"
              title="Reset View"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F76000] hover:border-[#F76000] transition-all active:scale-90"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F76000] hover:border-[#F76000] transition-all active:scale-90"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Point Analysis Sidebar */}
        {selectedPoint && (
          <div className="absolute top-0 right-0 h-full w-full md:w-[45%] lg:w-[35%] bg-white border-l border-gray-200 shadow-2xl z-[150] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header Tabs & Close */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center flex-1 mr-4">
                {(['What', 'How', 'Why'] as const).map((tab, index) => (
                  <div
                    key={tab}
                    className="flex-1 flex items-center justify-center relative"
                  >
                    <button
                      onClick={() => setActiveModalTab(tab)}
                      className="flex items-center cursor-pointer justify-center space-x-3 py-2 w-full transition-all group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all duration-300 ${
                          activeModalTab === tab
                            ? 'bg-[#F76000] border-[#F76000] text-white'
                            : 'bg-gray-100 border-gray-200 text-gray-700 group-hover:border-gray-400 group-hover:text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                          activeModalTab === tab
                            ? 'text-black'
                            : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      >
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
                      padding: { right: 0 } as any,
                    });
                  }
                  prePointClickState.current = null;
                }}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:bg-orange-100 hover:text-[#F76000] text-gray-400 rounded-full transition-colors group shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="flex flex-col flex-1 overflow-y-auto p-5 custom-scrollbar">
              {(() => {
                const currentContent = (TAB_CONTENT as any)[
                  activeModalTab
                ]?.find((c: any) => c.id === selectedPoint);
                if (!currentContent)
                  return (
                    <p className="text-gray-400 p-4">
                      No data available for this point.
                    </p>
                  );

                return (
                  <div className="flex flex-col w-full text-gray-800">
                    <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight leading-tight uppercase font-mono">
                      {currentContent.title}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2 font-mono">
                      <Calendar
                        className="w-3.5 h-3.5 text-[#F76000]"
                        strokeWidth={2.5}
                      />
                      <span>{currentContent.place}</span>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-4" />

                    {currentContent.content ? (
                      currentContent.content.map((block: any, idx: number) => {
                        if (block.type === 'heading') {
                          return (
                            <h4
                              key={idx}
                              className="text-sm font-black text-gray-900 mb-3 mt-2 border-l-4 border-[#F76000] pl-2"
                            >
                              {block.value}
                            </h4>
                          );
                        } else if (block.type === 'text') {
                          return (
                            <div
                              key={idx}
                              className="text-[13px] leading-relaxed text-gray-600 mb-6 bg-gray-50/30 p-3 rounded-lg"
                            >
                              {block.value}
                            </div>
                          );
                        } else if (block.type === 'image') {
                          return (
                            <div key={idx} className="mb-6">
                              <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                <img
                                  src={block.url}
                                  alt=""
                                  className="w-full h-auto"
                                />
                              </div>
                              {block.desc && (
                                <p className="text-[10px] text-gray-500 italic mt-2">
                                  {block.desc}
                                </p>
                              )}
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
