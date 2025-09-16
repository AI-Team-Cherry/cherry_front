import { useState } from "react";
import { uploadFile } from "@/api/ingest";

export default function Ingest() {
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState("generic");
  const [log, setLog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onUpload = async () => {
    if (!file) return alert("파일을 선택하세요.");
    setLoading(true);
    try {
      const res = await uploadFile(file, kind);
      setLog(res);
      alert("업로드 완료");
    } catch (e: any) {
      alert(e?.response?.data?.detail || "업로드 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>데이터 업로드 / ETL</h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          className="input"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          className="input"
          placeholder="kind (e.g., reviews, products)"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        />
        <button className="btn" onClick={onUpload} disabled={loading}>
          {loading ? "업로드 중…" : "업로드"}
        </button>
      </div>
      {log && (
        <pre
          style={{
            marginTop: 12,
            background: "#fff",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #eee",
          }}
        >
          {JSON.stringify(log, null, 2)}
        </pre>
      )}
    </div>
  );
}
