import { useState } from "react";
import { debugModel } from "@/api/debug";

export default function Debug() {
  const [text, setText] = useState("테스트 문장");
  const [model, setModel] = useState("intfloat/multilingual-e5-small");
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await debugModel({ text, model });
      setOut(res);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "디버그 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>모델 디버그</h2>
      <div
        style={{
          display: "grid",
          gap: 8,
          gridTemplateColumns: "2fr 1fr",
          alignItems: "center",
        }}
      >
        <textarea
          className="textarea"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <label>모델</label>
          <input
            className="input"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <div style={{ height: 8 }} />
          <button className="btn" onClick={run} disabled={loading}>
            {loading ? "실행 중…" : "실행"}
          </button>
        </div>
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
