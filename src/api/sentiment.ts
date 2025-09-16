import api from "./client";

export async function analyzeText(text: string) {
  const { data } = await api.post("/sentiment/analyze-text", { text });
  return data;
}
