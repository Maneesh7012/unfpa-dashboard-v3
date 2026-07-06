/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * reportData — pure data assembly for the district PDF report.
 * Sources everything from the same modules the dashboard uses; no rendering here.
 */
import {
  CENSUS_PROJECTION_DATA,
  LULC_STATS,
  LULC_STATS_YEARLY,
  DISTRICT_BOUNDS,
  GENDER,
  NEW_DISTRICT_ROAD_DATA,
  getRecord,
} from '../../data/comparativeData';
import {
  MODEL_DATA,
  MODEL_STATS_DATA,
  MODEL_URBAN_RURAL_DATA,
} from '../../data/modelStats';
import { DISTRICT_OVERVIEWS } from '../Hero/StateDemographics/districtNarrative';
import {
  TAB_CONTENT,
  Points_Data,
  type Block,
} from '../Map/WhatHowWhy_v2/frontend_data';

// ─── Imagery ──────────────────────────────────────────────────────────────
// import.meta.glob is a Vite build-time helper; guarded so the module can also
// be imported in a plain Node context (e.g. tests) without crashing.
const hasGlob = typeof (import.meta as any).glob === 'function';
const REPORT_ASSETS: Record<string, string> = hasGlob
  ? (import.meta as any).glob(
      [
        '../Map/WhatHowWhy_v2/*/chips/*.{png,jpg,jpeg}',
        '../Map/WhatHowWhy_v2/*/context_maps/*.{png,jpg,jpeg}',
      ],
      { eager: true, import: 'default' },
    )
  : {};

// Pre-rendered per-district geospatial figures produced by the satellite
// pipeline (district-masked Sentinel-2 RGB pair + change-score heatmap with
// boundary and hotspot markers).
const MAP_FIGURES: Record<string, string> = hasGlob
  ? (import.meta as any).glob(
      '../Map/WhatHowWhy_v2/*/maps/{rgb_before_after,change_heatmap,rgb_2024_preview}.png',
      { eager: true, import: 'default' },
    )
  : {};

export interface GeoFigures {
  rgbBeforeAfter?: string;
  changeHeatmap?: string;
  rgb2024?: string; // dark satellite preview — used as the cover background
}
const resolveImg = (url: string): string | undefined =>
  REPORT_ASSETS[url.replace('frontend_assets/', '../Map/WhatHowWhy_v2/')];

const WHW_ALIAS: Record<string, string> = {
  Anugul: 'Angul',
  Baudh: 'Boudh',
  Jagatsinghapur: 'Jagatsinghpur',
  Jajapur: 'Jajpur',
  Subarnapur: 'Sonepur',
};
const norm = (s: string) => s.trim().toLowerCase();

const nf = new Intl.NumberFormat('en-IN');
export const fmtInt = (n: number) => nf.format(Math.round(n));
export const fmtM = (n: number) => `${(n / 1e6).toFixed(2)}M`;

const first = (content: Block[], type: Block['type']) =>
  content.find((b) => b.type === type) as any;

export interface KeyFigures {
  y0: number;
  y1: number;
  pop0: number;
  pop1: number;
  inc: number;
  cagr: number;
  d0?: number;
  d1?: number;
  area?: number;
  u0?: { urban: number; rural: number };
  u1?: { urban: number; rural: number };
  share0?: number;
  share1?: number;
}

export interface WhwEntry {
  id: number;
  category: string;
  heading?: string;
  text?: string;
  img?: string;
}

export interface LulcYearly {
  years: string[];
  classes: string[];
  series: Record<string, number[]>; // class -> area per year
  totals: number[]; // total area per year
}

export interface Hotspot {
  id: number;
  category: string;
  settlement: string;
  lat: number;
  lon: number;
  builtHa: number;
  score: number;
  confidence: number;
}

export interface HotspotSummary {
  list: Hotspot[];
  total: number;
  totalBuiltHa: number;
  avgConfidence: number;
  topCategory: string;
  byCategory: { category: string; count: number; ha: number }[];
  bounds: { minx: number; miny: number; maxx: number; maxy: number } | null;
}

