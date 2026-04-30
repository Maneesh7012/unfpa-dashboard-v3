/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Protocol as PMTilesProtocol, PMTiles } from 'pmtiles';
import {
  cogProtocol,
  setColorFunction,
} from '@geomatico/maplibre-cog-protocol';
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
// ✅ NIGHTLIGHT QUARTERLY CONFIG
// ----------------------
// Quarter labels shown in the dropdown → mapped to q1/q2/q3/q4 in the URL
// Format: "YYYY March" = q1, "YYYY June" = q2, "YYYY September" = q3, "YYYY December" = q4
const NTL_QUARTER_LABEL_MAP: Record<string, string> = {
  March: 'q1',
  June: 'q2',
  September: 'q3',
  December: 'q4',
};

const NTL_QUARTER_MONTHS = ['March', 'June', 'September', 'December'];
const NTL_YEARS = Array.from({ length: 2026 - 2018 + 1 }, (_, i) =>
  (2018 + i).toString(),
);

// All dropdown options for nightlight: ["2018 March", "2018 June", ..., "2026 March"]
// Note: 2026 only has q1 data (March), so other quarters are excluded for that year
const NTL_YEAR_OPTIONS: string[] = NTL_YEARS.flatMap((year) => {
  const months = year === '2026' ? ['March'] : NTL_QUARTER_MONTHS;
  return months.map((month) => `${year} ${month}`);
});

// Build the nightlight URL given the dropdown value (e.g. "2018 March") and district name
const buildNtlUrl = (yearLabel: string, district: string): string => {
  const [year, month] = yearLabel.split(' ');
  const quarter = NTL_QUARTER_LABEL_MAP[month] || 'q1';
  const districtName = district || 'Anugul';
  return `${BASE_URL}/ntl/${districtName}/${districtName}_${year}_${quarter}_ntl.tif`;
};

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

const GHSL_YEARS = ['2010', '2015', '2020', '2025', '2030'];
const GHSL_CLASSES: any = {
  '10': { label: 'Water surface', color: '#4a90d9' },
  '11': { label: 'Very low density rural', color: '#d9d9b3' },
  '12': { label: 'Low density rural', color: '#cccc66' },
  '13': { label: 'Rural cluster', color: '#a3a347' },
  '21': { label: 'Suburban / peri-urban', color: '#ffaa00' },
  '22': { label: 'Semi-dense urban cluster', color: '#ff5500' },
  '23': { label: 'Dense urban cluster', color: '#cc0000' },
  '30': { label: 'Urban centre', color: '#660000' },
};

const buildGhslUrl = (year: string, district: string): string => {
  const districtName = district || 'Anugul';
  return `${BASE_URL}/ghsl_cog/${districtName}/${year}.tif`;
};

// ----------------------
// ✅ YEAR RANGES
// ----------------------
const YEARS = {
  // nightlight no longer uses static urls — handled dynamically via buildNtlUrl
  roads: generateYears(2014, 2025),
  builtup: generateYears(2017, 2025),
};

