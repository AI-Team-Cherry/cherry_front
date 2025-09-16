import { useEffect, useState } from "react";
import { getIntegrationStatus, triggerSync } from "@/api/integration";

export default function Integration() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await getIntegrationStatus();
    setStatus(res);
  };
  useEffect(() => {
    load();
  }, []);

  const sync = async () => {
    setLoading(true);
    try {
      await triggerSync();
      alert("동기화 요청 완료");
      load();
    } catch (e: any) {
      alert(e?.response?.data?.detail || "동기화 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>외부 시스템 연동</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" onClick={sync} disabled={loading}>
          {loading ? "동기화 중…" : "수동 동기화"}
        </button>
        <button className="btn" onClick={load}>
          상태 새로고침
        </button>
      </div>
      {status && (
        <pre
          style={{
            marginTop: 12,
            background: "#fff",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #eee",
          }}
        >
          {JSON.stringify(status, null, 2)}
        </pre>
      )}
    </div>
  );
}
