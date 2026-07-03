/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as pmtiles from 'pmtiles';

// Set up PMTiles protocol
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

interface SatelliteMapProps {
  activeLayer?: string;
  selectedYear?: string;
  onDistrictClick?: (data: any) => void;
  gender?: string;
  region?: string;
  onBoundsChange?: (bounds: any) => void;
}

const PMTILES_URL =
  'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/unfpa_od_population_data.pmtiles';

export const SatelliteMap: React.FC<SatelliteMapProps> = ({
  activeLayer,
  selectedYear = '2023',
  onDistrictClick,
  gender = 'All',
  region = 'All',
  onBoundsChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const initialBoundsRef = useRef<maplibregl.LngLatBoundsLike | null>(null);
  const [fieldStats] = useState<any>(null);

  // Use refs for callbacks to avoid closure staleness in map events
  const onDistrictClickRef = useRef(onDistrictClick);
  const onBoundsChangeRef = useRef(onBoundsChange);

  useEffect(() => {
    onDistrictClickRef.current = onDistrictClick;
    onBoundsChangeRef.current = onBoundsChange;
  }, [onDistrictClick, onBoundsChange]);

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

      // Invisible interactive layer for consistent click handling
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
      zoom: 5,
      attributionControl: false,
      interactive: true,
    });

    map.on('load', async () => {
      map.resize();

      try {
        const p = new pmtiles.PMTiles(PMTILES_URL);
        const header = await p.getHeader();
        if (header.minLon !== undefined) {
          const bounds: maplibregl.LngLatBoundsLike = [
            [header.minLon, header.minLat],
            [header.maxLon, header.maxLat],
          ];
          initialBoundsRef.current = bounds;
          map.fitBounds(bounds, { padding: 40, duration: 0 }); // Less padding for this smaller view?
        }
      } catch (e) {
        console.warn('Could not auto-center from PMTiles header', e);
      }

      setupPopulationLayer(map);
    });

    mapRef.current = map;

    return () => {
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
        propName = `male_${selectedYear}`;
        scaleValues = [45, 50, 55];
      } else if (gender === 'Female') {
        propName = `female_${selectedYear}`;
        scaleValues = [45, 50, 55];
      } else {
        propName = `pop_${selectedYear}_sum`;
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

  const handleReset = () => {
    if (mapRef.current && initialBoundsRef.current) {
      mapRef.current.fitBounds(initialBoundsRef.current, {
        padding: 40,
        duration: 1000,
      });
      if (onBoundsChangeRef.current) {
        onBoundsChangeRef.current(null);
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
    </div>
  );
};
