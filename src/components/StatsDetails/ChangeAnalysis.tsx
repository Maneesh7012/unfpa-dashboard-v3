import React, { useState } from 'react';
import { SatelliteMapWhat } from '../Map/SatelliteMapWhat';
import { SatelliteMapHow } from '../Map/SatelliteMapHow';
import { SatelliteMapWhy } from '../Map/SatelliteMapWhy';
import { Maximize } from 'lucide-react';

interface ChangeAnalysisProps {
    // any specific props here if needed
}

export const ChangeAnalysis: React.FC<ChangeAnalysisProps> = () => {
    const [activeTab, setActiveTab] = useState<'What' | 'How' | 'Why'>('What');
    const [selectedChangeInfo, setSelectedChangeInfo] = useState<any>(null);
    const [analysisFeatures, setAnalysisFeatures] = useState<any[]>([]);
    const [, setMapBounds] = useState<any>(null);

    const TAB_CONTENT = {
        What: [
            { id: 1, title: 'Mining projects completed in the Kaliakata', desc: 'The satellite imagery above shows the creation of new coal processing plants in Kaliakata Town.' },
            { id: 2, title: 'Infrastructure Development in the sub-district areas of Handapa', desc: 'The construction of new roads and railway lines has played a crucial role. For example, projects to improve National Highway 55, which passes through Anugul, and the development of new railway lines aim to better connect the region\'s industrial and mining centers. These improved transportation links make it easier to move goods and people, encouraging the growth of new settlements and industries. In late 2022, the Chief Minister of Odisha launched numerous development projects in Anugul, including improved irrigation, new bus terminals, and bridges, further boosting the district\'s infrastructure.' },
            { id: 3, title: 'Infrastructure Development in the sub-district areas of Anugul', desc: 'The construction of new roads and railway lines has played a crucial role. For example, projects to improve National Highway 55, which passes through Anugul, and the development of new railway lines aim to better connect the region\'s industrial and mining centers. These improved transportation links make it easier to move goods and people, encouraging the growth of new settlements and industries. In late 2022, the Chief Minister of Odisha launched numerous development projects in Anugul, including improved irrigation, new bus terminals, and bridges, further boosting the district\'s infrastructure.' },
            { id: 4, title: 'Built-up area expansion in Handidua Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
            { id: 5, title: 'Built-up area expansion in Kulo Jungle Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
            { id: 6, title: 'Built-up area expansion in Takua Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
            { id: 7, title: 'Reduction in Agricultural Land in Mandabereni', desc: 'Agricultural land in Anugul has seen a notable decline since 2011, coinciding with the launch of multiple large-scale industrial and mining projects. This transformation has contributed to population redistribution, as many agricultural communities experienced displacement, relocation, and shifts in their traditional livelihoods. As an example, satellite imageries from 2012 and 2024 for the Mandabereni region illustrate these changes, showcasing the visible reduction in agricultural areas over time.' },
            { id: 8, title: 'Built-up area expansion in ghantapada Village', desc: 'As part of industrialization in the coalfield regions, many families have been displaced and relocated due to land acquisition for mining operations. According to source reports, the Mahanadi Coal Fields Limited (MCL) projects in the Talcher coalfield have affected more than 400 families across several opencast projects. These families were resettled in designated areas such as Kuio Jungle, Handidhua, and Ghantapada in Talcher, while some chose to relocate independently to nearby villages.' },
            { id: 9, title: 'Urban sprawl in the sub-district areas of Anugul', desc: 'Urban sprawl describes the expansion of cities and towns into surrounding rural areas. In Anugul, this has been a defining feature of its development over the past few decades. Instead of growing in a compact, organized way, the urban areas have spread out, often in a scattered and unplanned manner.' },
            { id: 10, title: 'Urban sprawl in the sub-district areas of Colliery', desc: 'Urban sprawl describes the expansion of cities and towns into surrounding rural areas. In Anugul, this has been a defining feature of its development over the past few decades. Instead of growing in a compact, organized way, the urban areas have spread out, often in a scattered and unplanned manner.' },
        ],
        How: [
            { id: 1, title: 'How 1', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
            { id: 2, title: 'How 2', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
            { id: 3, title: 'How 3', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
        ],
        Why: [
            { id: 1, title: 'Why 1', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
            { id: 2, title: 'Why 2', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
            { id: 3, title: 'Why 3', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Maximize className="w-6 h-6" />
                        Change Analysis Summary
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Urban Sprawl and Infrastructure impact across selected districts.</p>
                </div>

                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 shadow-inner overflow-x-auto custom-scrollbar">
                    {['What', 'How', 'Why'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab as any);
                                setSelectedChangeInfo(null);
                                setAnalysisFeatures([]);
                            }}
                            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-[#F58220] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <section className="bg-gray-50 border rounded-2xl p-6 md:p-8">
                <div className="mb-8">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300" key={activeTab}>
                        {activeTab === 'What' && (
                            <>
                                <h4 className="font-bold font-black mb-3 uppercase text-xs tracking-wider">What Changed?</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    Rapid urbanization in the northern corridors has led to a <span className="font-semibold text-gray-900">15% increase</span> in built-up areas, replacing traditional agricultural zones.
                                </p>
                            </>
                        )}
                        {activeTab === 'How' && (
                            <>
                                <h4 className="font-bold font-black mb-3 uppercase text-xs tracking-wider">How it happened?</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    Infrastructure expansion, specifically the new ring road project, catalyzed residential development. Satellite data shows clear linear growth patterns.
                                </p>
                            </>
                        )}
                        {activeTab === 'Why' && (
                            <>
                                <h4 className="font-bold font-black mb-3 uppercase text-xs tracking-wider">Why it matters?</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    This shift places pressure on existing water infrastructure and demands immediate upgrades to the electrical grid to support 2030 targets.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 pt-6 border-t border-blue-200/50 h-[500px]">
                    {/* Map Area (3/4) */}
                    <div className="w-full lg:w-3/4 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
                        {/* Next/Prev Navigation Buttons */}
                        {selectedChangeInfo && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        let nextFeature;
                                        if (analysisFeatures.length > 0) {
                                            const currentIndex = analysisFeatures.findIndex(f => f.id === selectedChangeInfo.id);
                                            if (currentIndex === -1) return;
                                            const prevIndex = (currentIndex - 1 + analysisFeatures.length) % analysisFeatures.length;
                                            nextFeature = analysisFeatures[prevIndex];
                                        } else {
                                            const features = TAB_CONTENT[activeTab];
                                            const currentIndex = features.findIndex(f => Number(f.id) === selectedChangeInfo.id);
                                            if (currentIndex === -1) return;
                                            const prevIndex = (currentIndex - 1 + features.length) % features.length;
                                            nextFeature = features[prevIndex];
                                        }
                                        setSelectedChangeInfo(nextFeature);
                                    }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full z-[100] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95 group/btn"
                                >
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-800 border-b-[6px] border-b-transparent group-hover/btn:border-r-[#F58220] transition-colors translate-x-[-1px]"></div>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        let nextFeature;
                                        if (analysisFeatures.length > 0) {
                                            const currentIndex = analysisFeatures.findIndex(f => f.id === selectedChangeInfo.id);
                                            if (currentIndex === -1) return;
                                            const nextIndex = (currentIndex + 1) % analysisFeatures.length;
                                            nextFeature = analysisFeatures[nextIndex];
                                        } else {
                                            const features = TAB_CONTENT[activeTab];
                                            const currentIndex = features.findIndex(f => Number(f.id) === selectedChangeInfo.id);
                                            if (currentIndex === -1) return;
                                            const nextIndex = (currentIndex + 1) % features.length;
                                            nextFeature = features[nextIndex];
                                        }
                                        setSelectedChangeInfo(nextFeature);
                                    }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full z-[100] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95 group/btn"
                                >
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-gray-800 border-b-[6px] border-b-transparent group-hover/btn:border-l-[#F58220] transition-colors translate-x-[2px]"></div>
                                </button>
                            </>
                        )}


                        {activeTab === 'What' && (
                            <SatelliteMapWhat
                                activeLayer="buildup"
                                selectedYear="2025"
                                onBoundsChange={setMapBounds}
                                selectedFeatureId={selectedChangeInfo?.id || null}
                                tabContent={TAB_CONTENT.What}
                                onChangeFeatureClick={(data) => {
                                    setSelectedChangeInfo(data);
                                }}
                                onAnalysisFeaturesLoad={(features) => {
                                    setAnalysisFeatures(prev => {
                                        const featureMap = new Map();
                                        prev.forEach(p => featureMap.set(p.id, p));
                                        let changed = false;
                                        features.forEach(f => {
                                            if (!featureMap.has(f.id)) {
                                                featureMap.set(f.id, f);
                                                changed = true;
                                            }
                                        });
                                        if (changed) {
                                            return Array.from(featureMap.values()).sort((a: any, b: any) => Number(a.id) - Number(b.id));
                                        }
                                        return prev;
                                    });
                                }}
                            />
                        )}
                        {activeTab === 'How' && (
                            <SatelliteMapHow
                                activeLayer="buildup"
                                selectedYear="2025"
                                onBoundsChange={setMapBounds}
                                selectedFeatureId={selectedChangeInfo?.id || null}
                                onChangeFeatureClick={(data) => {
                                    if (data) setSelectedChangeInfo(data);
                                }}
                                onAnalysisFeaturesLoad={(features) => {
                                    setAnalysisFeatures(prev => {
                                        const featureMap = new Map();
                                        prev.forEach(p => featureMap.set(p.id, p));
                                        let changed = false;
                                        features.forEach(f => {
                                            if (!featureMap.has(f.id)) {
                                                featureMap.set(f.id, f);
                                                changed = true;
                                            }
                                        });
                                        if (changed) {
                                            return Array.from(featureMap.values()).sort((a: any, b: any) => Number(a.id) - Number(b.id));
                                        }
                                        return prev;
                                    });
                                }}
                            />
                        )}
                        {activeTab === 'Why' && (
                            <SatelliteMapWhy
                                activeLayer="buildup"
                                selectedYear="2025"
                                onBoundsChange={setMapBounds}
                                selectedFeatureId={selectedChangeInfo?.id || null}
                                onChangeFeatureClick={(data) => {
                                    if (data) setSelectedChangeInfo(data);
                                }}
                                onAnalysisFeaturesLoad={(features) => {
                                    setAnalysisFeatures(prev => {
                                        const featureMap = new Map();
                                        prev.forEach(p => featureMap.set(p.id, p));
                                        let changed = false;
                                        features.forEach(f => {
                                            if (!featureMap.has(f.id)) {
                                                featureMap.set(f.id, f);
                                                changed = true;
                                            }
                                        });
                                        if (changed) {
                                            return Array.from(featureMap.values()).sort((a: any, b: any) => Number(a.id) - Number(b.id));
                                        }
                                        return prev;
                                    });
                                }}
                            />
                        )}
                    </div>

                    {/* Info Cards (1/4) */}
                    <div className="w-full lg:w-1/4 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar p-1">
                        {TAB_CONTENT[activeTab].map((card, index) => {
                            const colors: Record<number, string> = {
                                1: "#ff0000",
                                2: "#0000ff",
                                3: "#00ff00",
                                4: "#A3D977",
                                5: "#F28E2B",
                                6: "#6F4E7C",
                                7: "#17A398",
                                8: "#E94F37",
                                9: "#4C78A8",
                                10: "#B279A2"
                            };
                            const bdColor = colors[Number(card.id)] || '#F58220';

                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedChangeInfo(card)}
                                    className={`bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all animate-in fade-in slide-in-from-right-4 duration-500 cursor-pointer hover:shadow-md hover:bg-gray-50 ${selectedChangeInfo?.id === card.id ? 'ring-2 ring-[#F58220] !bg-orange-50' : ''}`}
                                    style={{ border: `1px solid ${bdColor}`, animationDelay: `${index * 100}ms` }}
                                >
                                    <h4 className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-2">
                                        {card.title || `Analysis Element ${card.id}`}
                                    </h4>
                                    <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-3">
                                        {card.desc
                                            ? card.desc
                                            : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s."}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};
