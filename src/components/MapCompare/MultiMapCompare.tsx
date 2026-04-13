/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Protocol as PMTilesProtocol, PMTiles } from 'pmtiles';
import { cogProtocol } from '@geomatico/maplibre-cog-protocol';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Plus,
  X,
  ChevronDown,
  Layers,
  Map as MapIcon,
  Calendar,
} from 'lucide-react';
import { DISTRICT_NAME_VARIANTS } from '../../data/comparativeData';

// Protocols setup
let protocolsAdded = false;

interface MapConfig {
  id: string;
  year: string;
  layer: string;
  basemap: 'grey' | 'satellite' | 'osm';
}

interface MultiMapCompareProps {
  targetBounds?: any;
  activeLayer?: string;
  selectedDistrict?: string;
  onDistrictSelect?: (district: string) => void;
}

const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/population_data/od_district_pop_total_2036_corrected.pmtiles';
const SUBDISTRICT_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_subdistrict.pmtiles';

const PC_MOSAIC_REGISTER =
  'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/register';
const PC_TILE_BASE =
  'https://planetarycomputer.microsoft.com/api/data/v1/mosaic/tiles';
const PC_RENDER_PARAMS =
  'assets=B04&assets=B03&assets=B02&color_formula=Gamma%20RGB%203.2%20Saturation%200.8%20Sigmoidal%20RGB%2025%200.35&collection=sentinel-2-l2a&format=png';

const SENTINEL_DATE_MAP: any = {
  '01-01-2026': '2026-01-01/2026-01-31',
  '01-12-2025': '2025-12-01/2025-12-31',
  '01-11-2025': '2025-11-01/2025-11-30',
};
const MONTHLY_DATES = Object.keys(SENTINEL_DATE_MAP);

// ----------------------
// ✅ BASE CONFIG
// ----------------------
const BASE_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3';

// ----------------------
// ✅ YEAR GENERATORS
// ----------------------
const generateYears = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());

// ----------------------
// ✅ URL GENERATOR
// ----------------------
const buildYearlyUrls = (
  basePath: string,
  prefix: string,
  extension: string,
  years: string[],
) => {
  return Object.fromEntries(
    years.map((year) => [year, `${basePath}/${prefix}_${year}.${extension}`]),
  );
};

// ----------------------
// ✅ YEAR RANGES
// ----------------------
const YEARS = {
  nightlight: generateYears(2012, 2024),
  roads: generateYears(2014, 2025),
  builtup: generateYears(2017, 2025),
};

// ----------------------
// ✅ LAYER CONFIGS (AUTOMATED)
// ----------------------
const LAYER_CONFIGS: any = {
  nightlight: {
    label: 'Nightlight',
    urls: buildYearlyUrls(`${BASE_URL}/ntl`, 'ntl', 'tif', YEARS.nightlight),
    params:
      '#color:["#000000","#333333","#663300","#ccaa00","#ffff00"],0,200,c',
    type: 'raster',
  },

  roads: {
    label: 'Road Network',
    urls: buildYearlyUrls(
      `${BASE_URL}/roads`,
      'district_0_roads',
      'pmtiles',
      YEARS.roads,
    ),
    params: '', // dynamic styling handled later
    type: 'vector',
  },

  builtup: {
    label: 'Built-up Area',
    urls: buildYearlyUrls(
      `${BASE_URL}/builtup`,
      'builtup',
      'tif',
      YEARS.builtup,
    ),
    params: '7,7',
    type: 'raster',
  },
};

