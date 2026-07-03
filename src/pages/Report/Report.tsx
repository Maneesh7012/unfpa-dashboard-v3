import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, Users, TrendingUp, TrendingUpDown, MapPin, Building2 } from 'lucide-react';
import undpLogo from '../../assets/images/undp.png';
import {
  MODEL_DATA,
  MODEL_STATS_DATA,
  MODEL_URBAN_RURAL_DATA,
} from '../../data/modelStats';
import {
  DISTRICT_NAME_VARIANTS,
  DISTRICT_BOUNDS,
  ALLOWED_DISTRICTS,
} from '../../data/comparativeData';
import { DISTRICT_OVERVIEWS } from '../../components/Hero/StateDemographics/districtNarrative';
import { MiniDistrictMap } from '../../components/Hero/StateDemographics/MiniDistrictMap';

// Dynamic stat extraction matching StateDemographics_v3
const getReportStats = (districtName: string) => {
  const canonName = DISTRICT_NAME_VARIANTS[districtName] || districtName;
  const pop2011 = MODEL_DATA[canonName]?.[2011] || 0;
  const pop2036 = MODEL_DATA[canonName]?.[2036] || 0;

  const cagrValue = pop2011 && pop2036 ? (((pop2036 / pop2011) ** (1 / 25)) - 1) * 100 : 0;
  const diffPop = pop2036 - pop2011;

  const density2036 = MODEL_STATS_DATA[canonName]?.[2036]?.density || 0;
  const density2011 = MODEL_STATS_DATA[canonName]?.[2011]?.density || 0;

  const urb2036 = MODEL_URBAN_RURAL_DATA[canonName]?.[2036]?.urban || 0;
  const rur2036 = MODEL_URBAN_RURAL_DATA[canonName]?.[2036]?.rural || 0;
  const total2036 = urb2036 + rur2036;
  const urbPct2036 = total2036 ? (urb2036 / total2036) * 100 : 0;

  const urb2011 = MODEL_URBAN_RURAL_DATA[canonName]?.[2011]?.urban || 0;
  const rur2011 = MODEL_URBAN_RURAL_DATA[canonName]?.[2011]?.rural || 0;
  const total2011 = urb2011 + rur2011;
  const urbPct2011 = total2011 ? (urb2011 / total2011) * 100 : 0;

  const formatM = (v: number) => (v / 1000000).toFixed(2) + 'M';
  const formatK = (v: number) => Math.round(v / 1000) + 'K';

  return [
    {
      label: '2011 Population',
      value: formatM(pop2011),
      sub: 'Census base',
      icon: 'users',
    },
    {
      label: '2036 Projection',
      value: formatM(pop2036),
      sub: `+${formatK(diffPop)} over 25 yrs`,
      icon: 'trending',
    },
    {
      label: 'CAGR',
      value: `${cagrValue.toFixed(2)}%`,
      sub: 'Compound growth rate',
      icon: 'trend',
    },
    {
      label: '2036 Urban Share',
      value: `${urbPct2036.toFixed(1)}%`,
      sub: `Up from ${urbPct2011.toFixed(1)}%`,
      icon: 'building',
    },
    {
      label: '2036 Density',
      value: `${Math.round(density2036)} /km²`,
      sub: `Up from ${Math.round(density2011)}`,
      icon: 'map',
    },
  ];
};

const ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users className="w-4 h-4 text-[#F96000]" />,
  trending: <TrendingUp className="w-4 h-4 text-[#F96000]" />,
  trend: <TrendingUpDown className="w-4 h-4 text-[#F96000]" />,
  map: <MapPin className="w-4 h-4 text-[#F96000]" />,
  building: <Building2 className="w-4 h-4 text-[#F96000]" />,
};

const ReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawDistrict = searchParams.get('district') || 'Odisha';
  const districtName = DISTRICT_NAME_VARIANTS[rawDistrict] || rawDistrict;

  // Sync to hide main header and footer
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      header, footer {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    window.scrollTo({ top: 0 });
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Update document title for PDF print filename
  useLayoutEffect(() => {
    const originalTitle = document.title;
    document.title = `${districtName.toLowerCase()}_unfpa_report`;
    return () => {
      document.title = originalTitle;
    };
  }, [districtName]);

  const overview = useMemo(() => {
    return DISTRICT_OVERVIEWS[districtName] || null;
  }, [districtName]);

  const paragraphs = useMemo(() => overview?.paragraphs || [], [overview]);
  const highlightPhrases = useMemo(() => overview?.highlightPhrases || [], [overview]);

  const stats = useMemo(() => getReportStats(districtName), [districtName]);

  const highlightText = (text: string, phrases: string[]) => {
    if (!text || !phrases.length) return text;
    const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);
    const escapedPhrases = sortedPhrases.map((p) =>
      p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const regex = new RegExp(`(${escapedPhrases.join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => {
      const isMatch = phrases.some(
        (phrase) => phrase.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span key={i} className="bg-orange-100 text-gray-900 font-bold px-1 rounded-sm">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handlePrint = () => {
    // Force set the title right before print trigger
    document.title = `${districtName.toLowerCase()}_unfpa_report`;
    window.print();
  };

  // Generate Year rows from 2011 to 2036
  const tableData = useMemo(() => {
    const rows = [];
    const canonName = DISTRICT_NAME_VARIANTS[districtName] || districtName;
    for (let y = 2011; y <= 2036; y++) {
      const pop = MODEL_DATA[canonName]?.[y] || 0;
      const density = MODEL_STATS_DATA[canonName]?.[y.toString()]?.density || 0;
      const growth = MODEL_STATS_DATA[canonName]?.[y.toString()]?.growth;
      const urb = MODEL_URBAN_RURAL_DATA[canonName]?.[y.toString()]?.urban || 0;
      const rur = MODEL_URBAN_RURAL_DATA[canonName]?.[y.toString()]?.rural || 0;
      rows.push({ y, pop, density, growth, urb, rur });
    }
    return rows;
  }, [districtName]);

  return (
    <div className="report-viewer min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Dynamic styles injected specifically for page-break and A4 layout */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media screen {
          .report-viewer {
            background-color: #f1f5f9;
            padding: 40px 20px;
          }
          .report-page {
            background: white;
            width: 210mm;
            height: 297mm;
            margin-bottom: 30px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding: 20mm;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .report-viewer {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            width: 210mm !important;
            height: auto !important;
          }
          .report-page {
            width: 210mm !important;
            height: 297mm !important;
            padding: 20mm !important;
            page-break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            box-shadow: none !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            background: white !important;
            overflow: hidden !important;
          }
        }

        /* Table compact layout and reduced font-size styling */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
        }
        th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 8px;
          letter-spacing: 0.05em;
          padding: 4px 6px;
          border-bottom: 2px solid #e2e8f0;
        }
        td {
          padding: 3px 6px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 8px;
          color: #334155;
        }
        tr:nth-child(even) {
          background-color: #f8fafc;
        }
      `}} />

      {/* Navigation & Controls Bar */}
      <div className="no-print w-full max-w-[210mm] mb-6 flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/60 shadow-sm">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-bold">
            Report: <span className="text-slate-800 font-black uppercase tracking-wide">{districtName}</span>
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 py-2 px-4 bg-[#F96000] hover:bg-[#E05300] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* PAGE 1: COVER PAGE */}
      <div className="report-page flex flex-col justify-between">
        {/* Header Logo */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <img src={undpLogo} alt="UNFPA Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-black text-xs text-slate-900 leading-none tracking-tight">
                Odisha Demographic & Data Intelligence Platform
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                UNFPA India (Odisha State Office) Initiative
              </span>
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
          <div className="w-16 h-1.5 bg-[#F96000] mb-8 rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase font-mono">
            {districtName}
          </h1>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mt-4">
            District Demographic Profile & Projections
          </p>
          <p className="text-xs text-[#F96000] font-black uppercase tracking-[0.1em] mt-2">
            2011 – 2036
          </p>
        </div>

      </div>

      {/* PAGE 2: TABLE OF CONTENTS */}
      <div className="report-page flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Report Index
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {districtName}
            </span>
          </div>

          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-6">
            Table of Contents
          </h2>

          {/* Index List */}
          <div className="space-y-4 text-xs font-bold text-slate-700 mb-12">
            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
              <span>1. EXECUTIVE SUMMARY</span>
              <span>PAGE 3</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
              <span>2. DEMOGRAPHIC OVERVIEW & STAT CARDS</span>
              <span>PAGE 4</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
              <span>3. NARRATIVE LANDSCAPE ANALYSIS & MAP</span>
              <span>PAGE 4</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1">
              <span>4. DECADE-WISE PROJECTION TABLES (2011–2036)</span>
              <span>PAGE 5</span>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          <span>UNFPA Demographic Report Series</span>
          <span>Page 2</span>
        </div>
      </div>

      {/* PAGE 3: EXECUTIVE SUMMARY */}
      <div className="report-page flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Executive Summary
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {districtName}
            </span>
          </div>

          <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-6">
            Executive Summary
          </h2>
          <div className="space-y-5 text-xs text-slate-600 leading-relaxed font-medium">
            <p>
              The Odisha Demographic and Data Intelligence Platform represents a landmark demographic analytics initiative developed by the United Nations Population Fund (UNFPA) India. Designed to support evidence-based subnational planning, this platform fuses decennial census ground truth with satellite remote sensing proxies and non-linear ensemble models to estimate intercensal trends and project demographic trajectories.
            </p>
            <p>
              This profile provides a dedicated look into the population growth, urbanization trends, and settlement densities of <strong>{districtName}</strong> from 2011 through 2036. By tracing these dynamics year-on-year, the profile exposes the physical footprint of urbanization and human settlement expansion.
            </p>
            <p>
              Administrators and planners can utilize these projections to anticipate future service demands, plan infrastructure networks, allocate healthcare and educational resources, and coordinate disaster mitigation frameworks.
            </p>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          <span>UNFPA Demographic Report Series</span>
          <span>Page 3</span>
        </div>
      </div>

      {/* PAGE 4: SUMMARY & NARRATIVE (StateDemographics_v3 details) */}
      <div className="report-page flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Demographic Overview
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {districtName}
            </span>
          </div>

          {/* Overview Title */}
          <div className="mb-4">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUpDown className="w-5 h-5 text-[#F96000]" />
              District Overview - {districtName}
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
              A comprehensive synthesis of population dynamics and demographic trends.
            </p>
          </div>

          {/* Key Figures Cards */}
          {stats.length > 0 && (
            <div className="mb-4">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Key Figures at a Glance
              </p>
              <div className="grid grid-cols-5 gap-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-slate-50 border border-slate-200/60 rounded-xl p-2 flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1">
                      {ICON_MAP[stat.icon]}
                      <span className="text-[7px] font-black uppercase tracking-wider text-slate-400 truncate">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-xs font-black tracking-tight text-[#F96000] mt-0.5">
                      {stat.value}
                    </div>
                    {stat.sub && (
                      <div className="text-[7px] text-slate-500 font-medium leading-tight truncate">
                        {stat.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2-Column layout: Left: Narrative, Right: Map showing selected polygon */}
          <div className="grid grid-cols-10 gap-4 mt-4">
            <div className="col-span-7 space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <p key={i}>{highlightText(p, highlightPhrases)}</p>
                ))
              ) : (
                <p className="text-slate-400 italic">Narrative data unavailable for this district.</p>
              )}
            </div>

            <div className="col-span-3 h-56 border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50 shadow-sm relative">
              <MiniDistrictMap targetDistrict={districtName} showBasemap={false} />
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          <span>UNFPA Demographic Report Series</span>
          <span>Page 4</span>
        </div>
      </div>

      {/* PAGE 5: DETAILED STATISTICAL TABLES */}
      <div className="report-page flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Statistical Reference Tables
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {districtName}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">
              Decade-Wise Projections Table
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Annual district estimates and indicators compiled for the years 2011 to 2036.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th className="text-left">Year</th>
                  <th className="text-right">Population</th>
                  <th className="text-right">Density (/km²)</th>
                  <th className="text-right">YoY Growth (%)</th>
                  <th className="text-right">Urban Pop</th>
                  <th className="text-right">Rural Pop</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.y} className="hover:bg-slate-50/50">
                    <td className="font-bold text-slate-800">{row.y}</td>
                    <td className="text-right font-mono">{row.pop ? row.pop.toLocaleString() : '—'}</td>
                    <td className="text-right font-mono">{row.density ? row.density.toFixed(1) : '—'}</td>
                    <td className="text-right font-mono">
                      {row.growth !== undefined && row.growth !== null
                        ? `${row.growth >= 0 ? '+' : ''}${row.growth.toFixed(2)}%`
                        : '—'}
                    </td>
                    <td className="text-right font-mono">{row.urb ? row.urb.toLocaleString() : '—'}</td>
                    <td className="text-right font-mono">{row.rur ? row.rur.toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          <span>UNFPA Demographic Report Series</span>
          <span>Page 5</span>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
