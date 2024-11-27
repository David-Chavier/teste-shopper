import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TravelRequestPage from '../pages/TravelRequestPage';
import TravelOptionsPage from '../pages/travelOptions/TravelOptionsPage';
import TravelHistoryPage from '../pages/TravelHistoryPage';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TravelRequestPage />} />
      <Route path="/options" element={<TravelOptionsPage />} />
      <Route path="/history" element={<TravelHistoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