// const LAYER_CONFIGS: any = {
//   nightlight: {
//     label: 'Nightlight',
//     urls: {
//       '2012':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2012.tif',
//       '2013':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2013.tif',
//       '2014':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2014.tif',
//       '2015':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2015.tif',
//       '2016':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2016.tif',
//       '2017':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2017.tif',
//       '2018':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2018.tif',
//       '2019':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2019.tif',
//       '2020':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2020.tif',
//       '2021':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2021.tif',
//       '2022':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2022.tif',
//       '2023':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2023.tif',
//       '2024':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2024.tif',
//     },
//     params:
//       '#color:["#000000","#333333","#663300","#ccaa00","#ffff00"],0,200,c',
//     type: 'raster',
//   },
//   roads: {
//     label: 'Road Network',
//     urls: {
//       '2014':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2014.pmtiles',
//       '2015':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2015.pmtiles',
//       '2016':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2016.pmtiles',
//       '2017':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2017.pmtiles',
//       '2018':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2018.pmtiles',
//       '2019':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2019.pmtiles',
//       '2020':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2020.pmtiles',
//       '2021':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2021.pmtiles',
//       '2022':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2022.pmtiles',
//       '2023':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2023.pmtiles',
//       '2024':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2024.pmtiles',
//       '2025':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/roads/district_0_roads_2025.pmtiles',
//     },
//     params: '', // Dynamic color based on panel
//     type: 'vector',
//   },
//   builtup: {
//     label: 'Built-up Area',
//     urls: {
//       '2017':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2017.tif',
//       '2018':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2018.tif',
//       '2019':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2019.tif',
//       '2020':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2020.tif',
//       '2021':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2021.tif',
//       '2022':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2022.tif',
//       '2023':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2023.tif',
//       '2024':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2024.tif',
//       '2025':
//         'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/builtup/builtup_2025.tif',
//     },
//     params: '7,7',
//     type: 'raster',
//   },
// };

const BASE_MAP_STYLE: any = {
  version: 8,
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
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
      attribution: '© Esri, Maxar',
    },
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap',
    },
  },
  layers: [
    {
      id: 'base-grey',
      type: 'raster',
      source: 'esri-grey',
      layout: { visibility: 'none' },
    },
    {
      id: 'base-satellite',
      type: 'raster',
      source: 'esri-satellite',
      layout: { visibility: 'none' },
    },
    {
      id: 'base-osm',
      type: 'raster',
      source: 'osm',
      layout: { visibility: 'none' },
    },
  ],
};

// Returns the universal style with all basemaps included
const getEffectiveStyle = () => BASE_MAP_STYLE;

// Shared initial bounds fetched once from PMTiles header
const sharedInitialBoundsRef: { current: maplibregl.LngLatBoundsLike | null } =
  { current: null };
let initialBoundsFetchStarted = false;

