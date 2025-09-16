import { useState } from "react";
import { submitQuery, getResults } from "@/api/query";
import { useAuthStore } from "@/store/auth";

export default function NLQuery() {
  const [q, setQ] = useState("지난주 마케팅팀 상위 10개 매출 보여줘");
  const [resp, setResp] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((s) => s.user);

  const run = async () => {
    if (!user?._id && !user?.employeeId) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    try {
      const r = await submitQuery(user._id || user.employeeId, q);
      setResp(r);
      const list = await getResults(20).catch(() => []);
      setResults(list);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "질의 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 20 }}>
      <h2>자연어 질의 → Mongo</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn" onClick={run} disabled={loading}>
          {loading ? "실행 중…" : "실행"}
        </button>
      </div>

      {resp && (
        <div style={{ marginTop: 12 }}>
          <h3>응답</h3>
          <pre
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #eee",
              maxHeight: 320,
              overflow: "auto",
            }}
          >
            {JSON.stringify(resp, null, 2)}
          </pre>
        </div>
      )}

      {results?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3>최근 결과</h3>
          <pre
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #eee",
              maxHeight: 320,
              overflow: "auto",
            }}
          >
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
