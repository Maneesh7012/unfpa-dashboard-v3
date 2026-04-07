'use client';

import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { StatCard } from './shared';
import {
  Database,
  Satellite,
  Cpu,
  LineChart,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  currentView: string;
};

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Data Fusion',
    desc: 'Aggregating Census 2011, SRS vital stats, and Sentinel-2 imagery with atmospheric correction.',
    icon: Database,
  },
  {
    step: '02',
    title: 'Feature Extraction',
    desc: 'Deriving spectral indices (NDVI/NDBI) and Microsoft Building Footprints as model predictors.',
    icon: Satellite,
  },
  {
    step: '03',
    title: 'ML Modeling',
    desc: 'Random Forest and XGBoost architectures trained on ground-truth population density signals.',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'Validation',
    desc: 'Rigorous cross-validation against Sample Registration Systems with a target MAPE < 5%.',
    icon: ShieldCheck,
  },
];

export function HeroSection({ currentView }: HeroProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pt-4 pb-6"
    >
      {/* Top Breadcrumb-style Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-1 rounded">
          Demographic Intelligence Unit
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-border to-transparent" />
        <span className="text-[11px] font-medium text-muted-foreground italic">
          Odisha High-Resolution Population Project
        </span>
      </div>

      {/* Main Title Area */}
      <div className="grid lg:grid-cols-5 gap-12 mb-12">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4 leading-[1.1]">
            Transforming Satellite Signals into{' '}
            <span className="text-primary">Demographic Intelligence</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            The DIU employs a multi-source data fusion approach, combining{' '}
            <span className="text-foreground font-medium">Census records</span>,
            <span className="text-foreground font-medium">
              {' '}
              VIIRS Nighttime Lights
            </span>
            , and{' '}
            <span className="text-foreground font-medium">
              Machine Learning
            </span>{' '}
            to generate high-resolution inter-censal estimates for Odisha's 30
            districts through 2036.
          </p>

          <div className="flex gap-3 mt-6">
            <Badge
              variant="outline"
              className="px-3 py-1 rounded-md border-primary/20 text-primary"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Live Estimates Active
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 rounded-md">
              Current View: {currentView}
            </Badge>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          <StatCard label="Districts" value="30" sub="Spatially geocoded" />
          <StatCard label="Horizon" value="2036" sub="Projected timeline" />
          <StatCard label="Target MAPE" value="< 5%" sub="Model accuracy" />
          <StatCard label="Fusion Layers" value="6+" sub="Satellite + Admin" />
        </div>
      </div>

      {/* Methodology Rule Engine UI */}
      <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Methodological Workflow
            </h2>
          </div>
          <button
            onClick={() => navigate('/methodology')}
            className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline hover:cursor-pointer"
          >
            View Full Methodology <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {METHODOLOGY_STEPS.map((s) => (
            <div key={s.step} className="relative group">
              <div className="flex items-start gap-4">
                <span className="text-3xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                  {s.step}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-dashed">
        <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
          <span className="font-bold text-foreground">Project Story:</span> By
          analyzing satellite data streams—including NDVI and road density—we
          piece together a narrative of a district in transition. Industrial
          hubs like
          <span className="text-foreground font-medium underline decoration-primary/30 decoration-2 underline-offset-2 ml-1">
            Anugul
          </span>{' '}
          reveal compelling correlations between economic opportunity and
          physical expansion, reshaping the social fabric of the region.
        </p>
        <div className="flex gap-2 shrink-0">
          {['Sentinel-2', 'XGBoost', 'PostGIS', 'GEE'].map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold bg-muted px-2 py-1 rounded text-muted-foreground border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
