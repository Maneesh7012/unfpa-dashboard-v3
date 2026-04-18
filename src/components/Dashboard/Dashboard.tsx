/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  ChevronDown,
  ChevronsDown,
  Map as MapIcon,
  // Maximize,
  // MoreHorizontal
  ArrowUpRight,
  ArrowDownRight,
  UsersRound,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { ViewType, LayerType } from '../../../types';
// import { GrowthChart, AgeChart } from '../Chart/Chart';
import { MapComponent, LAYER_SCALES } from '../Map/MapComponent';
// import * as pmtiles from 'pmtiles';

import {
  DISTRICT_NAME_VARIANTS,
  DISTRICT_DEMOGRAPHICS,
  ALLOWED_DISTRICTS,
  GENDER,
  CENSUS_PROJECTION_DATA,
  CENSUS_URBAN_RURAL_DATA,
  CENSUS_STATS_DATA,
} from '../../data/comparativeData';
import { DEMOGRAPHIC_STATS } from '../../data/comparativeData';

interface MapSectionProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onDistrictChange?: (name: string) => void;
  onDataChange?: (data: any) => void;
  onDataLoad?: (data: any[]) => void;
  targetDistrict?: string;
}

const InfoTooltip = ({
  text,
  position = 'top',
}: {
  text: string;
  position?: 'top' | 'bottom';
  source?: string;
}) => (
  // const InfoTooltip = ({ text, position = 'top', source = 'UNFPA AI/ML Model v1' }: { text: string; position?: 'top' | 'bottom'; source?: string }) => (
  <span className="group/info inline-block ml-2 align-middle z-100">
    <Info className="w-3.5 h-3.5 text-gray-400 group-hover/info:text-[#F96000] transition-colors cursor-help" />
    <span
      className={`absolute left-0 right-0 px-1 hidden group-hover/info:block animate-in fade-in zoom-in-95 duration-200 pointer-events-none z-[110] 
            ${position === 'bottom' ? 'top-full mt-2 slide-in-from-top-1' : 'bottom-full mb-3 slide-in-from-bottom-1'}`}
    >
      <span className="bg-white/98 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-gray-100 mx-auto w-full block">
        <span className="text-[9px] text-gray-700 leading-relaxed font-semibold mb-2 block">
          {text}
        </span>
        {/* <span className="flex flex-col items-start gap-1 pt-2 border-t border-gray-100">
                    <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">
                        Source:
                        <span className="text-[7px] text-[#0868ac] font-black leading-none ml-1 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">
                            {source}
                        </span>
                    </span>
                </span> */}
        {/* Tooltip Arrow */}
        {position === 'top' ? (
          <span className="absolute top-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45 shadow-sm block"></span>
        ) : (
          <span className="absolute bottom-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 shadow-sm block"></span>
        )}
      </span>
    </span>
  </span>
);

