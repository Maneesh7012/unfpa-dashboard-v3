import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import { PMTiles, Protocol as PMTilesProtocol } from 'pmtiles';
import { cogProtocol, locationValues } from '@geomatico/maplibre-cog-protocol';
import 'maplibre-gl/dist/maplibre-gl.css';
import { COMPARATIVE_DATA } from '../../data/comparativeData';
import { DISTRICT_NAME_VARIANTS, DISTRICT_DEMOGRAPHICS, ALLOWED_DISTRICTS, LULC_STATS } from '../../data/comparativeData';
import { X, ChevronRight, Calendar, Layers } from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Label,
} from 'recharts';

const PMTILES_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/od_district_pop_total_2036.pmtiles';
const SUBDISTRICT_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_subdistrict.pmtiles';

const ODISHA_BOUNDS: maplibregl.LngLatBoundsLike = [[81.3883675665129118, 17.8124511673802353], [87.4770036487483651, 22.5674384683253209]];

import { TAB_CONTENT, Points_Data } from './pointData';

const RadianceChart = ({ data }: { data: any[] }) => {
    return (
        <div className="w-full h-[320px] mb-8 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 15, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                        dy={5}
                    >
                        <Label value="Year" position="bottom" offset={10} style={{ fontSize: '11px', fill: '#9CA3AF', fontWeight: 600 }} />
                    </XAxis>
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        domain={[20000, 40000]}
                    >
                        <Label
                            value="Radiance (nW/sr/cm²)"
                            angle={-90}
                            position="insideLeft"
                            offset={10}
                            style={{ fontSize: '11px', fill: '#9CA3AF', textAnchor: 'middle', fontWeight: 600 }}
                        />
                    </YAxis>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                        formatter={(value: any) => [value.toLocaleString(), 'Radiance (nW/sr/cm²)']}
                    />
                    <Line
                        type="monotone"
                        dataKey="Radiance"
                        stroke="#F96000"
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const RadianceTable = ({ data, nameKey, columns }: { data: any[], nameKey: string, columns: string[] }) => {
    const getChartData = (row: any) => {
        return columns.map(year => ({
            year,
            value: Number(String(row[year]).replace(/,/g, ""))
        }));
    };

    return (
        <div className="min-w-full w-full overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full table-fixed divide-y divide-gray-200 text-[11px]">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th rowSpan={2} className="px-3 py-2 text-left bg-gray-100 font-black border-r border-gray-200">
                            {nameKey}
                        </th>
                        <th colSpan={columns.length} className="px-4 py-1.5 text-center bg-gray-100 text-[#F96000] font-black uppercase tracking-tighter border-b border-gray-200">
                            Radiance (nW/sr/cm²)
                        </th>
                        <th rowSpan={2} className="px-3 py-2 text-center bg-gray-100 font-black">
                            Trendline
                        </th>
                    </tr>
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="px-2 py-1 text-center font-bold bg-gray-100 border-r border-gray-200 last:border-r-0 whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-3 py-2 font-bold text-left text-gray-900 border-r border-gray-200 whitespace-nowrap">
                                {row[nameKey]}
                            </td>

                            {columns.map((col) => {
                                const val = Number(String(row[col]).replace(/,/g, ""));
                                return (
                                    <td key={col} className="px-2 py-2 text-center text-gray-600 border-r border-gray-200 last:border-r-0">
                                        {val.toFixed(2)}
                                    </td>
                                );
                            })}

                            < td className="py-1 px-2 text-center bg-gray-50/30">
                                <div className="w-full h-[50px] min-w-[120px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={getChartData(row)}>
                                            <XAxis dataKey="year" hide />
                                            <YAxis hide domain={["auto", "auto"]} />
                                            <Tooltip
                                                contentStyle={{ fontSize: "10px", borderRadius: '4px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                                labelStyle={{ fontWeight: "bold" }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#F96000"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export const DATA_CONFIG_ANUGUL: any = {
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
            "2015": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_road_2015.pmtiles",
            "2025": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_road_2025.pmtiles"
        },
        params: '#color:["#0868ac","#0868ac","#0868ac","#0868ac","#0868ac"],0,3000,c' // Pop
    },
    barren: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_barren_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_barren_2024.tif'
        },
        params: '#color:["#91908e","#91908e"],8,8'
    },
    builtup: {
        urls: {
            "2011": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/ghs_2010.tif",
            "2024": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/ghs_2025.tif",
        },
        params: '#color:["#0868ac","#0868ac"],1,1'
    },
    cropland: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_cropland_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_cropland_2024.tif'
        },
        params: '#color:["#1A5BAB","#1A5BAB"],5,5'
    },
    forest: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_forest_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_forest_2024.tif'
        },
        params: '#color:["#1A5BAB","#1A5BAB"],2,2'
    },
    scrub: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_scrub_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_scrub_2024.tif'
        },
        params: '#color:["#666666","#666666"],4,4'
    },
    water: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_water_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_water_2024.tif'
        },
        params: '#color:["#1A5BAB","#1A5BAB"],1,1'
    },
    wetlands: {
        urls: {
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_wetlands_2018.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_lulc_wetlands_2024.tif'
        },
        params: '#color:["#87D19E","#87D19E"],11,11'
    }
};

// Data URLs with Params
/*
const DATA_CONFIG: any = {
    // buildup: {
    //     urls: {
    //         '2011': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_2011_builtup.tif',
    //         '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/lulc_2024_builtup.tif'
    //     },
    //     params: '#color:["#fee0d2","#fcbba1","#fc9272","#ef3b2c","#67000d"],0,3000,c' // Pop
    // },
    nightlight: {
        urls: {
            '2012': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2012.tif',
            '2013': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2013.tif',
            '2014': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2014.tif',
            '2015': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2015.tif',
            '2016': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2016.tif',
            '2017': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2017.tif',
            '2018': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2018.tif',
            '2019': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2019.tif',
            '2020': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2020.tif',
            '2021': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2021.tif',
            '2022': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2022.tif',
            '2023': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2023.tif',
            '2024': 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/data_v3/ntl/ntl_2024.tif'
        },
        params: '#color:["#000000","#333333","#663300","#ccaa00","#ffff00"],0,200,c' // Light
    },
    urbansprawl: {
        urls: {
            "2011": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2010.pmtiles",
            "2024": "https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/anugul_built_up_vector_2025.pmtiles"
        },
        params: '#color:["#fee0d2","#fcbba1","#fc9272","#ef3b2c","#67000d"],0,3000,c' // Pop
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
*/
export const DATA_CONFIG = DATA_CONFIG_ANUGUL;

