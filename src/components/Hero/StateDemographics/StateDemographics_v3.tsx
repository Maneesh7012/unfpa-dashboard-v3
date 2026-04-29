import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type DistrictData } from '../shared';
import { TrendingUpDown } from 'lucide-react';
import { MiniDistrictMap } from './MiniDistrictMap';
import { DISTRICT_OVERVIEWS } from './districtNarrative';

type Props = {
  selectedDistrict?: string;
  selectedData?: DistrictData;
  allDistrictsData: DistrictData[];
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

  if (!selectedData) return null;

  const districtName = selectedData.district_name || selectedDistrict || 'District';

  // console.log('selectedData', selectedData);

  return (
    <motion.div
      className="mx-auto px-4 lg:px-6 py-10 space-y-12"
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

      {/* 2 COLUMN LAYOUT */}
      <div className="grid grid-cols-10 gap-2 -mt-4">
        {/* LEFT - 60% */}

        <div className="col-span-7 space-y-4 text-md text-gray-700 leading-relaxed font-medium">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>Narrative data unavailable for this district.</p>
          )}
        </div>
        {/* RIGHT - 40% */}
        <div className="col-span-3 min-h-100">
          <MiniDistrictMap targetDistrict={selectedDistrict} />
        </div>
      </div>
    </motion.div>
  );
}
