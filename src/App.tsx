/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Demographics');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Odisha');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [allDistrictsData, setAllDistrictsData] = useState<any[]>([]);

  return (
    <>
      <MapSection
        currentView={currentView}
        onViewChange={setCurrentView}
        onDistrictChange={setSelectedDistrict}
        onDataChange={setSelectedData}
        onDataLoad={setAllDistrictsData}
        targetDistrict={selectedDistrict}
      />
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
