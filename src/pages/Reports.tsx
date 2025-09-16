import { useEffect, useState } from "react";
import { listReports, generateReport, downloadReport } from "@/api/reports";

export default function Reports() {
  const [items, setItems] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [format, setFormat] = useState<"pdf" | "xlsx">("pdf");

  const load = async () => {
    const res = await listReports();
    setItems(res?.items || res || []);
  };
  useEffect(() => {
    load();
  }, []);

  const gen = async () => {
    await generateReport({ from, to, format });
    alert("보고서 생성 요청이 접수되었습니다.");
    load();
  };
  const dl = async (id: string, filename = "report") => {
    const blob = await downloadReport(id);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>보고서</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <input
          className="input"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <select
          className="select"
          value={format}
          onChange={(e) => setFormat(e.target.value as any)}
        >
          <option value="pdf">PDF</option>
          <option value="xlsx">Excel</option>
        </select>
        <button className="btn" onClick={gen}>
          보고서 생성
        </button>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {items.map((it: any) => (
          <div
            key={it.id}
            className="card"
            style={{
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>
                {it.title || `Report ${it.id}`}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                {it.createdAt}
              </div>
            </div>
            <button
              className="btn"
              onClick={() => dl(it.id, it.title || "report")}
            >
              다운로드
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ color: "var(--color-muted)" }}>
            생성된 보고서가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
