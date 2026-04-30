/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import { PMTiles, Protocol as PMTilesProtocol } from 'pmtiles';
import { cogProtocol, locationValues } from '@geomatico/maplibre-cog-protocol';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  COMPARATIVE_DATA,
  NEW_DISTRICT_ROAD_DATA,
} from '../../data/comparativeData';
import {
  DISTRICT_NAME_VARIANTS,
  DISTRICT_DEMOGRAPHICS,
  ALLOWED_DISTRICTS,
  LULC_STATS,
} from '../../data/comparativeData';
import { Layers } from 'lucide-react';
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Label,
// } from 'recharts';

const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/population_data/od_district_pop_total_2036_corrected.pmtiles';
const SUBDISTRICT_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_subdistrict.pmtiles';

const ODISHA_BOUNDS: maplibregl.LngLatBoundsLike = [
  [81.3883675665129118, 17.8124511673802353],
  [87.4770036487483651, 22.5674384683253209],
];

const basemapOptions: { id: 'grey' | 'satellite' | 'osm'; label: string }[] = [
  { id: 'grey', label: 'Grey Canvas' },
  { id: 'satellite', label: 'Satellite' },
  { id: 'osm', label: 'OSM' },
];



const buildCategoricalParams = (targetValue: number, activeColor: string, defaultColor = '#f0f0f0') => {
  const colors = Array(12).fill(defaultColor);
  if (targetValue >= 0 && targetValue <= 11) {
    colors[targetValue] = activeColor;
  }
  return `#color:[${colors.map(c => `"${c}"`).join(',')}],0,11,c`;
};

// Available quarters by year
export const LULC_QUARTERS = [
  '2018 q1', '2018 q2', '2018 q3', '2018 q4',
  '2019 q1', '2019 q2', '2019 q3', '2019 q4',
  '2020 q1', '2020 q2', '2020 q3', '2020 q4',
  '2021 q1', '2021 q2', '2021 q3', '2021 q4',
  '2022 q1', '2022 q2', '2022 q3', '2022 q4',
  '2023 q1', '2023 q2', '2023 q3', '2023 q4',
  '2024 q1', '2024 q2', '2024 q3', '2024 q4',
  '2025 q1', '2025 q2', '2025 q3', '2025 q4',
  '2026 q1',
];

export const getDistrictConfig = (district: string) => {
  const d = district === 'Odisha' ? 'Anugul' : district;
  const formattedDistrict = d.replace(/\s+/g, '').trim();
  const baseUrl = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/lulc';

  const buildQuarterlyUrls = () => {
    const urls: Record<string, string> = {};
    LULC_QUARTERS.forEach((qLabel) => {
      const [year, q] = qLabel.split(' ');
      urls[qLabel] = `${baseUrl}/${formattedDistrict}/${formattedDistrict}_${year}_${q}_lulc.tif`;
    });
    return urls;
  };

  const lulcUrls = buildQuarterlyUrls();

  return {
    nightlight: {
      urls: {
        '2012':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/NTL_2012.tif',
        '2024':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/NTL_2024.tif',
      },
      params:
        '#color:["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da"],0,20,c',
    },
    urbansprawl: {
      urls: {
        '2011':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2010.pmtiles',
        '2024':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2025.pmtiles',
      },
      params:
        '#color:["#0868ac","#0868ac","#0868ac","#0868ac","#0868ac"],0,3000,c',
    },
    roads: {
      urls: {
        '2015':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_road_2015.pmtiles',
        '2025':
          'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_road_2025.pmtiles',
      },
      params:
        '#color:["#0868ac","#0868ac","#0868ac","#0868ac","#0868ac"],0,3000,c',
    },
    lulc: {
      urls: lulcUrls,
      params: '',
    },
    barren: {
      urls: lulcUrls,
      params: '#color:["#0868ac","#0868ac"],7,7',
    },
    builtup: {
      urls: lulcUrls,
      params: buildCategoricalParams(6, '#0868ac'),
      targetPixel: 6,
      type: 'dynamic_lulc',
    },
    cropland: {
      urls: lulcUrls,
      params: buildCategoricalParams(4, '#1A5BAB'),
      targetPixel: 4,
      type: 'dynamic_lulc',
    },
    forest: {
      urls: lulcUrls,
      params: buildCategoricalParams(1, '#1A5BAB'),
      targetPixel: 1,
      type: 'dynamic_lulc',
    },
    scrub: {
      urls: lulcUrls,
      params: '#color:["#0868ac","#0868ac"],5,5',
    },
    water: {
      urls: lulcUrls,
      params: '#color:["#0868ac","#0868ac"],0,0',
    },
    wetlands: {
      urls: lulcUrls,
      params: '#color:["#0868ac","#0868ac"],3,3',
    },
  };
};

export const DATA_CONFIG = getDistrictConfig('Anugul');

// Helper to add protocol only once
let protocolsAdded = false;

const LULC_2018_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_lulc_20180101.tif';
const LULC_2024_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_lulc_20240101.tif';

const getLulcName = (val: number) => {
  const lulcMap: Record<number, string> = {
    1: 'Forest',
    4: 'Cropland',
    6: 'Builtup',
  };
  return lulcMap[val] ? `${lulcMap[val]}` : String(val);
};

const getDisplayData = (
  layerKey: string,
  val: string | number,
  side: 'left' | 'right' = 'left',
) => {
  const lulcColors: Record<string, string> = {
    barren: '#91908e',
    builtup: '#ED022A',
    cropland: '#FFDB5C',
    forest: '#358221',
    scrub: '#666666',
    water: '#1A5BAB',
    wetlands: '#87D19E',
    urbansprawl: side === 'right' ? '#ED022A' : '#0868ac',
    nightlight: side === 'right' ? '#ED022A' : '#0868ac',
    roads: side === 'right' ? '#ED022A' : '#0868ac',
  };

  return {
    label: String(val) + '%',
    percent: Number(val) || 0,
    color: lulcColors[layerKey] || (side === 'right' ? '#ED022A' : '#0868ac'),
  };
};

