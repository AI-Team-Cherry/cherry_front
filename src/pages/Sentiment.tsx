import { useState } from "react";
import { analyzeText } from "@/api/sentiment";

export default function Sentiment() {
  const [text, setText] = useState("배송 빠르고 품질도 좋아요");
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const r = await analyzeText(text);
      setOut(r);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "분석 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 20 }}>
      <h2>감성 분석</h2>
      <textarea
        className="textarea"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={run}>
          {loading ? "분석 중…" : "분석"}
        </button>
      </div>
      {out && (
        <pre
          style={{
            marginTop: 12,
            background: "#fff",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #eee",
          }}
        >
          {JSON.stringify(out, null, 2)}
        </pre>
      )}
    </div>
  );
}
