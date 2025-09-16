// src/api/analytics.ts
import api from "./client";

export async function getKpis() {
  const { data } = await api.get("/analytics/kpis");
  return data;
}

export async function getSalesByDept(params: { from?: string; to?: string }) {
  const { data } = await api.get("/analytics/sales-by-dept", { params });
  return data;
}

export async function getTimeseries(params: {
  metric: string;
  from?: string;
  to?: string;
}) {
  const { data } = await api.get("/analytics/timeseries", { params });
  return data;
}