export interface GenderInfo {
  y0: number;
  y1: number;
  m0: number;
  f0: number;
  m1: number;
  f1: number;
  ratio0: number; // females per 1000 males
  ratio1: number;
  trend: { year: number; ratio: number }[];
}

export interface RoadInfo {
  years: number[];
  nh: number[];
  sh: number[];
  latestYear: number;
  latestNh: number;
  latestSh: number;
  deltaNh: number;
  deltaSh: number;
}

export interface AgeGroup {
  label: string;
  male: number;
  female: number;
}

export interface AgePyramid {
  year: string;
  groups: AgeGroup[]; // oldest group first
  totalMale: number;
  totalFemale: number;
}

// Same grouping scheme the dashboard's pyramid uses (Dashboard.tsx), so the
// report numbers match the on-screen chart. `{y}` is replaced with the year.
const AGE_GROUP_DEFS: { label: string; m: string[]; f: string[] }[] = [
  { label: '0-9', m: ['male_{y}_0_12', 'male_{y}_1_4', 'male_{y}_5_9'], f: ['female_{y}_0_12', 'female_{y}_1_4', 'female_{y}_5_9'] },
  { label: '10-19', m: ['male_{y}_10_14', 'male_{y}_15_19'], f: ['female_{y}_10_14', 'female_{y}_15_19'] },
  { label: '20-29', m: ['male_{y}_20_24', 'male_{y}_25_29'], f: ['female_{y}_20_24', 'female_{y}_25_29'] },
  { label: '30-39', m: ['male_{y}_30_34', 'male_{y}_35_39'], f: ['female_{y}_30_34', 'female_{y}_35_39'] },
  { label: '40-49', m: ['male_{y}_40_44', 'male_{y}_45_49'], f: ['female_{y}_40_44', 'female_{y}_45_49'] },
  { label: '50-59', m: ['male_{y}_50_54', 'male_{y}_55_59'], f: ['female_{y}_50_54', 'female_{y}_55_59'] },
  { label: '60-69', m: ['male_{y}_60_64', 'male_{y}_65_69'], f: ['female_{y}_60_64', 'female_{y}_65_69'] },
  { label: '70-79', m: ['male_{y}_70_74', 'male_{y}_75_79'], f: ['female_{y}_70_74', 'female_{y}_75_79'] },
  { label: '80-89', m: ['male_{y}_80_84', 'male_{y}_85_89'], f: ['female_{y}_80_84', 'female_{y}_85_89'] },
  { label: '90+', m: ['male_{y}_90_plus'], f: ['female_{y}_90_plus'] },
];

const buildAgePyramid = (selectedData: any): AgePyramid | null => {
  if (!selectedData) return null;
  const get = (k: string) => parseFloat(selectedData[k] || 0) || 0;
  const tryYear = (year: string): AgePyramid | null => {
    const groups = AGE_GROUP_DEFS.map((g) => ({
      label: g.label,
      male: g.m.reduce((s, k) => s + get(k.replace('{y}', year)), 0),
      female: g.f.reduce((s, k) => s + get(k.replace('{y}', year)), 0),
    }));
    const totalMale = groups.reduce((s, g) => s + g.male, 0);
    const totalFemale = groups.reduce((s, g) => s + g.female, 0);
    if (totalMale <= 0 || totalFemale <= 0) return null;
    return { year, groups: [...groups].reverse(), totalMale, totalFemale };
  };
  // 2025 is the dashboard's default pyramid year; fall back to the census base.
  return tryYear('2025') || tryYear('2011');
};

export interface ReportData {
  district: string;
  generated: string;
  key: KeyFigures | null;
  paragraphs: string[];
  chart: { year: number; model: number; census: number | null }[];
  hasCensus: boolean;
  tableYears: number[];
  model?: Record<number, number>;
  census?: Record<number, number>;
  stats?: Record<string, { density: number; growth: number | null }>;
  whw: { tab: 'What' | 'How' | 'Why'; label: string; entries: WhwEntry[] }[];
  lulc: {
    fy: string;
    ly: string;
    maxArea: number;
    rows: { c: string; a: number; b: number; delta: number; pct: number }[];
  } | null;
  lulcYearly: LulcYearly | null;
  hotspots: HotspotSummary | null;
  gender: GenderInfo | null;
  agePyramid: AgePyramid | null;
  roads: RoadInfo | null;
  figures: GeoFigures;
  toc: string[];
}

