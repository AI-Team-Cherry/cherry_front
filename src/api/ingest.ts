import api from "./client";

export async function uploadFile(file: File, kind: string = "generic") {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("kind", kind);
  const { data } = await api.post("/ingest", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // { message, jobId? }
}
