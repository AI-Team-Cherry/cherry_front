import api from "./client";

// generic: /visualization/chart?type=bar&metric=...
export async function fetchChart(params: Record<string, any>) {
  const { data } = await api.get("/visualization/chart", { params });
  return data; // { labels: [...], series: [{name, data:[...]}] } 등
}