export const MultiMapCompare: React.FC<MultiMapCompareProps> = ({
  targetBounds,
  activeLayer: propActiveLayer,
  selectedDistrict,
  onDistrictSelect,
}) => {
  const [mapConfigs, setMapConfigs] = useState<MapConfig[]>([
    {
      id: 'map-1',
      year: '2024',
      layer: propActiveLayer || 'builtup',
      basemap: 'grey',
    },
    {
      id: 'map-2',
      year: '2024',
      layer: propActiveLayer || 'builtup',
      basemap: 'grey',
    },
  ]);

  const [mapsLoadedCount, setMapsLoadedCount] = useState(0);
  const [isAddingMap, setIsAddingMap] = useState(false);
  const [pendingConfig, setPendingConfig] = useState({
    layer: propActiveLayer || 'builtup',
    year: '2024',
  });

  // Update existing maps if external layer changes
  useEffect(() => {
    if (propActiveLayer) {
      setMapConfigs((prev) =>
        prev.map((m) => ({ ...m, layer: propActiveLayer })),
      );
    }
  }, [propActiveLayer]);

  const mapInstances = useRef<Map<string, maplibregl.Map>>(new Map());
  const isSyncing = useRef(false);

  useEffect(() => {
    if (!protocolsAdded) {
      try {
        maplibregl.addProtocol('cog', cogProtocol);
        const pmtilesProtocol = new PMTilesProtocol();
        maplibregl.addProtocol('pmtiles', pmtilesProtocol.tile);
      } catch (e) {
        console.log('e', e);
      }
      protocolsAdded = true;
    }
    // Prefetch PMTiles bounds once
    if (!initialBoundsFetchStarted) {
      initialBoundsFetchStarted = true;
      const p = new PMTiles(PMTILES_URL);
      p.getHeader()
        .then((header) => {
          if (header.minLon !== undefined) {
            sharedInitialBoundsRef.current = [
              [header.minLon, header.minLat],
              [header.maxLon, header.maxLat],
            ];
          }
        })
        .catch(() => {
          /* use fallback */
        });
    }
  }, []);

  // When targetBounds changes (polygon clicked in MapComponent), fit ALL map panels
  // When targetBounds is null (reset to Odisha), restore to PMTiles-derived Odisha bounds
  useEffect(() => {
    const boundsToUse = targetBounds || sharedInitialBoundsRef.current;
    if (!boundsToUse) return;
    mapInstances.current.forEach((map) => {
      if (map.isStyleLoaded()) {
        map.fitBounds(boundsToUse, {
          padding: 40,
          duration: 1200,
          essential: true,
        });
      } else {
        map.once('load', () => {
          map.fitBounds(boundsToUse, { padding: 40, duration: 0 });
        });
      }
    });
  }, [targetBounds, mapsLoadedCount]);

  const syncMaps = (sourceId: string) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const sourceMap = mapInstances.current.get(sourceId);
    if (!sourceMap) {
      isSyncing.current = false;
      return;
    }

    const center = sourceMap.getCenter();
    const zoom = sourceMap.getZoom();
    const bearing = sourceMap.getBearing();
    const pitch = sourceMap.getPitch();

    mapInstances.current.forEach((map: maplibregl.Map, id: string) => {
      if (id !== sourceId) {
        map.jumpTo({ center, zoom, bearing, pitch });
      }
    });

    isSyncing.current = false;
  };

  const addMap = () => {
    if (mapConfigs.length >= 3) return;
    setIsAddingMap(true);
  };

  const confirmAddMap = () => {
    const newId = `map-${Date.now()}`;
    setMapConfigs([
      ...mapConfigs,
      { ...pendingConfig, id: newId, basemap: 'grey' },
    ]);
    setIsAddingMap(false);
  };

  const removeMap = (id: string) => {
    if (mapConfigs.length <= 1) return;
    setMapConfigs(mapConfigs.filter((m: MapConfig) => m.id !== id));
    mapInstances.current.delete(id);
  };

  const updateConfig = (id: string, updates: Partial<MapConfig>) => {
    setMapConfigs(
      mapConfigs.map((m: MapConfig) =>
        m.id === id ? { ...m, ...updates } : m,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <MapIcon className="w-6 h-6" />
            Comparative Analysis - Splitview
          </h3>
          <p className="text-[13px] text-gray-500 mt-1 font-medium leading-relaxed">
            Simultaneously visualize and compare spatio-temporal demographic
            shifts, land use patterns, and infrastructure development across
            multiple interactive map panels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={addMap}
            disabled={mapConfigs.length >= 3}
            className="flex items-center gap-2 px-6 py-3 bg-[#F96000] text-white rounded-xl font-black text-xs shadow-sm hover:bg-[#e85900] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add Map
          </button>
        </div>
      </div>

      <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {mapConfigs.map((config, idx) => (
          <div key={config.id} className="min-w-[450px] flex-1">
            <MapItem
              config={config}
              panelIndex={idx}
              selectedDistrict={selectedDistrict}
              onRemove={() => removeMap(config.id)}
              onUpdate={(updates) => updateConfig(config.id, updates)}
              onDistrictSelect={onDistrictSelect}
              onMapLoad={(map: maplibregl.Map) => {
                mapInstances.current.set(config.id, map);
                setMapsLoadedCount((prev) => prev + 1);
                map.on('move', () => syncMaps(config.id));

                const allMaps = Array.from(mapInstances.current.values());
                const firstMap = allMaps[0];
                if (firstMap && firstMap !== map) {
                  // New panel: sync position with the first panel
                  map.jumpTo({
                    center: firstMap.getCenter(),
                    zoom: firstMap.getZoom(),
                    bearing: firstMap.getBearing(),
                    pitch: firstMap.getPitch(),
                  });
                } else if (targetBounds) {
                  // District already selected
                  map.fitBounds(targetBounds, { padding: 40, duration: 0 });
                } else if (sharedInitialBoundsRef.current) {
                  // Use PMTiles header bounds for initial fit
                  map.fitBounds(sharedInitialBoundsRef.current, {
                    padding: 40,
                    duration: 0,
                  });
                }
              }}
            />
          </div>
        ))}

        {isAddingMap && (
          <div className="min-w-[450px] max-w-[450px] h-[440px] bg-white rounded-2xl border-2 border-dashed border-orange-100 p-8 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-2">
              <Plus className="w-8 h-8 text-[#F96000]" strokeWidth={2.5} />
            </div>

            {/* <div className="text-center">
                            <h4 className="text-lg font-black text-gray-900 tracking-tight uppercase">Configure New Map</h4>
                        </div> */}

            <div className="w-full space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0868ac] mb-2 block">
                  Choose Data Layer
                </label>
                <div className="relative">
                  <select
                    value={pendingConfig.layer}
                    onChange={(e) => {
                      const layer = e.target.value;
                      const defaultYear =
                        mapConfigs.length === 2 ? '01-01-2026' : '2024';
                      setPendingConfig({ layer, year: defaultYear });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[13px] font-black text-gray-700 focus:ring-2 focus:ring-orange-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {Object.entries(LAYER_CONFIGS).map(([id, cfg]: any) => (
                      <option key={id} value={id}>
                        {cfg.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0868ac] mb-2 block">
                  Date
                </label>
                <div className="relative">
                  <select
                    value={pendingConfig.year}
                    onChange={(e) =>
                      setPendingConfig({
                        ...pendingConfig,
                        year: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[13px] font-black text-gray-700 focus:ring-2 focus:ring-orange-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {mapConfigs.length === 2
                      ? MONTHLY_DATES.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))
                      : Object.keys(
                          LAYER_CONFIGS[pendingConfig.layer]?.urls || {},
                        ).map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                  </select>
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setIsAddingMap(false)}
                className="flex-1 py-3.5 px-4 bg-gray-100 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddMap}
                className="flex-[2] py-3.5 px-4 bg-[#F96000] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-[#e85900] transition-all"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MapItem = ({
  config,
  panelIndex,
  selectedDistrict,
  onRemove,
  onUpdate,
  onMapLoad,
  onDistrictSelect,
}: {
  config: MapConfig;
  panelIndex: number;
  selectedDistrict?: string;
  onRemove: () => void;
  onUpdate: (updates: Partial<MapConfig>) => void;
  onMapLoad: (map: maplibregl.Map) => void;
  onDistrictSelect?: (district: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isLayerOpen, setIsLayerOpen] = useState(false);
  const [isBasemapOpen, setIsBasemapOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: getEffectiveStyle(),
      center: [85.0985, 20.9517],
      zoom: 6,
      attributionControl: false,
    });

    map.on('load', async () => {
      mapRef.current = map;
      // Fit to PMTiles bounds if not already positioned by parent
      if (!sharedInitialBoundsRef.current) {
        try {
          const p = new PMTiles(PMTILES_URL);
          const header = await p.getHeader();
          if (header.minLon !== undefined) {
            sharedInitialBoundsRef.current = [
              [header.minLon, header.minLat],
              [header.maxLon, header.maxLat],
            ];
          }
        } catch (e) {
          /* use fallback */
          console.log('e', e);
        }
      }
      // Set initial basemap visibility
      map.setLayoutProperty(
        'base-grey',
        'visibility',
        config.basemap === 'grey' ? 'visible' : 'none',
      );
      map.setLayoutProperty(
        'base-satellite',
        'visibility',
        config.basemap === 'satellite' ? 'visible' : 'none',
      );
      map.setLayoutProperty(
        'base-osm',
        'visibility',
        config.basemap === 'osm' ? 'visible' : 'none',
      );

      onMapLoad(map);
      refreshMapContent();
      map.on('idle', () => setIsLoading(false));
    });

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map && map.isStyleLoaded()) {
      map.setLayoutProperty(
        'base-grey',
        'visibility',
        config.basemap === 'grey' ? 'visible' : 'none',
      );
      map.setLayoutProperty(
        'base-satellite',
        'visibility',
        config.basemap === 'satellite' ? 'visible' : 'none',
      );
      map.setLayoutProperty(
        'base-osm',
        'visibility',
        config.basemap === 'osm' ? 'visible' : 'none',
      );
    }
  }, [config.basemap]);

  // Update Mask Layer whenever selectedDistrict or basemap changes
  useEffect(() => {
    applyMaskStatus();
  }, [selectedDistrict, config.basemap]);

  const applyMaskStatus = () => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer('districts-mask')) return;
    const getMaskColor = () => {
      if (config.basemap === 'satellite') return '#000000';
      return '#ffffffff'; // White for grey/osm
    };

    map.setPaintProperty('districts-mask', 'fill-color', getMaskColor());
    map.setPaintProperty('districts-mask', 'fill-opacity', 0);
  };

  useEffect(() => {
    // Validation: Ensure the current year is supported by the selected layer.
    // If not, automatically jump to the latest available year for that layer.
    const currentLayerConfig = LAYER_CONFIGS[config.layer];
    if (currentLayerConfig) {
      const isMonthlyRequest = panelIndex === 2;
      const availableYears = Object.keys(currentLayerConfig.urls);

      if (isMonthlyRequest) {
        if (!MONTHLY_DATES.includes(config.year)) {
          onUpdate({ year: '01-01-2026' });
          return;
        }
      } else {
        if (!availableYears.includes(config.year)) {
          const fallbackYear =
            availableYears[availableYears.length - 1] || '2024';
          onUpdate({ year: fallbackYear });
          return;
        }
      }
    }
    refreshMapContent();
  }, [config.year, config.layer]);

  const refreshMapContent = async () => {
    setIsLoading(true);
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Perform clean sweep of custom layers/sources
    const layersToClean = [
      'data-layer',
      'districts-mask',
      'districts-outline',
      'subdistrict-outline',
    ];
    const sourcesToClean = [
      'data-source',
      'districts-source',
      'subdistrict-source',
    ];

    try {
      layersToClean.forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      sourcesToClean.forEach((id) => {
        if (map.getSource(id)) map.removeSource(id);
      });

      // Re-add in strict order: Data Overlay -> Admin Boundaries
      await addDataOverlay(map);
      addVectorOutlines(map);
    } catch (err) {
      console.error('Error refreshing map content:', err);
      // Fallback retry if it failed due to timing
      setTimeout(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
          refreshMapContent();
        }
      }, 500);
    }
  };

  const addVectorOutlines = (map: maplibregl.Map) => {
    if (!map.getSource('districts-source')) {
      map.addSource('districts-source', {
        type: 'vector',
        url: `pmtiles://${PMTILES_URL}`,
      });

      map.addLayer({
        id: 'districts-mask',
        type: 'fill',
        source: 'districts-source',
        'source-layer': 'zcta',
        paint: {
          'fill-color': '#ffffff',
          'fill-opacity': 0,
        },
      });

      map.on('click', 'districts-mask', (e) => {
        if (e.features && e.features.length > 0 && onDistrictSelect) {
          const props = e.features[0].properties as any;
          const rawName =
            props.district_name ||
            props.DIST_NAME ||
            props.District ||
            props.NAME ||
            props.name ||
            props.district;
          const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
          onDistrictSelect(name);
        }
      });

      map.on('mouseenter', 'districts-mask', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'districts-mask', () => {
        map.getCanvas().style.cursor = '';
      });

      applyMaskStatus();

      map.addLayer({
        id: 'districts-outline',
        type: 'line',
        source: 'districts-source',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#000000',
          'line-width': 0.8,
          'line-opacity': 0.5,
        },
      });
    }

    if (!map.getSource('subdistrict-source')) {
      map.addSource('subdistrict-source', {
        type: 'vector',
        url: `pmtiles://${SUBDISTRICT_URL}`,
      });
      map.addLayer({
        id: 'subdistrict-outline',
        type: 'line',
        source: 'subdistrict-source',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#989898ff',
          'line-width': 0.9,
          'line-opacity': 0.8,
        },
      });
    }
  };

  const addDataOverlay = async (map: maplibregl.Map) => {
    const sourceId = 'data-source';
    const layerId = 'data-layer';

    const currentConfig = LAYER_CONFIGS[config.layer];
    if (!currentConfig) return;

    const yearKey = config.year;

    if (MONTHLY_DATES.includes(yearKey) || currentConfig.type === 'sentinel') {
      const timeRange =
        SENTINEL_DATE_MAP[yearKey] ||
        currentConfig.urls[yearKey] ||
        (Object.values(currentConfig.urls)[0] as string);
      if (!timeRange) return;

      const [startDate, endDate] = timeRange.split('/');
      const body = {
        collections: ['sentinel-2-l2a'],
        datetime: `${startDate}T00:00:00Z/${endDate}T23:59:59Z`,
        query: { 'eo:cloud_cover': { lt: 20 } },
      };

      try {
        const resp = await fetch(PC_MOSAIC_REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await resp.json();
        if (data.searchid) {
          const tileUrl = `${PC_TILE_BASE}/${data.searchid}/WebMercatorQuad/{z}/{x}/{y}@2x.png?${PC_RENDER_PARAMS}`;
          map.addSource(sourceId, {
            type: 'raster',
            tiles: [tileUrl],
            tileSize: 256,
          });
          map.addLayer({
            id: layerId,
            type: 'raster',
            source: sourceId,
            paint: { 'raster-opacity': 1 },
          });
        }
      } catch (err) {
        console.error('Sentinel mosaic error', err);
      }
      return;
    }

    const url =
      currentConfig.urls[yearKey] ||
      (Object.values(currentConfig.urls)[0] as string);

    // Color mapping by panel index (1: Blue, 2: Red, 3: Orange)
    const panelColors = ['#0868ac', '#FF0000', '#F96000'];
    const activeColor = panelColors[panelIndex % panelColors.length];

    // Palettes for light-to-dark variations (for Nightlight or gradients)
    const palettes = [
      ['#f7fbff', '#4292c6', '#2171b5', '#053b81'], // Blue
      ['#fff5f0', '#ef3b2c', '#cb181d', '#99000d'], // Red
      ['#fff5eb', '#f16913', '#d94801', '#6c2202'], // Orange
    ];
    const activePalette = palettes[panelIndex % palettes.length];

    if (currentConfig.type === 'raster') {
      let rasterParams = currentConfig.params;

      if (config.layer === 'nightlight') {
        // For nightlight, use the intensity gradient (0-200) with the panel's palette
        const colorStr = JSON.stringify(activePalette);
        rasterParams = `#color:${colorStr},0,200,c`;
      } else {
        // For categorical rasters, use the specific panel color and respect the value range (e.g., 7,7 for builtup)
        const valRange = currentConfig.params || '1,1';
        rasterParams = `#color:["${activeColor}","${activeColor}"],${valRange}`;
      }

      map.addSource(sourceId, {
        type: 'raster',
        url: `cog://${url}${rasterParams}`,
        tileSize: 128,
      });
      map.addLayer({
        id: layerId,
        type: 'raster',
        source: sourceId,
        paint: { 'raster-opacity': 0.8 },
      });
    } else {
      const httpUrl = url.replace('pmtiles://', '');
      try {
        const p = new PMTiles(httpUrl);
        const metadata = (await p.getMetadata()) as any;
        let sourceLayerName = 'layer';
        if (metadata?.vector_layers?.[0]?.id)
          sourceLayerName = metadata.vector_layers[0].id;

        map.addSource(sourceId, {
          type: 'vector',
          url: `pmtiles://${httpUrl}`,
        });

        if (config.layer === 'roads') {
          map.addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            'source-layer': sourceLayerName,
            paint: { 'line-color': activeColor, 'line-width': 1.5 },
          });
        } else {
          map.addLayer({
            id: layerId,
            type: 'fill',
            source: sourceId,
            'source-layer': sourceLayerName,
            paint: {
              'fill-color': activeColor,
              'fill-opacity': 0.6,
              'fill-outline-color': '#ffffff',
            },
          });
        }
      } catch (e) {
        console.error('Vector load error', e);
      }
    }
  };

  return (
    <div className="relative h-[400px] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden group shadow-sm transition-all hover:shadow-md">
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Overlay Navigation - TOP */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {/* Basemap Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsBasemapOpen(!isBasemapOpen);
                setIsYearOpen(false);
                setIsLayerOpen(false);
              }}
              className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 hover:border-orange-500 transition-all"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black text-gray-700 tracking-tighter uppercase">
                {config.basemap}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform ${isBasemapOpen ? 'rotate-180' : ''}`}
                strokeWidth={3}
              />
            </button>
            {isBasemapOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[120] animate-in fade-in slide-in-from-top-2">
                {[
                  { id: 'grey', label: 'Grey Canvas' },
                  { id: 'satellite', label: 'Satellite' },
                  { id: 'osm', label: 'OSM' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onUpdate({ basemap: item.id as any });
                      setIsBasemapOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-[11px] font-black uppercase rounded-lg transition-colors ${config.basemap === item.id ? 'bg-orange-50 text-[#F96000]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsYearOpen(!isYearOpen);
                setIsBasemapOpen(false);
                setIsLayerOpen(false);
              }}
              className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 hover:border-orange-500 transition-all font-black"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] text-gray-700 font-mono tracking-tighter">
                {config.year}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform ${isYearOpen ? 'rotate-180' : ''}`}
                strokeWidth={3}
              />
            </button>
            {isYearOpen &&
              (() => {
                const isMonthly = panelIndex === 2;
                const options = isMonthly
                  ? MONTHLY_DATES
                  : Object.keys(LAYER_CONFIGS[config.layer]?.urls || {});

                return (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[120] animate-in fade-in slide-in-from-top-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {options.map((y) => (
                      <button
                        key={y}
                        onClick={() => {
                          onUpdate({ year: y });
                          setIsYearOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-[11px] font-black rounded-lg transition-colors font-mono ${config.year === y ? 'bg-orange-50 text-[#F96000]' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                );
              })()}
          </div>

          {/* Layer Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLayerOpen(!isLayerOpen);
                setIsYearOpen(false);
                setIsBasemapOpen(false);
              }}
              className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 hover:border-orange-500 transition-all font-black"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[11px] text-gray-700 tracking-tighter uppercase">
                {LAYER_CONFIGS[config.layer]?.label}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform ${isLayerOpen ? 'rotate-180' : ''}`}
                strokeWidth={3}
              />
            </button>
            {isLayerOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[120] animate-in fade-in slide-in-from-top-2">
                {Object.keys(LAYER_CONFIGS).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onUpdate({ layer: key });
                      setIsLayerOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-[11px] font-black uppercase tracking-tight rounded-lg transition-colors ${config.layer === key ? 'bg-orange-50 text-[#F96000]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {LAYER_CONFIGS[key].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={onRemove}
            className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
