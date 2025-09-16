import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthGate from "@/components/AuthGate";
import Dashboard from "@/pages/Dashboard";
import NLQuery from "@/pages/NLQuery";
import Sentiment from "@/pages/Sentiment";
import Gallery from "@/pages/Gallery";
import Analytics from "@/pages/Analytics";
import Visualization from "@/pages/Visualization";
import Reports from "@/pages/Reports";
import Ingest from "@/pages/Ingest";
import Integration from "@/pages/Integration";
import Debug from "@/pages/Debug";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <AuthGate>
              <Layout />
            </AuthGate>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/query" element={<NLQuery />} />
          <Route path="/sentiment" element={<Sentiment />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ingest" element={<Ingest />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/debug" element={<Debug />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
