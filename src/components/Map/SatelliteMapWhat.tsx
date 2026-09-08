/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';
import { X } from 'lucide-react';

// Set up PMTiles protocol
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

interface SatelliteMapProps {
  activeLayer?: string;
  selectedYear?: string;
  onDistrictClick?: (data: any) => void;
  onChangeFeatureClick?: (data: any) => void;
  onAnalysisFeaturesLoad?: (features: any[]) => void;
  selectedFeatureId?: number | null;
  gender?: string;
  region?: string;
  onBoundsChange?: (bounds: any) => void;
  tabContent?: { id: number; title: string; desc: string }[];
}

const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/unfpa_od_population_data.pmtiles';
const PMTILES_URL_CHANGE =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_change_analysis.pmtiles';

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

export const SatelliteMapWhat: React.FC<SatelliteMapProps> = ({
  activeLayer,
  selectedYear = '2023',
  onDistrictClick,
  onChangeFeatureClick,
  onAnalysisFeaturesLoad,
  selectedFeatureId,
  gender = 'All',
  region = 'All',
  onBoundsChange,
  tabContent,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const initialBoundsRef = useRef<maplibregl.LngLatBoundsLike | null>(null);
  const [fieldStats] = useState<any>(null);
  const popupsRef = useRef<maplibregl.Popup[]>([]);

  // Use refs for callbacks to avoid closure staleness in map events
  const onDistrictClickRef = useRef(onDistrictClick);
  const onChangeFeatureClickRef = useRef(onChangeFeatureClick);
  const onAnalysisFeaturesLoadRef = useRef(onAnalysisFeaturesLoad);
  const onBoundsChangeRef = useRef(onBoundsChange);
  const tabContentRef = useRef(tabContent);

  useEffect(() => {
    tabContentRef.current = tabContent;
  }, [tabContent]);

  const [imageModal, setImageModal] = useState<{
    id: number;
    title: string;
    desc: string;
  } | null>(null);

  // Bind window method for popup button clicks
  useEffect(() => {
    (window as any).showMapImage = (id: number) => {
      const item = tabContentRef.current?.find(
        (c) => String(c.id) === String(id),
      );
      setImageModal({
        id,
        title: item?.title || `Analysis ${id}`,
        desc:
          item?.desc ||
          'Satellite imagery analysis displaying significant structural changes.',
      });
    };
    return () => {
      delete (window as any).showMapImage;
    };
  }, []);

  useEffect(() => {
    onDistrictClickRef.current = onDistrictClick;
    onChangeFeatureClickRef.current = onChangeFeatureClick;
    onAnalysisFeaturesLoadRef.current = onAnalysisFeaturesLoad;
    onBoundsChangeRef.current = onBoundsChange;
  }, [
    onDistrictClick,
    onChangeFeatureClick,
    onAnalysisFeaturesLoad,
    onBoundsChange,
  ]);

  // Basemap style definitions
  const SATELLITE_STYLE = {
    version: 8,
    glyphs: 'https://basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf',
    sources: {
      'esri-satellite': {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        attribution: '© Esri, Maxar, Earthstar Geographics',
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#000',
        },
      },
      {
        id: 'esri-satellite-layer',
        type: 'raster',
        source: 'esri-satellite',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };

  // Consolidate Layer and Event Setup
  const setupPopulationLayer = (map: MapLibreMap) => {
    // Ensure source exists
    if (!map.getSource('population-source')) {
      map.addSource('population-source', {
        type: 'vector',
        url: `pmtiles://${PMTILES_URL}`,
      });
    }

    // Ensure layer exists
    if (!map.getLayer('districts-fill')) {
      let propExpr: any = ['get', `pop_${selectedYear}_sum`];
      let scaleValues = [0, 1000000, 2000000];

      if (gender === 'Male') propExpr = ['get', `male_${selectedYear}`];
      else if (gender === 'Female')
        propExpr = ['get', `female_${selectedYear}`];

      if (gender !== 'All') scaleValues = [0, 50, 100];

      map.addLayer({
        id: 'districts-fill',
        type: 'fill',
        source: 'population-source',
        'source-layer': 'zcta',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            propExpr,
            scaleValues[0],
            '#FEF2E8',
            scaleValues[1],
            '#F58220',
            scaleValues[2],
            '#D66B12',
          ],
          'fill-opacity': 0.9,
          'fill-outline-color': '#FFFFFF',
        },
        layout: {
          visibility: activeLayer === 'population' ? 'visible' : 'none',
        },
      });

      // Add a dedicated border layer for better visibility on satellite
      map.addLayer({
        id: 'districts-border',
        type: 'line',
        source: 'population-source',
        'source-layer': 'zcta',
        paint: {
          'line-color': '#FFFFFF',
          'line-width': 0.8,
          'line-opacity': 0.8,
        },
        layout: {
          visibility: activeLayer === 'population' ? 'visible' : 'none',
        },
      });

      // Invisible interactive layer for consistent click handling on districts
      map.addLayer({
        id: 'districts-interactive',
        type: 'fill',
        source: 'population-source',
        'source-layer': 'zcta',
        paint: {
          'fill-opacity': 0,
          'fill-color': '#FFFFFF',
        },
      });

      // Add change analysis layer
      if (!map.getSource('change-analysis-source')) {
        map.addSource('change-analysis-source', {
          type: 'vector',
          url: `pmtiles://${PMTILES_URL_CHANGE}`,
        });
      }

      if (!map.getLayer('change-analysis-border')) {
        map.addLayer({
          id: 'change-analysis-border',
          type: 'line',
          source: 'change-analysis-source',
          'source-layer': 'zcta',
          paint: {
            'line-color': [
              'match',
              ['get', 'id'],
              1,
              '#ff0000',
              2,
              '#0000ff',
              3,
              '#00ff00',
              4,
              '#A3D977',
              5,
              '#F28E2B',
              6,
              '#6F4E7C',
              7,
              '#17A398',
              8,
              '#E94F37',
              9,
              '#4C78A8',
              10,
              '#B279A2',
              '#ffffff',
            ],
            'line-width': 2,
          },
        });

        // Invisible thicker layer for easier clicking
        map.addLayer({
          id: 'change-analysis-interactive',
          type: 'line',
          source: 'change-analysis-source',
          'source-layer': 'zcta',
          paint: {
            'line-width': 10,
            'line-opacity': 0,
          },
        });

        map.on('click', 'change-analysis-interactive', (e) => {
          if (e.features && e.features.length > 0) {
            const props = e.features[0].properties;
            if (onChangeFeatureClickRef.current) {
              onChangeFeatureClickRef.current(props);
            }
          }
        });

        map.on('mouseenter', 'change-analysis-interactive', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'change-analysis-interactive', () => {
          map.getCanvas().style.cursor = '';
        });

        map.once('sourcedata', (e) => {
          if (e.sourceId === 'change-analysis-source' && e.isSourceLoaded) {
            const features = map.querySourceFeatures('change-analysis-source', {
              sourceLayer: 'zcta',
            });

            const mappedFeatures: Record<number, any> = {};

            features.forEach((f) => {
              if (f.properties && f.properties.id) {
                mappedFeatures[f.properties.id] = f.properties;
              }
            });

            const items = Object.values(mappedFeatures).sort(
              (a: any, b: any) => Number(a.id) - Number(b.id),
            );

            if (items.length > 0 && onAnalysisFeaturesLoadRef.current) {
              onAnalysisFeaturesLoadRef.current(items);
            }
          }
        });

        map.once('idle', () => {
          if (!map.getLayer('change-analysis-border')) return;

          // 🔥 Clear existing popups first
          popupsRef.current.forEach((p) => p.remove());
          popupsRef.current = [];

          const features = map.querySourceFeatures('change-analysis-source', {
            sourceLayer: 'zcta',
          });

          if (!features.length) return;

          const unique: Record<number, any> = {};

          features.forEach((f) => {
            if (f.properties?.id) {
              unique[f.properties.id] = f;
            }
          });

          Object.values(unique).forEach((f: any) => {
            if (!f.geometry) return;

            const bounds = new maplibregl.LngLatBounds();

            const processCoords = (coords: any) => {
              if (Array.isArray(coords[0])) {
                coords.forEach((c: any) => processCoords(c));
              } else {
                bounds.extend(coords as [number, number]);
              }
            };

            processCoords((f.geometry as any).coordinates);

            if (!bounds.isEmpty()) {
              const center = bounds.getCenter();
              const props = f.properties;
              const item = tabContentRef.current?.find(
                (c) => String(c.id) === String(props.id),
              );
              const popupTitle =
                item?.title || props.title || `Analysis ${props.id}`;

              const popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                focusAfterOpen: false,
                className: 'analysis-popup',
                offset: 12,
              })
                .setLngLat(center)
                .setHTML(
                  `
                                    <div style="
                                        padding: 16px;
                                        border-radius: 24px;
                                        min-width: 260px;
                                        max-width: 320px;
                                        background: rgba(255,255,255,0.9);
                                        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                                    ">
                                        <h4 style="
                                            margin: 0 0 6px 0;
                                            font-size: 10px;
                                            font-weight: 700;
                                        ">
                                            ${popupTitle}
                                        </h4>
                                        <div style="margin-top: 10px; display: flex;">
                                            <button
                                                style="
                                                    padding: 6px 14px;
                                                    background: #F58220;
                                                    color: white;
                                                    border: none;
                                                    border-radius: 6px;
                                                    font-size: 11px;
                                                    font-weight: bold;
                                                    cursor: pointer;
                                                    box-shadow: 0 2px 4px rgba(245, 130, 32, 0.3);
                                                    transition: all 0.2s ease;
                                                "
                                                onclick="window.showMapImage(${props.id})"
                                            >
                                                View Image
                                            </button>
                                        </div>
                                    </div>
                                `,
                )

                .addTo(map);

              popupsRef.current.push(popup);
            }
          });
        });
      }

      // Click Handler with Zoom logic - attached to interactive layer
      map.on('click', 'districts-interactive', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const props = feature.properties;

          if (onDistrictClickRef.current) onDistrictClickRef.current(props);

          if (feature.geometry) {
            const bounds = new maplibregl.LngLatBounds();
            const processCoords = (coords: any) => {
              if (Array.isArray(coords[0])) {
                coords.forEach((c: any) => processCoords(c));
              } else {
                bounds.extend(coords as [number, number]);
              }
            };
            processCoords((feature.geometry as any).coordinates);
            if (!bounds.isEmpty()) {
              console.log('Broadcasting bounds:', bounds.toArray());
              map.fitBounds(bounds, {
                padding: 80,
                duration: 1200,
                essential: true,
              });
              // Notify parent of new bounds
              if (onBoundsChangeRef.current) {
                onBoundsChangeRef.current(bounds.toArray());
              }
            }
          }
        }
      });

      map.on('mouseenter', 'districts-interactive', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'districts-interactive', () => {
        map.getCanvas().style.cursor = '';
      });
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: SATELLITE_STYLE as any,
      center: [85.8245, 20.2961], // Default Odisha center
      zoom: 10,
      attributionControl: false,
      interactive: true,
    });

    map.on('load', async () => {
      map.resize();

      try {
        const p = new pmtiles.PMTiles(PMTILES_URL_CHANGE);
        const header = await p.getHeader();
        if (header.minLon !== undefined && header.maxLat !== undefined) {
          const bounds: maplibregl.LngLatBoundsLike = [
            [header.minLon, header.minLat],
            [header.maxLon, header.maxLat],
          ];
          initialBoundsRef.current = bounds;
          map.fitBounds(bounds, { padding: 60, duration: 1500, maxZoom: 14 });
        }
      } catch (e) {
        console.warn('Could not auto-center from PMTiles header', e);
      }

      setupPopulationLayer(map);
    });

    mapRef.current = map;

    return () => {
      popupsRef.current.forEach((p) => p.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Layer visibility
  useEffect(() => {
    if (mapRef.current?.getLayer('districts-fill')) {
      mapRef.current.setLayoutProperty(
        'districts-fill',
        'visibility',
        activeLayer === 'population' ? 'visible' : 'none',
      );
    }
    if (mapRef.current?.getLayer('districts-border')) {
      mapRef.current.setLayoutProperty(
        'districts-border',
        'visibility',
        activeLayer === 'population' ? 'visible' : 'none',
      );
    }
  }, [activeLayer]);

  // Handle Year/Gender change visualization
  useEffect(() => {
    if (mapRef.current?.getLayer('districts-fill')) {
      let propName: string;
      let scaleValues: number[];

      if (gender === 'Male') {
        propName = `male_${selectedYear} `;
        scaleValues = [45, 50, 55];
      } else if (gender === 'Female') {
        propName = `female_${selectedYear} `;
        scaleValues = [45, 50, 55];
      } else {
        propName = `pop_${selectedYear} _sum`;
        scaleValues = [100000, 1000000, 2500000];
      }

      if (fieldStats && fieldStats[propName]) {
        const stats = fieldStats[propName];
        if (stats.min !== undefined && stats.max !== undefined) {
          const min = Number(stats.min);
          const max = Number(stats.max);
          scaleValues = [min, min + (max - min) / 2, max];
        }
      }

      mapRef.current.setPaintProperty('districts-fill', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', propName],
        scaleValues[0],
        '#FEF2E8',
        scaleValues[1],
        '#F58220',
        scaleValues[2],
        '#D66B12',
      ]);

      mapRef.current.setLayoutProperty(
        'districts-fill',
        'visibility',
        activeLayer === 'population' ? 'visible' : 'none',
      );
    }
  }, [selectedYear, gender, activeLayer, fieldStats]);

  // Handle Region Filtering
  useEffect(() => {
    if (mapRef.current?.getLayer('districts-fill')) {
      const filter =
        region === 'All' ? null : ['==', ['get', 'region'], region];
      mapRef.current.setFilter('districts-fill', filter as any);
      if (mapRef.current?.getLayer('districts-border')) {
        mapRef.current.setFilter('districts-border', filter as any);
      }
    }
  }, [region]);

  // Handle specific feature zoom
  useEffect(() => {
    if (
      !mapRef.current ||
      selectedFeatureId === undefined ||
      selectedFeatureId === null
    )
      return;

    const map = mapRef.current;
    if (!map.getLayer('change-analysis-border')) return;

    const features = map.querySourceFeatures('change-analysis-source', {
      sourceLayer: 'zcta',
      filter: ['==', ['get', 'id'], selectedFeatureId],
    });

    if (features.length > 0) {
      const bounds = new maplibregl.LngLatBounds();

      features.forEach((feature) => {
        if (feature.geometry) {
          const processCoords = (coords: any) => {
            if (Array.isArray(coords[0])) {
              coords.forEach((c: any) => processCoords(c));
            } else if (
              typeof coords[0] === 'number' &&
              typeof coords[1] === 'number'
            ) {
              bounds.extend(coords as [number, number]);
            }
          };
          processCoords((feature.geometry as any).coordinates);
        }
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 80, duration: 1200 });
      }
    }
  }, [selectedFeatureId]);

  const handleReset = () => {
    if (mapRef.current && initialBoundsRef.current) {
      mapRef.current.fitBounds(initialBoundsRef.current, {
        padding: 40,
        duration: 1000,
      });
      if (onBoundsChangeRef.current) {
        onBoundsChangeRef.current(null);
      }
      if (onChangeFeatureClickRef.current) {
        onChangeFeatureClickRef.current(null);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all shadow-lg"
        title="Reset View"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>

      {/* Image Modal */}
      {imageModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
            {/* Close button overlay */}
            <button
              onClick={() => setImageModal(null)}
              className="absolute top-4 right-4 z-[2010] w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#F58220] text-white rounded-full transition-colors backdrop-blur-sm group border border-white/20"
              title="Close"
            >
              <X className="w-5 h-5 scale-100 group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex-1 w-full md:w-2/3 relative flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-white/10 min-h-[300px]">
              <img
                src={imageMap[imageModal.id]}
                alt={imageModal.title}
                className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="w-full md:w-1/3 p-6 md:p-8 text-white flex flex-col overflow-y-auto">
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight leading-tight">
                {imageModal.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-300">
                {imageModal.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
