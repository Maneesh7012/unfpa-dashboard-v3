/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MapSection } from './components/Dashboard/Dashboard';
import { StatsDetails } from './components/StatsDetails/StateDetails';
import AboutPage from './pages/About/About';
import MethodologyPage from './pages/Methodology/Methodology';
import AnalyticsPage from './pages/Analytics/Analytics';
import DataCatalogPage from './pages/DataCatalog/DataCatalog';
import type { ViewType } from '../types';
import { HeroSection } from './components/Hero/HeroSection';
import { StateDemographics } from './components/Hero/StateDemographics';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Demographics');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Odisha');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [allDistrictsData, setAllDistrictsData] = useState<any[]>([]);

  // Debugging Logs: Track state changes in structured objects
  useEffect(() => {
    console.log('--- Dashboard State Update ---');
    console.log({ currentView });
    console.log({ selectedDistrict });
    console.log({ selectedData });
    console.log({
      allDistrictsLength: allDistrictsData.length,
      allDistrictsData,
    });
    console.log('------------------------------');
  }, [currentView, selectedDistrict, selectedData, allDistrictsData]);

  return (
    <>
      <div className="px-4 md:px-6 lg:px-8 mt-6">
        <HeroSection currentView={currentView} />
      </div>
      <MapSection
        currentView={currentView}
        onViewChange={setCurrentView}
        onDistrictChange={setSelectedDistrict}
        onDataChange={setSelectedData}
        onDataLoad={setAllDistrictsData}
        targetDistrict={selectedDistrict}
      />

      <div className="px-4 md:px-6 lg:px-8 mt-6">
        <StateDemographics
          selectedDistrict={selectedDistrict}
          selectedData={selectedData}
          allDistrictsData={allDistrictsData}
        />
      </div>

      <StatsDetails
        selectedDistrict={selectedDistrict}
        onDistrictSelect={setSelectedDistrict}
        data={selectedData}
        allDistrictsData={allDistrictsData}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/v3/">
      <div className="flex flex-col min-h-screen bg-background">
        <Header />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/catalog" element={<DataCatalogPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
