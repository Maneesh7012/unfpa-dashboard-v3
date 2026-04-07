'use client';

import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { StatCard, LeftBorderCard } from './shared';

type HeroProps = {
  currentView: string;
};

const METHODOLOGY_TAGS = [
  'Census of India 2011',
  'Sentinel-2 imagery',
  'VIIRS nighttime lights',
  'Microsoft building footprints',
  'Random Forest · XGBoost',
  'Cohort-component projection',
];

const OVERVIEW_CARDS = [
  {
    label: 'Data foundation',
    value: 'Census 2011 + SRS',
    detail:
      'Baseline population and vital statistics integrated with administrative records',
  },
  {
    label: 'Geospatial signals',
    value: 'Sentinel-2 · VIIRS · OSM',
    detail:
      'Satellite-derived NDVI, building footprints, nighttime lights, and road density',
  },
  {
    label: 'Projection method',
    value: 'Cohort-component',
    detail:
      'Random Forest and XGBoost models with leave-one-out cross-validation',
  },
];

export function HeroSection({ currentView }: HeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pt-6 pb-2"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Demographic Intelligence Unit · Odisha
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            District-level demographic insights for Odisha
          </h1>

          <p className="text-sm text-muted-foreground mb-4">
            Multi-source population estimates and projections for all 30
            districts, derived from census records, satellite imagery, and
            machine learning models — updated through 2036.
          </p>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-muted px-3 py-1 rounded-full text-xs">
              Live estimates active
            </span>
            <Badge variant="secondary">{currentView}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <StatCard label="Districts covered" value="30" sub="All of Odisha" />
          <StatCard
            label="Projection horizon"
            value="2036"
            sub="From 2011 baseline"
          />
          <StatCard label="Model accuracy" value="< 5%" sub="Target MAPE" />
          <StatCard label="Data sources" value="6+" sub="Fused layers" />
        </div>
      </div>

      <div className="h-px bg-border mb-6" />

      {/* Bottom Section */}
      <div>
        <p className="text-xs uppercase text-muted-foreground mb-4">
          Select a district to explore
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {OVERVIEW_CARDS.map((c) => (
            <LeftBorderCard key={c.label} {...c} />
          ))}
        </div>

        <p className="text-sm text-muted-foreground border-t pt-4">
          The{' '}
          <span className="font-medium text-foreground">
            Demographic Intelligence Unit
          </span>{' '}
          employs a multi-source data fusion approach...
        </p>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          {METHODOLOGY_TAGS.map((t) => (
            <span key={t} className="text-xs bg-muted px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
