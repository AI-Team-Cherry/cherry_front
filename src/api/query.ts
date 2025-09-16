import api from "./client";

// 자연어 질의 실행
export async function submitQuery(userId: string, nl: string) {
  const { data } = await api.post("/query/", { userId, query: nl }); // ✅ /query/ 로 수정
  return data;
}

// 최근 결과 조회
export async function getResults(limit = 20) {
  const { data } = await api.get("/results", { params: { limit } });
  return data;
}