// Helper to add protocol only once
let protocolsAdded = false;

const LULC_2018_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_lulc_20180101.tif';
const LULC_2024_URL = 'https://dicratiler.blob.core.windows.net/dicra-dev/unfpa/Data/odisha_lulc_20240101.tif';

const getLulcName = (val: number) => {
    const lulcMap: Record<number, string> = {
        1: "Water",
        2: "Forest",
        4: "Scrub",
        5: "Cropland",
        7: "Builtup",
        8: "Barren",
        11: "Wetlands"
    };
    return lulcMap[val] ? `${lulcMap[val]}` : String(val);
};

// Helper to format values for the new floating panel
const getDisplayData = (layerKey: string, val: string | number, side: 'left' | 'right' = 'left') => {
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
        roads: side === 'right' ? '#ED022A' : '#0868ac'
    };

    return {
        label: String(val) + '%',
        percent: Number(val) || 0,
        color: lulcColors[layerKey] || (side === 'right' ? '#ED022A' : '#0868ac')
    };
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
    onMapClick
}: MapCompareProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftMapRef = useRef<HTMLDivElement>(null);
    const rightMapRef = useRef<HTMLDivElement>(null);

    // Default Fallback Center (used if PMTiles header fails)
    const odishaCenter: [number, number] = [85.0985, 20.9517];
    const initialZoom = 6;
    const initialBoundsRef = useRef<maplibregl.LngLatBoundsLike | null>(ODISHA_BOUNDS);

    // Map Instances
    const leftMapObj = useRef<maplibregl.Map | null>(null);
    const rightMapObj = useRef<maplibregl.Map | null>(null);
    const leftMarkerRef = useRef<maplibregl.Marker | null>(null);
    const rightMarkerRef = useRef<maplibregl.Marker | null>(null);

    const [basemap, setBasemap] = useState<'grey' | 'satellite' | 'osm'>('grey');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('Odisha');
    const [selectedLngLat, setSelectedLngLat] = useState<maplibregl.LngLat | null>(null);
    const [lulc2018Val, setLulc2018Val] = useState<number | null>(null);
    const [lulc2024Val, setLulc2024Val] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // View States
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [lastSelectedPoint, setLastSelectedPoint] = useState<number | null>(null);
    const [activeModalTab, setActiveModalTab] = useState<'What' | 'How' | 'Why'>('What');
    const prePointClickState = useRef<{ center: maplibregl.LngLatLike; zoom: number } | null>(null);
    const layerInfoRef = useRef({ currentLayerKey: '', y1: '', y2: '', rawUrl1: '', rawUrl2: '' });
    const viewModeRef = useRef(viewMode);

    useEffect(() => {
        viewModeRef.current = viewMode;
    }, [viewMode]);

    // Auto-close popup/drawer on layer change or view change
    useEffect(() => {
        setSelectedLngLat(null);
        setSelectedPoint(null);
    }, [activeLayer, activeLulcPixel, viewMode]);

    // Handle Marker Display
    useEffect(() => {
        if (selectedLngLat && viewMode !== 'change_analysis' && selectedPoint === null) {
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

    // Update selected district when prop changes
    useEffect(() => {
        if (targetDistrict) {
            setSelectedDistrict(targetDistrict);
            setSelectedLngLat(null);
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

    const config = DATA_CONFIG_ANUGUL[currentLayerKey];

    // Determine Years with Fallbacks
    const availableYears = Object.keys(config.urls).sort();

    let y1 = year1;
    if (!y1 || !config.urls[y1]) y1 = availableYears[0];

    let y2 = year2;
    if (!y2 || !config.urls[y2]) y2 = availableYears[availableYears.length - 1];

    // Construct full URLs
    const getLayerUrl = (year: string, side: 'left' | 'right' = 'left') => {
        const baseUrl = config?.urls[year];
        if (!baseUrl) return '';

        if (currentLayerKey === 'urbansprawl' || currentLayerKey === 'roads') {
            return `pmtiles://${baseUrl}`;
        }

        if (config.type === 'sentinel') {
            return baseUrl;
        }

        let params = config.params;
        if (side === 'right') {
            if (currentLayerKey === 'nightlight') {
                params = '#color:["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],0,20,c';
            } else {
                // Change blue/any color to red for the right side
                // Regex to find color arrays like ["#...", "#..."] and replace with red(s)
                params = params.replace(/#color:\["[^\]]+"\]/, '#color:["#ED022A","#ED022A"]');
            }
        }

        return `cog://${baseUrl}${params}`;
    };

    const leftUrl = getLayerUrl(y1, 'left');
    const rightUrl = getLayerUrl(y2, 'right');

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

    // Initialize Divider
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                if (viewMode === 'compare') {
                    setDividerX(width / 2);
                } else if (viewMode === 'map' || viewMode === 'change_analysis') {
                    setDividerX(0); // Show only right side (latest)
                }
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [viewMode]);

    const [dividerX, setDividerX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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

    const handleMapClick = async (e: maplibregl.MapMouseEvent & { lngLat: maplibregl.LngLat }, mapInstance: maplibregl.Map) => {
        // Ignore map click if a point feature was hit
        if (mapInstance.getLayer('points-layer')) {
            const pointFeatures = mapInstance.queryRenderedFeatures(e.point, {
                layers: ['points-layer']
            });
            if (pointFeatures.length > 0) return;
        }

        const { lngLat } = e;
        const side = mapInstance === leftMapObj.current ? 'left' : 'right';

        let districtName = 'Odisha';
        const vectorFeatures = mapInstance.queryRenderedFeatures(e.point, {
            layers: ['vector-fill-' + side]
        });

        if (vectorFeatures.length > 0 && vectorFeatures[0].properties) {
            const feature = vectorFeatures[0];
            const props = feature.properties;
            const rawName = props.district_name || props.DIST_NAME || props.District || props.NAME || props.name || props.district || 'Odisha';
            districtName = DISTRICT_NAME_VARIANTS[rawName] || rawName;

            if (districtName !== 'Odisha' && !ALLOWED_DISTRICTS.includes(districtName)) return;

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
            locationValues(LULC_2018_URL, { latitude: lngLat.lat, longitude: lngLat.lng }, zoom).then(vals => {
                if (vals && vals.length > 0 && !isNaN(vals[0])) setLulc2018Val(vals[0]);
            }).catch(e => console.error("Error fetching 2018 LULC", e));
        } catch (e) { console.error(e); }

        try {
            locationValues(LULC_2024_URL, { latitude: lngLat.lat, longitude: lngLat.lng }, zoom).then(vals => {
                if (vals && vals.length > 0 && !isNaN(vals[0])) setLulc2024Val(vals[0]);
            }).catch(e => console.error("Error fetching 2024 LULC", e));
        } catch (e) { console.error(e); }
    };

    const basemapOptions: { id: 'grey' | 'satellite' | 'osm'; label: string }[] = [
        { id: 'grey', label: 'Grey Canvas' },
        { id: 'satellite', label: 'Satellite' },
        { id: 'osm', label: 'OSM' },
    ];

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

    const setupSubdistrictLayer = async (map: maplibregl.Map, side: 'left' | 'right') => {
        const sourceId = `subdistrict-source-${side}`;
        const layerId = `subdistrict-outline-${side}`;
        const fillId = `subdistrict-fill-${side}`;

        if (map.getSource(sourceId)) return;

        map.addSource(sourceId, {
            type: 'vector',
            url: `pmtiles://${SUBDISTRICT_URL}`
        });

        try {
            // const p = new PMTiles(SUBDISTRICT_URL);
            // const metadata = await p.getMetadata() as any;
            // let sourceLayerName = 'layer';
            // if (metadata && metadata.vector_layers && metadata.vector_layers.length > 0) {
            //     sourceLayerName = metadata.vector_layers[0].id;
            // }

            if (!map.getSource(sourceId)) return;

            // Transparent fill for hover detection
            map.addLayer({
                id: fillId,
                type: 'fill',
                source: sourceId,
                'source-layer': 'zcta',
                paint: { 'fill-color': 'transparent', 'fill-opacity': 0 }
            });

            // Orange outline
            map.addLayer({
                id: layerId,
                type: 'line',
                source: sourceId,
                'source-layer': 'zcta',
                paint: {
                    'line-color': '#F96000',
                    'line-width': 0.8,
                    'line-opacity': 0.8
                }
            });

            const popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                className: 'subdistrict-popup'
            });

            map.on('mousemove', fillId, (e) => {
                if (e.features && e.features.length > 0) {
                    map.getCanvas().style.cursor = 'pointer';
                    const feature = e.features[0];
                    const sdtname = feature.properties.sdtname || 'N/A';
                    popup.setLngLat(e.lngLat)
                        .setHTML(`<div style="padding: 4px 8px; font-weight: bold; font-size: 11px; color: #333;">${sdtname}</div>`)
                        .addTo(map);
                }
            });

            map.on('mouseleave', fillId, () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

        } catch (e) {
            console.error("Error setting up subdistrict layer", e);
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
        if (activeLayerKey === 'sentinel2') {
            map.addSource(sourceId, {
                type: 'raster',
                tiles: [url],
                tileSize: 256,
                attribution: 'Sentinel-2 cloudless by EOX (CC BY-NC-SA 4.0)'
            });
            map.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: { 'raster-opacity': 1, 'raster-fade-duration': 300 },
                minzoom: 0,
                maxzoom: 22
            }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
            setIsLoading(true);
        } else if (type === 'raster') {
            map.addSource(sourceId, {
                type: 'raster',
                url: url,
                tileSize: 128,
            });
            map.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: { 'raster-opacity': 1 },
                minzoom: 0,
                maxzoom: 22
            }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
            setIsLoading(true);
        } else {
            // Vector
            map.addSource(sourceId, {
                type: 'vector',
                url: url
            });
            setIsLoading(true);

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
                                'line-color': side === 'right' ? '#ED022A' : '#0868ac',
                                'line-width': 1
                            },
                            minzoom: 0,
                            maxzoom: 22
                        }, map.getLayer('vector-fill-' + side) ? 'vector-fill-' + side : undefined);
                    } else {
                        map.addLayer({
                            id: layerId,
                            type: 'fill',
                            source: sourceId,
                            'source-layer': sourceLayerName,
                            paint: {
                                'fill-color': side === 'right' ? '#ED022A' : '#0868ac',
                                'fill-opacity': 0.6,
                                'fill-outline-color': '#ffffff'
                            },
                            minzoom: 0,
                            maxzoom: 22
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
    const [allDistrictsData, setAllDistrictsData] = useState<any[]>([]);

    useEffect(() => {
        // Cleanup existing maps if any
        if (leftMapObj.current) leftMapObj.current.remove();
        if (rightMapObj.current) rightMapObj.current.remove();

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
                },
                'esri-satellite': {
                    type: 'raster',
                    tiles: [
                        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    ],
                    tileSize: 256,
                    attribution: '© Esri, Maxar, Earthstar Geographics'
                },
                'osm': {
                    type: 'raster',
                    tiles: [
                        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    ],
                    tileSize: 256,
                    attribution: '© OpenStreetMap contributors'
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
                    maxzoom: 22,
                    layout: { visibility: basemap === 'grey' ? 'visible' : 'none' }
                },
                {
                    id: 'esri-satellite-layer',
                    type: 'raster',
                    source: 'esri-satellite',
                    minzoom: 0,
                    maxzoom: 22,
                    layout: { visibility: basemap === 'satellite' ? 'visible' : 'none' }
                },
                {
                    id: 'osm-layer',
                    type: 'raster',
                    source: 'osm',
                    minzoom: 0,
                    maxzoom: 22,
                    layout: { visibility: basemap === 'osm' ? 'visible' : 'none' }
                }
            ]
        } as maplibregl.StyleSpecification;

        // Fetch PMTiles Metadata for Initial Bounds
        const fetchMetadata = async () => {
            try {
                const p = new PMTiles(PMTILES_URL);
                const header = await p.getHeader();
                if (header.minLon !== undefined) {
                    // Use metadata bounds if available, otherwise fallback to ODISHA_BOUNDS
                    const bounds: maplibregl.LngLatBoundsLike = [
                        [header.minLon, header.minLat],
                        [header.maxLon, header.maxLat]
                    ];
                    initialBoundsRef.current = bounds;
                    // Apply initial fit if map ready
                    if (leftMapObj.current) leftMapObj.current.fitBounds(initialBoundsRef.current, { duration: 0, padding: 40 });
                    if (rightMapObj.current) rightMapObj.current.fitBounds(initialBoundsRef.current, { duration: 0, padding: 40 });
                }
            } catch (e) {
                console.error("Failed to fetch PMTiles header", e);
            }
        };
        fetchMetadata();

        // Initialize Left Map if ref exists
        if (leftMapRef.current) {
            leftMapObj.current = new maplibregl.Map({
                container: leftMapRef.current,
                style: satelliteStyle,
                center: odishaCenter,
                zoom: 7.5,
                attributionControl: false
            });

            leftMapObj.current.on('load', () => {
                leftMapObj.current?.resize();

                // Fit bounds if targetBounds or metadata already fetched
                if (targetBounds) {
                    leftMapObj.current?.fitBounds(targetBounds, { duration: 0, padding: 40 });
                } else if (initialBoundsRef.current) {
                    leftMapObj.current?.fitBounds(initialBoundsRef.current, { duration: 0, padding: 40 });
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
                            'line-color': '#F96000',   // Highlight color
                            'line-width': 1.5,
                            'line-opacity': 0          // hidden by default
                        },
                        filter: ['==', 'fid', '']
                    });

                    // Click Listener
                    leftMapObj.current?.on('click', (e) => {
                        if (viewModeRef.current === 'compare' || viewModeRef.current === 'map') {
                            handleMapClick(e, leftMapObj.current!);
                        }
                    });
                    leftMapObj.current?.on('mouseenter', 'vector-fill-left', () => {
                        if (leftMapObj.current && (viewMode === 'compare' || viewMode === 'map')) leftMapObj.current.getCanvas().style.cursor = 'pointer';
                    });
                    leftMapObj.current?.on('mouseleave', 'vector-fill-left', () => {
                        if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = '';
                    });

                    // Points Source & Layer for Change Analysis
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

                    leftMapObj.current?.addSource('points-source', {
                        type: 'geojson',
                        data: pointsGeoJSON
                    });

                    leftMapObj.current?.addLayer({
                        id: 'points-layer',
                        type: 'circle',
                        source: 'points-source',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#F58220',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF',
                            'circle-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0,
                            'circle-stroke-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0
                        },
                        filter: ['all']
                    });

                    leftMapObj.current?.addLayer({
                        id: 'points-layer-highlight',
                        type: 'circle',
                        source: 'points-source',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': 'transparent',
                            'circle-stroke-width': 4,
                            'circle-stroke-color': '#0868ac',
                            'circle-stroke-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0
                        },
                        filter: ['==', 'id', -999]
                    });

                    leftMapObj.current?.on('click', 'points-layer', (e) => {
                        if ((viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') && e.features && e.features.length > 0) {
                            const props = e.features[0].properties;
                            if (props) {
                                setSelectedPoint(Number(props.id));
                                setSelectedLngLat(null);
                                setActiveModalTab('What');
                            }
                        }
                    });

                    leftMapObj.current?.on('mouseenter', 'points-layer', () => {
                        if (leftMapObj.current && (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare')) leftMapObj.current.getCanvas().style.cursor = 'pointer';
                    });
                    leftMapObj.current?.on('mouseleave', 'points-layer', () => {
                        if (leftMapObj.current) leftMapObj.current.getCanvas().style.cursor = '';
                    });
                }

                // Add Subdistrict Layer
                setupSubdistrictLayer(leftMapObj.current!, 'left');

                leftMapObj.current?.resize();
                setMapsLoadedCount(prev => prev + 1);
            });

            leftMapObj.current.on('idle', () => setIsLoading(false));
        }

        // Initialize Right Map if ref exists
        if (rightMapRef.current) {
            rightMapObj.current = new maplibregl.Map({
                container: rightMapRef.current,
                style: satelliteStyle,
                center: odishaCenter,
                zoom: 7.5,
                attributionControl: false
            });

            rightMapObj.current.on('load', () => {
                rightMapObj.current?.resize();

                // Fit bounds if targetBounds or metadata already fetched
                if (targetBounds) {
                    rightMapObj.current?.fitBounds(targetBounds, { duration: 0, padding: 40 });
                } else if (initialBoundsRef.current) {
                    rightMapObj.current?.fitBounds(initialBoundsRef.current, { duration: 0, padding: 40 });
                }

                // Initial Main Layer Load
                updateMainLayer(rightMapObj.current!, 'right', urlsRef.current.right, ['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster', currentLayerKey);

                // Vector Boundary Layer
                if (!rightMapObj.current?.getSource('rightVector')) {
                    rightMapObj.current?.addSource('rightVector', {
                        type: 'vector',
                        url: `pmtiles://${PMTILES_URL}`
                    });

                    // Transparent Fill layer for Click Events
                    rightMapObj.current?.addLayer({
                        id: 'vector-fill-right',
                        type: 'fill',
                        source: 'rightVector',
                        'source-layer': 'zcta',
                        paint: { 'fill-color': 'transparent', 'fill-opacity': 0 }
                    });

                    rightMapObj.current?.addLayer({
                        id: 'vector-outline-right',
                        type: 'line',
                        source: 'rightVector',
                        'source-layer': 'zcta',
                        paint: {
                            'line-color': '#686868ff',
                            'line-width': 2
                        }
                    });

                    // Highlight Layer
                    rightMapObj.current?.addLayer({
                        id: 'vector-outline-highlight-right',
                        type: 'line',
                        source: 'rightVector',
                        'source-layer': 'zcta',
                        paint: {
                            'line-color': '#F96000',   // Highlight color
                            'line-width': 1.5,
                            'line-opacity': 0          // hidden by default
                        },
                        filter: ['==', 'fid', '']
                    });

                    // Click Listener
                    rightMapObj.current?.on('click', (e) => {
                        handleMapClick(e, rightMapObj.current!);
                    });
                    rightMapObj.current?.on('mousemove', 'vector-fill-right', (e) => {
                        const feature = e.features?.[0];
                        const rawName = feature?.properties?.district_name || feature?.properties?.DIST_NAME || feature?.properties?.District || feature?.properties?.NAME || feature?.properties?.name || feature?.properties?.district;
                        const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
                        if (ALLOWED_DISTRICTS.includes(name)) {
                            if (rightMapObj.current) rightMapObj.current.getCanvas().style.cursor = 'pointer';
                        } else {
                            if (rightMapObj.current) rightMapObj.current.getCanvas().style.cursor = '';
                        }
                    });
                    rightMapObj.current?.on('mouseleave', 'vector-fill-right', () => { if (rightMapObj.current) rightMapObj.current.getCanvas().style.cursor = ''; });

                    // Points Source & Layer for Change Analysis (also on Right Map for Compare mode)
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

                    rightMapObj.current?.addSource('points-source', {
                        type: 'geojson',
                        data: pointsGeoJSON
                    });

                    rightMapObj.current?.addLayer({
                        id: 'points-layer',
                        type: 'circle',
                        source: 'points-source',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': '#F58220',
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF',
                            'circle-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0,
                            'circle-stroke-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0
                        },
                        filter: ['all']
                    });

                    rightMapObj.current?.addLayer({
                        id: 'points-layer-highlight',
                        type: 'circle',
                        source: 'points-source',
                        paint: {
                            'circle-radius': 6,
                            'circle-color': 'transparent',
                            'circle-stroke-width': 4,
                            'circle-stroke-color': '#0868ac',
                            'circle-stroke-opacity': (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') ? 1 : 0
                        },
                        filter: ['==', 'id', -999]
                    });

                    rightMapObj.current?.on('click', 'points-layer', (e) => {
                        if ((viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare') && e.features && e.features.length > 0) {
                            const props = e.features[0].properties;
                            if (props) {
                                setSelectedPoint(Number(props.id));
                                setSelectedLngLat(null);
                                setActiveModalTab('What');
                            }
                        }
                    });

                    rightMapObj.current?.on('mouseenter', 'points-layer', () => {
                        if (rightMapObj.current && (viewModeRef.current === 'change_analysis' || viewModeRef.current === 'compare')) rightMapObj.current.getCanvas().style.cursor = 'pointer';
                    });
                    rightMapObj.current?.on('mouseleave', 'points-layer', () => {
                        if (rightMapObj.current) rightMapObj.current.getCanvas().style.cursor = '';
                    });
                }

                // Add Subdistrict Layer
                setupSubdistrictLayer(rightMapObj.current!, 'right');

                rightMapObj.current?.resize();
                setMapsLoadedCount(prev => prev + 1);
            });

            rightMapObj.current.on('idle', () => setIsLoading(false));
        }

        // Sync Logic
        let isSyncing = false;
        const syncMaps = (a: maplibregl.Map, b: maplibregl.Map) => {
            const onMove = () => {
                if (isSyncing) return;
                isSyncing = true;
                b.jumpTo({
                    center: a.getCenter(),
                    zoom: a.getZoom(),
                    bearing: a.getBearing(),
                    pitch: a.getPitch()
                });
                isSyncing = false;
            };
            a.on('move', onMove);
        };

        if (leftMapObj.current && rightMapObj.current) {
            syncMaps(leftMapObj.current, rightMapObj.current);
            syncMaps(rightMapObj.current, leftMapObj.current);
        }

        // Fetch all districts data from pmtiles once loaded
        const leftMap = leftMapObj.current;
        if (leftMap) {
            const onIdle = () => {
                const features = leftMap.querySourceFeatures('leftVector', {
                    sourceLayer: 'zcta'
                });
                if (features && features.length > 0) {
                    const uniqueProps: any[] = [];
                    const names = new Set();
                    features.forEach((f: any) => {
                        const rawName = f.properties.district_name || f.properties.NAME || f.properties.name || f.properties.District || f.properties.district;
                        const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
                        if (name && !names.has(name)) {
                            names.add(name);
                            uniqueProps.push(f.properties);
                        }
                    });
                    if (uniqueProps.length > 0) {
                        setAllDistrictsData(prev => uniqueProps.length > prev.length ? uniqueProps : prev);
                    }
                }
            };
            leftMap.on('idle', onIdle);
        }

        return () => {
            // Cleanup existing maps if any
            try {
                if (leftMapObj.current) {
                    leftMapObj.current.remove();
                    leftMapObj.current = null;
                }
            } catch (e) { console.warn('Left map cleanup error', e); }

            try {
                if (rightMapObj.current) {
                    rightMapObj.current.remove();
                    rightMapObj.current = null;
                }
            } catch (e) { console.warn('Right map cleanup error', e); }
        };
    }, []);
    useEffect(() => {
        if (!leftMapObj.current || !rightMapObj.current) return;

        const isSentinel = currentLayerKey === 'sentinel2';
        const type = isSentinel ? 'raster' : (['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster');

        // In 'map' or 'change_analysis' mode, we usually want to show the latest state on the main visible map
        const lUrl = (viewMode === 'map' || viewMode === 'change_analysis') ? rightUrl : leftUrl;

        updateMainLayer(leftMapObj.current, 'left', lUrl, type, currentLayerKey);
        updateMainLayer(rightMapObj.current, 'right', rightUrl, type, currentLayerKey);

        // Update point filters based on layer
        if (leftMapObj.current.getLayer('points-layer')) {
            leftMapObj.current.setFilter('points-layer', ['all']);
        }
        if (rightMapObj.current.getLayer('points-layer')) {
            rightMapObj.current.setFilter('points-layer', ['all']);
        }

        // Control point layer visibility
        const isAnalysisVisible = (viewMode === 'change_analysis' || viewMode === 'compare');
        if (leftMapObj.current.getLayer('points-layer')) {
            leftMapObj.current.setPaintProperty('points-layer', 'circle-opacity', isAnalysisVisible ? 1 : 0);
            leftMapObj.current.setPaintProperty('points-layer', 'circle-stroke-opacity', isAnalysisVisible ? 1 : 0);
        }
        if (leftMapObj.current.getLayer('points-layer-highlight')) {
            leftMapObj.current.setPaintProperty('points-layer-highlight', 'circle-stroke-opacity', isAnalysisVisible ? 1 : 0);
        }

        if (rightMapObj.current.getLayer('points-layer')) {
            rightMapObj.current.setPaintProperty('points-layer', 'circle-opacity', isAnalysisVisible ? 1 : 0);
            rightMapObj.current.setPaintProperty('points-layer', 'circle-stroke-opacity', isAnalysisVisible ? 1 : 0);
        }
        if (rightMapObj.current.getLayer('points-layer-highlight')) {
            rightMapObj.current.setPaintProperty('points-layer-highlight', 'circle-stroke-opacity', isAnalysisVisible ? 1 : 0);
        }

    }, [leftUrl, rightUrl, currentLayerKey, activeLulcPixel, viewMode]);

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
    }, [targetBounds, resetTrigger, mapsLoadedCount]);

    // Handle Reset Trigger to clear point selection
    useEffect(() => {
        if (resetTrigger) {
            setSelectedPoint(null);
            prePointClickState.current = null;
        }
    }, [resetTrigger]);

    // Handle Highlighting
    useEffect(() => {
        if (mapsLoadedCount < 2) return;

        const mapsToHighlight = [
            { map: leftMapObj.current, idx: 'left' },
            { map: rightMapObj.current, idx: 'right' }
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

    // Slider Dragging Logic
    useEffect(() => {
        const move = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

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

    // Handle Change Analysis flyTo/highlight
    useEffect(() => {
        if (!leftMapObj.current || !rightMapObj.current || (viewMode !== 'change_analysis' && viewMode !== 'compare')) return;


        if (leftMapObj.current.getLayer('points-layer-highlight')) {
            leftMapObj.current.setFilter('points-layer-highlight', ['==', 'id', selectedPoint !== null ? selectedPoint : -999]);
        }
        if (rightMapObj.current.getLayer('points-layer-highlight')) {
            rightMapObj.current.setFilter('points-layer-highlight', ['==', 'id', selectedPoint !== null ? selectedPoint : -999]);
        }

        if (selectedPoint !== null && selectedPoint !== lastSelectedPoint) {
            if (lastSelectedPoint === null && prePointClickState.current === null) {
                prePointClickState.current = {
                    center: leftMapObj.current.getCenter(),
                    zoom: leftMapObj.current.getZoom()
                };
            }

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
            }
        }
        setLastSelectedPoint(selectedPoint);

        setTimeout(() => {
            leftMapObj.current?.resize();
            rightMapObj.current?.resize();
        }, 310);
    }, [selectedPoint, viewMode]);

    // Data processing for left and right side
    const compData = (COMPARATIVE_DATA as any)[selectedDistrict] || (COMPARATIVE_DATA as any)['Odisha'];
    const layerData = compData[currentLayerKey] || { val1: 0, val2: 0 };
    const randLow = layerData.val1;
    const randHigh = layerData.val2;

    const getDistrictArea = (dist: string) => {
        if (dist === 'Odisha') return 155707;
        return 5190; // mock avg size
    };

    const yearKey1 = parseInt(y1);
    const yearKey2 = parseInt(y2);
    let totalPop1 = 0;
    let totalPop2 = 0;

    const findPop = (dist: string, year: number) => {
        const yearStr = year.toString();
        const propKey = `pop_${yearStr}_sum`;

        if (dist === 'Odisha') {
            // Use allDistrictsData if available, otherwise fallback to static
            if (allDistrictsData.length > 0) {
                return allDistrictsData.reduce((acc, d) => acc + (parseFloat(d[propKey] || 0) || 0), 0);
            }
            return Object.values(DISTRICT_DEMOGRAPHICS).reduce((acc, d: any) => {
                const availableYears = Object.keys(d).map(Number).sort((a, b) => a - b);
                const closest = availableYears.reduce((prev, curr) =>
                    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
                );
                return acc + (d[closest] ? d[closest].male + d[closest].female : 0);
            }, 0);
        }

        const name = DISTRICT_NAME_VARIANTS[dist] || dist;

        // Priority 1: PMTiles Data
        if (allDistrictsData.length > 0) {
            const dData = allDistrictsData.find(d => {
                const rawName = d.district_name || d.NAME || d.name || d.District || d.district;
                const dName = DISTRICT_NAME_VARIANTS[rawName] || rawName;
                return dName === name;
            });
            if (dData && dData[propKey] !== undefined) {
                return parseFloat(dData[propKey]);
            }
        }

        // Priority 2: Static Data
        const demo = (DISTRICT_DEMOGRAPHICS as any)[name];
        if (!demo) return 0;
        if (demo[year]) return demo[year].male + demo[year].female;

        // find closest year
        const availableYears = Object.keys(demo).map(Number).sort((a, b) => a - b);
        if (availableYears.length === 0) return 0;

        const closest = availableYears.reduce((prev, curr) =>
            Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
        );
        return demo[closest].male + demo[closest].female;
    };

    totalPop1 = findPop(selectedDistrict, yearKey1);
    totalPop2 = findPop(selectedDistrict, yearKey2);

    const popOldM = (totalPop1 / 1000000).toFixed(2);
    const popNewM = (totalPop2 / 1000000).toFixed(2);

    const d1 = getDisplayData(currentLayerKey, randLow || 0, 'left');
    const d2 = getDisplayData(currentLayerKey, randHigh || 0, 'right');
    const layerNameStr = currentLayerKey === 'nightlight' ? 'Night Lights' : currentLayerKey === 'urbansprawl' ? 'Built-up Area' : currentLayerKey;
    const areaKm2 = getDistrictArea(selectedDistrict);

    const lulcStatMap: Record<string, string> = {
        builtup: 'Built Area',
        cropland: 'Crops',
        forest: 'Trees',
        water: 'Water',
        barren: 'Bare Ground',
        scrub: 'Scrub',
        wetlands: 'Flooded Vegetation'
    };

    const getLulcStat = (dist: string, year: string, layerKey: string) => {
        const category = lulcStatMap[layerKey];
        if (!category) return null;
        
        const distData = LULC_STATS[dist] || (DISTRICT_NAME_VARIANTS[dist] ? LULC_STATS[DISTRICT_NAME_VARIANTS[dist]] : null) || LULC_STATS['Odisha'];
        if (!distData) return null;
        
        const yearData = distData[year];
        if (!yearData) return null;
        
        const val = yearData[category];
        if (val === undefined || val === null) return null;

        // If the value is small (e.g. < 110), it might be a percentage in the dataset
        // If it's already a percentage, we calculate the sq km. 
        // If it's a large value, it's already sq km.
        // We'll also check the sum of categories if possible, but let's keep it simple:
        // Most LULC_STATS entries are in sq km except for some districts.
        const totalArea = getDistrictArea(dist);
        if (val < 110 && dist !== 'Odisha') { // Heuristic: likely a percentage
            return { sqKm: (totalArea * val) / 100, percent: val };
        }
        
        return { sqKm: val, percent: (val / totalArea) * 100 };
    };

    const lulc1 = getLulcStat(selectedDistrict, y1, currentLayerKey);
    const lulc2 = getLulcStat(selectedDistrict, y2, currentLayerKey);

    const activeAreaOld = lulc1 ? lulc1.sqKm.toFixed(0) : (areaKm2 * (Number(randLow) / 100)).toFixed(0);
    const activeAreaNew = lulc2 ? lulc2.sqKm.toFixed(0) : (areaKm2 * (Number(randHigh) / 100)).toFixed(0);
    const activePercentOld = lulc1 ? lulc1.percent.toFixed(1) : (d1?.percent || 0);
    const activePercentNew = lulc2 ? lulc2.percent.toFixed(1) : (d2?.percent || 0);

    const prevVal = lulc1 ? lulc1.sqKm : (randLow || 0);
    const currVal = lulc2 ? lulc2.sqKm : (randHigh || 0);
    const change = prevVal > 0 ? ((currVal - prevVal) / prevVal) * 100 : 0;
    const isPos = change >= 0;

    // const getIdForLayer = (l: string) => {
    //     if (l === 'nightlight_medium') return -5;
    //     if (l === 'nightlight_low') return -6;
    //     if (l === 'nightlight') return -3;
    //     if (l === 'urbansprawl') return -2;
    //     if (l === 'roads') return -4;
    //     if (l === 'water') return 1;
    //     if (l === 'forest') return 2;
    //     if (l === 'scrub') return 4;
    //     if (l === 'cropland') return 5;
    //     if (l === 'builtup') return 7;
    //     if (l === 'barren') return 8;
    //     if (l === 'wetlands') return 11;
    //     return 0;
    // };
    // const activeRaw = activeLayer || 'water';
    // const hashMap = selectedDistrict.length + activeRaw.length + getIdForLayer(activeRaw);
    // const corrCofMap = `${hashMap % 2 === 0 ? '+' : '-'} ${((hashMap % 9) / 10 + 0.1).toFixed(2)}`;
    // Handle Basemap Visibility
    useEffect(() => {
        if (!leftMapObj.current || !rightMapObj.current || mapsLoadedCount < 2) return;

        [leftMapObj.current, rightMapObj.current].forEach(map => {
            const showBasemaps = currentLayerKey !== 'sentinel2';
            if (map.getLayer('esri-grey-layer')) {
                map.setLayoutProperty('esri-grey-layer', 'visibility', (showBasemaps && basemap === 'grey') ? 'visible' : 'none');
            }
            if (map.getLayer('esri-satellite-layer')) {
                map.setLayoutProperty('esri-satellite-layer', 'visibility', (showBasemaps && basemap === 'satellite') ? 'visible' : 'none');
            }
            if (map.getLayer('osm-layer')) {
                map.setLayoutProperty('osm-layer', 'visibility', (showBasemaps && basemap === 'osm') ? 'visible' : 'none');
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
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: `inset(0 0 0 ${dividerX}px)`,
                            pointerEvents: viewMode === 'compare' ? "auto" : "none",
                            overflow: "hidden",
                            display: viewMode === 'change_analysis' ? 'none' : 'block'
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                                </svg>
                            </div>
                        </div>
                    )}


                    {/* Left Side Panel */}
                    {viewMode === 'compare' && (
                        <div className="absolute top-0 bottom-0 left-0 w-70 bg-gradient-to-r  from-black/70 via-black/30 to-transparent flex flex-col pt-20 pb-4 px-6 z-30 pointer-events-none">
                            <div className="text-white mt-4">
                                <div className="text-gray-200 text-xs tracking-wider uppercase mb-1">POPULATION</div>
                                <div className="text-2xl font-bold mb-2"><span className='font-mono'>{popOldM}</span> <span className="text-sm font-normal">M</span></div>

                                {/* <div className="text-white text-xs tracking-wider uppercase mb-1">{layerNameStr.toUpperCase()} <span className="text-[10px] normal-case tracking-normal opacity-70">(CORR.COF. : {corrCofMap})</span></div> */}
                                <div className="text-xs text-gray-100 mb-2">{layerNameStr.toLowerCase()} coverage</div>

                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-xl font-bold"><span className='font-mono'>{activeAreaOld} </span><span className="text-sm font-normal">km.sq.</span></span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-xl font-bold font-mono">{activePercentOld}%</span>
                                </div>
                                <div className="w-3/4 h-1.5 bg-gray-600/50 rounded-full mb-1">
                                    <div className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: `${activePercentOld}%`, backgroundColor: '#dcfce7' }}></div>
                                </div>

                                {selectedLngLat ? (
                                    <div className="w-full flex flex-col items-start mt-1">
                                        <div className="border-t border-white/20 my-4 w-full"></div>
                                        <div className="text-xs text-white mb-2 tracking-wide font-light font-mono">
                                            {Math.abs(selectedLngLat.lng).toFixed(2)} {selectedLngLat.lng >= 0 ? 'E' : 'W'}, {Math.abs(selectedLngLat.lat).toFixed(2)} {selectedLngLat.lat >= 0 ? 'N' : 'S'}
                                        </div>
                                        <div className="flex flex-col text-left uppercase text-[13px] mt-2 bg-black/30 p-2.5 rounded border border-white/10 w-auto">
                                            <span className="font-medium text-gray-200">{lulc2018Val !== null ? getLulcName(lulc2018Val) : ''}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-400 w-full mt-4"></div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Right Side Panel */}
                    {(viewMode === 'compare' || viewMode === 'map') && (
                        <div className="absolute top-0 bottom-0 right-0 w-70 bg-gradient-to-l from-black/70 via-black/30 to-transparent flex flex-col pt-20 pb-4 px-6 z-30 pointer-events-none items-end text-right">
                            <div className="text-white mt-4 flex flex-col items-end w-full">
                                <div className="text-gray-200 text-xs tracking-wider uppercase mb-1">POPULATION</div>
                                <div className="text-2xl font-bold mb-2"><span className='font-mono'>{popNewM}</span> <span className="text-sm font-normal">M</span></div>

                                {/* <div className="text-white text-xs tracking-wider uppercase mb-1">{layerNameStr.toUpperCase()} <span className="text-[10px] normal-case tracking-normal opacity-70">(CORR.COF. : {corrCofMap})</span></div> */}
                                <div className="text-xs text-gray-100 mb-2">{layerNameStr.toLowerCase()} coverage</div>

                                <div className="flex items-baseline justify-end gap-2 mb-3 w-full">
                                    <span className="text-xl font-bold"><span className='font-mono'>{activeAreaNew}</span> <span className="text-sm font-normal">km.sq.</span></span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-xl font-bold font-mono">{activePercentNew}%</span>
                                </div>
                                <div className="w-3/4 h-1.5 bg-gray-600/50 rounded-full mb-3 flex justify-end">
                                    <div className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: `${activePercentNew}%`, backgroundColor: '#dcfce7' }}></div>
                                </div>

                                {/* Percentage badge */}
                                <div className="flex justify-end">
                                    <span className={`flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-black tracking-wide shadow-sm ${isPos ? 'bg-white/20 text-[#a7f3d0] border border-[#a7f3d0]/30' : 'bg-white/20 text-red-300 border border-red-300/30'}`}>
                                        {isPos ? (
                                            <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" strokeWidth={3} />
                                        )}
                                        {Math.abs(change).toFixed(1)}%
                                    </span>
                                </div>

                                {selectedLngLat ? (
                                    <div className="w-full flex flex-col items-end mt-1">
                                        <div className="border-t border-white/20 my-4 w-full"></div>
                                        <div className="text-xs text-white mb-2 tracking-wide font-light text-right font-mono">
                                            {Math.abs(selectedLngLat.lng).toFixed(2)} {selectedLngLat.lng >= 0 ? 'E' : 'W'}, {Math.abs(selectedLngLat.lat).toFixed(2)} {selectedLngLat.lat >= 0 ? 'N' : 'S'}
                                        </div>
                                        <div className="flex flex-col text-right uppercase text-[13px] mt-2 bg-black/30 p-2.5 rounded border border-white/10 w-auto">

                                            <span className="font-medium text-gray-200">{lulc2024Val !== null ? getLulcName(lulc2024Val) : ''}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xs text-gray-400 w-full mt-4"></div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Right Analysis Sidebar (Now Absolute Above Map) */}
                    {(viewMode === 'change_analysis' || viewMode === 'compare') && selectedPoint && (
                        <div className="absolute top-0 right-0 h-full w-full md:w-[50%] bg-white border-l border-gray-200 shadow-2xl z-[60] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
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
                                        prePointClickState.current = null;
                                        setTimeout(() => {
                                            if (leftMapObj.current) {
                                                leftMapObj.current.resize();
                                                // Fit to the selected shape/district if available, otherwise reset to state view
                                                if (targetBounds) {
                                                    leftMapObj.current.fitBounds(targetBounds, { padding: 40, duration: 1000 });
                                                } else {
                                                    leftMapObj.current.fitBounds(initialBoundsRef.current || ODISHA_BOUNDS, { padding: 20, duration: 800 });
                                                }
                                            }
                                        }, 350);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 hover:bg-[#FDCFB3] hover:text-white hover:border-[#bae4bc] text-[#0868ac] rounded-full transition-colors group shrink-0"
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
                                            {/* Heading */}
                                            <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight leading-tight uppercase font-mono">
                                                {currentContent.title}
                                            </h3>

                                            {/* Location Info */}
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2 font-mono p-2 w-full">
                                                <Calendar className="w-3.5 h-3.5 text-[#F96000]" strokeWidth={2.5} />
                                                <span className="lowercase">{currentContent.place}</span>
                                                {/* <span className="text-gray-300 mx-1">|</span>
                                                <span className="tracking-tighter">
                                                    {currentContent.cord[1].toFixed(4)} E, {currentContent.cord[0].toFixed(4)} N
                                                </span> */}
                                            </div>
                                            {/* Divider */}
                                            <span className='pb-4'>
                                                <div className="w-full mx-auto h-px bg-gray-200 shrink-0"></div>
                                            </span>
                                            {/* Flexible Content (Preferred approach for complex ordering) */}
                                            {currentContent.content ? (
                                                currentContent.content.map((block: any, idx: number) => {
                                                    if (block.type === 'image') {
                                                        return (
                                                            <div key={idx} className="flex flex-col mb-6 gap-2">
                                                                <div className="relative w-full rounded-xl overflow-hidden bg-gray-100/50 flex items-center justify-center min-h-[500px] max-h-[500px] border border-gray-200 shadow-inner group">
                                                                    <img src={block.url} alt={`Content Image ${idx}`} className="object-contain max-h-full" />
                                                                </div>
                                                                {block.desc && (
                                                                    <p className="text-[10px] text-gray-500 italic pl-1 lowercase">
                                                                        {block.desc}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    } else if (block.type === 'text') {
                                                        return (
                                                            <div key={idx} className="text-[13px] leading-relaxed text-gray-600 bg-white/50 p-1 mb-6">
                                                                {block.value}
                                                            </div>
                                                        );
                                                    } else if (block.type === 'heading') {
                                                        return (
                                                            <h4 key={idx} className="text-sm font-black text-gray-900 mb-3 mt-2 font-semibold border-l-3 border-[#F96000] pl-2">
                                                                {block.value}
                                                            </h4>
                                                        );
                                                    } else if (block.type === 'chart') {
                                                        return (
                                                            <div key={idx} className="flex flex-col mb-4">
                                                                <RadianceChart data={block.data} />
                                                                {block.desc && (
                                                                    <p className="text-[10px] text-gray-500 italic pl-1 lowercase -mt-4 mb-4">
                                                                        {block.desc}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    } else if (block.type === 'table') {

                                                        return (
                                                            <div key={idx} className="flex flex-col mb-4">
                                                                <RadianceTable
                                                                    data={block.data}
                                                                    nameKey={block.nameKey}
                                                                    columns={block.columns}
                                                                />
                                                                {block.desc && (
                                                                    <p className="text-[10px] text-gray-500 italic pl-1 lowercase -mt-4 mb-4">
                                                                        {block.desc}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <>
                                                    {/* Legacy Fallback Logic */}
                                                    {/* Image (Only for What, How and Why) */}


                                                    {/* Paragraph */}
                                                    <div className="text-[13px] leading-relaxed text-gray-600 bg-white/50 p-1">
                                                        {currentContent.desc}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })()}
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
                                                className={`w-full px-4 py-2 text-left text-[11px] font-black transition-colors flex items-center justify-between ${basemap === option.id
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
