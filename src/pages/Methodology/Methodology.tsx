import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';
import {
  BookOpen,
  MapPin,
  Database,
  Cpu,
  TrendingUp,
  Eye,
  ShieldCheck,
  AlertTriangle,
  Terminal,
  BookMarked,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const MethodologyPage: React.FC = () => {
  return (
    <PageWrapper title="Methodology">
      <div className="w-full max-w-9xl mx-auto">
        {/* Header Hero Section */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <p className="text-[#F76000] font-black text-xs uppercase tracking-[0.2em] mb-3">
            Odisha Demographic & Data Intelligence Platform
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            Population Estimation & Dynamics for Odisha using Geospatial & AI/ML Methods
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Detailed technical documentation of the analytical frameworks, data integration pipelines,
            machine learning estimators, and validation parameters powering the platform.
          </p>
        </div>

        {/* Main Content Area */}
        <main className="space-y-20 pb-24 text-gray-700 leading-relaxed text-sm md:text-base">

          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">1. Overview</h3>
            </div>
            <p className="mb-6 text-gray-600">
              The Odisha Demographic & Data Intelligence Platform provides annual, district-level population estimates and projections for all 30 districts of Odisha from 2011 through 2036, together with land-use change analysis, settlement classification, and satellite-derived urbanisation indicators. Because India's decennial census provides demographic ground truth only once per decade (and the 2021 enumeration was delayed), the platform answers a question the census alone cannot: <em>how is Odisha's population changing year by year, where exactly is that change happening, and what is driving it?</em>
            </p>

            <p className="mb-8 text-gray-600">
              To answer this, the platform fuses three complementary analytical pipelines built on open data and open-source tooling:
            </p>

            {/* Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-200/50 hover:border-[#FFF4EB] hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] text-[#F76000] flex items-center justify-center font-bold mb-4 text-sm">
                  01
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Satellite Estimation</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  Machine-learning models trained on Census 2011 ground truth that estimate annual population from satellite-derived proxies (built-up area, nighttime lights, LST, vegetation indices) at district and sub-district levels.
                </p>
              </div>

              <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-200/50 hover:border-[#FFF4EB] hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4 text-sm">
                  02
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Population Prediction</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  An annual district-level prediction model that learns growth trajectories from estimated historical series (2011–2025) and projects it forward to 2036, validated against WorldPop and UNFPA projections.
                </p>
              </div>

              <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-gray-200/50 hover:border-[#FFF4EB] hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold mb-4 text-sm">
                  03
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Land-Use Change</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  A multi-signal change detection pipeline identifying significant settlement, industrial, mining, and transport transformations (2016–2024), explaining what changed, how, and why.
                </p>
              </div>
            </div>

            <div className="p-4 bg-orange-50/50 border-l-4 border-[#F76000] text-[#F76000] rounded-r-xl text-xs md:text-sm font-medium">
              All outputs are delivered through an interactive web application built on React and MapLibre GL, streaming Cloud-Optimized GeoTIFFs (COGs) and PMTiles.
            </div>
          </section>

          {/* 2. Study Area */}
          <section id="study-area" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">2. Study Area</h3>
            </div>
            <p className="mb-6 text-gray-600">
              Odisha, on India's eastern coast, spans approximately <strong>155,707 km²</strong> and recorded a population of <strong>41,974,218</strong> in the 2011 Census across <strong>30 districts</strong> and numerous sub-districts (blocks/tehsils). The state's geography is highly heterogeneous, spanning coastal plains, central plateaus, and forested mountainous regions, producing two distinct demographic regimes that shape the analysis:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-[#F9FAFB] rounded-2xl border-l-4 border-amber-500">
                <h4 className="font-bold text-gray-900 mb-3 text-sm md:text-base">Coastal Industrial & Metropolitan Corridors</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-2">
                  <strong>Districts:</strong> Khordha, Cuttack, Puri, Ganjam, Jajpur
                </p>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  Characterised by rapid urbanisation around the Bhubaneswar agglomeration and the Paradip–Kalinganagar industrial belt, alongside exposure to cyclone and flood hazards.
                </p>
              </div>

              <div className="p-6 bg-[#F9FAFB] rounded-2xl border-l-4 border-emerald-500">
                <h4 className="font-bold text-gray-900 mb-3 text-sm md:text-base">Interior Tribal & Mining Belts</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-2">
                  <strong>Districts:</strong> KBK region, Kendujhar, Sundargarh, Mayurbhanj, Koraput, Rayagada
                </p>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  Characterised by dispersed rural settlement, mining-driven workforce concentrations, and slower formal urbanisation.
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              This combination of resource-driven growth and persistent rural populations makes Odisha an ideal testbed for satellite-based demographic methods, and makes accurate, frequently updated population data critical for disaster risk reduction, planning, and equitable resource allocation.
            </p>
          </section>

          {/* 3. Data Sources */}
          <section id="data-sources" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">3. Data Sources</h3>
            </div>





            <p className="text-gray-600">
              Refer{" "}
              <Link
                to="/catalog"
                className="underline bold"
              >
                Data Catalog
              </Link>

              {" "} page
            </p>
          </section>

          {/* 4. Pipeline 1: Satellite-Based Population Estimation */}
          <section id="pipeline-1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                4. Pipeline 1: Satellite-Based Population Estimation (AI/ML)
              </h3>
            </div>

            <div className="space-y-8">
              {/* 4.1 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">4.1 Rationale</h4>
                <p className="text-gray-600">
                  Built-up extent, nighttime light intensity, and related spectral signals are strong physical proxies for where people live and how settlement intensity changes. By learning the relationship between these signals and the Census 2011 counts, the models can estimate population for any year in which satellite imagery exists, filling the intercensal gap with annual estimates.
                </p>
              </div>

              {/* 4.2 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">4.2 Feature Engineering</h4>
                <p className="text-gray-600 mb-4">
                  Annual cloud-free composites were generated in Google Earth Engine for each year from 2011 to 2024. Preprocessing included radiometric calibration, atmospheric correction, cloud masking (with the cloud-cover threshold tightened from 10–20% to 3–5% to improve composite consistency), and SLC-off gap correction for Landsat 7. From these composites the pipeline derives a feature stack per administrative unit:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[
                    {
                      name: 'Spectral Indices',
                      desc: 'NDVI, NDBI, MNDWI, SAVI, EVI, TVI, BUI, UI, IBI (annual means via zonal statistics)'
                    },
                    {
                      name: 'Land Surface Temperature (LST)',
                      desc: 'Annual mean'
                    },
                    {
                      name: 'Nighttime Lights (VIIRS DNB)',
                      desc: 'Radiance counts (2012 used as a proxy for the missing 2011 baseline)'
                    },
                    {
                      name: 'VTLPI',
                      desc: 'Vegetation–Temperature–Light Population Index: a composite of normalised DNB, normalised LST, and maximum NDVI'
                    },
                    {
                      name: 'LULC Class Areas',
                      desc: 'Built-up, agricultural, forest, wasteland, and water area per unit'
                    }
                  ].map((feat, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-[#F76000] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 text-xs md:text-sm block mb-1">{feat.name}</span>
                        <span className="text-xs md:text-sm text-gray-500 leading-relaxed">{feat.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  Zonal statistics were computed at two administrative levels, district (30 units) and sub-district, each stored as GeoJSON with yearly attribute columns, reprojected to UTM Zone 44N for area-true spatial analysis.
                </p>
              </div>

              {/* 4.3 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">4.3 Feature Selection</h4>
                <p className="text-gray-600">
                  A Pearson correlation analysis against Census 2011 population guided feature selection. Built-up area (r = 0.65–0.70 across levels), nighttime lights (r = 0.79 at district level), and agricultural land showed strong positive correlations; forest and wasteland showed weak or negligible relationships. Low-correlation variables (e.g., BUI at r = 0.053, UI at r = 0.12 at the sub-district level) were removed, which improved model generalisation, confirming that noisy features degrade performance in sparse rural settlement contexts.
                </p>
              </div>

              {/* 4.4 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">4.4 Models & Validation Strategy</h4>
                <p className="text-gray-600 mb-4">
                  Four non-linear ensemble regressors were trained and compared: <strong>Random Forest</strong>, <strong>XGBoost</strong>, <strong>LightGBM</strong>, and <strong>CatBoost</strong>. Two validation strategies were used to guard against spatial autocorrelation inflating apparent skill:
                </p>
                <ul className="space-y-3 pl-4 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F76000] mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Leave-One-Out (LOO) cross-validation:</strong> each administrative unit held out in turn.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F76000] mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Gridded block-wise spatial split:</strong> the state partitioned into spatial blocks, with whole blocks held out, ensuring the model is tested on geographically unseen areas.
                    </div>
                  </li>
                </ul>
                <p className="text-gray-600">
                  Models were trained on 2011 (the only full ground truth), then used to predict population for 2012–2025 from each year's satellite features. Predictions for 2021 were evaluated against official projected 2021 figures using R², RMSE, MAE, and MAPE.
                </p>
              </div>

              {/* 4.5 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">4.5 Iterative Refinement</h4>
                <p className="text-gray-600 mb-4">
                  The modelling proceeded through three documented iterations:
                </p>
                <ol className="space-y-4 pl-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#F76000] text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong>Baseline district and sub-district models</strong> established the workflow but showed weak temporal transfer (district-level 2021 R² of 0.40 for Random Forest).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#F76000] text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Iterative learning on predicted data</strong> (training on previous years' predictions) was tested and <em>discontinued</em>: compounding errors degraded RMSE by 5–8% annually. Instead, the cloud-cover threshold adjustment substantially improved input raster quality, lifting CatBoost to <strong>R² = 0.91</strong> on the 2021 LOO evaluation with RMSE reduced by over 50% in some configurations.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#F76000] text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Final feature pruning</strong> confirmed stable performance: a best 2021 sub-district score of CatBoost R² = 0.87, with MAPE in the 13–16% range for the strongest model–year combinations.
                    </div>
                  </li>
                </ol>
                <p className="text-gray-600">
                  The final configuration uses CatBoost and LightGBM as the primary estimators, producing annual population estimates from 2011 to 2025 that are aggregated and reconciled across administrative levels. Estimated population is also disaggregated to a continuous grid (dasymetric redistribution) so that allocation remains consistent with administrative totals while revealing intra-district density patterns.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Pipeline 2: Population Prediction 2026–2036 */}
          <section id="pipeline-2" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                5. Pipeline 2: Population Prediction 2026–2036
              </h3>
            </div>

            <div className="space-y-8">
              {/* 5.1 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">5.1 Approach</h4>
                <p className="text-gray-600">
                  Forward projections for 2026–2036 are produced by a district-level prediction model built on the historical series estimated under Pipeline 1 (2011–2025). Rather than importing external projections as inputs, the model learns each district's own demographic trajectory from the satellite-derived estimates and extends it forward year by year. External reference series, the WorldPop gridded projections and the UNFPA's official projections, are reserved strictly for independent validation.
                </p>
              </div>

              {/* 5.2 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">5.2 Growth-Rate Modelling</h4>
                <p className="text-gray-600">
                  A log-linear growth model is fitted independently for each district (and the state aggregate) by ordinary least squares on the log-transformed historical series:
                </p>

                {/* Equation Block */}
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-orange-500 rounded-r-2xl text-center font-mono text-xs md:text-base text-gray-800 shadow-sm">
                  ln P(d, y) = a<sub>d</sub> + r<sub>d</sub> · y
                </div>

                <p className="text-gray-600">
                  The fitting window is restricted to the most recent years of the estimated series rather than the full 2011–2025 span. Because population growth in Odisha is decelerating, a rate fitted adjacent to the prediction region is more defensible than a long-run average that would over-weight the faster growth of the early 2010s.
                </p>
              </div>

              {/* 5.3 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">5.3 Forward Prediction</h4>
                <p className="text-gray-600">
                  The fitted district rate r<sub>d</sub> is applied geometrically from the final estimated year:
                </p>

                {/* Equation Block */}
                <div className="my-6 p-4 bg-gray-50 border-l-4 border-orange-500 rounded-r-2xl text-center font-mono text-xs md:text-base text-gray-800 shadow-sm">
                  P(d, y) = P(d, 2025) · exp(r<sub>d</sub> · (y − 2025)), &nbsp;&nbsp; y ∈ &#123;2026, ..., 2036&#125;
                </div>

                <p className="text-gray-600">
                  District predictions are reconciled with the state aggregate so the parts remain consistent with the whole. Because the underlying historical series is trained directly on Census 2011 ground truth, the full 2011–2036 trajectory remains anchored to the census baseline, and the per-district growth signal is preserved end to end.
                </p>
              </div>

              {/* 5.4 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">5.4 Validation Against Reference Series</h4>
                <p className="text-gray-600">
                  The predicted series is compared year-by-year against two independent references: the <strong>WorldPop Global 2015–2030 projections</strong> (R2025A, calibrated to UN World Population Prospects 2024) over the overlapping years, and the <strong>UNFPA's official projections</strong> through 2036. Agreement levels and the residual methodological gap are reported in Section 7 and published alongside the data.
                </p>
              </div>

              {/* 5.5 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">5.5 Derived Indicators</h4>
                <p className="text-gray-600 mb-4">
                  From the combined estimated and predicted series (2011–2036) the platform computes, per district and year:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <span className="font-bold text-gray-900 text-xs md:text-sm block mb-1">Density</span>
                    <span className="text-xs md:text-sm text-gray-500">Population divided by the official Census 2011 land area (persons/km²).</span>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <span className="font-bold text-gray-900 text-xs md:text-sm block mb-1">Year-on-year growth</span>
                    <span className="text-xs md:text-sm text-gray-500">Annual percentage change (null for 2011 base year).</span>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <span className="font-bold text-gray-900 text-xs md:text-sm block mb-1">Urban/rural split</span>
                    <span className="text-xs md:text-sm text-gray-500">
                      Census 2011 urban share advanced linearly at Odisha's observed 2001→2011 urbanisation rate of <strong>+0.17 pp per year</strong>.
                    </span>
                  </div>
                </div>
              </div>

              {/* 5.6 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">5.6 Settlement Classification Series</h4>
                <p className="text-gray-600">
                  A parallel sub-pipeline converts the <strong>GHS Settlement Model (SMOD)</strong> rasters for 2010, 2015, 2020, 2025, and 2030 into per-district Cloud-Optimized GeoTIFFs. Tiles are mosaicked, reprojected from Mollweide to Web Mercator using <strong>nearest-neighbour resampling</strong> (mandatory for categorical data), clipped per district, and written through GDAL's COG driver for efficient HTTP-range streaming into the map client. The eight DEGURBA classes, from water and very-low-density rural through suburban, semi-dense urban, dense urban, and urban centre, let users watch the Degree of Urbanisation evolve across two decades.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Pipeline 3: Land-Use Change Detection */}
          <section id="pipeline-3" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                6. Pipeline 3: Land-Use Change Detection & Driver Attribution (2016 → 2024)
              </h3>
            </div>

            <div className="space-y-8">
              {/* 6.1 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">6.1 Purpose</h4>
                <p className="text-gray-600">
                  Population numbers describe <em>how much</em> change occurred; this pipeline shows <em>where</em> and <em>why</em>. It quantifies land-use change across all 30 districts between 2016 and 2024. This window was chosen because Sentinel-2 L2A reaches globally consistent quality only after late 2015, and an ~8-year span captures stable change while avoiding inter-annual classifier noise. The analysis focuses on the four spatial signatures of population change: settlement/housing growth, industrial footprint expansion, mining-induced workforce concentration, and transport-corridor development.
                </p>
              </div>

              {/* 6.2 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">6.2 Image Acquisition & Compositing</h4>
                <p className="text-gray-600">
                  For each district and endpoint year, Sentinel-2 L2A scenes are queried from the Planetary Computer STAC catalogue within the <strong>post-monsoon October–February window</strong> (minimising cloud contamination and paddy-phenology noise across Odisha's rice belt), filtered to &lt;10% scene cloud cover. Pixel-level cloud masking uses the Scene Classification Layer, and a per-pixel <strong>median composite</strong>, robust to residual contamination, is computed per year. District-wide change scoring runs at a 60 m working resolution; each detected hotspot is then re-fetched at native 10 m for high-resolution visual verification.
                </p>
              </div>

              {/* 6.3 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">6.3 Multi-Signal Change Scoring</h4>
                <p className="text-gray-600">
                  Five spectral indices (NDVI, NDBI, NDWI, MNDWI, BSI) are computed per year and differenced. Each delta is converted to a directional change magnitude matched to the demographic question (vegetation <em>loss</em>, built-up <em>gain</em>, bare-soil <em>gain</em>) and combined with a strict land-cover <strong>built-expansion mask</strong> (pixels that were not Built in 2016 and are Built in 2024, derived from the ESRI annual land cover product). Signals are robust-z-normalised (median/MAD, insensitive to the very outliers being detected) and linearly weighted, with land-cover transition (0.40) and NDBI gain (0.35) dominating. A water-exclusion mask suppresses reservoir drawdown/refill artefacts that would otherwise dominate districts with large dams.
                </p>
              </div>

              {/* 6.4 */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">6.4 Hotspot Ranking & Attribution</h4>
                <p className="text-gray-600 mb-4">
                  The change-score raster is aggregated to a 1 km grid, and non-maximum suppression with a 3 km minimum separation selects the <strong>top five spatially distinct hotspots per district</strong> (150 across the state). Each hotspot receives a full attribution record:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Dominant LULC Transition',
                      desc: 'Prioritises anthropogenic transitions, combined with a detailed "from-class" area breakdown answering what existed before.'
                    },
                    {
                      name: 'Nearby Drivers Registry',
                      desc: 'Merged from a curated state registry of ~250 district-context features (mines, plants, stations, ports) and live OSM queries.'
                    },
                    {
                      name: 'Attributed Cause & Confidence',
                      desc: 'A likely-cause narrative combined with a numeric confidence score, upgraded if nearby drivers align with the observed transition.'
                    },
                    {
                      name: 'Settlement-Type Tags',
                      desc: 'Tag classification (residential, industrial, mining, transport, mixed, vegetation). Zero-built targets snap to vegetation.'
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <span className="font-bold text-gray-900 text-xs md:text-sm block mb-1">
                        {item.name}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. Validation & Quality Assurance */}
          <section id="validation" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">7. Validation & Quality Assurance</h3>
            </div>
            <p className="mb-6 text-gray-600">
              The platform applies validation at every stage rather than as a single end check:
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Statistical Evaluation of ML Estimates',
                  desc: 'All models are scored with R², RMSE, MAE, and MAPE under both Leave-One-Out (LOO) and spatially blocked splits. Spatial blocking is the stricter test: it measures whether the model generalises to entirely unseen geography. The strongest configuration achieves a 2021 prediction score of R² = 0.91 (CatBoost, sub-district LOO), with year-by-year back-tests for 2012–2020 maintaining R² between 0.77 and 0.92.'
                },
                {
                  title: 'Independent Cross-Validation Against Official Projections',
                  desc: "The full 2011–2036 series is compared year-by-year against the UNFPA's official projection series, produced using Bayesian approaches, an entirely independent methodology. The priority districts agree with the official reference to within ±5% in every year, with the aggregate tracking within 3.4% at maximum. The platform's series runs slightly conservative (implied state CAGR ~0.69%/yr vs ~0.81%/yr), reflecting differing fertility-decline assumptions. Both trajectories are internally defensible."
                },
                {
                  title: 'Comparison with Gridded Population Products',
                  desc: 'District-year totals for the overlapping years are cross-checked against the WorldPop Global 2015–2030 projections (R2025A) for consistency of both absolute levels and temporal growth trajectories.'
                },
                {
                  title: 'Human-in-the-Loop Validation of Change Hotspots',
                  desc: "All hotspots from the initial multi-district batch were manually audited against ground knowledge of Odisha's geography. The audit drove three classifier improvements (zero-built vegetation snap, nearest-per-category driver voting, and road down-weighting), after which wrong tags fell to 0/40. Cross-district sanity checks confirm independent priors: the state's largest residential hotspot sits on the Bhubaneswar fringe (Khordha), and the largest mining-adjacent footprint lands in Sundargarh's Bonai iron-ore belt."
                },
                {
                  title: 'LULC Accuracy Assessment',
                  desc: 'Classification outputs are validated through visual interpretation against high-resolution reference imagery and confusion-matrix analysis on stratified random samples.'
                }
              ].map((val, i) => (
                <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F76000]" />
                    {val.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Assumptions & Limitations */}
          <section id="assumptions" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">8. Assumptions & Limitations</h3>
            </div>
            <p className="mb-6 text-gray-600">
              The platform is transparent about the boundaries of its methods:
            </p>

            <div className="bg-amber-50/40 border border-amber-200/60 p-6 rounded-2xl">
              <ul className="space-y-4">
                {[
                  {
                    label: 'Census 2011 is the only full-count anchor',
                    text: 'With the 2021 Census delayed, post-2011 estimates rest on modelled and satellite-derived signals validated against official projections rather than enumeration. The 2011 anchor is exact by construction; uncertainty grows with distance.'
                  },
                  {
                    label: 'Projection uncertainty compounds toward 2036',
                    text: 'Terminal-year district estimates carry a reasonable 80% confidence band of roughly ±5–10%. Outputs are point estimates; formal uncertainty intervals are a planned extension.'
                  },
                  {
                    label: 'Uniform urbanization rate assumption (+0.17 pp/year)',
                    text: 'Real district rates vary (Khordha urbanised faster, Mayurbhanj slower), making this the largest known error source in the urban/rural split for districts far from the state average.'
                  },
                  {
                    label: 'Projections represent totals, not age–sex cohorts',
                    text: 'A cohort-component extension using SRS fertility, mortality, and migration inputs is the natural follow-on for working-age, school-age, and elderly breakdowns.'
                  },
                  {
                    label: 'Satellite proxies physical limits',
                    text: 'Monsoon-season cloud cover requires seasonal median composites; VIIRS nightlights saturate in dense urban cores and under-detect low-intensity rural electrification; and the 60 m change-scoring resolution can miss transformations smaller than ~1 ha.'
                  },
                  {
                    label: 'Settlement-type tags are spatial proxies',
                    text: 'They are designed to be read alongside census and survey data, not to replace it.'
                  },
                  {
                    label: 'Boundary vintage',
                    text: "GADM polygons are a contemporary snapshot; Odisha's district boundaries have been stable since 2011, so boundary mismatch contributes at most a few percent to district totals."
                  }
                ].map((lim, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                    <div className="text-xs md:text-sm">
                      <strong className="text-gray-900 block mb-0.5">{lim.label}</strong>
                      <span className="text-gray-600 leading-relaxed">{lim.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 9. Technology & Reproducibility */}
          <section id="technology" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">9. Technology & Reproducibility</h3>
            </div>

            <div className="space-y-6 text-gray-600">
              <p>
                The full pipeline is built on open-source software. Data engineering uses Python (geopandas, rasterio/rioxarray, xarray, numpy, scikit-learn, XGBoost, LightGBM, CatBoost) with Google Earth Engine and Planetary Computer STAC APIs for imagery access. Geospatial assets are served as Cloud-Optimized GeoTIFFs and PMTiles from object storage and rendered client-side by a React + TypeScript frontend using MapLibre GL with COG and PMTiles protocols, and Recharts for analytics.
              </p>
              <p>
                Reproducibility is engineered in: deterministic STAC query caching, fixed random seeds, deterministic grid layouts and median compositing, and idempotent pipeline runs that produce byte-identical outputs on re-execution. Batch processing across all 30 districts is resilient to upstream API outages through automated health-polling and retry orchestration. The methodology scripts (data ingestion, feature extraction, model training, calibration, and validation) are maintained as a documented repository, and the pipeline is parameterised so that extending it to additional districts or states requires only new boundary, census-anchor, and area dictionaries rather than structural code changes.
              </p>

              {/* Tech Pills */}
              <div className="pt-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Core Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Google Earth Engine',
                    'Planetary Computer STAC',
                    'Python (rasterio/rioxarray)',
                    'CatBoost & LightGBM',
                    'React & TypeScript',
                    'MapLibre GL (COG & PMTiles)',
                    'Recharts'
                  ].map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 hover:bg-[#FFF4EB] hover:text-[#F76000] border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 10. References */}
          <section id="references" className="scroll-mt-24 border-t border-gray-100 pt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#FFF4EB] rounded-lg text-[#F76000]">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">10. References</h3>
            </div>

            <ol className="space-y-4 text-xs md:text-sm text-gray-600 list-decimal pl-5">
              <li>
                Census of India 2011, Primary Census Abstract, Odisha. Office of the Registrar General & Census Commissioner, India.
              </li>
              <li>
                WorldPop Global 2015–2030 Population Projections, R2025A v1. University of Southampton.{' '}
                <a href="https://www.worldpop.org/" target="_blank" rel="noopener noreferrer" className="text-[#F76000] hover:underline inline-flex items-center gap-0.5">
                  worldpop.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                European Commission JRC, GHS Settlement Model grid R2023A v2.0 (Schiavina, Freire, MacManus, 2023).{' '}
                <a href="https://human-settlement.emergency.copernicus.eu/" target="_blank" rel="noopener noreferrer" className="text-[#F76000] hover:underline inline-flex items-center gap-0.5">
                  human-settlement.jrc.ec.europa.eu <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Degree of Urbanisation (DEGURBA): Eurostat, FAO, ILO, OECD, UN-HABITAT, World Bank; UN Statistical Commission, 2020.
              </li>
              <li>
                GADM, Database of Global Administrative Areas, v4.1.{' '}
                <a href="https://gadm.org/" target="_blank" rel="noopener noreferrer" className="text-[#F76000] hover:underline inline-flex items-center gap-0.5">
                  gadm.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                ESA Copernicus Sentinel-2 L2A; USGS Landsat Collection 2; NOAA VIIRS DNB.
              </li>
              <li>
                ESRI Land Cover, 10 m Annual Land Use Land Cover (Esri / Impact Observatory / Microsoft).{' '}
                <a href="https://livingatlas.arcgis.com/landcover/" target="_blank" rel="noopener noreferrer" className="text-[#F76000] hover:underline inline-flex items-center gap-0.5">
                  livingatlas.arcgis.com <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Cloud-Optimized GeoTIFF specification.{' '}
                <a href="https://www.cogeo.org/" target="_blank" rel="noopener noreferrer" className="text-[#F76000] hover:underline inline-flex items-center gap-0.5">
                  cogeo.org <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ol>
          </section>

        </main>
      </div>
    </PageWrapper>
  );
};

export default MethodologyPage;

