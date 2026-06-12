import React from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import {
  Database,
  Target
} from 'lucide-react';

interface Dataset {
  id: number;
  name: string;
  source: string;
  format: string;
  years: string;
  resolution: string;
  role: string;
}

interface ObjectiveMapping {
  objective: string;
  datasets: string;
  proxies: string;
  output: string;
}

const DATASETS: Dataset[] = [
  {
    id: 1,
    name: 'Census of India 2011',
    source: 'Office of the Registrar General & Census Commissioner',
    format: 'CSV',
    years: '2011',
    resolution: 'District / Sub-District',
    role: 'Demographic ground truth for model training; anchor for the full 2011-2036 series; official land areas and baseline urban shares',
  },
  {
    id: 2,
    name: 'UNFPA Population Projections',
    source: 'UNFPA',
    format: 'Tabular',
    years: '2011 - 2036',
    resolution: 'District / State',
    role: 'Independent validation of the estimated and predicted population series',
  },
  {
    id: 3,
    name: 'Administrative Boundaries (GADM v4.1)',
    source: 'GADM',
    format: 'SHP / GeoJSON',
    years: 'Current',
    resolution: 'District',
    role: 'Analysis units for zonal statistics, aggregation, and map rendering',
  },
  {
    id: 4,
    name: 'WorldPop Gridded Population (R2025A)',
    source: 'WorldPop, University of Southampton',
    format: 'GeoTIFF',
    years: '2015 - 2030',
    resolution: '1 km',
    role: 'Independent validation of district population levels and growth trends',
  },
  {
    id: 5,
    name: 'Landsat 5/7/8 Optical Imagery',
    source: 'USGS / NASA',
    format: 'GeoTIFF',
    years: '2011 - 2025',
    resolution: '30 m',
    role: 'Annual spectral indices (NDVI, NDBI, MNDWI, SAVI, EVI, BUI, UI, IBI) and Land Surface Temperature as features for the ML population estimation models',
  },
  {
    id: 6,
    name: 'Sentinel-2 L2A Optical Imagery',
    source: 'ESA Copernicus',
    format: 'JP2 / COG',
    years: '2016 - 2025',
    resolution: '10 m',
    role: 'Land-use change detection, hotspot ranking, and before/after satellite comparisons',
  },
  {
    id: 7,
    name: 'VIIRS Nighttime Lights (DNB)',
    source: 'NOAA / NASA',
    format: 'GeoTIFF',
    years: '2012 - 2026',
    resolution: '500 m',
    role: 'Settlement intensity and electrification proxy; one of the strongest population predictors (r = 0.79)',
  },
  {
    id: 8,
    name: 'ESRI Land Cover',
    source: 'Esri Living Atlas',
    format: 'GeoTIFF',
    years: '2017 - 2025',
    resolution: '10 m',
    role: 'Land cover classes and built-up areas as model features; transition matrices and built-expansion masks for change analysis',
  },
  {
    id: 9,
    name: 'GHS-SMOD Settlement Model (Degree of Urbanisation)',
    source: 'European Commission JRC',
    format: 'GeoTIFF',
    years: '2010 - 2030',
    resolution: '1 km',
    role: 'Settlement-type classification layers (rural to urban centre) across five epochs',
  },
  {
    id: 10,
    name: 'OpenStreetMap Infrastructure',
    source: 'OpenStreetMap',
    format: 'GeoJSON / SHP',
    years: 'Current',
    resolution: 'Vector',
    role: 'Roads, railways, mines, plants, and settlements used to attribute drivers and classify change hotspots',
  },
];

const OBJECTIVES: ObjectiveMapping[] = [
  {
    objective: 'Population Dynamics',
    datasets: 'Census 2011, Landsat, VIIRS, ESRI Land Cover',
    proxies: 'Built-up indices (NDBI, BUI, UI, IBI), nighttime light intensity, land cover areas, LST, vegetation indices',
    output: 'Annual district population estimates (2011-2025) and predictions (2026-2036), with density and growth statistics',
  },
  {
    objective: 'Urban/Rural Distribution',
    datasets: 'Census 2011, GHS-SMOD, VIIRS, ESRI Land Cover',
    proxies: 'DEGURBA settlement classes, light intensity, built-up extent, Census baseline urban share',
    output: 'Urban/rural population split per district and year; Degree of Urbanisation map layers (2010-2030)',
  },
  {
    objective: 'Habitation Pattern',
    datasets: 'Sentinel-2, ESRI Land Cover, OpenStreetMap',
    proxies: 'Spectral change signals, land cover transitions, built-expansion masks, proximity to infrastructure drivers',
    output: '150 attributed change hotspots (5 per district) with settlement-type tags, before/after imagery, and driver context maps',
  },
  {
    objective: 'Population Growth',
    datasets: 'Estimation model outputs, WorldPop, UNFPA projections',
    proxies: 'Year-on-year change in the calibrated annual series',
    output: 'Annual growth rates and projected growth charts per district, validated against WorldPop and UNFPA references',
  },
];

const DataCatalogPage: React.FC = () => {
  return (
    <PageWrapper title="Data Catalog">
      <div className="w-full max-w-9xl mx-auto">

        {/* Header Hero Section */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <p className="text-[#F76000] font-black text-xs uppercase tracking-[0.2em] mb-3">
            Odisha Demographic & Data Intelligence Platform
          </p>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-4xl">
            The platform integrates census records, satellite imagery, land cover products, settlement models,
            and infrastructure data to estimate, predict, and explain population dynamics across the 30 districts of Odisha.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-16 pb-24">

          {/* SECTION 1: Datasets Used */}
          <section id="datasets-used" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Datasets Used</h3>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4 w-12 text-center">#</th>
                    <th className="px-6 py-4 min-w-[200px]">Dataset</th>
                    <th className="px-6 py-4 font-semibold">Source</th>
                    <th className="px-6 py-4 font-semibold">Format</th>
                    <th className="px-6 py-4 font-semibold">Years Used</th>
                    <th className="px-6 py-4 font-semibold">Resolution / Granularity</th>
                    <th className="px-6 py-4 min-w-[300px] font-semibold">Role in the Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {DATASETS.map((dataset) => (
                    <tr key={dataset.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-center font-bold text-gray-400">
                        {dataset.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {dataset.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs">
                        {dataset.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-orange-50 border border-orange-100 rounded-md text-[10px] font-black text-[#F58220] uppercase tracking-wide">
                          {dataset.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs font-semibold text-center">
                        {dataset.years}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-[11px] font-medium text-gray-600">
                          {dataset.resolution}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 leading-relaxed text-xs">
                        {dataset.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 2: Objective Mapping */}
          <section id="objective-mapping" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">How the Datasets Map to Project Objectives</h3>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4 min-w-[180px] font-semibold">Objective</th>
                    <th className="px-6 py-4 min-w-[200px] font-semibold">Datasets Used</th>
                    <th className="px-6 py-4 min-w-[250px] font-semibold">Proxy Indicators</th>
                    <th className="px-6 py-4 min-w-[300px] font-semibold">Output in the Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {OBJECTIVES.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {item.objective}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-xs">
                        {item.datasets}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs leading-relaxed">
                        {item.proxies}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs leading-relaxed">
                        {item.output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>

      </div>
    </PageWrapper>
  );
};

export default DataCatalogPage;

