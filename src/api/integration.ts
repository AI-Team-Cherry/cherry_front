import api from "./client";

// 상태 조회
export async function getIntegrationStatus() {
  const { data } = await api.get("/integrated_system/status");
  return data;
}

// 수동 동기화 트리거
export async function triggerSync(payload?: Record<string, any>) {
  const { data } = await api.post("/integrated_system/sync", payload || {});
  return data;
}