// preferred stacking order (largest natural cover at the bottom)
const LULC_ORDER = [
  'Trees',
  'Rangeland',
  'Crops',
  'Built Area',
  'Water',
  'Bare Ground',
  'Flooded Vegetation',
  'Snow/Ice',
  'Clouds',
];

export function buildReportData(
  district: string,
  selectedData?: any,
): ReportData {
  const model = getRecord(MODEL_DATA, district) as
    | Record<number, number>
    | undefined;
  const stats = getRecord(MODEL_STATS_DATA, district) as
    | Record<string, { density: number; growth: number | null }>
    | undefined;
  const ur = getRecord(MODEL_URBAN_RURAL_DATA, district) as
    | Record<string, { urban: number; rural: number }>
    | undefined;
  const census = getRecord(CENSUS_PROJECTION_DATA, district) as
    | Record<number, number>
    | undefined;
  const overview = getRecord(DISTRICT_OVERVIEWS, district) as
    | { paragraphs: string[] }
    | undefined;
  const lulcRaw = getRecord(LULC_STATS, district) as
    | Record<string, Record<string, number>>
    | undefined;

  // key figures
  let key: KeyFigures | null = null;
  if (model) {
    const years = Object.keys(model)
      .map(Number)
      .sort((a, b) => a - b);
    const y0 = years[0];
    const y1 = years[years.length - 1];
    if (y0 && y1) {
      const pop0 = model[y0];
      const pop1 = model[y1];
      const span = y1 - y0;
      const d0 = stats?.[String(y0)]?.density;
      const d1 = stats?.[String(y1)]?.density;
      const u0 = ur?.[String(y0)];
      const u1 = ur?.[String(y1)];
      const share = (o?: { urban: number; rural: number }) =>
        o ? (o.urban / (o.urban + o.rural)) * 100 : undefined;
      key = {
        y0,
        y1,
        pop0,
        pop1,
        inc: pop1 - pop0,
        cagr: span > 0 ? (Math.pow(pop1 / pop0, 1 / span) - 1) * 100 : 0,
        d0,
        d1,
        area: d0 ? pop0 / d0 : undefined,
        u0,
        u1,
        share0: share(u0),
        share1: share(u1),
      };
    }
  }

  const chart = model
    ? Object.keys(model)
        .map(Number)
        .sort((a, b) => a - b)
        .map((y) => ({ year: y, model: model[y], census: census?.[y] ?? null }))
    : [];

  const tableYears = key
    ? Array.from(new Set([key.y0, 2016, 2021, 2026, 2031, key.y1])).filter(
        (y) => model && model[y] != null,
      )
    : [];

  const whwName = WHW_ALIAS[district] || district;
  const whw = (['What', 'How', 'Why'] as const)
    .map((tab) => ({
      tab,
      label:
        tab === 'What'
          ? 'What changed'
          : tab === 'How'
            ? 'How it changed'
            : 'Why it matters',
      entries: (TAB_CONTENT[tab] || [])
        .filter((e) => norm(e.district) === norm(whwName))
        .slice(0, 3)
        .map((e): WhwEntry => {
          const imgBlock = e.content.find(
            (b) =>
              b.type === 'image' &&
              !/\.gif$/i.test((b as any).url) &&
              resolveImg((b as any).url),
          ) as any;
          return {
            id: e.id,
            category: e.category,
            heading: first(e.content, 'heading')?.value,
            text: first(e.content, 'text')?.value,
            img: imgBlock ? resolveImg(imgBlock.url) : undefined,
          };
        }),
    }))
    .filter((t) => t.entries.length > 0);

  let lulc: ReportData['lulc'] = null;
  if (lulcRaw) {
    const yrs = Object.keys(lulcRaw).sort();
    if (yrs.length >= 2) {
      const fy = yrs[0];
      const ly = yrs[yrs.length - 1];
      const classes = Array.from(
        new Set([...Object.keys(lulcRaw[fy]), ...Object.keys(lulcRaw[ly])]),
      );
      const rows = classes
        .map((c) => {
          const a = lulcRaw[fy][c] ?? 0;
          const b = lulcRaw[ly][c] ?? 0;
          return { c, a, b, delta: b - a, pct: a ? ((b - a) / a) * 100 : 0 };
        })
        .filter((r) => r.a > 0 || r.b > 0)
        .sort((x, y) => y.b - x.b);
      lulc = {
        fy,
        ly,
        rows,
        maxArea: Math.max(...rows.map((r) => Math.max(r.a, r.b)), 1),
      };
    }
  }

  // ── Land use analysis — yearly composition ──
  const lulcYearlyRaw = getRecord(LULC_STATS_YEARLY, district) as
    | Record<string, Record<string, number>>
    | undefined;
  let lulcYearly: LulcYearly | null = null;
  if (lulcYearlyRaw) {
    const years = Object.keys(lulcYearlyRaw).sort();
    if (years.length >= 2) {
      const present = Array.from(
        new Set(years.flatMap((y) => Object.keys(lulcYearlyRaw[y]))),
      ).filter((c) => years.some((y) => (lulcYearlyRaw[y][c] ?? 0) > 0));
      const classes = [
        ...LULC_ORDER.filter((c) => present.includes(c)),
        ...present.filter((c) => !LULC_ORDER.includes(c)),
      ];
      const series: Record<string, number[]> = {};
      classes.forEach((c) => {
        series[c] = years.map((y) => lulcYearlyRaw[y][c] ?? 0);
      });
      const totals = years.map((_, i) =>
        classes.reduce((sum, c) => sum + series[c][i], 0),
      );
      lulcYearly = { years, classes, series, totals };
    }
  }

  // ── Hotspot analysis ──
  const hs = Points_Data.filter((p) => norm(p.district) === norm(whwName));
  let hotspots: HotspotSummary | null = null;
  if (hs.length) {
    const list: Hotspot[] = hs
      .map((p) => ({
        id: p.id,
        category: p.category,
        settlement: p.settlement_type,
        lat: p.cord[0],
        lon: p.cord[1],
        builtHa: p.new_built_area_ha,
        score: p.score,
        confidence: p.confidence,
      }))
      .sort((a, b) => b.score - a.score);
    const byCatMap = new Map<string, { count: number; ha: number }>();
    list.forEach((h) => {
      const e = byCatMap.get(h.category) || { count: 0, ha: 0 };
      e.count += 1;
      e.ha += h.builtHa;
      byCatMap.set(h.category, e);
    });
    const byCategory = Array.from(byCatMap.entries())
      .map(([category, v]) => ({ category, ...v }))
      .sort((a, b) => b.count - a.count || b.ha - a.ha);
    hotspots = {
      list,
      total: list.length,
      totalBuiltHa: list.reduce((s, h) => s + h.builtHa, 0),
      avgConfidence:
        list.reduce((s, h) => s + h.confidence, 0) / (list.length || 1),
      topCategory: byCategory[0]?.category ?? '—',
      byCategory,
      bounds:
        (getRecord(DISTRICT_BOUNDS, district) as any) ??
        (list.length
          ? {
              minx: Math.min(...list.map((h) => h.lon)),
              miny: Math.min(...list.map((h) => h.lat)),
              maxx: Math.max(...list.map((h) => h.lon)),
              maxy: Math.max(...list.map((h) => h.lat)),
            }
          : null),
    };
  }

  // ── Gender / sex ratio ──
  const genderRaw = getRecord(GENDER, district) as
    | Record<string, number>
    | undefined;
  let gender: GenderInfo | null = null;
  if (genderRaw) {
    const gYears = Array.from(
      new Set(
        Object.keys(genderRaw)
          .map((k) => parseInt(k, 10))
          .filter((n) => !Number.isNaN(n)),
      ),
    ).sort((a, b) => a - b);
    const gy0 = gYears[0];
    const gy1 = gYears[gYears.length - 1];
    const gv = (y: number, sex: 'male' | 'female') =>
      Number(genderRaw[`${y}_${sex}`]) || 0;
    if (gy0 && gy1 && gv(gy0, 'male') > 0 && gv(gy1, 'male') > 0) {
      const ratio = (y: number) => (gv(y, 'female') / gv(y, 'male')) * 1000;
      gender = {
        y0: gy0,
        y1: gy1,
        m0: gv(gy0, 'male'),
        f0: gv(gy0, 'female'),
        m1: gv(gy1, 'male'),
        f1: gv(gy1, 'female'),
        ratio0: ratio(gy0),
        ratio1: ratio(gy1),
        trend: gYears
          .filter((y) => (y - gy0) % 5 === 0 || y === gy1)
          .map((y) => ({ year: y, ratio: ratio(y) })),
      };
    }
  }

  // ── Age pyramid (from the selected map feature's properties) ──
  const agePyramid = buildAgePyramid(selectedData);

  // ── Road infrastructure ──
  const roadsRaw = getRecord(NEW_DISTRICT_ROAD_DATA as any, district) as
    | Record<string, number>
    | undefined;
  let roads: RoadInfo | null = null;
  if (roadsRaw) {
    const nhMap: Record<number, number> = {};
    const shMap: Record<number, number> = {};
    Object.entries(roadsRaw).forEach(([k, v]) => {
      const m = k.match(/_(nh|sh)_(\d{4})$/);
      if (!m) return;
      const yr = Number(m[2]);
      if (m[1] === 'nh') nhMap[yr] = Number(v) || 0;
      else shMap[yr] = Number(v) || 0;
    });
    const rYears = Object.keys(nhMap)
      .map(Number)
      .sort((a, b) => a - b);
    if (rYears.length >= 2) {
      const nh = rYears.map((y) => nhMap[y] ?? 0);
      const sh = rYears.map((y) => shMap[y] ?? 0);
      const last = rYears.length - 1;
      roads = {
        years: rYears,
        nh,
        sh,
        latestYear: rYears[last],
        latestNh: nh[last],
        latestSh: sh[last],
        deltaNh: nh[last] - nh[0],
        deltaSh: sh[last] - sh[0],
      };
    }
  }

  // ── Pre-rendered geospatial figures (folder uses the WHW naming) ──
  const figures: GeoFigures = {
    rgbBeforeAfter:
      MAP_FIGURES[`../Map/WhatHowWhy_v2/${whwName}/maps/rgb_before_after.png`],
    changeHeatmap:
      MAP_FIGURES[`../Map/WhatHowWhy_v2/${whwName}/maps/change_heatmap.png`],
    rgb2024:
      MAP_FIGURES[`../Map/WhatHowWhy_v2/${whwName}/maps/rgb_2024_preview.png`],
  };

  // Landscape Transformation lives inside Hotspot Analysis (subsection);
  // Methodology & Sources is always the closing section.
  const toc = [
    key && 'Demographic Overview',
    chart.length > 0 && 'Population Projection & Growth',
    (agePyramid || gender) && 'Population Structure',
    key?.u0 && key?.u1 && 'Urban & Rural Composition',
    (lulcYearly || lulc) && 'Land Use Analysis',
    (hotspots || whw.length > 0) && 'Hotspot Analysis',
    'Technical Notes & Sources',
  ].filter(Boolean) as string[];

  const generated = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return {
    district,
    generated,
    key,
    paragraphs: overview?.paragraphs ?? [],
    chart,
    hasCensus: !!census,
    tableYears,
    model,
    census,
    stats,
    whw,
    lulc,
    lulcYearly,
    hotspots,
    gender,
    agePyramid,
    roads,
    figures,
    toc,
  };
}
