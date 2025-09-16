import api from "./client";

// 모델/헥깅페이스 테스트
export async function debugModel(payload: {
  text?: string;
  model?: string;
  params?: any;
}) {
  const { data } = await api.post("/debug/model", payload);
  return data;
}