// ----------------------
// ✅ LAYER CONFIGS (AUTOMATED)
// ----------------------
const LAYER_CONFIGS: any = {
  nightlight: {
    label: 'Nightlight',
    // urls are NOT used for nightlight anymore — built dynamically per district
    // We keep a placeholder so year-validation logic knows available options
    urls: Object.fromEntries(NTL_YEAR_OPTIONS.map((opt) => [opt, ''])),
    params:
      '#color:["#000000","#333333","#663300","#ccaa00","#ffff00"],0,200,c',
    type: 'raster',
    isNightlight: true, // flag to trigger dynamic URL build
  },

  roads: {
    label: 'Road Network',
    urls: buildYearlyUrls(
      `${BASE_URL}/roads`,
      'district_0_roads',
      'pmtiles',
      YEARS.roads,
    ),
    params: '',
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

  ghsl: {
    label: 'Settlement',
    urls: Object.fromEntries(GHSL_YEARS.map((y) => [y, ''])),
    type: 'raster',
    isGhsl: true,
  },
};

const ROAD_CATEGORIES = [
  {
    label: 'National Highway',
    values: ['trunk', 'primary', 'trunk_link', 'primary_link'],
    color: '#ef4444',
    width: 2.5,
  },
  {
    label: 'State Highway',
    values: ['secondary', 'secondary_link'],
    color: '#f59e0b',
    width: 2.0,
  },
  {
    label: 'Major Roads',
    values: ['tertiary', 'tertiary_link'],
    color: '#10b981',
    width: 1.5,
  },
  {
    label: 'Local Roads',
    values: ['residential', 'living_street', 'unclassified', 'road'],
    color: '#94a3b8',
    width: 1.0,
  },
];

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

const getEffectiveStyle = () => BASE_MAP_STYLE;

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
      year: propActiveLayer === 'nightlight' ? '2018 March' : '2017',
      layer: propActiveLayer || 'builtup',
      basemap: 'grey',
    },
    {
      id: 'map-2',
      year: propActiveLayer === 'nightlight' ? '2026 March' : '2025',
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

  useEffect(() => {
    if (propActiveLayer) {
      setMapConfigs((prev) =>
        prev.map((m, idx) => {
          let year = m.year;
          if (idx === 0) {
            year = propActiveLayer === 'nightlight' ? '2018 March' : '2017';
          } else if (idx === 1) {
            year = propActiveLayer === 'nightlight' ? '2026 March' : '2025';
          } else {
            // For 3rd map or others, default to a sensible middle/latest
            year = propActiveLayer === 'nightlight' ? '2026 March' : '2024';
          }
          return { ...m, layer: propActiveLayer, year };
        }),
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
        .catch(() => {});
    }
  }, []);

  const lastFittedRef = useRef<string>('');

  // Reset maps count and instances when district changes to handle re-mounting
  useEffect(() => {
    setMapsLoadedCount(0);
    mapInstances.current.clear();
  }, [selectedDistrict]);

  useEffect(() => {
    // Determine the best bounds to use
    let boundsToUse = targetBounds || sharedInitialBoundsRef.current;

    // Create a fingerprint of the current state that should trigger a refocus
    const layerFingerprint = mapConfigs.map((m) => m.layer).join('|');
    const refocusFingerprint = `${selectedDistrict || 'odisha'}_${layerFingerprint}`;

    // Only refocus if the district or any layer has changed
    if (refocusFingerprint === lastFittedRef.current) return;

    const performFit = (bounds: maplibregl.LngLatBoundsLike) => {
      mapInstances.current.forEach((map) => {
        if (map.isStyleLoaded()) {
          map.fitBounds(bounds, {
            padding: 40,
            duration: 1200,
            essential: true,
          });
        } else {
          map.once('load', () => {
            map.fitBounds(bounds, { padding: 40, duration: 1200 });
          });
        }
      });
    };

    const tryFitFromFeatures = (map: maplibregl.Map) => {
      const features = map.querySourceFeatures('districts-source', {
        sourceLayer: 'zcta',
        filter: [
          'any',
          ['==', ['get', 'district_name'], selectedDistrict || ''],
          ['==', ['get', 'DIST_NAME'], selectedDistrict || ''],
          ['==', ['get', 'District'], selectedDistrict || ''],
          ['==', ['get', 'NAME'], selectedDistrict || ''],
          ['==', ['get', 'name'], selectedDistrict || ''],
          ['==', ['get', 'district'], selectedDistrict || ''],
        ],
      });

      if (features && features.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        features.forEach((f: any) => {
          if (f.geometry?.type === 'Polygon') {
            f.geometry.coordinates[0].forEach((coord: any) =>
              bounds.extend(coord as [number, number]),
            );
          } else if (f.geometry?.type === 'MultiPolygon') {
            f.geometry.coordinates.forEach((poly: any) => {
              poly[0].forEach((coord: any) =>
                bounds.extend(coord as [number, number]),
              );
            });
          }
        });
        if (!bounds.isEmpty()) {
          const bArr = bounds.toArray() as any;
          performFit(bArr);
          return true;
        }
      }
      return false;
    };

    // If we have an explicit district, try to find its bounds
    if (selectedDistrict && selectedDistrict !== 'Odisha') {
      const anyMap = Array.from(mapInstances.current.values())[0];
      if (anyMap) {
        if (anyMap.isStyleLoaded()) {
          const success = tryFitFromFeatures(anyMap);
          if (!success) {
            // Wait for idle and try again
            anyMap.once('idle', () => tryFitFromFeatures(anyMap));
          }
        } else {
          anyMap.once('load', () => {
            anyMap.once('idle', () => tryFitFromFeatures(anyMap));
          });
        }
      }
    }

    if (boundsToUse) {
      performFit(boundsToUse);
    }
  }, [targetBounds, mapsLoadedCount, selectedDistrict, mapConfigs]);

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
          <div
            key={`${config.id}-${selectedDistrict}`}
            className="min-w-[450px] flex-1"
          >
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
                  map.jumpTo({
                    center: firstMap.getCenter(),
                    zoom: firstMap.getZoom(),
                    bearing: firstMap.getBearing(),
                    pitch: firstMap.getPitch(),
                  });
                } else if (targetBounds) {
                  map.fitBounds(targetBounds, { padding: 40, duration: 0 });
                } else if (sharedInitialBoundsRef.current) {
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
          <div className="min-w-[450px] max-w-[450px] h-[600px] bg-white rounded-2xl border-2 border-dashed border-orange-100 p-8 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-2">
              <Plus className="w-8 h-8 text-[#F96000]" strokeWidth={2.5} />
            </div>

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
                        layer === 'nightlight'
                          ? '2026 March'
                          : pendingConfig.year.includes(' ')
                            ? '2024'
                            : pendingConfig.year;

                      setPendingConfig({ layer, year: defaultYear });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[13px] font-black text-gray-700 focus:ring-2 focus:ring-orange-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    {/* Existing options */}
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
                    {pendingConfig.layer === 'degree_urbanization'
                      ? MONTHLY_DATES.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))
                      : pendingConfig.layer === 'nightlight'
                        ? NTL_YEAR_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))
                        : pendingConfig.layer === 'ghsl'
                          ? GHSL_YEARS.map((y) => (
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

  const NTL_CLASSES = [
    { label: '< 5', min: 0, max: 5, color: '#000000' },
    { label: '5 - 25', min: 5, max: 25, color: '#48485d' },
    { label: '26 - 50', min: 26, max: 50, color: '#f6eaaf' },
    { label: '> 50', min: 50, max: 9999, color: '#fe0000' },
    { label: 'No Data', noData: true, color: '#b44ef1' },
  ];

  const classifyNtl = (val: number): string => {
    if (val == null || Number.isNaN(val)) return '#b44ef1';
    if (val < 5) return '#000000';
    if (val <= 25) return '#48485d';
    if (val <= 50) return '#f6eaaf';
    return '#fe0000';
  };

  // const palettes = [
  //   ['#f7fbff', '#4292c6', '#2171b5', '#053b81'],
  //   ['#fff5f0', '#ef3b2c', '#cb181d', '#99000d'],
  //   ['#fff5eb', '#f16913', '#d94801', '#6c2202'],
  // ];

  // const activePalette = palettes[panelIndex % palettes.length];
  const panelColors = ['#0868ac', '#FF0000', '#F96000'];
  const activeColor = panelColors[panelIndex % panelColors.length];

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
          console.log('e', e);
        }
      }
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

  useEffect(() => {
    applyMaskStatus();
  }, [selectedDistrict, config.basemap]);

  const applyMaskStatus = () => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer('districts-mask')) return;
    const getMaskColor = () => {
      if (config.basemap === 'satellite') return '#000000';
      return '#ffffffff';
    };

    map.setPaintProperty('districts-mask', 'fill-color', getMaskColor());
    map.setPaintProperty('districts-mask', 'fill-opacity', 0);

    if (map.getLayer('selected-district-outline')) {
      map.setFilter('selected-district-outline', [
        'any',
        ['==', ['get', 'district_name'], selectedDistrict || ''],
        ['==', ['get', 'DIST_NAME'], selectedDistrict || ''],
        ['==', ['get', 'District'], selectedDistrict || ''],
        ['==', ['get', 'NAME'], selectedDistrict || ''],
        ['==', ['get', 'name'], selectedDistrict || ''],
        ['==', ['get', 'district'], selectedDistrict || ''],
      ]);
    }
  };

  useEffect(() => {
    const currentLayerConfig = LAYER_CONFIGS[config.layer];
    if (currentLayerConfig) {
      const isMonthlyRequest = panelIndex === 2;
      const availableYears = Object.keys(currentLayerConfig.urls);

      if (isMonthlyRequest) {
        if (!MONTHLY_DATES.includes(config.year)) {
          onUpdate({ year: '01-01-2026' });
          return;
        }
      } else if (config.layer === 'nightlight') {
        // For nightlight, validate against NTL_YEAR_OPTIONS
        if (!NTL_YEAR_OPTIONS.includes(config.year)) {
          onUpdate({ year: '2026 March' });
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

  // Re-render nightlight layer when selectedDistrict changes (URL depends on district)
  useEffect(() => {
    if (config.layer === 'nightlight') {
      refreshMapContent();
    }
  }, [selectedDistrict]);

  const refreshMapContent = async () => {
    setIsLoading(true);
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const layersToClean = [
      'data-layer',
      'districts-mask',
      'districts-outline',
      'selected-district-outline',
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

      await addDataOverlay(map);
      addVectorOutlines(map);
    } catch (err) {
      console.error('Error refreshing map content:', err);
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

      // ✅ Add highlighted boundary for selected district
      map.addLayer({
        id: 'selected-district-outline',
        type: 'line',
        source: 'districts-source',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#F96000',
          'line-width': 2.5,
          'line-opacity': 1.0,
        },
        filter: [
          'any',
          ['==', ['get', 'district_name'], selectedDistrict || ''],
          ['==', ['get', 'DIST_NAME'], selectedDistrict || ''],
          ['==', ['get', 'District'], selectedDistrict || ''],
          ['==', ['get', 'NAME'], selectedDistrict || ''],
          ['==', ['get', 'name'], selectedDistrict || ''],
          ['==', ['get', 'district'], selectedDistrict || ''],
        ],
      });
    } else if (map.getLayer('selected-district-outline')) {
      // If source exists but district changed, update filter
      map.setFilter('selected-district-outline', [
        'any',
        ['==', ['get', 'district_name'], selectedDistrict || ''],
        ['==', ['get', 'DIST_NAME'], selectedDistrict || ''],
        ['==', ['get', 'District'], selectedDistrict || ''],
        ['==', ['get', 'NAME'], selectedDistrict || ''],
        ['==', ['get', 'name'], selectedDistrict || ''],
        ['==', ['get', 'district'], selectedDistrict || ''],
      ]);
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

    if (currentConfig.type === 'raster') {
      let rasterParams = currentConfig.params;
      let url: string;

      if (config.layer === 'nightlight') {
        // ✅ Build dynamic URL from district + quarterly label
        url = buildNtlUrl(yearKey, selectedDistrict || 'Anugul');
        rasterParams = ''; // Colors handled by setColorFunction (class-based)

        setColorFunction(url, (pixel: any, color: any, metadata: any) => {
          const val = pixel[0];
          const nd = metadata?.noData;
          if (
            val == null ||
            Number.isNaN(val) ||
            (nd != null && val === nd) ||
            val === 0
          ) {
            // leave pixel as the default transparent (rgba buffer is pre-zeroed)
            return;
          }
          const hex = classifyNtl(val).replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          color.set([r, g, b, 255]);
        });
      } else if (config.layer === 'ghsl') {
        url = buildGhslUrl(yearKey, selectedDistrict || 'Anugul');
        rasterParams = ''; // Colors handled by setColorFunction

        // Register color function for this specific COG URL
        setColorFunction(url, (pixel: any, color: any) => {
          const val = pixel[0];
          const cls = GHSL_CLASSES[val.toString()];
          if (cls) {
            // Convert hex to RGB for the color.set([r, g, b, a]) method
            const hex = cls.color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            color.set([r, g, b, 255]);
          } else {
            color.set([0, 0, 0, 0]);
          }
        });
      } else {
        url =
          currentConfig.urls[yearKey] ||
          (Object.values(currentConfig.urls)[0] as string);
        const valRange = currentConfig.params || '1,1';
        rasterParams = `#color:["${activeColor}","${activeColor}"],${valRange}`;
      }

      map.addSource(sourceId, {
        type: 'raster',
        url: `cog://${url}${rasterParams}`,
        tileSize: 256,
      });
      map.addLayer({
        id: layerId,
        type: 'raster',
        source: sourceId,
        paint: { 'raster-opacity': 0.8 },
      });
    } else {
      const url =
        currentConfig.urls[yearKey] ||
        (Object.values(currentConfig.urls)[0] as string);
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
            paint: {
              'line-color': [
                'match',
                ['get', 'highway'],
                ['trunk', 'primary', 'trunk_link', 'primary_link'],
                '#ef4444',
                ['secondary', 'secondary_link'],
                '#f59e0b',
                ['tertiary', 'tertiary_link'],
                '#10b981',
                ['residential', 'living_street', 'unclassified', 'road'],
                '#94a3b8',
                activeColor,
              ],
              'line-width': [
                'match',
                ['get', 'highway'],
                ['trunk', 'primary'],
                2.5,
                ['secondary'],
                2,
                ['tertiary'],
                1.5,
                1,
              ],
            },
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

        // Add click listener to log features for built-up area only
        map.on('click', (e) => {
          if (config.layer === 'builtup') {
            const features = map.queryRenderedFeatures(e.point, {
              layers: [layerId],
            });
            console.log(
              `Built-up Area features at point:`,
              features.map((f) => f.properties),
            );
          }
        });
      } catch (e) {
        console.error('Vector load error', e);
      }
    }
  };

  // Compute dropdown options for the year selector in this panel
  const getYearOptions = (): string[] => {
    if (panelIndex === 2) return MONTHLY_DATES;
    if (config.layer === 'nightlight') return NTL_YEAR_OPTIONS;
    return Object.keys(LAYER_CONFIGS[config.layer]?.urls || {});
  };

  return (
    <div className="relative h-[600px] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden group shadow-sm transition-all hover:shadow-md">
      <div ref={containerRef} className="w-full h-full" />

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
              <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[150] animate-in fade-in slide-in-from-top-2">
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

          {/* Year / Quarter Selector */}
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
            {isYearOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[150] animate-in fade-in slide-in-from-top-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {getYearOptions().map((y) => (
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
            )}
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
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-1 z-[150] animate-in fade-in slide-in-from-top-2">
                {Object.keys(LAYER_CONFIGS).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      // Synchronize year format when switching layers
                      const nextYear =
                        key === 'nightlight'
                          ? '2026 March'
                          : config.year.includes(' ')
                            ? '2024'
                            : config.year;

                      onUpdate({
                        layer: key,
                        year: nextYear,
                      });
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

      {config.layer === 'nightlight' && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-4 py-3 z-[120] w-[170px]">
          {/* Title + Unit */}
          <div className="flex flex-col mb-2">
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">
              Nightlight Intensity
            </span>
            <span className="text-[9px] text-gray-400 font-medium">
              <span className="text-gray-700">Unit : </span>nW·cm⁻²·sr⁻¹
            </span>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5">
            {NTL_CLASSES.map((cls) => {
              const color = cls.color;

              return (
                <div
                  key={cls.label}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-medium text-gray-700">
                      {cls.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {config.layer === 'ghsl' && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-4 py-3 z-[120] w-[200px]">
          <div className="flex flex-col mb-2">
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">
              Settlement
            </span>
            <span className="text-[9px] text-gray-400 font-medium">
              Source: GHS-SMOD R2023A
            </span>
          </div>

          <div className="space-y-1">
            {Object.entries(GHSL_CLASSES).map(([val, cls]: any) => (
              <div key={val} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-sm border border-gray-100 flex-shrink-0"
                  style={{ backgroundColor: cls.color }}
                />
                <span className="text-[9px] font-medium text-gray-600 leading-tight">
                  {cls.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {config.layer === 'roads' && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-4 py-3 z-[120] w-[180px]">
          <div className="flex flex-col mb-2">
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">
              Road Network
            </span>
          </div>
          <div className="space-y-1.5">
            {ROAD_CATEGORIES.map((cat) => (
              <div key={cat.label} className="flex items-center gap-2">
                <div
                  className="w-4 h-0.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[10px] font-medium text-gray-700">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {config.layer === 'builtup' && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg px-4 py-3 z-[120] w-[160px]">
          <div className="flex flex-col mb-2">
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">
              Built-up Area
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm border border-gray-200"
              style={{ backgroundColor: activeColor }}
            />
            <span className="text-[10px] font-medium text-gray-700">
              Developed Area
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
