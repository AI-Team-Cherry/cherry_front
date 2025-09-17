// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProviderWrapper } from "@/theme/ThemeProviderWrapper";
import AppLayout from "@/components/Layout";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/DashboardPage";
import MyPage from "@/pages/MyPage";
import SettingsPage from "@/pages/SettingsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";

// 추가된 새 페이지들
import ReportsPage from "@/pages/ReportsPage";
import SentimentPage from "@/pages/SentimentPage";
import VisualizationPage from "@/pages/VisualizationPage";
import NLQueryPage from "@/pages/NLQueryPage";
import DebugPage from "@/pages/DebugPage";
import IntegrationPage from "@/pages/IntegrationPage";
import IngestPage from "@/pages/IngestPage";
import GalleryPage from "@/pages/GalleryPage";
import RegisterPage from "@/pages/RegisterPage";

// zustand auth
import { useAuthStore } from "@/store/auth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAuthStore((s) => s.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* 새로 변환된 페이지들 */}
            <Route path="reports" element={<ReportsPage />} />
            <Route path="sentiment" element={<SentimentPage />} />
            <Route path="visualization" element={<VisualizationPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="query" element={<NLQueryPage />} />
            <Route path="debug" element={<DebugPage />} />
            <Route path="integration" element={<IntegrationPage />} />
            <Route path="ingest" element={<IngestPage />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
