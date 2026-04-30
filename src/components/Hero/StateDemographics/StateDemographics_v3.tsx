import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type DistrictData } from '../shared';
import {
  TrendingUpDown,
  Users,
  MapPin,
  TrendingUp,
  Building2,
  Trees,
} from 'lucide-react';
import { MiniDistrictMap } from './MiniDistrictMap';
import { DISTRICT_OVERVIEWS } from './districtNarrative';

type Props = {
  selectedDistrict?: string;
  selectedData?: DistrictData;
  allDistrictsData: DistrictData[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Stat extraction — sourced entirely from DISTRICT_OVERVIEWS text
// Each entry is hand-tuned from the narrative so numbers match the source.
// ─────────────────────────────────────────────────────────────────────────────
const DISTRICT_STATS: Record<
  string,
  { label: string; value: string; sub?: string; icon: string }[]
> = {
  Anugul: [
    {
      label: '2011 Population',
      value: '1.27M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '1.52M',
      sub: '+247K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR',
      value: '0.71%',
      sub: 'Compound growth rate',
      icon: 'trend',
    },
    { label: 'Area', value: '6,375 km²', sub: 'District area', icon: 'map' },
    {
      label: '2036 Urban Share',
      value: '21.1%',
      sub: 'Up from 16.85%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '239 /km²',
      sub: 'Up from 200',
      icon: 'map',
    },
  ],
  Balangir: [
    {
      label: '2011 Population',
      value: '1.65M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '1.93M',
      sub: '+280K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.76%',
      sub: 'Slows to 0.55%',
      icon: 'trend',
    },
    { label: 'Area', value: '6,575 km²', sub: 'District area', icon: 'map' },
    {
      label: '2036 Urban Share',
      value: '13.74%',
      sub: 'Up from 9.49%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '293 /km²',
      sub: 'Up from 251',
      icon: 'map',
    },
  ],
  Cuttack: [
    {
      label: '2011 Population',
      value: '2.62M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '3.09M',
      sub: '+466K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.9%',
      sub: 'Slows to 0.6%',
      icon: 'trend',
    },
    { label: 'Area', value: '3,932 km²', sub: 'District area', icon: 'map' },
    {
      label: '2036 Urban Share',
      value: '32.03%',
      sub: 'Up from 27.78%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '786 /km²',
      sub: 'Up from 668',
      icon: 'map',
    },
  ],
  Kendujhar: [
    {
      label: '2011 Population',
      value: '1.80M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '2.17M',
      sub: '+372K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.86%',
      sub: 'Decelerating',
      icon: 'trend',
    },
    { label: 'Area', value: '8,303 km²', sub: 'District area', icon: 'map' },
    {
      label: '2036 Urban Share',
      value: '17.62%',
      sub: 'Up from 13.37%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '262 /km²',
      sub: 'Up from 217',
      icon: 'map',
    },
  ],
  Khordha: [
    {
      label: '2011 Population',
      value: '2.25M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '2.66M',
      sub: '+411K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.8%',
      sub: 'Slows to 0.55%',
      icon: 'trend',
    },
    {
      label: 'Area',
      value: '2,888 km²',
      sub: 'Smallest in panel',
      icon: 'map',
    },
    {
      label: '2036 Urban Share',
      value: '52.38%',
      sub: 'Up from 48.13%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '922 /km²',
      sub: 'Up from 780',
      icon: 'map',
    },
  ],
  Mayurbhanj: [
    {
      label: '2011 Population',
      value: '2.52M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '3.02M',
      sub: '+499K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.85%',
      sub: 'Slows to 0.65%',
      icon: 'trend',
    },
    {
      label: 'Area',
      value: '10,418 km²',
      sub: 'Largest in Odisha',
      icon: 'map',
    },
    {
      label: '2036 Urban Share',
      value: '12.03%',
      sub: 'Up from 7.78%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '290 /km²',
      sub: 'Up from 242',
      icon: 'map',
    },
  ],
  Sambalpur: [
    {
      label: '2011 Population',
      value: '1.04M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '1.23M',
      sub: '+194K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.83%',
      sub: 'Slows to 0.61%',
      icon: 'trend',
    },
    { label: 'Area', value: '6,624 km²', sub: 'District area', icon: 'map' },
    {
      label: '2036 Urban Share',
      value: '35.26%',
      sub: 'Up from 31.01%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '186 /km²',
      sub: 'Up from 157',
      icon: 'map',
    },
  ],
  Sundargarh: [
    {
      label: '2011 Population',
      value: '2.09M',
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: '2.49M',
      sub: '+400K over 25 yrs',
      icon: 'trending',
    },
    {
      label: 'CAGR (early)',
      value: '0.81%',
      sub: 'Slows to 0.59%',
      icon: 'trend',
    },
    {
      label: 'Area',
      value: '9,712 km²',
      sub: 'Second-largest in panel',
      icon: 'map',
    },
    {
      label: '2036 Urban Share',
      value: '39.59%',
      sub: 'Up from 35.34%',
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: '257 /km²',
      sub: 'Up from 215',
      icon: 'map',
    },
  ],
};

const ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users className="w-3.5 h-3.5" />,
  trending: <TrendingUp className="w-3.5 h-3.5" />,
  trend: <TrendingUpDown className="w-3.5 h-3.5" />,
  map: <MapPin className="w-3.5 h-3.5" />,
  building: <Building2 className="w-3.5 h-3.5" />,
  trees: <Trees className="w-3.5 h-3.5" />,
};

export function StateDemographics_v3({
  selectedDistrict,
  selectedData,
}: Props) {
  useEffect(() => {
    console.log('Render Demographics v3', {
      selectedDistrict,
      hasData: !!selectedData,
    });
  }, [selectedDistrict, selectedData]);

  const paragraphs = useMemo(() => {
    if (!selectedDistrict) return [];
    return DISTRICT_OVERVIEWS[selectedDistrict] || [];
  }, [selectedDistrict]);

  const stats = useMemo(() => {
    if (!selectedDistrict) return [];
    return DISTRICT_STATS[selectedDistrict] || [];
  }, [selectedDistrict]);

  if (!selectedData) return null;

  const districtName =
    selectedData.district_name || selectedDistrict || 'District';

  return (
    <motion.div
      className="mx-auto px-4 lg:px-6 py-14 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div className="pb-0">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <TrendingUpDown className="w-6 h-6 text-black" />
          District Overview - {districtName}
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          A comprehensive synthesis of population dynamics and demographic
          trends.
        </p>
      </div>

      {/* STAT CARDS — full width, above the 2-col layout */}
      {stats.length > 0 && (
        <div className="-mt-4 mb-8">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
            Key Figures at a Glance
          </p>
          <div className="grid grid-cols-6 gap-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col gap-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">{ICON_MAP[stat.icon]}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </span>
                </div>
                <div className="text-xl font-black tracking-tight text-[#F96000]">
                  {stat.value}
                </div>
                {stat.sub && (
                  <div className="text-[9px] text-gray-500 font-medium leading-snug">
                    {stat.sub}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 2 COLUMN LAYOUT */}
      <div className="grid grid-cols-10 gap-2">
        {/* LEFT - 70% */}
        <div className="col-span-7 space-y-4 text-md text-gray-700 leading-relaxed font-medium">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>Narrative data unavailable for this district.</p>
          )}
        </div>

        {/* RIGHT - 30% */}
        <div className="col-span-3 min-h-auto">
          <MiniDistrictMap targetDistrict={selectedDistrict} />
        </div>
      </div>
    </motion.div>
  );
}
