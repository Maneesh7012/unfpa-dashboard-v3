import React from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';

const MethodologyPage: React.FC = () => {
  return (
    <PageWrapper title="Methodology">
      <div className="w-full">
        {/* Overview Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            {/* <span className="w-1.5 h-8 bg-[#F58220] rounded-full"></span> */}
            <h3 className="text-xl font-bold text-gray-900">Overview</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            The Demographic Intelligence Unit (DIU) employs a multi-source data fusion approach combining census data, satellite imagery, and administrative records to generate high-resolution demographic estimates and projections for Odisha's 30 districts.
          </p>
        </div>

        <div className="flex flex-col gap-16 mb-20">

          {/* Data Sources and Validation (Now Stacked) */}
          <div className="space-y-16">

            {/* Data Sources */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* <span className="w-1.5 h-6 bg-[#F58220] rounded-full"></span> */}
                <h3 className="text-xl font-bold text-gray-900">Data Sources</h3>
              </div>
              <ul className="space-y-4 pl-4">
                {[
                  { title: 'Census of India 2011', desc: 'Baseline population, household, and demographic indicators' },
                  { title: 'Sample Registration System', desc: 'Vital statistics and growth rates' },
                  { title: 'Satellite Imagery (Sentinel-2, Landsat-8)', desc: 'High-resolution land cover and environmental data' },
                  { title: 'VIIRS Nighttime Lights', desc: 'Proxy for economic activity and electrification' },
                  { title: 'OpenStreetMap', desc: 'Road networks and infrastructure mapping' },
                  { title: 'Microsoft Building Footprints', desc: 'AI-derived building density and expansion metrics' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{item.title}: </span>
                      <span className="text-sm text-gray-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Methodology Steps (Full Width) */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              {/* <span className="w-1.5 h-6 bg-[#F58220] rounded-full"></span> */}
              <h3 className="text-xl font-bold text-gray-900">Methodology Steps</h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Data Collection & Preprocessing',
                  desc: 'We begin by aggregating multi-source data including census records, satellite imagery, and administrative datasets. This involves standardization, cleaning, and geocoding to ensure all data layers are spatially aligned. Satellite imagery undergoes atmospheric correction and cloud masking to produce analysis-ready data products.'
                },
                {
                  step: '02',
                  title: 'Feature Extraction',
                  desc: 'Key demographic indicators are derived from geospatial data. We extract spectral indices (NDVI, NDBI, NDWI), building footprints, road density, and nighttime light intensity at district and sub-district levels. These features serve as the primary predictor variables for our models.'
                },
                {
                  step: '03',
                  title: 'Population Modeling',
                  desc: 'Machine learning models, primarily Random Forest and XGBoost, are trained on ground-truth census data to establish relationships between satellite-derived features and population density. These models are then used to estimate inter-censal population figures with high spatial resolution.'
                },
                {
                  step: '04',
                  title: 'Projection & Validation',
                  desc: 'Future population scenarios (2024-2036) are generated using a cohort-component method combined with spatial disaggregation. The results undergo rigorous cross-validation against administrative records and sample surveys to ensure statistical reliability and minimize error margins.'
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-6 p-8 bg-[#F9FAFB] rounded-2xl group hover:bg-[#FFF4EB] transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <span className="text-3xl font-black text-gray-300 group-hover:text-[#F58220] transition-colors duration-300">{step.step}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* <span className="w-1.5 h-6 rounded-full"></span> */}
              <h3 className="text-xl font-bold text-gray-900">Technology Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Google Earth Engine', 'Python', 'QGIS', 'PostgreSQL', 'PostGIS', 'TensorFlow', 'Leaflet.js', 'R Statistical', 'Azure Cloud'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-[#FFF4EB] transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Validation Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* <span className="w-1.5 h-6 rounded-full"></span> */}
              <h3 className="text-xl font-bold text-gray-900">Validation & Accuracy</h3>
            </div>
            <div className="rounded-2xl p-8 bg-[#F9FAFB]">
              <p className="text-sm font-bold mb-4 opacity-80 uppercase tracking-wide text-[10px]">Model Validation Metrics</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                <ul className="space-y-3 flex-1">
                  {[
                    'Leave-one-out cross-validation at district level',
                    'Comparison with Sample Registration System estimates',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3 flex-1">
                  {[
                    'Ground-truthing in selected blocks'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 flex-shrink-0"></div>
                    Target MAPE: &lt; 5%
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MethodologyPage;
