/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type DistrictData } from './shared';
import { TrendingUpDown } from 'lucide-react';

type Props = {
  selectedDistrict?: string;
  selectedData?: DistrictData;
  allDistrictsData: DistrictData[];
};

// ---------- HELPERS ----------
const num = (v: any): number => (typeof v === 'number' && isFinite(v) ? v : 0);

const getSafeYears = (data: DistrictData, prefix: string): number[] => {
  const years = Object.keys(data)
    .filter((k) => k.startsWith(prefix))
    .map((k) => {
      const match = k.match(/\d{4}/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((y): y is number => y !== null && y >= 2011 && y <= 2040)
    .sort((a, b) => a - b);
  return Array.from(new Set(years));
};

function fmt(n?: number, decimals = 0) {
  return Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num(n));
}

function fmtL(n?: number) {
  const val = num(n);
  if (val === 0) return '—';
  return (val / 100000).toFixed(2) + ' L';
}

function delta(a?: number, b?: number, decimals = 2) {
  const d = num(b) - num(a);
  return (d >= 0 ? '+' : '') + d.toFixed(decimals);
}

// ---------- NARRATIVE ENGINE (UNCHANGED CORE) ----------
function buildNarrative(d: DistrictData) {
  const name = String(d.district_name || 'District');
  const state = String(d.state_name || 'State');
  const area = num(d.area);

  const popYears = getSafeYears(d, 'pop_');
  const firstYear = popYears.length > 0 ? popYears[0] : 2011;
  const lastYear = popYears.length > 0 ? popYears[popYears.length - 1] : 2030;

  const pop2011 = num(d['pop_2011_sum']);
  const popLatest = num(d[`pop_${lastYear}_sum`]);
  const densityLatest = num(d[`density_${lastYear}`]);

  const growthKeys = getSafeYears(d, 'growth_');
  const validGrowth = growthKeys
    .map((y) => ({ year: y, val: num(d[`growth_${y}`]) }))
    .filter((g) => g.val < 10 && g.val > -5);

  const firstGrowth = validGrowth[0] || { year: firstYear, val: 0 };
  const lastGrowth = validGrowth[validGrowth.length - 1] || {
    year: lastYear,
    val: 0,
  };
  const minGrowth =
    validGrowth.length > 0
      ? validGrowth.reduce(
          (min, g) => (g.val < min.val ? g : min),
          validGrowth[0],
        )
      : { year: lastYear, val: 0 };

  const male2015 = num(d['male_2015']);
  const female2015 = num(d['female_2015']);
  const sexRatio2015 =
    male2015 > 0 ? Math.round((female2015 / male2015) * 1000) : 0;

  const sexYears = getSafeYears(d, 'male_2');
  const sexLatestYear =
    sexYears.length > 0 ? sexYears[sexYears.length - 1] : lastYear;

  const maleLatest = num(d[`male_${sexLatestYear}`]);
  const femaleLatest = num(d[`female_${sexLatestYear}`]);
  const sexRatioLatest =
    maleLatest > 0 ? Math.round((femaleLatest / maleLatest) * 1000) : 0;

  const ruralStart = num(d['deg_urban_rural_2015']);
  const ruralEnd = num(d['deg_urban_rural_2030']);

  const popGrowthPct =
    pop2011 > 0 ? (((popLatest - pop2011) / pop2011) * 100).toFixed(1) : '0.0';

  return {
    name,
    state,
    area,
    pop2011,
    popLatest,
    densityLatest,
    firstYear,
    lastYear,
    firstGrowth,
    lastGrowth,
    minGrowth,
    sexRatio2015,
    sexRatioLatest,
    sexLatestYear,
    ruralStart,
    ruralEnd,
    popGrowthPct,
  };
}

// ---------- COMPONENT ----------
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

  const n = useMemo(
    () => (selectedData ? buildNarrative(selectedData) : null),
    [selectedData],
  );

  if (!selectedData || !n) return null;

  console.log('selectedData', selectedData);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <div className="pb-5">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <TrendingUpDown className="w-6 h-6 text-black" />
          Demographic Analysis: {n.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          A comprehensive synthesis of population dynamics and demographic
          trends.
        </p>
      </div>

      {/* 2 COLUMN LAYOUT */}
      <div className="grid grid-cols-5 gap-6">
        {/* LEFT - 40% */}
        <div className="col-span-2 bg-gray-100 rounded-xl min-h-[400px]" />

        {/* RIGHT - 60% */}
        <div className="col-span-3 space-y-5 text-sm text-gray-700 leading-relaxed">
          {/* Population */}
          <p>
            <strong>{n.name}</strong> district in {n.state} has experienced a
            steady demographic expansion from <strong>{fmt(n.pop2011)}</strong>{' '}
            in {n.firstYear} to an estimated{' '}
            <strong>{fmtL(n.popLatest)}</strong> by {n.lastYear}. This
            represents a cumulative growth of <strong>{n.popGrowthPct}%</strong>{' '}
            over the observed period. With a current population density of{' '}
            <strong>{fmt(n.densityLatest)} persons per km²</strong> across{' '}
            <strong>{fmt(n.area)} km²</strong>, the district reflects a{' '}
            {n.densityLatest > 500 ? 'high' : 'moderate'} level of settlement
            intensity.
          </p>

          {/* Growth */}
          <p>
            The district’s annual population growth rate shows a clear
            deceleration trend. Growth declined from approximately{' '}
            <strong>
              {n.firstGrowth.val.toFixed(2)}% in {n.firstGrowth.year}
            </strong>{' '}
            to{' '}
            <strong>
              {n.lastGrowth.val.toFixed(2)}% by {n.lastGrowth.year}
            </strong>
            . The lowest observed growth was{' '}
            <strong>
              {n.minGrowth.val.toFixed(2)}% in {n.minGrowth.year}
            </strong>
            , indicating a transition toward demographic stability and maturity.
          </p>

          {/* Sex Ratio */}
          <p>
            Gender composition has remained relatively stable, with male
            population consistently exceeding female population. The sex ratio
            improved from <strong>{n.sexRatio2015}</strong> females per 1,000
            males in 2015 to <strong>{n.sexRatioLatest}</strong> in{' '}
            {n.sexLatestYear}, suggesting gradual demographic balancing.
          </p>

          {/* Urbanisation */}
          <p>
            Urbanisation trends indicate a gradual structural shift in
            settlement patterns. The rural population share changed by{' '}
            <strong>{delta(n.ruralStart, n.ruralEnd)} percentage points</strong>{' '}
            between 2015 and 2030, reflecting a steady but measured pace of
            urban transition.
          </p>

          {/* Summary */}
          <p>
            Overall, <strong>{n.name}</strong> exhibits characteristics of a
            stabilising demographic system — marked by slowing growth rates,
            improving gender balance, and gradual urban transformation. These
            trends suggest a transition toward a more mature and structurally
            balanced population profile.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
