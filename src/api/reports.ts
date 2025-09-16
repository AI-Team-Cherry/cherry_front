import api from "./client";

// 보고서 목록
export async function listReports() {
  const { data } = await api.get("/report_generator/list");
  return data;
}

// 보고서 생성 (예: 기간/포맷 선택)
export async function generateReport(payload: {
  from: string;
  to: string;
  format?: "pdf" | "xlsx";
}) {
  const { data } = await api.post("/report_generator/generate", payload);
  return data; // { reportId, message }
}

// 보고서 다운로드
export async function downloadReport(reportId: string) {
  const res = await api.get(`/report_generator/download/${reportId}`, {
    responseType: "blob",
  });
  return res.data; // Blob
}
