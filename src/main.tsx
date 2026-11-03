import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { AdvancedFilterPage } from './features/advancedFilter/AdvancedFilterPage';
import { BotReportPage } from './pages/BotReportPage';
import { SummaryPage } from './pages/SummaryPage';

// The "map" of the app: each URL shows one page
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bot-report" element={<BotReportPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/advanced-filter" element={<AdvancedFilterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
