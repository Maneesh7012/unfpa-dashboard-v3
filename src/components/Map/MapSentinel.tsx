/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import {
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Home,
  Satellite,
} from 'lucide-react';
import * as pmtiles from 'pmtiles';

// Set up PMTiles protocol
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

// -----------------------------------------------------------
// EOX Sentinel-2 Cloudless WMTS (free, no API key needed)
// Layer format: s2cloudless-{year}_3857
// URL:  https://tiles.maps.eox.at/wmts/1.0.0/{layer}/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg
// Available: 2017–2024. 2025 uses 2024 data with a notice.
// -----------------------------------------------------------

const EOX_BASE = 'https://tiles.maps.eox.at/wmts/1.0.0';

const YEAR_LAYER_MAP: Record<string, { layer: string; label: string }> = {
  '2018': { layer: 's2cloudless-2018_3857', label: '2018' },
  '2019': { layer: 's2cloudless-2019_3857', label: '2019' },
  '2020': { layer: 's2cloudless-2020_3857', label: '2020' },
  '2021': { layer: 's2cloudless-2021_3857', label: '2021' },
  '2022': { layer: 's2cloudless-2022_3857', label: '2022' },
  '2023': { layer: 's2cloudless-2023_3857', label: '2023' },
  '2024': { layer: 's2cloudless-2024_3857', label: '2024' },
};

const YEARS = Object.keys(YEAR_LAYER_MAP);
const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/od_district_pop_total_2036.pmtiles';

const ODISHA_CENTER: [number, number] = [84.8, 20.5];
const ODISHA_BOUNDS: maplibregl.LngLatBoundsLike = [
  [81.3883, 17.8124],
  [87.477, 22.5674],
];

interface MapSentinelProps {
  targetDistrict?: string;
  targetBounds?: any;
}