export const MapSection: React.FC<MapSectionProps> = ({
  currentView: _cv,
  onViewChange: _ovc,
  onDistrictChange,
  onDataChange,
  onDataLoad,
  targetDistrict,
}) => {
  const [activeLayer, setActiveLayer] = useState<LayerType>('density');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedRegion] = useState('All');
  const [districtData, setDistrictData] = useState<any>(null);
  const [allDistrictsData, setAllDistrictsData] = useState<any[]>([]);
  const [selectedDistrictName, setSelectedDistrictName] =
    useState<string>('All Districts');
  const [isCensusSource, setIsCensusSource] = useState(false);

  const tooltipSource = isCensusSource
    ? 'Census Stat. Projection'
    : 'UNFPA AI/ML Model v1';

  // Create a robust lookup map from allDistrictsData for consistency
  const districtsLookup = React.useMemo(() => {
    if (!allDistrictsData) return new Map();
    const map = new Map();
    allDistrictsData.forEach((d) => {
      const rawName = d.district_name || d.NAME || d.name;
      const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
      if (name) map.set(name, d);
    });
    return map;
  }, [allDistrictsData]);

  // Memoize Age Distribution Data for Animation stability
  const ageDistributionData = React.useMemo(() => {
    // ALWAYS use model data for the Age Distribution Chart
    const year = selectedYear;
    const isAllDistricts =
      selectedDistrictName === 'All Districts' ||
      selectedDistrictName === 'Odisha';

    const getSum = (key: string) => {
      if (!isAllDistricts && districtData) {
        return parseFloat(districtData[key] || 0);
      } else if (!isAllDistricts && districtsLookup.has(selectedDistrictName)) {
        const record = districtsLookup.get(selectedDistrictName);
        return parseFloat(record ? record[key] : 0) || 0;
      } else if (isAllDistricts && allDistrictsData) {
        return allDistrictsData.reduce(
          (acc, d) => acc + (parseFloat(d[key] || 0) || 0),
          0,
        );
      }
      return 0;
    };

    const ageGroupsList = [
      {
        label: '0-9',
        m: [`male_${year}_0_12`, `male_${year}_1_4`, `male_${year}_5_9`],
        f: [`female_${year}_0_12`, `female_${year}_1_4`, `female_${year}_5_9`],
      },
      {
        label: '10-19',
        m: [`male_${year}_10_14`, `male_${year}_15_19`],
        f: [`female_${year}_10_14`, `female_${year}_15_19`],
      },
      {
        label: '20-29',
        m: [`male_${year}_20_24`, `male_${year}_25_29`],
        f: [`female_${year}_20_24`, `female_${year}_25_29`],
      },
      {
        label: '30-39',
        m: [`male_${year}_30_34`, `male_${year}_35_39`],
        f: [`female_${year}_30_34`, `female_${year}_35_39`],
      },
      {
        label: '40-49',
        m: [`male_${year}_40_44`, `male_${year}_45_49`],
        f: [`female_${year}_40_44`, `female_${year}_45_49`],
      },
      {
        label: '50-59',
        m: [`male_${year}_50_54`, `male_${year}_55_59`],
        f: [`female_${year}_50_54`, `female_${year}_55_59`],
      },
      {
        label: '60-69',
        m: [`male_${year}_60_64`, `male_${year}_65_69`],
        f: [`female_${year}_60_64`, `female_${year}_65_69`],
      },
      {
        label: '70-79',
        m: [`male_${year}_70_74`, `male_${year}_75_79`],
        f: [`female_${year}_70_74`, `female_${year}_75_79`],
      },
      {
        label: '80-89',
        m: [`male_${year}_80_84`, `male_${year}_85_89`],
        f: [`female_${year}_80_84`, `female_${year}_85_89`],
      },
      {
        label: '90+',
        m: [`male_${year}_90_plus`],
        f: [`female_${year}_90_plus`],
      },
    ].reverse();

    return ageGroupsList.map((group) => {
      let maleSum = 0;
      group.m.forEach((k) => (maleSum += getSum(k)));
      let femaleSum = 0;
      group.f.forEach((k) => (femaleSum += getSum(k)));

      return {
        age: group.label,
        male: -maleSum,
        female: femaleSum,
        maleAbs: maleSum,
      };
    });
  }, [
    selectedYear,
    selectedDistrictName,
    districtData,
    allDistrictsData,
    districtsLookup,
  ]);

  const formatAgeTick = (tick: number) => {
    const val = Math.abs(tick);
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(0) + 'k';
    return val.toString();
  };

  const CustomAgeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const m =
        payload.find((p: any) => p.dataKey === 'male')?.payload.maleAbs || 0;
      const f = payload.find((p: any) => p.dataKey === 'female')?.value || 0;
      const formatter = new Intl.NumberFormat('en-US');
      return (
        <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm text-xs text-left">
          <p className="font-bold text-gray-700 mb-1">{label} Years</p>
          <p className="text-[#0868ac] font-mono">
            <span className="font-bold text-gray-600">Male:</span>{' '}
            {formatter.format(m)}
          </p>
          <p className="text-[#F96000] font-mono">
            <span className="font-bold text-gray-600">Female:</span>{' '}
            {formatter.format(f)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Sync state upward when district changes
  useEffect(() => {
    if (districtData) {
      const rawName =
        districtData.district_name ||
        districtData.NAME ||
        districtData.name ||
        'Selected Area';
      const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;

      // Also sync the dropdown if map clicked
      setSelectedDistrictName(name);

      if (onDistrictChange) onDistrictChange(name);
      if (onDataChange) onDataChange(districtData);
    } else {
      // setSelectedDistrictName('All Districts'); // Optional: reset dropdown if map reset?
      if (onDistrictChange) onDistrictChange('Odisha');
      if (onDataChange) onDataChange(null);
    }
  }, [districtData]); // removed onDistrictChange, onDataChange to avoid unnecessary loops

  useEffect(() => {
    if (targetDistrict) {
      const mappedName =
        targetDistrict === 'Odisha' ? 'All Districts' : targetDistrict;
      if (mappedName !== selectedDistrictName) {
        setSelectedDistrictName(mappedName);
      }
    }
  }, [targetDistrict]);

  // const [availableYears, setAvailableYears] = useState<string[]>(['2023']);
  // const [availableDistricts, setAvailableDistricts] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSubdistrict, setShowSubdistrict] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > 10 ||
        window.pageYOffset > 10 ||
        document.documentElement.scrollTop > 10
      ) {
        setShowScrollHint(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Applied filters state (updates in real-time)
  const [appliedFilters, setAppliedFilters] = useState({
    layer: 'density',
    year: '2025',
    gender: 'All',
    region: 'All',
    district: 'All Districts',
  });

  useEffect(() => {
    setAppliedFilters({
      layer: activeLayer,
      year: selectedYear,
      gender: selectedGender,
      region: selectedRegion,
      district: selectedDistrictName,
    });
  }, [
    activeLayer,
    selectedYear,
    selectedGender,
    selectedRegion,
    selectedDistrictName,
  ]);

  const layers = [
    {
      id: 'density',
      label: 'Population Density',
      minYear: 2011,
      maxYear: 2035,
    },
    { id: 'pop', label: 'Total Population', minYear: 2011, maxYear: 2035 },
    {
      id: 'deg_urbanisation',
      label: 'Degree of Urbanisation',
      minYear: 2015,
      maxYear: 2035,
    },
  ];

  useEffect(() => {
    const lyr = layers.find((l) => l.id === activeLayer);
    if (lyr) {
      const yr = parseInt(selectedYear);
      if (yr < lyr.minYear) setSelectedYear(lyr.minYear.toString());
      if (yr > lyr.maxYear) setSelectedYear(lyr.maxYear.toString());
    }
  }, [activeLayer, selectedYear]);

  const genders = ['All', 'Male', 'Female'];
  // const regions = ['All', 'Urban', 'Rural'];

  /* 
    // PMTiles URL and Metadata fetching removed as we are hardcoding years 2012-2025
    */

  // Handle Search Trigger
  // const handleSearch = () => {
  //     setAppliedFilters({
  //         layer: activeLayer,
  //         year: selectedYear,
  //         gender: selectedGender,
  //         region: selectedRegion,
  //         district: selectedDistrictName
  //     });
  //     setOpenDropdown(null);
  // };

  // Helper to format large numbers
  const formatNumber = (num: any) => {
    const val = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(val) || val === null || val === undefined) return '0';
    if (val >= 1000000) return (val / 1000000).toFixed(2) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return Math.floor(val).toString();
  };

  const getPopForYear = (
    districtName: string,
    year: string,
    gender: 'sum' | 'Male' | 'Female' = 'sum',
    forceModel: boolean = false,
  ) => {
    const isAll = districtName === 'All Districts' || districtName === 'Odisha';
    if (isCensusSource && !forceModel) {
      const name = DISTRICT_NAME_VARIANTS[districtName] || districtName;
      const nameForLookup = name === 'All Districts' ? 'Odisha' : name;
      const yearInt = parseInt(year);
      const censusVal = CENSUS_PROJECTION_DATA[nameForLookup]?.[yearInt];
      if (censusVal !== undefined) {
        if (gender === 'Male') return censusVal * 0.5;
        if (gender === 'Female') return censusVal * 0.5;
        return censusVal;
      }
    }

    const propKey =
      gender === 'sum'
        ? `pop_${year}_sum`
        : gender === 'Male'
          ? `male_${year}`
          : `female_${year}`;

    // Explicitly check static data for Odisha first to support 2011-2036 projections
    if (isAll && DISTRICT_DEMOGRAPHICS['Odisha']) {
      const odishaData = DISTRICT_DEMOGRAPHICS['Odisha'][parseInt(year)];
      if (odishaData) {
        if (gender === 'Male') return odishaData.male;
        if (gender === 'Female') return odishaData.female;
        return odishaData.male + odishaData.female;
      }
    }

    // Sum across all districts if it's the state-level view
    if (isAll && allDistrictsData && allDistrictsData.length > 0) {
      return allDistrictsData.reduce(
        (acc, d) => acc + (parseFloat(d[propKey] || 0) || 0),
        0,
      );
    }

    // Priority 1: Selected District Data (passed directly)
    if (selectedDistrictName === districtName && districtData) {
      const val = districtData[propKey];
      if (val !== undefined && val !== null)
        return typeof val === 'string' ? parseFloat(val) : val;
    }

    // Priority 2: All Districts Data (from map query)
    if (districtsLookup.has(districtName)) {
      const dData = districtsLookup.get(districtName);
      const val = dData[propKey];
      if (val !== undefined && val !== null)
        return typeof val === 'string' ? parseFloat(val) : val;
    }

    // Priority 3: Static GENDER data
    if (gender !== 'sum' && GENDER[districtName]) {
      const key = gender === 'Male' ? `${year}_male` : `${year}_female`;
      const staticVal = GENDER[districtName][key];
      if (staticVal !== undefined) return staticVal;
    }

    return null;
  };

  // Get current stats from district data
  const getStats = () => {
    const dName =
      selectedDistrictName && selectedDistrictName !== 'All Districts'
        ? selectedDistrictName
        : districtData
          ? districtData.district_name ||
            districtData.NAME ||
            districtData.name ||
            'Selected Area'
          : 'All Districts';
    const name = DISTRICT_NAME_VARIANTS[dName] || dName;
    const yearSuffix = appliedFilters.year;
    const yearInt = parseInt(yearSuffix);

    const nameForLookup = name === 'All Districts' ? 'Odisha' : name;
    const demo = DISTRICT_DEMOGRAPHICS[nameForLookup];

    const getPopDataForYear = (year: number) => {
      if (!demo) return null;
      if (demo[year]) return demo[year];
      const avYears = Object.keys(demo)
        .map(Number)
        .sort((a, b) => a - b);
      if (avYears.length === 0) return null;
      const closest = avYears.reduce((prev, curr) =>
        Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev,
      );
      return demo[closest];
    };

    const currentDemo = getPopDataForYear(yearInt);
    const totalP =
      (getPopForYear(name, yearSuffix, 'sum') as number) ||
      (currentDemo ? currentDemo.male + currentDemo.female : 41974218);
    const mP =
      (getPopForYear(name, yearSuffix, 'Male') as number) ||
      (currentDemo ? currentDemo.male : 21196980);
    const fP =
      (getPopForYear(name, yearSuffix, 'Female') as number) ||
      (currentDemo ? currentDemo.female : 20777238);

    if (isCensusSource) {
      // Use Model data for gender metrics rendering on Census tab
      const latestModelPop =
        (getPopForYear(name, yearSuffix, 'sum', true) as number) ||
        (currentDemo ? currentDemo.male + currentDemo.female : 41974218);
      let modelMaleCount = getPopForYear(
        name,
        yearSuffix,
        'Male',
        true,
      ) as number;
      let modelFemaleCount = getPopForYear(
        name,
        yearSuffix,
        'Female',
        true,
      ) as number;

      // Fallback to static demographics if missing model data
      if (
        !modelMaleCount &&
        !modelFemaleCount &&
        DISTRICT_DEMOGRAPHICS[name] &&
        DISTRICT_DEMOGRAPHICS[name][yearInt]
      ) {
        modelMaleCount = DISTRICT_DEMOGRAPHICS[name][yearInt].male;
        modelFemaleCount = DISTRICT_DEMOGRAPHICS[name][yearInt].female;
      } else {
        modelMaleCount = modelMaleCount || latestModelPop * 0.51;
        modelFemaleCount = modelFemaleCount || latestModelPop * 0.49;
      }

      const modelTotalForGender = modelMaleCount + modelFemaleCount;
      const modelMalePct =
        ((modelMaleCount / modelTotalForGender) * 100).toFixed(1) + '%';
      const modelFemalePct =
        ((modelFemaleCount / modelTotalForGender) * 100).toFixed(1) + '%';

      const area =
        districtData?.['Shape_Area'] ||
        districtData?.['AREA'] ||
        districtData?.['Area'] ||
        districtData?.['area'] ||
        (nameForLookup === 'Odisha' ? 155707 : 5000);
      const censusStat =
        CENSUS_STATS_DATA[nameForLookup]?.[appliedFilters.year];
      let censusDensity = censusStat?.density;

      if (censusDensity === undefined && totalP > 0 && area > 0) {
        censusDensity = totalP / area;
      }

      return {
        name: name,
        pop: formatNumber(totalP), // Uses actual Census total population
        area: area,
        density:
          censusDensity !== undefined
            ? censusDensity % 1 === 0
              ? censusDensity.toString()
              : censusDensity.toFixed(2)
            : '350',
        literacy: '72.9%',
        male: modelMalePct, // Model male %
        female: modelFemalePct, // Model female %
        maleCount: formatNumber(modelMaleCount), // Model exact male count
        femaleCount: formatNumber(modelFemaleCount), // Model exact female count
      };
    }

    const DEFAULTS = {
      name: name,
      pop: formatNumber(totalP),
      literacy: '72.9%',
      male: ((mP / totalP) * 100).toFixed(1) + '%',
      female: ((fP / totalP) * 100).toFixed(1) + '%',
      area: 155707,
      maleCount: formatNumber(mP),
      femaleCount: formatNumber(fP),
      density: DEMOGRAPHIC_STATS['Odisha']?.[yearInt]?.density ?? '270',
    };

    if (name === 'All Districts' || name === 'Odisha') return DEFAULTS;

    const litKeyBase =
      districtData?.[`Literacy_${yearSuffix}`] !== undefined
        ? `Literacy_${yearSuffix}`
        : `literacy_${yearSuffix}`;

    // Exact logic from StateDetails Regional Performance Matrix
    let latestPop = getPopForYear(name, yearSuffix, 'sum') as number;
    if (!latestPop && districtData?.[`pop_${yearSuffix}_sum`]) {
      latestPop = parseFloat(districtData[`pop_${yearSuffix}_sum`]);
    }
    // Fallback safety
    latestPop = latestPop || totalP;

    const maleCount = getPopForYear(name, yearSuffix, 'Male') as number;
    const femaleCount = getPopForYear(name, yearSuffix, 'Female') as number;

    let malePop = maleCount || latestPop * 0.51;
    let femalePop = femaleCount || latestPop * 0.49;

    // Explicitly set absolute male/female population figures for baseline display if pmtiles is missing
    if (
      !maleCount &&
      !femaleCount &&
      DISTRICT_DEMOGRAPHICS[name] &&
      DISTRICT_DEMOGRAPHICS[name][yearInt]
    ) {
      malePop = DISTRICT_DEMOGRAPHICS[name][yearInt].male;
      femalePop = DISTRICT_DEMOGRAPHICS[name][yearInt].female;
      // Update the total population implicitly to match the sum of exact demographic points
      if (!getPopForYear(name, yearSuffix, 'sum')) {
        latestPop = malePop + femalePop;
      }
    }

    const exactMalePercent = (malePop / (malePop + femalePop)) * 100 || 51;
    const exactFemalePercent = (femalePop / (malePop + femalePop)) * 100 || 49;

    // Density calculation from PMTiles
    const densityKey = `density_${yearSuffix}`;
    let densityValue: string | number = '—';

    if (districtData?.[densityKey] !== undefined) {
      densityValue = parseFloat(districtData[densityKey]);
    } else if (districtsLookup.has(name)) {
      const dData = districtsLookup.get(name);
      if (dData?.[densityKey] !== undefined) {
        densityValue = parseFloat(dData[densityKey]);
      }
    }

    // Fallback or Odisha default
    if (
      densityValue === '—' &&
      DEMOGRAPHIC_STATS[name === 'All Districts' ? 'Odisha' : name]?.[yearInt]
    ) {
      densityValue =
        DEMOGRAPHIC_STATS[name === 'All Districts' ? 'Odisha' : name][yearInt]
          .density;
    }

    return {
      name: name,
      pop: latestPop > 0 ? formatNumber(latestPop) : DEFAULTS.pop,
      area:
        districtData?.['Shape_Area'] ||
        districtData?.['AREA'] ||
        districtData?.['Area'] ||
        districtData?.['area'] ||
        0,
      density:
        typeof densityValue === 'number'
          ? densityValue % 1 === 0
            ? densityValue
            : densityValue.toFixed(2)
          : densityValue,
      literacy:
        districtData?.[litKeyBase] !== undefined
          ? districtData[litKeyBase] + '%'
          : DEFAULTS.literacy,
      male: exactMalePercent.toFixed(1) + '%',
      female: exactFemalePercent.toFixed(1) + '%',
      maleCount: formatNumber(malePop),
      femaleCount: formatNumber(femalePop),
    };
  };

  const stats = getStats();

  const formatStatValue = (val: string, unitSize: string = 'text-[20px]') => {
    const match = val.match(/^([\d.]+)([Mk%])?$/);
    if (match) {
      return (
        <>
          <span className="font-mono text-[#0868ac]">{match[1]}</span>
          <span className={`font-semibold ${unitSize} text-gray-400`}>
            {' '}
            {match[2]}
          </span>
        </>
      );
    }
    return val;
  };

  return (
    <div className="flex flex-col bg-[#F8FAFC] mx-auto py-10 space-y-12">
      {/* BOTTOM SECTION: CONTENT AREA */}
      <div className="flex-1">
        <div className="w-full mx-auto px-4 lg:px-6 flex flex-col lg:flex-row gap-4">
          {/* ----------------- CENTER: MAP AREA ----------------- */}
          <div className="w-full h-112.5 lg:flex-1 relative overflow-hidden lg:h-[80vh] bg-white rounded-lg shadow-sm border border-gray-100 group">
            <MapComponent
              activeLayer={appliedFilters.layer}
              selectedYear={appliedFilters.year}
              gender={appliedFilters.gender}
              region={appliedFilters.region}
              targetDistrict={appliedFilters.district}
              showSubdistrict={showSubdistrict}
              onResetClick={() => {
                setDistrictData(null);
                setSelectedDistrictName('All Districts');
                setAppliedFilters((prev) => ({
                  ...prev,
                  district: 'All Districts',
                }));
              }}
              onDistrictClick={(data) => {
                const rawName =
                  data.district_name ||
                  data.NAME ||
                  data.name ||
                  'Selected Area';
                const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
                if (!ALLOWED_DISTRICTS.includes(name)) return;
                setDistrictData(data);
                setAppliedFilters((prev) => ({ ...prev, district: name }));
              }}
              onDataLoad={(data) => {
                setAllDistrictsData(data);
                if (onDataLoad) onDataLoad(data);
              }}
            />

            {/* Map Overlay: Grid/Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"></div>

            {/* Floating Control Panel (Top Left) */}
            <div className="absolute top-5 bottom-5 left-5 z-60 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-gray-100 w-[260px] max-w-[calc(100%-40px)] transition-all hover:shadow-md flex flex-col overflow-hidden">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                            input[type=range]::-webkit-slider-thumb {
                                appearance: none;
                                height: 16px;
                                width: 16px;
                                border-radius: 50%;
                                background: #F96000;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                margin-top: -6px;
                            }
                            input[type=range]::-moz-range-thumb {
                                height: 18px;
                                width: 18px;
                                border-radius: 50%;
                                background: #F96000;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            input[type=range]::-webkit-slider-runnable-track {
                                width: 100%;
                                height: 6px;
                                cursor: pointer;
                                background: #aeaeaeff;
                                border-radius: 3px;
                            }
                        `,
                }}
              />
              {/* Sticky Header */}
              <div className="p-5 pb-4 sticky top-0 bg-white/90 backdrop-blur-md z-70 shrink-0 border-b border-gray-200">
                <h3 className="text-[16px] font-bold text-gray-900 leading-tightt mb-2 uppercase">
                  Filter / Selection
                </h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Configure viewing preferences. Apply geographical filters,
                  temporal ranges, and demographic slices.
                </p>
              </div>

              <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5">
                <div className="relative w-full">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70 block">
                    District
                  </span>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const sortedDistricts = [...ALLOWED_DISTRICTS].sort();
                      const selectedIndex =
                        sortedDistricts.indexOf(selectedDistrictName);

                      let theme = {
                        bg: 'bg-white',
                        text: 'text-gray-600',
                        border: 'border-gray-400',
                      };

                      if (
                        selectedDistrictName !== 'All Districts' &&
                        selectedIndex !== -1
                      ) {
                        const flavorIndex = selectedIndex % 6;
                        const flavors = [
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                          {
                            bg: 'bg-[#bae4bc]',
                            text: 'text-gray-600',
                            border: 'border-gray-400',
                          },
                        ];
                        theme = flavors[flavorIndex];
                      }

                      return (
                        <div
                          className={`flex-1 px-3 py-1.5 text-[12px] tracking-wide bg-white text-gray-700 font-semibold border rounded-md ${theme.border} truncate h-full flex items-center transition-colors`}
                        >
                          {selectedDistrictName === 'All Districts'
                            ? 'All'
                            : selectedDistrictName}
                        </div>
                      );
                    })()}
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === 'district' ? null : 'district',
                        )
                      }
                      className="h-full px-1 hover:bg-gray-100 transition-colors flex items-center justify-center border border-transparent hover:border-gray-200"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-[#f64e24] transition-transform ${openDropdown === 'district' ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  {openDropdown === 'district' && (
                    <div className="absolute left-0 top-full mt-2 max-h-75 overflow-y-auto custom-scrollbar bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 p-2 z-[50] animate-in fade-in slide-in-from-top-2">
                      <button
                        // onClick={() => {
                        //   setSelectedDistrictName('All Districts');
                        //   setOpenDropdown(null);
                        // }}
                        onClick={() => {
                          setDistrictData(null); // 🔥 most important
                          setSelectedDistrictName('All Districts');
                          setOpenDropdown(null);
                        }}
                        className="w-full px-3 py-2 text-left transition-all hover:bg-gray-50/50"
                      >
                        <span className="text-xs tracking-wider border-b-2 pb-0.5 text-gray-600 font-semibold border-gray-400">
                          All
                        </span>
                      </button>
                      {ALLOWED_DISTRICTS.slice()
                        .sort()
                        .map((name, index) => {
                          const flavors = [
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                            {
                              text: 'text-gray-600',
                              border: 'border-gray-400',
                            },
                          ];
                          const theme = flavors[index % flavors.length];

                          return (
                            <button
                              key={name}
                              onClick={() => {
                                setSelectedDistrictName(name);
                                setOpenDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left transition-all hover:bg-gray-50/50"
                            >
                              <span
                                className={`text-xs tracking-wider border-b-2 pb-0.5 font-semibold ${theme.text} ${theme.border}`}
                              >
                                {name}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full mx-auto h-px bg-gray-200 shrink-0"></div>

                <div className="relative w-full">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70 block">
                    Layer
                  </span>
                  <div className="flex items-center gap-2">
                    {(() => {
                      return (
                        <div
                          className={`flex-1 px-3 py-1.5 text-[12px] tracking-wide bg-white text-gray-700 font-semibold rounded-md border border-gray-400 truncate h-full flex items-center transition-colors min-w-[140px]`}
                        >
                          {layers.find((l) => l.id === activeLayer)?.label}
                        </div>
                      );
                    })()}
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === 'layer' ? null : 'layer',
                        )
                      }
                      className="h-full px-1 hover:bg-gray-100 transition-colors flex items-center justify-center border border-transparent hover:border-gray-200"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-[#f64e24] transition-transform ${openDropdown === 'layer' ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  {openDropdown === 'layer' && (
                    <div className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 p-2 z-[50] animate-in fade-in slide-in-from-top-2">
                      {layers.map((l, index) => {
                        const flavors = [
                          { text: 'text-gray-600', border: 'border-gray-400' },
                          { text: 'text-gray-600', border: 'border-gray-400' },
                          { text: 'text-gray-600', border: 'border-gray-400' },
                          { text: 'text-gray-600', border: 'border-gray-400' },
                          { text: 'text-gray-600', border: 'border-gray-400' },
                          { text: 'text-gray-600', border: 'border-gray-400' },
                        ];
                        const theme = flavors[index % flavors.length];

                        return (
                          <button
                            key={l.id}
                            onClick={() => {
                              setActiveLayer(l.id as LayerType);
                              setOpenDropdown(null);
                            }}
                            className="w-full px-3 py-2 text-left transition-all hover:bg-gray-50/50"
                          >
                            <span
                              className={`text-xs tracking-wider border-b-2 pb-0.5 font-semibold ${theme.text} ${theme.border}`}
                            >
                              {l.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    Show Subdistrict
                  </span>
                  <button
                    onClick={() => setShowSubdistrict(!showSubdistrict)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showSubdistrict ? 'bg-[#F76000]' : 'bg-gray-200'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showSubdistrict ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* Divider */}
                <div className="w-full mx-auto h-px bg-gray-200 shrink-0"></div>

                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                      Year
                    </span>
                    <span className="text-sm font-black text-[#0868ac] font-mono">
                      {selectedYear}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={
                      layers.find((l) => l.id === activeLayer)?.minYear || 2011
                    }
                    max={
                      layers.find((l) => l.id === activeLayer)?.maxYear || 2035
                    }
                    step="2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full appearance-none bg-transparent"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] font-bold text-gray-400">
                      {layers.find((l) => l.id === activeLayer)?.minYear ||
                        2011}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">
                      {layers.find((l) => l.id === activeLayer)?.maxYear ||
                        2035}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full mx-auto h-px bg-gray-200 shrink-0"></div>

                <div
                  className={`w-full ${activeLayer === 'deg_urbanisation' ? 'opacity-50 pointer-events-none grayscale-[0.5]' : ''}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70 block">
                    Gender
                  </span>
                  <div className="flex items-center gap-2">
                    {genders.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`px-3 py-1 text-[12px] font-bold rounded-md tracking-wide transition-all ${
                          selectedGender === g
                            ? g === 'Male'
                              ? 'bg-[#F96000] text-[#ffffff]'
                              : g === 'Female'
                                ? 'bg-[#F96000] text-[#ffffff] '
                                : 'bg-[#F96000] text-[#ffffff] ' // Default/All
                            : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-whit'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                    {/* bg-gray-100 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-whit */}
                  </div>
                </div>
              </div>

              {/* Sticky Legend (Bottom) */}
              {(() => {
                const steps = LAYER_SCALES[activeLayer ?? ''] ?? [
                  0, 25, 50, 75, 100,
                ];

                const formatNum = (v: number) => {
                  if (Math.abs(v) >= 1000000)
                    return (v / 1000000).toFixed(1) + 'M';
                  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(0) + 'k';
                  return Math.round(v).toString();
                };

                const unit =
                  activeLayer === 'growth'
                    ? '%'
                    : activeLayer === 'density'
                      ? ' P / sq.km'
                      : activeLayer === 'deg_urbanisation'
                        ? ' sq.km'
                        : '';

                const labels = [
                  `${formatNum(steps[0])} - ${formatNum(steps[1])} ${unit}`,
                  `${formatNum(steps[1])} - ${formatNum(steps[2])} ${unit}`,
                  `${formatNum(steps[2])} - ${formatNum(steps[3])} ${unit}`,
                  `${formatNum(steps[3])} - ${formatNum(steps[4])} ${unit}`,
                  `> ${formatNum(steps[4])} ${unit}`,
                ];

                return (
                  <div className="p-4 sticky bottom-0 bg-white/90 backdrop-blur-md z-[70] shrink-0 border-t border-gray-200 shadow-[0_-10px_15px_-3px_rgba(255,255,255,0.9)]">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">
                      {layers.find((l) => l.id === activeLayer)?.label ||
                        'Legend'}
                    </h4>
                    <div className="flex flex-col gap-1.5 font-semibold">
                      {activeLayer === 'deg_urbanisation' ? (
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-3 rounded-full bg-[#D3D3D3]"></div>
                          <span className="text-[11px] text-gray-800 font-medium tracking-wide">
                            Urbanisation Distribution
                          </span>
                        </div>
                      ) : (
                        [
                          { color: '#f0f9e8', label: labels[0] },
                          { color: '#bae4bc', label: labels[1] },
                          { color: '#7bccc4', label: labels[2] },
                          { color: '#43a2ca', label: labels[3] },
                          { color: '#0868ac', label: labels[4] },
                        ].map((item, id) => (
                          <div key={id} className="flex items-center gap-2.5">
                            <div
                              className="w-6 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-[11px] text-gray-800 font-medium tracking-wide">
                              {item.label}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* ----------------- RIGHT SIDEBAR: DETAILS ----------------- */}
          <div className="w-full lg:w-80 h-auto lg:h-[80vh] bg-white border border-gray-100 rounded-lg flex flex-col z-20 shadow-sm transition-all hover:shadow-md relative">
            <div className="p-6 border-b border-gray-100 flex flex-col items-start bg-gray-50/30">
              <div className="flex justify-between w-full">
                {/* Left Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {stats.name === 'All Districts' ? 'Odisha' : stats.name}
                    </h3>
                  </div>

                  {stats.name === 'All Districts' && (
                    <p className="mt-1 font-bold">
                      <span>
                        <span className="text-xs font-semibold uppercase text-gray-600">
                          Area :
                        </span>{' '}
                        <span className="text-xs font-mono text-[#0868ac] tracking-wider">
                          {stats.area ? stats.area.toLocaleString() : 'N/A'}
                        </span>
                      </span>{' '}
                      <span className="text-xs text-gray-600">km²</span>
                    </p>
                  )}

                  {stats.name !== 'All Districts' && (
                    <span>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1 font-medium">
                        <MapIcon className="w-3 h-3" />
                        District
                      </p>
                      <p>
                        <span className="text-xs  font-bold tracking-wider">
                          <span>
                            <span className="text-xs font-semibold uppercase text-gray-600">
                              Area :
                            </span>{' '}
                            <span className="text-xs font-mono text-[#0868ac] tracking-wider">
                              {stats.area ? stats.area.toLocaleString() : 'N/A'}
                            </span>
                          </span>{' '}
                          <span className="text-xs text-gray-600">km²</span>
                        </span>
                      </p>
                    </span>
                  )}
                </div>

                {/* Right Side */}
                <div className="ml-4 mt-2 shrink-0">
                  <span className="px-2 py-1 text-[12px] font-mono text-[#F96000] bg-[#FDCFB3] font-semibold rounded-md">
                    {selectedYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-600 font-bold uppercase tracking-wider">
                  Key Stats
                </span>
                <div className="flex bg-gray-100/80 p-0.5 rounded-lg border border-gray-200/50 shadow-inner">
                  <button
                    onClick={() => setIsCensusSource(false)}
                    className={`px-3 py-1 text-[9px] font-black uppercase tracking-tight rounded-md transition-all duration-200 ${!isCensusSource ? 'bg-white text-[#F96000] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Model
                  </button>
                  <button
                    onClick={() => setIsCensusSource(true)}
                    className={`px-3 py-1 text-[9px] font-black uppercase tracking-tight rounded-md transition-all duration-200 ${isCensusSource ? 'bg-white text-[#F96000] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Census
                  </button>
                </div>
              </div>

              {/* Data Source Descriptor */}
              <div className="text-[10px] text-gray-500 font-medium text-right w-full mt-[-22px]">
                {isCensusSource
                  ? 'Based on official census data and projections.'
                  : 'Generated using AI/ML models and satellite data.'}
              </div>

              {/* Key Stats Grid */}
              <div className="grid mt-4">
                {(() => {
                  // Calculate Sparkline Data

                  // Calculate Growth (YoY)
                  const selectedYear = parseInt(appliedFilters.year);
                  const prevYear = selectedYear - 1;
                  const districtNameForStats =
                    stats.name === 'All Districts' ? 'Odisha' : stats.name;

                  const popCurr = getPopForYear(
                    districtNameForStats,
                    selectedYear.toString(),
                  );
                  const popPrev = getPopForYear(
                    districtNameForStats,
                    prevYear.toString(),
                  );

                  let growth = 0;
                  if (isCensusSource) {
                    const censusStat =
                      CENSUS_STATS_DATA[districtNameForStats]?.[
                        selectedYear.toString()
                      ];
                    growth =
                      censusStat?.growth !== null &&
                      censusStat?.growth !== undefined
                        ? censusStat.growth
                        : 1.25;
                  } else if (popCurr && popPrev && popPrev !== 0) {
                    growth = ((popCurr - popPrev) / popPrev) * 100;
                  } else {
                    // Fallback to DEMOGRAPHIC_STATS if specific year data is missing
                    const statRecord =
                      DEMOGRAPHIC_STATS[districtNameForStats]?.[selectedYear];
                    growth = statRecord?.pop_total_growth || 0;
                  }

                  const isPositive = growth >= 0;

                  return (
                    <div className="flex w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group/stat items-center justify-between gap-2 relative">
                      <div className="w-1/4 flex items-center justify-center">
                        <UsersRound className="w-7.5 h-7.5 text-[#F96000]" />
                      </div>

                      <div className="w-3/4">
                        <div className="flex flex-wrap items-baseline gap-2 gap-y-1 mb-1">
                          <p className="text-2xl font-black text-gray-900 tracking-tight">
                            {formatStatValue(stats.pop)}
                          </p>
                          <div
                            className={`flex items-center text-[10px] font-bold ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-1.5 py-0.5 rounded-md`}
                          >
                            {isPositive ? (
                              <ArrowUpRight
                                className="w-3 h-3 mr-1"
                                strokeWidth={3}
                              />
                            ) : (
                              <ArrowDownRight
                                className="w-3 h-3 mr-1"
                                strokeWidth={3}
                              />
                            )}
                            {Math.abs(growth).toFixed(2)}%
                          </div>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                          Total Population
                          <InfoTooltip
                            text="Projected total population count."
                            position="bottom"
                            source={tooltipSource}
                          />
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Population Density Card */}
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-800">
                      <div className="flex flex-col gap-0.5 mb-1 pt-2">
                        <span className="text-xl font-black text-[#0868ac] tracking-tight leading-none group-hover/stat:scale-105 transition-transform origin-left font-mono">
                          {stats.density}
                        </span>
                        <div className="text-[10px] font-bold text-gray-500 leading-tight flex flex-col">
                          <span>P / sq.km</span>
                        </div>
                      </div>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Pop. Density
                      <InfoTooltip
                        text="Average number of people per square kilometer of land area."
                        source={tooltipSource}
                      />
                    </span>
                  </div>
                </div>

                {/* Growth Card */}
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-800">
                      <div className="items-baseline gap-x-2 gap-y-1 mb-1">
                        <span className="text-xl font-black text-[#0868ac] tracking-tight leading-none group-hover/stat:scale-105 transition-transform origin-left font-mono">
                          {(() => {
                            const currentYear = parseInt(appliedFilters.year);
                            const prevYear = currentYear - 1;
                            const dName =
                              stats.name === 'All Districts'
                                ? 'Odisha'
                                : stats.name;

                            if (isCensusSource) {
                              const censusStat =
                                CENSUS_STATS_DATA[dName]?.[
                                  currentYear.toString()
                                ];
                              if (
                                censusStat?.growth !== null &&
                                censusStat?.growth !== undefined
                              ) {
                                return censusStat.growth.toFixed(2);
                              }
                            }

                            const popCurr = getPopForYear(
                              dName,
                              currentYear.toString(),
                            );
                            const popPrev = getPopForYear(
                              dName,
                              prevYear.toString(),
                            );

                            if (popCurr && popPrev && popPrev !== 0) {
                              const growth =
                                ((popCurr - popPrev) / popPrev) * 100;
                              return growth.toFixed(2);
                            }

                            // Fallback: Check if growth is explicitly provided in data
                            const pmtilesGrowthKey = `growth_${currentYear}`;
                            let val =
                              districtData?.[pmtilesGrowthKey] ||
                              districtsLookup.get(dName)?.[pmtilesGrowthKey];

                            if (val === undefined || val === null) {
                              val =
                                DEMOGRAPHIC_STATS[dName]?.[currentYear]?.growth;
                            }

                            return typeof val === 'number'
                              ? val.toFixed(2)
                              : val || '—';
                          })()}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500">
                          {' '}
                          %
                        </span>
                      </div>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Growth{' '}
                      <span className="text-[9px] text-gray-400 lowercase ml-1 font-medium italic">
                        {' '}
                        (vs. {parseInt(appliedFilters.year) - 1})
                      </span>
                      <InfoTooltip
                        text="Annual percentage change in population size compared to the previous year."
                        source={tooltipSource}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Urban / Rural Distribution Chart */}
              {(() => {
                const isAllDistricts =
                  selectedDistrictName === 'All Districts' ||
                  selectedDistrictName === 'Odisha';
                const currentName = isAllDistricts ? 'Odisha' : stats.name;
                const demographicData =
                  DEMOGRAPHIC_STATS[currentName]?.[
                    parseInt(appliedFilters.year)
                  ];
                if (
                  !isCensusSource &&
                  (!demographicData || !demographicData.urban)
                )
                  return null;

                const urbanData = isCensusSource
                  ? CENSUS_URBAN_RURAL_DATA[currentName]?.[appliedFilters.year]
                  : null;
                const urban = isCensusSource
                  ? urbanData?.urban ||
                    0.6 *
                      (getPopForYear(
                        currentName,
                        appliedFilters.year,
                      ) as number)
                  : demographicData.urban;
                const rural = isCensusSource
                  ? urbanData?.rural ||
                    0.4 *
                      (getPopForYear(
                        currentName,
                        appliedFilters.year,
                      ) as number)
                  : demographicData.rural;
                const total = urban + rural;
                const urbanPercent = Math.round((urban / total) * 100);
                const ruralPercent = 100 - urbanPercent;

                const formatLakhs = (val: number) => {
                  return (val / 100000).toFixed(2);
                };

                return (
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700 mb-2">
                      <span className="font-bold uppercase tracking-wider text-gray-500">
                        Urban /
                      </span>{' '}
                      <span className="font-bold  tracking-wider uppercase text-gray-500">
                        Rural
                      </span>
                      <InfoTooltip
                        text="Distribution of people living in urban centers versus rural localities."
                        source={tooltipSource}
                      />
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-bold">
                        <span className="text-[#0868ac] text-xl font-mono">
                          {formatLakhs(urban)}
                        </span>{' '}
                        <span className="text-[10px] text-gray-500"> L </span>{' '}
                        <span className="text-gray-400"> / </span>{' '}
                        <span className="text-xl text-[#0868ac] font-mono">
                          {formatLakhs(rural)}
                        </span>{' '}
                        <span className="text-[10px] text-gray-500"> L</span>
                      </div>
                    </div>
                    <div className="w-full h-3 rounded-full flex overflow-hidden">
                      <div
                        className="bg-gray-400 h-full transition-all duration-500"
                        style={{ width: `${urbanPercent}%` }}
                      ></div>
                      <div
                        className="bg-[#0868ac] h-full transition-all duration-500"
                        style={{ width: `${ruralPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })()}

              {/* <div className="grid grid-cols-2 gap-4"> */}
              {/* Population Density Card */}
              {/* <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-all group/stat flex flex-col justify-between">
                                    <p className="text-[10px] uppercase font-bold text-[#3B82F6] mb-1 tracking-wide opacity-70">Pop. Density</p>
                                    <p className="text-xl font-bold text-gray-900 group-hover/stat:scale-105 transition-transform origin-left">{DEMOGRAPHIC_STATS[stats.name === 'All Districts' ? 'Odisha' : stats.name]?.density || "—"}</p>
                                </div> */}

              {/* Sex Ratio Card */}
              {/* <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 hover:bg-gray-50 hover:border-gray-200 transition-all group/stat flex flex-col justify-between">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wide opacity-70">Sex Ratio</p>
                                    <p className="text-xl font-bold text-gray-900 group-hover/stat:scale-105 transition-transform origin-left">{DEMOGRAPHIC_STATS[stats.name === 'All Districts' ? 'Odisha' : stats.name]?.sexRatio || "—"}</p>
                                </div> */}
              {/* </div> */}

              {/* Yearly Trend Chart */}
              {/* <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-[12px] font-bold text-gray-700 uppercase tracking-wide"></h4>
                                </div>
                                <div className="w-full">
                                    {(() => {
                                        const getTrendData = () => {
                                            const isAllDistricts = selectedDistrictName === 'All Districts' || selectedDistrictName === 'Odisha';
                                            if (isAllDistricts) {
                                                return [
                                                    { year: 2012, value: 41000000 }, { year: 2013, value: 41500000 },
                                                    { year: 2014, value: 42000000 }, { year: 2015, value: 42500000 },
                                                    { year: 2016, value: 43000000 }, { year: 2017, value: 43500000 },
                                                    { year: 2018, value: 44000000 }, { year: 2019, value: 44500000 },
                                                    { year: 2020, value: 45000000 }, { year: 2021, value: 45500000 },
                                                    { year: 2022, value: 46000000 }, { year: 2023, value: 46500000 },
                                                    { year: 2024, value: 47000000 }, { year: 2025, value: 47500000 }
                                                ];
                                            }

                                            if (!allDistrictsData || allDistrictsData.length === 0) return [];

                                            const first = allDistrictsData[0];
                                            const years = Object.keys(first)
                                                .filter(k => /^pop_\d{4}_sum$/.test(k))
                                                .map(k => parseInt(k.split('_')[1]))
                                                .sort((a, b) => a - b);

                                            return years.map(year => {
                                                const key = `pop_${year}_sum`;
                                                let value = 0;

                                                const d = districtData || allDistrictsData.find(d => {
                                                    const rawName = d.district_name || d.NAME || d.name;
                                                    const name = DISTRICT_NAME_VARIANTS[rawName] || rawName;
                                                    return name === selectedDistrictName;
                                                });

                                                if (d) {
                                                    const val = d[key];
                                                    value = typeof val === 'string' ? parseFloat(val) : (val || 0);
                                                }

                                                return { year, value };
                                            });
                                        };

                                        const data = getTrendData();

                                        if (data.length === 0) return <div className="flex items-center justify-center h-full text-xs text-gray-400">No trend data available</div>;

                                        return (
                                            <ResponsiveContainer width="100%" height={120}>
                                                <AreaChart data={data} margin={{ top: 15, right: 20, left: 20, bottom: 15 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                    <XAxis
                                                        dataKey="year"
                                                        tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }}
                                                        tickLine={false}
                                                        axisLine={{ stroke: '#f3f4f6' }}
                                                        dy={10}
                                                        padding={{ left: 10, right: 10 }}
                                                    />
                                                    <RechartsTooltip
                                                        cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
                                                        labelStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#6b7280', marginBottom: '4px' }}
                                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold', padding: 0 }}
                                                        formatter={(value: any) => [
                                                            value >= 1000000 ? `${(value / 1000000).toFixed(2)}M` : value.toLocaleString(),
                                                            'Population'
                                                        ]}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#F58220"
                                                        strokeWidth={2}
                                                        fill="#F58220"
                                                        fillOpacity={0.2}
                                                        dot={false}
                                                        activeDot={{ r: 5, strokeWidth: 0, fill: '#F58220' }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        );
                                    })()}
                                </div>
                            </div> */}

              {/* Gender Distribution Chart */}
              {isCensusSource && (
                <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700 mb-4">
                    <span className="font-bold uppercase tracking-wider text-gray-500">
                      Gender Distribution
                    </span>
                    <InfoTooltip
                      text="Breakdown of the population by male and female counts."
                      source={tooltipSource}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Stats */}
                    <div className="space-y-4">
                      <div>
                        <p className="!text-[14px] font-bold text-gray-500 mb-0.5">
                          {formatStatValue(stats.maleCount, 'text-[14px]')}
                        </p>
                        <p className="text-xl font-black text-gray-900 tracking-tight leading-none">
                          {formatStatValue(stats.male, 'text-[10px]')}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-gray-500 mt-1 tracking-wider">
                          Male
                        </p>
                      </div>
                      <div>
                        <p className="!text-[14px] font-bold text-gray-500 mb-0.5">
                          {formatStatValue(stats.femaleCount, 'text-[14px]')}
                        </p>
                        <p className="text-xl font-black text-gray-900 tracking-tight leading-none">
                          {formatStatValue(stats.female, 'text-[10px]')}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-gray-500 mt-1 tracking-wider">
                          Female
                        </p>
                      </div>
                    </div>

                    {/* Right: Pie Chart */}
                    <div className="w-32 h-32 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Tooltip
                            formatter={(value, name) => [`${value}%`, name]}
                            contentStyle={{
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb',
                              fontSize: '12px',
                            }}
                          />

                          <Pie
                            data={[
                              {
                                name: 'Male',
                                value: parseFloat(stats.male) || 50,
                              },
                              {
                                name: 'Female',
                                value: parseFloat(stats.female) || 50,
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={55}
                            paddingAngle={2}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="#ffffff" // border color
                            strokeWidth={2}
                            isAnimationActive={true}
                            animationDuration={500} // border thickness
                          >
                            <Cell fill="#99A1AF" />
                            <Cell fill="#0868ac" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-xs font-bold text-gray-400"></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Population Pyramid Chart */}
              {isCensusSource &&
                selectedDistrictName !== 'All Districts' &&
                selectedDistrictName !== 'Odisha' && (
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700 mb-4">
                      <span className="font-bold uppercase tracking-wider text-gray-500">
                        Age Distribution
                      </span>
                      <InfoTooltip
                        text="Age composition of the population, showing male and female distribution across birth cohorts."
                        source={tooltipSource}
                      />
                    </div>
                    <div className="w-full h-70">
                      {(() => {
                        const data = ageDistributionData;
                        const maxVal = Math.max(
                          1,
                          ...data.map((d) =>
                            Math.max(Math.abs(d.male), d.female),
                          ),
                        );

                        return (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={data}
                              margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 5,
                              }}
                              barGap={0}
                              barCategoryGap={0}
                            >
                              <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={false}
                                stroke="#f3f4f6"
                              />
                              <XAxis
                                type="number"
                                domain={[-maxVal * 1.1, maxVal * 1.1]}
                                tickFormatter={formatAgeTick}
                                tick={{
                                  fontSize: 9,
                                  fill: '#9ca3af',
                                  fontWeight: 600,
                                }}
                                axisLine={{ stroke: '#f3f4f6' }}
                                tickLine={false}
                                tickCount={5}
                              />
                              <YAxis
                                dataKey="age"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                  fontSize: 9,
                                  fill: '#6b7280',
                                  fontWeight: 'bold',
                                }}
                                width={30}
                              />
                              <Tooltip
                                content={<CustomAgeTooltip />}
                                cursor={{ fill: '#f3f4f6' }}
                              />
                              <Legend
                                iconType="circle"
                                wrapperStyle={{
                                  fontSize: '10px',
                                  paddingTop: '10px',
                                }}
                                formatter={(value) => (
                                  <span
                                    style={{
                                      color: '#6b7280',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {value.toUpperCase()}
                                  </span>
                                )}
                              />
                              <Bar
                                dataKey="male"
                                fill="#0868ac"
                                barSize={-12}
                                name="Male"
                                isAnimationActive={true}
                                animationDuration={800}
                                animationEasing="ease-in-out"
                              />
                              <Bar
                                dataKey="female"
                                fill="#99A1AF"
                                barSize={12}
                                name="Female"
                                isAnimationActive={true}
                                animationDuration={800}
                                animationEasing="ease-in-out"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        );
                      })()}
                    </div>
                  </div>
                )}

              {/* Commented out original individual cards
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-all group/stat">
                                    <p className="text-[10px] uppercase font-bold text-[#3B82F6] mb-1 tracking-wide opacity-70">Literacy</p>
                                    <p className="text-xl font-bold text-gray-900 group-hover/stat:scale-105 transition-transform origin-left">{formatStatValue(stats.literacy)}</p>
                                </div>
                                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 hover:bg-gray-50 hover:border-gray-200 transition-all group/stat">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wide opacity-70">Male</p>
                                    <p className="text-xl font-bold text-gray-900 group-hover/stat:scale-105 transition-transform origin-left">{formatStatValue(stats.male)}</p>
                                </div>
                                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 hover:bg-gray-50 hover:border-gray-200 transition-all group/stat">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wide opacity-70">Female</p>
                                    <p className="text-xl font-bold text-gray-900 group-hover/stat:scale-105 transition-transform origin-left">{formatStatValue(stats.female)}</p>
                                </div>
                            </div>
                            */}

              {/* Trends/Population charts commented out per original */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indication Animation */}
      {/* {showScrollHint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div className="text-black p-2 w-10 h-10 flex items-center justify-center">
            <ChevronsDown className="w-5 h-5" />
          </div>
        </div>
      )} */}

      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-auto cursor-pointer"
          onClick={() => {
            window.scrollBy({
              top: window.innerHeight * 0.4, // Scrolls down exactly 20vh
              behavior: 'smooth',
            });
          }}
        >
          {/* Default state: no background. Hover state: rounded circle background */}
          <div className="text-black p-2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5 hover:backdrop-blur-sm">
            <ChevronsDown className="w-5 h-5" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