// ─── Helper: get road length from NEW_DISTRICT_ROAD_DATA ──────────────────────
// district: e.g. "Anugul", year: e.g. "2015"
// Key format inside each district object: "Anugul_road_2015"
const getRoadLength = (district: string, year: string): number | null => {
  if (!district || district === 'Odisha') {
    // State-level: sum all districts for that year
    let total = 0;
    let found = false;
    for (const [distName, distData] of Object.entries(NEW_DISTRICT_ROAD_DATA)) {
      const key = `${distName}_road_${year}` as keyof typeof distData;
      const val = distData[key];
      if (val !== undefined && val !== null) {
        total += val as number;
        found = true;
      }
    }
    return found ? total : null;
  }

  const distData = (NEW_DISTRICT_ROAD_DATA as any)[district];
  if (!distData) return null;
  const key = `${district}_road_${year}`;
  const val = distData[key];
  return val !== undefined && val !== null ? (val as number) : null;
};

interface MapCompareProps {
  targetBounds?: maplibregl.LngLatBoundsLike;
  targetDistrict?: string;
  onDistrictSelect?: (district: string) => void;
  activeLayer?: string;
  activeLulcPixel?: number | null;
  year1?: string;
  year2?: string;
  resetTrigger?: number;
  viewMode?: 'map' | 'compare' | 'change_analysis';
  onMapClick?: (lngLat: maplibregl.LngLat) => void;
}