export const MapSentinel: React.FC<MapSentinelProps> = ({
  targetDistrict = 'Odisha',
  targetBounds,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cacheVersion, setCacheVersion] = useState(0);
  const accumulatedFeaturesRef = useRef<Map<string, any[]>>(new Map());
  const playIntervalRef = useRef<any>(null);
  const [pmtilesBounds, setPmtilesBounds] =
    useState<maplibregl.LngLatBoundsLike | null>(null);

  const getTileUrl = (year: string) => {
    const { layer } = YEAR_LAYER_MAP[year];
    return `${EOX_BASE}/${layer}/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg`;
  };

  const switchLayer = useCallback((year: string) => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    YEARS.forEach((y) => {
      if (map.getLayer(`s2-${y}`)) {
        map.setLayoutProperty(
          `s2-${y}`,
          'visibility',
          y === year ? 'visible' : 'none',
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;

    if (targetBounds) {
      map.fitBounds(targetBounds, {
        padding: 80,
        duration: 1500,
        essential: true,
      });
      return;
    }

    const lookupKey = targetDistrict.toLowerCase();
    let features: any[] = [];

    if (lookupKey === 'odisha') {
      const bounds = pmtilesBounds || ODISHA_BOUNDS;
      map.fitBounds(bounds, { padding: 40, duration: 1500, essential: true });
      return;
    }

    features = accumulatedFeaturesRef.current.get(lookupKey) || [];

    if (features.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      const extend = (coords: any) => {
        if (typeof coords[0] === 'number')
          bounds.extend(coords as [number, number]);
        else coords.forEach(extend);
      };

      features.forEach((f: any) => {
        const geo = f.geometry as any;
        if (geo.coordinates) extend(geo.coordinates);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 40, duration: 1500, essential: true });
      }
    } else {
      // Fallback to static bounds
      const bounds = pmtilesBounds || ODISHA_BOUNDS;
      map.fitBounds(bounds, { padding: 40, duration: 1500, essential: true });
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
        layers: [],
      },
      center: ODISHA_CENTER,
      zoom: 6.2,
      minZoom: 5,
      maxZoom: 14,
      maxBounds: [
        [79.277344, 16.232218],
        [90.0, 24.058806],
      ],
      attributionControl: false,
    });

    map.scrollZoom.enable();

    map.on('load', async () => {
      map.addLayer({
        id: 'background',
        type: 'background',
        paint: { 'background-color': '#1a2535' },
      });

      YEARS.forEach((year) => {
        map.addSource(`s2-source-${year}`, {
          type: 'raster',
          tiles: [getTileUrl(year)],
          tileSize: 256,
          minzoom: 0,
          maxzoom: 14,
          bounds: [79.0, 16.5, 90.0, 24.5],
          attribution: `Sentinel-2 cloudless by <a href="https://eox.at">EOX</a> (CC BY-NC-SA 4.0)`,
        });

        map.addLayer({
          id: `s2-${year}`,
          type: 'raster',
          source: `s2-source-${year}`,
          layout: { visibility: year === '2024' ? 'visible' : 'none' },
          paint: {
            'raster-opacity': 1,
            'raster-fade-duration': 400,
          },
        });
      });

      map.addSource('district-source-sentinel', {
        type: 'vector',
        url: `pmtiles://${PMTILES_URL}`,
      });

      map.addLayer({
        id: 'district-outline-sentinel',
        type: 'line',
        source: 'district-source-sentinel',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1.5,
          'line-opacity': 0.8,
        },
      });

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
        } else {
          map.fitBounds(ODISHA_BOUNDS, { padding: 40, duration: 0 });
        }
      } catch (err) {
        console.warn('Could not fit to PMTiles header', err);
        map.fitBounds(ODISHA_BOUNDS, { padding: 40, duration: 0 });
      }

      setIsLoaded(true);
    });

    // Collect features for zooming
    map.on('sourcedata', (e) => {
      if (e.sourceId === 'district-source-sentinel' && e.isSourceLoaded) {
        const features = map.querySourceFeatures('district-source-sentinel', {
          sourceLayer: 'zcta',
        });
        let hasChanges = false;
        features.forEach((f: any) => {
          const rawName =
            f.properties?.district_name ||
            f.properties?.NAME ||
            f.properties?.name;
          if (rawName) {
            const canonicalName = rawName.toLowerCase();
            if (!accumulatedFeaturesRef.current.has(canonicalName)) {
              accumulatedFeaturesRef.current.set(canonicalName, []);
            }
            const existing = accumulatedFeaturesRef.current.get(canonicalName)!;
            const coords = (f.geometry as any).coordinates
              ?.toString()
              .substring(0, 100);
            if (
              !existing.some(
                (ef: any) =>
                  (ef.geometry as any).coordinates
                    ?.toString()
                    .substring(0, 100) === coords,
              )
            ) {
              existing.push(f);
              hasChanges = true;
            }
          }
        });
        if (hasChanges) setCacheVersion((v) => v + 1);
      }
    });

    mapRef.current = map;

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Playback Logic
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setSelectedYear((prev: string) => {
          const currentIndex = YEARS.indexOf(prev);
          const nextIndex = (currentIndex + 1) % YEARS.length;
          return YEARS[nextIndex];
        });
      }, 2000); // 2 seconds per year
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handleResetView = () => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = pmtilesBounds || ODISHA_BOUNDS;
    map.fitBounds(bounds, { padding: 40, duration: 1500, essential: true });
  };

  useEffect(() => {
    if (!isLoaded) return;
    switchLayer(selectedYear);
  }, [selectedYear, isLoaded, switchLayer]);

  // const yearInfo = YEAR_LAYER_MAP[selectedYear];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Satellite className="w-6 h-6" />
            Satellite Timelapse
          </h2>
          <p className="text-[13px] text-gray-500 mt-1 font-medium leading-relaxed">
            High-resolution Sentinel 2 satellite imagery.
          </p>
        </div>

        {/* Year selector — same style as Comparative Analysis */}
        <div className="flex items-center gap-4 shrink-0 transition-all bg-gray-50/50 p-1.5 px-3 rounded-lg border border-gray-100">
          <div className="relative flex items-center gap-1.5 group">
            <div
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="px-4 py-1.5 text-[12px] font-black tracking-wide bg-white text-gray-600 border border-gray-400 rounded-md transition-all min-w-[70px] flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400"
            >
              <span className="font-mono">{selectedYear}</span>
            </div>
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="text-[#f64e24] transition-all hover:scale-110"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.5}
              />
            </button>

            {isYearDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-[190]"
                  onClick={() => setIsYearDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-3 bg-white rounded-md shadow-xl border border-gray-100 p-3 z-[200] animate-in fade-in slide-in-from-top-2 min-w-[120px] transition-all">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      onClick={() => {
                        setSelectedYear(y);
                        setIsYearDropdownOpen(false);
                      }}
                      className="w-full px-2 py-3 text-left transition-all hover:bg-gray-50/50 group/item flex items-center justify-between rounded"
                    >
                      <span
                        className={`text-xs font-bold tracking-wider border-b-2 pb-0.5 transition-all ${selectedYear === y ? 'text-gray-600 border-gray-400' : 'text-gray-600 border-gray-400'}`}
                      >
                        {y}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl h-[600px] relative">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Playback Controls & Timeline (Floating at Bottom) */}
        {isLoaded && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-[600px] bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-2xl flex items-center gap-6 group transition-all hover:bg-gray-900">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F96000] text-white shadow-lg hover:bg-orange-600 transition-all active:scale-95 shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              )}
            </button>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">
                  Select Year
                </span>
                <span className="text-lg font-black text-white tracking-widest font-mono">
                  {selectedYear}
                </span>
              </div>

              {/* Custom Timeline Slider */}
              <div className="relative h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden flex items-center">
                {/* Track Highlight */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#F96000] transition-all duration-300"
                  style={{
                    width: `${(YEARS.indexOf(selectedYear) / (YEARS.length - 1)) * 100}%`,
                  }}
                />

                {/* Invisible Native Slider for Interaction */}
                <input
                  type="range"
                  min="0"
                  max={YEARS.length - 1}
                  step="1"
                  value={YEARS.indexOf(selectedYear)}
                  onChange={(e) => {
                    const year = YEARS[parseInt(e.target.value)];
                    setSelectedYear(year);
                    setIsPlaying(false);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
              </div>

              {/* Ticks */}
              <div className="flex justify-between px-0.5 mt-1">
                {YEARS.map((y) => (
                  <div
                    key={y}
                    className={`w-0.5 h-1 rounded-full transition-all ${selectedYear === y ? 'bg-white scale-150' : 'bg-white/20'}`}
                    title={y}
                  />
                ))}
              </div>
            </div>

            {/* Reset button if needed or just year list button */}
            <button
              onClick={() => {
                setSelectedYear(YEARS[0]);
                setIsPlaying(false);
              }}
              className="p-2 text-white/40 hover:text-white transition-colors"
              title="Reset to 2017"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Custom Controls (Bottom Right) */}
        <div className="absolute bottom-5 right-5 flex flex-col gap-2 z-[60]">
          {/* Zoom Controls */}
          <button
            onClick={handleResetView}
            className="bg-white/70 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-primary hover:border-primary transition-all active:scale-90"
            title="Reset View"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapRef.current?.zoomIn()}
            className="bg-white/70 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-primary hover:border-primary transition-all active:scale-90"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut()}
            className="bg-white/70 backdrop-blur-md w-9 h-9 flex items-center justify-center rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-primary hover:border-primary transition-all active:scale-90"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-[#F96000] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-black text-white/60 uppercase tracking-widest">
                Loading Sentinel Imagery...
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
