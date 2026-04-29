import React from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import { Download } from 'lucide-react';

const DataCatalogPage: React.FC = () => {
  return (
    <PageWrapper title="Data Catalog">
      <div className="w-full">
        <div className="space-y-12">
          {/* Available Datasets Section */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Available Datasets
                </h3>

                <p className="text-sm text-gray-500 mt-1 font-medium">
                  Download raw datasets for your own analysis. All datasets are
                  provided under Open Government Data License.
                </p>
              </div>
            </div>

            <section className="relative bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Dataset
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Format
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Updated
                      </th>
                      <th scope="col" className="px-6 py-4 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        title: 'District Population 2011-2036',
                        desc: 'Annual population estimates and projections for all 30 districts',
                        format: 'CSV',
                        size: '2.4 MB',
                        updated: 'Dec 2024',
                      },
                      {
                        title: 'Building Footprints',
                        desc: 'AI-derived building polygons with area and type classification',
                        format: 'GeoJSON',
                        size: '156 MB',
                        updated: 'Nov 2024',
                      },
                      {
                        title: 'Road Network',
                        desc: 'Complete road network with classification (NH/SH/District/Rural)',
                        format: 'Shapefile',
                        size: '45 MB',
                        updated: 'Oct 2024',
                      },
                      {
                        title: 'Nighttime Lights Index',
                        desc: 'Monthly VIIRS nighttime light composites 2012-2024',
                        format: 'GeoTIFF',
                        size: '89 MB',
                        updated: 'Nov 2024',
                      },
                      {
                        title: 'Urban-Rural Classification',
                        desc: 'Settlement classification with supporting indicators',
                        format: 'CSV',
                        size: '0.5 MB',
                        updated: 'Dec 2024',
                      },
                      {
                        title: 'Administrative Boundaries',
                        desc: 'District and block level administrative boundaries',
                        format: 'Shapefile',
                        size: '12 MB',
                        updated: '2024',
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className="bg-gray-50 hover:bg-gray-50 transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <div className="font-bold text-gray-900 text-sm mb-0.5">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {item.desc}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="bg-blue-50 text-[#F58220] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wide border border-blue-100">
                            {item.format}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-600 text-xs">
                          {item.size}
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-500 text-xs">
                          {item.updated}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#F58220] hover:bg-[#D66B12] text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 group-hover:shadow-md">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Blurred Glassmorphic Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/30 backdrop-blur-[2px] select-none">
                <div className="bg-white/80 backdrop-blur-md px-10 py-5 rounded-2xl shadow-2xl border border-white/50 animate-in zoom-in-95 duration-700">
                  <span className="text-[#F96000] text-4xl font-black uppercase tracking-[0.2em] font-mono drop-shadow-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* API Access Section */}
          {/* <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  API Access
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Programmatic access to DIU data is available through our REST API.</p>
              </div>
            </div>

            <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
              <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
                Contact the DIU team for API credentials and documentation.
              </p>

              <div className="bg-orange-50/50 rounded-xl border border-orange-100 p-4 font-mono text-xs text-orange-800 overflow-x-auto flex items-center gap-4">
                <span className="font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded text-[10px]">GET</span>
                <span>/api/v1/districts/&#123;district_id&#125;/population?year=2024</span>
              </div>
            </section>
          </div> */}
        </div>
      </div>
    </PageWrapper>
  );
};

export default DataCatalogPage;