export default function MapCompare({
  targetBounds,
  targetDistrict,
  onDistrictSelect,
  activeLayer = 'lulc',
  activeLulcPixel,
  year1,
  year2,
  resetTrigger,
  viewMode = 'map',
  onMapClick,
}: MapCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftMapRef = useRef<HTMLDivElement>(null);
  const rightMapRef = useRef<HTMLDivElement>(null);

  const odishaCenter: [number, number] = [85.0985, 20.9517];
  const initialZoom = 6;
  const initialBoundsRef = useRef<maplibregl.LngLatBoundsLike | null>(
    ODISHA_BOUNDS,
  );

  const leftMapObj = useRef<maplibregl.Map | null>(null);
  const rightMapObj = useRef<maplibregl.Map | null>(null);
  const leftMarkerRef = useRef<maplibregl.Marker | null>(null);
  const rightMarkerRef = useRef<maplibregl.Marker | null>(null);

  const [basemap, setBasemap] = useState<'grey' | 'satellite' | 'osm'>('grey');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Odisha');
  const [selectedLngLat, setSelectedLngLat] =
    useState<maplibregl.LngLat | null>(null);
  const [lulc2018Val, setLulc2018Val] = useState<number | null>(null);
  const [lulc2024Val, setLulc2024Val] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const layerInfoRef = useRef({
    currentLayerKey: '',
    y1: '',
    y2: '',
    rawUrl1: '',
    rawUrl2: '',
  });
  const viewModeRef = useRef(viewMode);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    setSelectedLngLat(null);
  }, [activeLayer, activeLulcPixel, viewMode]);

  useEffect(() => {
    if (selectedLngLat && viewMode !== 'change_analysis') {
      if (leftMapObj.current && !leftMarkerRef.current) {
        leftMarkerRef.current = new maplibregl.Marker({ color: '#ff0000ff' })
          .setLngLat(selectedLngLat)
          .addTo(leftMapObj.current);
      } else if (leftMarkerRef.current) {
        leftMarkerRef.current.setLngLat(selectedLngLat);
      }

      if (rightMapObj.current && !rightMarkerRef.current) {
        rightMarkerRef.current = new maplibregl.Marker({ color: '#ff0000ff' })
          .setLngLat(selectedLngLat)
          .addTo(rightMapObj.current);
      } else if (rightMarkerRef.current) {
        rightMarkerRef.current.setLngLat(selectedLngLat);
      }
    } else {
      if (leftMarkerRef.current) {
        leftMarkerRef.current.remove();
        leftMarkerRef.current = null;
      }
      if (rightMarkerRef.current) {
        rightMarkerRef.current.remove();
        rightMarkerRef.current = null;
      }
    }
  }, [selectedLngLat, viewMode]);

  useEffect(() => {
    if (targetDistrict) {
      setSelectedDistrict(targetDistrict);
      setSelectedLngLat(null);
    }
  }, [targetDistrict]);

  let resolvedLayerKey = activeLayer || 'water';

  if (
    resolvedLayerKey === 'nightlight_medium' ||
    resolvedLayerKey === 'nightlight_low'
  ) {
    resolvedLayerKey = 'nightlight';
  }

  if (
    resolvedLayerKey === 'lulc' &&
    activeLulcPixel !== null &&
    activeLulcPixel !== undefined
  ) {
    const lulcMap: Record<number, string> = {
      1: 'forest',
      4: 'cropland',
      6: 'builtup',
    };
    resolvedLayerKey = lulcMap[activeLulcPixel] || 'water';
  }

  const currentDistrict = targetDistrict || selectedDistrict || 'Anugul';
  const dynamicConfig = getDistrictConfig(currentDistrict);

  const currentLayerKey = dynamicConfig[resolvedLayerKey as keyof typeof dynamicConfig]
    ? resolvedLayerKey
    : 'water';

  const config: any = dynamicConfig[currentLayerKey as keyof typeof dynamicConfig];

  const availableYears = Object.keys(config.urls).sort();

  let y1 = year1;
  if (!y1 || !config.urls[y1]) y1 = availableYears[0];

  let y2 = year2;
  if (!y2 || !config.urls[y2]) y2 = availableYears[availableYears.length - 1];

  const getLayerUrl = (year: string, side: 'left' | 'right' = 'left') => {
    const baseUrl = config?.urls[year];
    if (!baseUrl) return '';

    if (currentLayerKey === 'urbansprawl' || currentLayerKey === 'roads') {
      return `pmtiles://${baseUrl}`;
    }

    if (config.type === 'sentinel') {
      return baseUrl;
    }

    let params = config.params || '';
    if (side === 'right') {
      if (currentLayerKey === 'nightlight') {
        params =
          '#color:["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],0,20,c';
      } else if (config.type === 'dynamic_lulc') {
        params = buildCategoricalParams(config.targetPixel, '#ED022A');
      } else {
        params = params.replace(
          /#color:\["[^\]]+"\]/,
          '#color:["#ED022A","#ED022A"]',
        );
      }
    }

    return `cog://${baseUrl}${params}`;
  };

  const leftUrl = getLayerUrl(y1, 'left');
  const rightUrl = getLayerUrl(y2, 'right');

  const urlsRef = useRef({ left: leftUrl, right: rightUrl });
  useEffect(() => {
    urlsRef.current = { left: leftUrl, right: rightUrl };
    layerInfoRef.current = {
      currentLayerKey,
      y1,
      y2,
      rawUrl1: config?.urls[y1] || '',
      rawUrl2: config?.urls[y2] || '',
    };
  }, [leftUrl, rightUrl, currentLayerKey, y1, y2, config]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (viewMode === 'compare') {
          setDividerX(width / 2);
        } else if (viewMode === 'map' || viewMode === 'change_analysis') {
          setDividerX(0);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [viewMode]);

  const [dividerX, setDividerX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!protocolsAdded) {
      try {
        if (!maplibregl.addProtocol.toString().includes('cog')) {
          maplibregl.addProtocol('cog', cogProtocol);
        }
        const pmtilesProtocol = new PMTilesProtocol();
        maplibregl.addProtocol('pmtiles', pmtilesProtocol.tile);
      } catch (e) {
        console.log('e', e);
      }
      protocolsAdded = true;
    }
  }, []);

  const handleMapClick = async (
    e: maplibregl.MapMouseEvent & { lngLat: maplibregl.LngLat },
    mapInstance: maplibregl.Map,
  ) => {
    const { lngLat } = e;
    const side = mapInstance === leftMapObj.current ? 'left' : 'right';

    let districtName = 'Odisha';
    const vectorFeatures = mapInstance.queryRenderedFeatures(e.point, {
      layers: ['vector-fill-' + side],
    });

    if (vectorFeatures.length > 0 && vectorFeatures[0].properties) {
      const feature = vectorFeatures[0];
      const props = feature.properties;
      const rawName =
        props.district_name ||
        props.DIST_NAME ||
        props.District ||
        props.NAME ||
        props.name ||
        props.district ||
        'Odisha';
      districtName = DISTRICT_NAME_VARIANTS[rawName] || rawName;

      if (
        districtName !== 'Odisha' &&
        !ALLOWED_DISTRICTS.includes(districtName)
      )
        return;

      if (!(COMPARATIVE_DATA as any)[districtName]) {
        districtName = 'Odisha';
      }
    }

    setSelectedDistrict(districtName);
    setSelectedLngLat(lngLat);
    onDistrictSelect?.(districtName);
    onMapClick?.(lngLat);

    setLulc2018Val(null);
    setLulc2024Val(null);
    setIsLoading(true);
    const zoom = Math.round(mapInstance.getZoom());

    try {
      locationValues(
        LULC_2018_URL,
        { latitude: lngLat.lat, longitude: lngLat.lng },
        zoom,
      )
        .then((vals) => {
          if (vals && vals.length > 0 && !isNaN(vals[0]))
            setLulc2018Val(vals[0]);
        })
        .catch((e) => console.error('Error fetching 2018 LULC', e));
    } catch (e) {
      console.error(e);
    }

    try {
      locationValues(
        LULC_2024_URL,
        { latitude: lngLat.lat, longitude: lngLat.lng },
        zoom,
      )
        .then((vals) => {
          if (vals && vals.length > 0 && !isNaN(vals[0]))
            setLulc2024Val(vals[0]);
        })
        .catch((e) => console.error('Error fetching 2024 LULC', e));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetView = () => {
    if (initialBoundsRef.current) {
      const options: any = { padding: 20, duration: 1200 };
      leftMapObj.current?.fitBounds(initialBoundsRef.current, options);
    } else {
      leftMapObj.current?.flyTo({ center: odishaCenter, zoom: initialZoom });
    }
  };

  const setupSubdistrictLayer = async (
    map: maplibregl.Map,
    side: 'left' | 'right',
  ) => {
    const sourceId = `subdistrict-source-${side}`;
    const layerId = `subdistrict-outline-${side}`;
    const fillId = `subdistrict-fill-${side}`;

    if (map.getSource(sourceId)) return;

    map.addSource(sourceId, {
      type: 'vector',
      url: `pmtiles://${SUBDISTRICT_URL}`,
    });

    try {
      if (!map.getSource(sourceId)) return;

      map.addLayer({
        id: fillId,
        type: 'fill',
        source: sourceId,
        'source-layer': 'zcta',
        paint: { 'fill-color': 'transparent', 'fill-opacity': 0 },
      });

      map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        'source-layer': 'zcta',
        paint: {
          'line-color': '#F96000',
          'line-width': 0.8,
          'line-opacity': 0.8,
        },
      });

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'subdistrict-popup',
      });

      map.on('mousemove', fillId, (e) => {
        if (e.features && e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
          const feature = e.features[0];
          const sdtname = feature.properties.sdtname || 'N/A';
          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="padding: 4px 8px; font-weight: bold; font-size: 11px; color: #333;">${sdtname}</div>`,
            )
            .addTo(map);
        }
      });

      map.on('mouseleave', fillId, () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    } catch (e) {
      console.error('Error setting up subdistrict layer', e);
    }
  };

  const updateMainLayer = async (
    map: maplibregl.Map,
    side: 'left' | 'right',
    url: string,
    type: 'raster' | 'vector',
    activeLayerKey: string,
  ) => {
    const sourceId = `main-source-${side}`;
    const layerId = `main-layer-${side}`;

    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    if (activeLayerKey === 'sentinel2') {
      map.addSource(sourceId, {
        type: 'raster',
        tiles: [url],
        tileSize: 256,
        attribution: 'Sentinel-2 cloudless by EOX (CC BY-NC-SA 4.0)',
      });
      map.addLayer(
        {
          id: layerId,
          type: 'raster',
          source: sourceId,
          paint: { 'raster-opacity': 1, 'raster-fade-duration': 300 },
          minzoom: 0,
          maxzoom: 22,
        },
        map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined,
      );
      setIsLoading(true);
    } else if (type === 'raster') {
      map.addSource(sourceId, {
        type: 'raster',
        url: url,
        tileSize: 128,
      });
      map.addLayer(
        {
          id: layerId,
          type: 'raster',
          source: sourceId,
          paint: { 'raster-opacity': 1 },
          minzoom: 0,
          maxzoom: 22,
        },
        map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined,
      );
      setIsLoading(true);
    } else {
      map.addSource(sourceId, {
        type: 'vector',
        url: url,
      });
      setIsLoading(true);

      const httpUrl = url.replace('pmtiles://', '');
      try {
        const p = new PMTiles(httpUrl);
        const metadata = (await p.getMetadata()) as any;

        let sourceLayerName = 'layer';
        if (
          metadata &&
          metadata.vector_layers &&
          metadata.vector_layers.length > 0
        ) {
          sourceLayerName = metadata.vector_layers[0].id;
        }

        if (map.getSource(sourceId)) {
          if (activeLayerKey === 'roads') {
            map.addLayer(
              {
                id: layerId,
                type: 'line',
                source: sourceId,
                'source-layer': 'zcta',
                paint: {
                  'line-color': side === 'right' ? '#ED022A' : '#0868ac',
                  'line-width': 1,
                },
                minzoom: 0,
                maxzoom: 22,
              },
              map.getLayer('vector-fill-' + side)
                ? 'vector-fill-' + side
                : undefined,
            );
          } else {
            map.addLayer(
              {
                id: layerId,
                type: 'fill',
                source: sourceId,
                'source-layer': sourceLayerName,
                paint: {
                  'fill-color': side === 'right' ? '#ED022A' : '#0868ac',
                  'fill-opacity': 0.6,
                  'fill-outline-color': '#ffffff',
                },
                minzoom: 0,
                maxzoom: 22,
              },
              map.getLayer('vector-fill-' + side)
                ? 'vector-fill-' + side
                : undefined,
            );
          }
        }
      } catch (e) {
        console.error('Failed to load vector metadata', e);
      }
    }
  };

  const [mapsLoadedCount, setMapsLoadedCount] = useState(0);
  const [allDistrictsData, setAllDistrictsData] = useState<any[]>([]);

  useEffect(() => {
    if (leftMapObj.current) leftMapObj.current.remove();
    if (rightMapObj.current) rightMapObj.current.remove();

    const satelliteStyle = {
      version: 8,
      sources: {
        'esri-grey': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution: '© Esri',
        },
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution: '© Esri, Maxar, Earthstar Geographics',
        },
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: { 'background-color': '#000000' },
        },
        {
          id: 'esri-grey-layer',
          type: 'raster',
          source: 'esri-grey',
          minzoom: 0,
          maxzoom: 22,
          layout: { visibility: basemap === 'grey' ? 'visible' : 'none' },
        },
        {
          id: 'esri-satellite-layer',
          type: 'raster',
          source: 'esri-satellite',
          minzoom: 0,
          maxzoom: 22,
          layout: { visibility: basemap === 'satellite' ? 'visible' : 'none' },
        },
        {
          id: 'osm-layer',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 22,
          layout: { visibility: basemap === 'osm' ? 'visible' : 'none' },
        },
      ],
    } as maplibregl.StyleSpecification;

    const fetchMetadata = async () => {
      try {
        const p = new PMTiles(PMTILES_URL);
        const header = await p.getHeader();
        if (header.minLon !== undefined) {
          const bounds: maplibregl.LngLatBoundsLike = [
            [header.minLon, header.minLat],
            [header.maxLon, header.maxLat],
          ];
          initialBoundsRef.current = bounds;
          if (leftMapObj.current)
            leftMapObj.current.fitBounds(initialBoundsRef.current, {
              duration: 0,
              padding: 40,
            });
          if (rightMapObj.current)
            rightMapObj.current.fitBounds(initialBoundsRef.current, {
              duration: 0,
              padding: 40,
            });
        }
      } catch (e) {
        console.error('Failed to fetch PMTiles header', e);
      }
    };
    fetchMetadata();

    if (leftMapRef.current) {
      leftMapObj.current = new maplibregl.Map({
        container: leftMapRef.current,
        style: satelliteStyle,
        center: odishaCenter,
        zoom: 7.5,
        attributionControl: false,
      });

      leftMapObj.current.on('load', () => {
        leftMapObj.current?.resize();

        if (targetBounds) {
          leftMapObj.current?.fitBounds(targetBounds, {
            duration: 0,
            padding: 40,
          });
        } else if (initialBoundsRef.current) {
          leftMapObj.current?.fitBounds(initialBoundsRef.current, {
            duration: 0,
            padding: 40,
          });
        }

        updateMainLayer(
          leftMapObj.current!,
          'left',
          urlsRef.current.left,
          ['urbansprawl', 'roads'].includes(currentLayerKey)
            ? 'vector'
            : 'raster',
          currentLayerKey,
        );

        if (!leftMapObj.current?.getSource('leftVector')) {
          leftMapObj.current?.addSource('leftVector', {
            type: 'vector',
            url: `pmtiles://${PMTILES_URL}`,
          });

          leftMapObj.current?.addLayer({
            id: 'vector-fill-left',
            type: 'fill',
            source: 'leftVector',
            'source-layer': 'zcta',
            paint: { 'fill-color': 'transparent', 'fill-opacity': 0 },
          });

          leftMapObj.current?.addLayer({
            id: 'vector-outline-left',
            type: 'line',
            source: 'leftVector',
            'source-layer': 'zcta',
            paint: {
              'line-color': '#686868ff',
              'line-width': 2,
            },
          });

          leftMapObj.current?.addLayer({
            id: 'vector-outline-highlight-left',
            type: 'line',
            source: 'leftVector',
            'source-layer': 'zcta',
            paint: {
              'line-color': '#F96000',
              'line-width': 1.5,
              'line-opacity': 0,
            },
            filter: ['==', 'fid', ''],
          });

          leftMapObj.current?.on('click', (e) => {
            if (
              viewModeRef.current === 'compare' ||
              viewModeRef.current === 'map'
            ) {
              handleMapClick(e, leftMapObj.current!);
            }
          });
          leftMapObj.current?.on('mouseenter', 'vector-fill-left', () => {
            if (
              leftMapObj.current &&
              (viewMode === 'compare' || viewMode === 'map')
            )
              leftMapObj.current.getCanvas().style.cursor = 'pointer';
          });
          leftMapObj.current?.on('mouseleave', 'vector-fill-left', () => {
            if (leftMapObj.current)
              leftMapObj.current.getCanvas().style.cursor = '';
          });
        }

        setupSubdistrictLayer(leftMapObj.current!, 'left');

        leftMapObj.current?.resize();
        setMapsLoadedCount((prev) => prev + 1);
      });

      leftMapObj.current.on('idle', () => setIsLoading(false));
    }

    if (rightMapRef.current) {
      rightMapObj.current = new maplibregl.Map({
        container: rightMapRef.current,
        style: satelliteStyle,
        center: odishaCenter,
        zoom: 7.5,
        attributionControl: false,
      });

      rightMapObj.current.on('load', () => {
        rightMapObj.current?.resize();

        if (targetBounds) {
          rightMapObj.current?.fitBounds(targetBounds, {
            duration: 0,
            padding: 40,
          });
        } else if (initialBoundsRef.current) {
          rightMapObj.current?.fitBounds(initialBoundsRef.current, {
            duration: 0,
            padding: 40,
          });
        }

        updateMainLayer(
          rightMapObj.current!,
          'right',
          urlsRef.current.right,
          ['urbansprawl', 'roads'].includes(currentLayerKey)
            ? 'vector'
            : 'raster',
          currentLayerKey,
        );

        if (!rightMapObj.current?.getSource('rightVector')) {
          rightMapObj.current?.addSource('rightVector', {
            type: 'vector',
            url: `pmtiles://${PMTILES_URL}`,
          });

          rightMapObj.current?.addLayer({
            id: 'vector-fill-right',
            type: 'fill',
            source: 'rightVector',
            'source-layer': 'zcta',
            paint: { 'fill-color': 'transparent', 'fill-opacity': 0 },
          });

          rightMapObj.current?.addLayer({
            id: 'vector-outline-right',
            type: 'line',
            source: 'rightVector',
            'source-layer': 'zcta',
            paint: {
              'line-color': '#686868ff',
              'line-width': 2,
            },
          });

          rightMapObj.current?.addLayer({
            id: 'vector-outline-highlight-right',
            type: 'line',
            source: 'rightVector',
            'source-layer': 'zcta',
            paint: {
              'line-color': '#F96000',
              'line-width': 1.5,
              'line-opacity': 0,
            },
            filter: ['==', 'fid', ''],
          });

          rightMapObj.current?.on('click', (e) => {
            handleMapClick(e, rightMapObj.current!);
          });
          rightMapObj.current?.on('mousemove', 'vector-fill-right', (e) => {
            const feature = e.features?.[0];
            const rawName =
              feature?.properties?.district_name ||
              feature?.properties?.DIST_NAME ||
              feature?.properties?.District ||
              feature?.properties?.NAME ||
              feature?.properties?.name ||
              feature?.properties?.district;
            const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
            if (ALLOWED_DISTRICTS.includes(name)) {
              if (rightMapObj.current)
                rightMapObj.current.getCanvas().style.cursor = 'pointer';
            } else {
              if (rightMapObj.current)
                rightMapObj.current.getCanvas().style.cursor = '';
            }
          });
          rightMapObj.current?.on('mouseleave', 'vector-fill-right', () => {
            if (rightMapObj.current)
              rightMapObj.current.getCanvas().style.cursor = '';
          });
        }

        setupSubdistrictLayer(rightMapObj.current!, 'right');

        rightMapObj.current?.resize();
        setMapsLoadedCount((prev) => prev + 1);
      });

      rightMapObj.current.on('idle', () => setIsLoading(false));
    }

    let isSyncing = false;
    const syncMaps = (a: maplibregl.Map, b: maplibregl.Map) => {
      const onMove = () => {
        if (isSyncing) return;
        isSyncing = true;
        b.jumpTo({
          center: a.getCenter(),
          zoom: a.getZoom(),
          bearing: a.getBearing(),
          pitch: a.getPitch(),
        });
        isSyncing = false;
      };
      a.on('move', onMove);
    };

    if (leftMapObj.current && rightMapObj.current) {
      syncMaps(leftMapObj.current, rightMapObj.current);
      syncMaps(rightMapObj.current, leftMapObj.current);
    }

    const leftMap = leftMapObj.current;
    if (leftMap) {
      const onIdle = () => {
        const features = leftMap.querySourceFeatures('leftVector', {
          sourceLayer: 'zcta',
        });
        if (features && features.length > 0) {
          const uniqueProps: any[] = [];
          const names = new Set();
          features.forEach((f: any) => {
            const rawName =
              f.properties.district_name ||
              f.properties.NAME ||
              f.properties.name ||
              f.properties.District ||
              f.properties.district;
            const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
            if (name && !names.has(name)) {
              names.add(name);
              uniqueProps.push(f.properties);
            }
          });
          if (uniqueProps.length > 0) {
            setAllDistrictsData((prev) =>
              uniqueProps.length > prev.length ? uniqueProps : prev,
            );
          }
        }
      };
      leftMap.on('idle', onIdle);
    }

    return () => {
      try {
        if (leftMapObj.current) {
          leftMapObj.current.remove();
          leftMapObj.current = null;
        }
      } catch (e) {
        console.warn('Left map cleanup error', e);
      }

      try {
        if (rightMapObj.current) {
          rightMapObj.current.remove();
          rightMapObj.current = null;
        }
      } catch (e) {
        console.warn('Right map cleanup error', e);
      }
    };
  }, []);

  useEffect(() => {
    if (!leftMapObj.current || !rightMapObj.current) return;

    const isSentinel = currentLayerKey === 'sentinel2';
    const type = isSentinel
      ? 'raster'
      : ['urbansprawl', 'roads'].includes(currentLayerKey)
        ? 'vector'
        : 'raster';

    const lUrl =
      viewMode === 'map' || viewMode === 'change_analysis' ? rightUrl : leftUrl;

    updateMainLayer(leftMapObj.current, 'left', lUrl, type, currentLayerKey);
    updateMainLayer(
      rightMapObj.current,
      'right',
      rightUrl,
      type,
      currentLayerKey,
    );
  }, [leftUrl, rightUrl, currentLayerKey, activeLulcPixel, viewMode]);

  useEffect(() => {
    if (!leftMapObj.current) return;

    if (targetBounds) {
      const options: any = { padding: 40, duration: 1200 };
      leftMapObj.current.fitBounds(targetBounds, options);
    } else {
      handleResetView();
    }
  }, [targetBounds, resetTrigger, mapsLoadedCount]);

  useEffect(() => {
    if (mapsLoadedCount < 2) return;

    const mapsToHighlight = [
      { map: leftMapObj.current, idx: 'left' },
      { map: rightMapObj.current, idx: 'right' },
    ];

    mapsToHighlight.forEach(({ map, idx }) => {
      if (!map || !map.getLayer(`vector-outline-highlight-${idx}`)) return;

      if (selectedDistrict === 'Odisha') {
        map.setPaintProperty(
          `vector-outline-highlight-${idx}`,
          'line-opacity',
          0,
        );
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
          [
            '==',
            ['get', 'district_name'],
            Object.keys(DISTRICT_NAME_VARIANTS).find(
              (k) => DISTRICT_NAME_VARIANTS[k] === selectedDistrict,
            ) || selectedDistrict,
          ],
        ];

        map.setPaintProperty(
          `vector-outline-highlight-${idx}`,
          'line-opacity',
          1,
        );
        map.setFilter(
          `vector-outline-highlight-${idx}`,
          highlightCondition as any,
        );
        if (map.getLayer(`vector-outline-highlight-${idx}`)) {
          map.moveLayer(`vector-outline-highlight-${idx}`);
        }
      }
    });
  }, [selectedDistrict, mapsLoadedCount]);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        setDividerX(x);
      }
    };
    const stop = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchmove', move);
      window.addEventListener('touchend', stop);
    }

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', stop);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!leftMapObj.current || !rightMapObj.current) return;

    leftMapObj.current.resize();
    rightMapObj.current.resize();
  }, [dividerX, viewMode]);

  // ─── Data processing ──────────────────────────────────────────────────────────
  const compData =
    (COMPARATIVE_DATA as any)[selectedDistrict] ||
    (COMPARATIVE_DATA as any)['Odisha'];
  const layerData = compData[currentLayerKey] || { val1: 0, val2: 0 };
  const randLow = layerData.val1;
  const randHigh = layerData.val2;

  const getDistrictArea = (dist: string) => {
    if (dist === 'Odisha') return 155707;
    return 5190;
  };

  const yearKey1 = parseInt(y1);
  const yearKey2 = parseInt(y2);
  let totalPop1 = 0;
  let totalPop2 = 0;

  const findPop = (dist: string, year: number) => {
    const yearStr = year.toString();
    const propKey = `pop_${yearStr}_sum`;

    if (dist === 'Odisha') {
      if (allDistrictsData.length > 0) {
        return allDistrictsData.reduce(
          (acc, d) => acc + (parseFloat(d[propKey] || 0) || 0),
          0,
        );
      }
      return Object.values(DISTRICT_DEMOGRAPHICS).reduce((acc, d: any) => {
        const availableYears = Object.keys(d)
          .map(Number)
          .sort((a, b) => a - b);
        const closest = availableYears.reduce((prev, curr) =>
          Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev,
        );
        return acc + (d[closest] ? d[closest].male + d[closest].female : 0);
      }, 0);
    }

    const name = DISTRICT_NAME_VARIANTS[dist] || dist;

    if (allDistrictsData.length > 0) {
      const dData = allDistrictsData.find((d) => {
        const rawName =
          d.district_name || d.NAME || d.name || d.District || d.district;
        const dName = DISTRICT_NAME_VARIANTS[rawName] || rawName;
        return dName === name;
      });
      if (dData && dData[propKey] !== undefined) {
        return parseFloat(dData[propKey]);
      }
    }

    const demo = (DISTRICT_DEMOGRAPHICS as any)[name];
    if (!demo) return 0;
    if (demo[year]) return demo[year].male + demo[year].female;

    const availableYears = Object.keys(demo)
      .map(Number)
      .sort((a, b) => a - b);
    if (availableYears.length === 0) return 0;

    const closest = availableYears.reduce((prev, curr) =>
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev,
    );
    return demo[closest].male + demo[closest].female;
  };

  totalPop1 = findPop(selectedDistrict, yearKey1);
  totalPop2 = findPop(selectedDistrict, yearKey2);

  const popOldM = (totalPop1 / 1000000).toFixed(2);
  const popNewM = (totalPop2 / 1000000).toFixed(2);

  const d1 = getDisplayData(currentLayerKey, randLow || 0, 'left');
  const d2 = getDisplayData(currentLayerKey, randHigh || 0, 'right');
  const layerNameStr =
    currentLayerKey === 'nightlight'
      ? 'Night Lights'
      : currentLayerKey === 'urbansprawl'
        ? 'Built-up Area'
        : currentLayerKey;
  const areaKm2 = getDistrictArea(selectedDistrict);

  const lulcStatMap: Record<string, string> = {
    builtup: 'Built Area',
    cropland: 'Crops',
    forest: 'Trees',
    water: 'Water',
    barren: 'Bare Ground',
    scrub: 'Scrub',
    wetlands: 'Flooded Vegetation',
  };

  const getLulcStat = (dist: string, year: string, layerKey: string) => {
    const category = lulcStatMap[layerKey];
    if (!category) return null;

    const distData =
      LULC_STATS[dist] ||
      (DISTRICT_NAME_VARIANTS[dist] &&
        LULC_STATS[DISTRICT_NAME_VARIANTS[dist]]) ||
      LULC_STATS['Odisha'];
    if (!distData) return null;

    const yearData = distData[year];
    if (!yearData) return null;

    const val = yearData[category];
    if (val === undefined || val === null) return null;

    const totalArea = getDistrictArea(dist);
    if (val < 110 && dist !== 'Odisha') {
      return { sqKm: (totalArea * val) / 100, percent: val };
    }

    return { sqKm: val, percent: (val / totalArea) * 100 };
  };

  // ─── Determine if roads layer is active ──────────────────────────────────────
  const isRoadsLayer = currentLayerKey === 'roads';

  // ─── Road length data from NEW_DISTRICT_ROAD_DATA ────────────────────────────
  const roadLen1 = isRoadsLayer ? getRoadLength(selectedDistrict, y1) : null;
  const roadLen2 = isRoadsLayer ? getRoadLength(selectedDistrict, y2) : null;

  // ─── LULC stats (only used for non-roads layers) ─────────────────────────────
  const lulc1 = !isRoadsLayer
    ? getLulcStat(selectedDistrict, y1, currentLayerKey)
    : null;
  const lulc2 = !isRoadsLayer
    ? getLulcStat(selectedDistrict, y2, currentLayerKey)
    : null;

  // ─── Displayed values ────────────────────────────────────────────────────────
  const activeAreaOld = isRoadsLayer
    ? roadLen1 !== null
      ? roadLen1.toFixed(1)
      : '—'
    : lulc1
      ? lulc1.sqKm.toFixed(0)
      : (areaKm2 * (Number(randLow) / 100)).toFixed(0);

  const activeAreaNew = isRoadsLayer
    ? roadLen2 !== null
      ? roadLen2.toFixed(1)
      : '—'
    : lulc2
      ? lulc2.sqKm.toFixed(0)
      : (areaKm2 * (Number(randHigh) / 100)).toFixed(0);

  const activePercentOld = isRoadsLayer
    ? null
    : lulc1
      ? lulc1.percent.toFixed(1)
      : d1?.percent || 0;

  const activePercentNew = isRoadsLayer
    ? null
    : lulc2
      ? lulc2.percent.toFixed(1)
      : d2?.percent || 0;

  // ─── % change calculation ─────────────────────────────────────────────────────
  const prevVal = isRoadsLayer
    ? (roadLen1 ?? 0)
    : lulc1
      ? lulc1.sqKm
      : randLow || 0;
  const currVal = isRoadsLayer
    ? (roadLen2 ?? 0)
    : lulc2
      ? lulc2.sqKm
      : randHigh || 0;
  const change = prevVal > 0 ? ((currVal - prevVal) / prevVal) * 100 : 0;
  const isPos = change >= 0;

  // Handle Basemap Visibility
  useEffect(() => {
    if (!leftMapObj.current || !rightMapObj.current || mapsLoadedCount < 2)
      return;

    [leftMapObj.current, rightMapObj.current].forEach((map) => {
      const showBasemaps = currentLayerKey !== 'sentinel2';
      if (map.getLayer('esri-grey-layer')) {
        map.setLayoutProperty(
          'esri-grey-layer',
          'visibility',
          showBasemaps && basemap === 'grey' ? 'visible' : 'none',
        );
      }
      if (map.getLayer('esri-satellite-layer')) {
        map.setLayoutProperty(
          'esri-satellite-layer',
          'visibility',
          showBasemaps && basemap === 'satellite' ? 'visible' : 'none',
        );
      }
      if (map.getLayer('osm-layer')) {
        map.setLayoutProperty(
          'osm-layer',
          'visibility',
          showBasemaps && basemap === 'osm' ? 'visible' : 'none',
        );
      }
    });
  }, [basemap, mapsLoadedCount]);

  return (
    <div className="w-full h-full">
      {/* Map Area */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full h-[600px] overflow-hidden select-none rounded-lg"
        >
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
              <div className="loading-spinner"></div>
            </div>
          )}

          {/* LEFT LABEL */}
          {viewMode === 'compare' && (
            <div className="absolute top-4 left-4 z-40 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-sm font-medium shadow border border-white/30">
              {y1}
            </div>
          )}

          {/* RIGHT LABEL */}
          {(viewMode === 'compare' || viewMode === 'map') && (
            <div className="absolute top-4 right-4 z-40 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-sm font-medium shadow border border-white/30">
              {viewMode === 'map' ? '2024' : y2}
            </div>
          )}

          {/* LEFT MAP */}
          <div
            ref={leftMapRef}
            className="relative w-full h-[600px] overflow-hidden select-none"
          />

          {/* RIGHT MAP (clipped by slider) */}
          <div
            ref={rightMapRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              clipPath: `inset(0 0 0 ${dividerX}px)`,
              pointerEvents: viewMode === 'compare' ? 'auto' : 'none',
              overflow: 'hidden',
              display: viewMode === 'change_analysis' ? 'none' : 'block',
            }}
          />

          {/* Divider Handle */}
          {dividerX !== null && viewMode === 'compare' && (
            <div
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="absolute top-0 bottom-0 w-1 bg-[#F58220] z-20 flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform active:scale-110"
              style={{ left: `${dividerX}px`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute w-8 h-8 rounded-full bg-[#F58220] border-[3px] border-white shadow-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    transform="rotate(90 12 12)"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* ─── LEFT SIDE PANEL ─────────────────────────────────────────────── */}
          {viewMode === 'compare' && (
            <div className="absolute top-0 bottom-0 left-0 w-70 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col pt-20 pb-4 px-6 z-30 pointer-events-none">
              <div className="text-white mt-4">
                {/* Population */}
                <div className="text-gray-200 text-xs tracking-wider uppercase mb-1">
                  POPULATION
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="font-mono">{popOldM}</span>{' '}
                  <span className="text-sm font-normal">M</span>
                </div>

                {/* Layer label — roads shows "road network length", others show "X coverage" */}
                <div className="text-xs text-gray-100 mb-2">
                  {isRoadsLayer
                    ? 'road network length'
                    : `${layerNameStr.toLowerCase()} coverage`}
                </div>

                {/* Main metric */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold">
                    <span className="font-mono">{activeAreaOld} </span>
                    <span className="text-sm font-normal">
                      {isRoadsLayer ? 'km' : 'km.sq.'}
                    </span>
                  </span>
                  {/* Only show percentage for non-roads layers */}
                  {!isRoadsLayer && activePercentOld !== null && (
                    <>
                      <span className="text-gray-400">|</span>
                      <span className="text-xl font-bold font-mono">
                        {activePercentOld}%
                      </span>
                    </>
                  )}
                </div>

                {/* Progress bar — only for non-roads layers */}
                {!isRoadsLayer && (
                  <div className="w-3/4 h-1.5 bg-gray-600/50 rounded-full mb-1">
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      style={{
                        width: `${Math.min(Number(activePercentOld) || 0, 100)}%`,
                        backgroundColor: '#dcfce7',
                      }}
                    ></div>
                  </div>
                )}

                {/* Clicked coordinate + LULC value */}
                {selectedLngLat ? (
                  <div className="w-full flex flex-col items-start mt-1">
                    <div className="border-t border-white/20 my-4 w-full"></div>
                    <div className="text-xs text-white mb-2 tracking-wide font-light font-mono">
                      {Math.abs(selectedLngLat.lng).toFixed(2)}{' '}
                      {selectedLngLat.lng >= 0 ? 'E' : 'W'},{' '}
                      {Math.abs(selectedLngLat.lat).toFixed(2)}{' '}
                      {selectedLngLat.lat >= 0 ? 'N' : 'S'}
                    </div>
                    <div className="flex flex-col text-left uppercase text-[13px] mt-2 bg-black/30 p-2.5 rounded border border-white/10 w-auto">
                      <span className="font-medium text-gray-200">
                        {lulc2018Val !== null ? getLulcName(lulc2018Val) : ''}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 w-full mt-4"></div>
                )}
              </div>
            </div>
          )}

          {/* ─── RIGHT SIDE PANEL ────────────────────────────────────────────── */}
          {(viewMode === 'compare' || viewMode === 'map') && (
            <div className="absolute top-0 bottom-0 right-0 w-70 bg-gradient-to-l from-black/70 via-black/30 to-transparent flex flex-col pt-20 pb-4 px-6 z-30 pointer-events-none items-end text-right">
              <div className="text-white mt-4 flex flex-col items-end w-full">
                {/* Population */}
                <div className="text-gray-200 text-xs tracking-wider uppercase mb-1">
                  POPULATION
                </div>
                <div className="text-2xl font-bold mb-2">
                  <span className="font-mono">{popNewM}</span>{' '}
                  <span className="text-sm font-normal">M</span>
                </div>

                {/* Layer label */}
                <div className="text-xs text-gray-100 mb-2">
                  {isRoadsLayer
                    ? 'road network length'
                    : `${layerNameStr.toLowerCase()} coverage`}
                </div>

                {/* Main metric */}
                <div className="flex items-baseline justify-end gap-2 mb-3 w-full">
                  <span className="text-xl font-bold">
                    <span className="font-mono">{activeAreaNew}</span>{' '}
                    <span className="text-sm font-normal">
                      {isRoadsLayer ? 'km' : 'km.sq.'}
                    </span>
                  </span>
                  {/* Only show percentage for non-roads layers */}
                  {!isRoadsLayer && activePercentNew !== null && (
                    <>
                      <span className="text-gray-400">|</span>
                      <span className="text-xl font-bold font-mono">
                        {activePercentNew}%
                      </span>
                    </>
                  )}
                </div>

                {/* Progress bar — only for non-roads layers */}
                {!isRoadsLayer && (
                  <div className="w-3/4 h-1.5 bg-gray-600/50 rounded-full mb-3 flex justify-end">
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      style={{
                        width: `${Math.min(Number(activePercentNew) || 0, 100)}%`,
                        backgroundColor: '#dcfce7',
                      }}
                    ></div>
                  </div>
                )}

                {/* % change badge — always shown */}
                <div className="flex justify-end mb-3">
                  <span
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-black tracking-wide shadow-sm ${
                      isPos
                        ? 'bg-white/20 text-[#a7f3d0] border border-[#a7f3d0]/30'
                        : 'bg-white/20 text-red-300 border border-red-300/30'
                    }`}
                  >
                    {isPos ? (
                      <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" strokeWidth={3} />
                    )}
                    {Math.abs(change).toFixed(1)}%
                  </span>
                </div>

                {/* Clicked coordinate + LULC value */}
                {selectedLngLat ? (
                  <div className="w-full flex flex-col items-end mt-1">
                    <div className="border-t border-white/20 my-4 w-full"></div>
                    <div className="text-xs text-white mb-2 tracking-wide font-light text-right font-mono">
                      {Math.abs(selectedLngLat.lng).toFixed(2)}{' '}
                      {selectedLngLat.lng >= 0 ? 'E' : 'W'},{' '}
                      {Math.abs(selectedLngLat.lat).toFixed(2)}{' '}
                      {selectedLngLat.lat >= 0 ? 'N' : 'S'}
                    </div>
                    <div className="flex flex-col text-right uppercase text-[13px] mt-2 bg-black/30 p-2.5 rounded border border-white/10 w-auto">
                      <span className="font-medium text-gray-200">
                        {lulc2024Val !== null ? getLulcName(lulc2024Val) : ''}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 w-full mt-4"></div>
                )}
              </div>
            </div>
          )}

          {/* Basemap Toggle - Bottom Right */}
          {currentLayerKey !== 'sentinel2' && (
            <div className="absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white/90 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#F96000] hover:border-[#F96000] transition-all active:scale-90"
                  title="Change Basemap"
                >
                  <Layers className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-40 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                    {basemapOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setBasemap(option.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[11px] font-black transition-colors flex items-center justify-between ${
                          basemap === option.id
                            ? 'bg-orange-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
