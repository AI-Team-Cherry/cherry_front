import { useEffect, useState } from "react";
import { getKpis, getSalesByDept, getTimeseries } from "@/api/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function Analytics() {
  const [kpis, setKpis] = useState<any>(null);
  const [dept, setDept] = useState<any[]>([]);
  const [ts, setTs] = useState<any[]>([]);
  const [range, setRange] = useState<{ from?: string; to?: string }>({});

  useEffect(() => {
    (async () => {
      try {
        const k = await getKpis();
        setKpis(k);
      } catch {}
    })();
  }, []);

  const loadDept = async () => {
    const data = await getSalesByDept(range);
    // 기대 포맷: [{ department: '마케팅', sales: 123 }, ...]
    setDept(data || []);
  };
  const loadTs = async () => {
    const data = await getTimeseries({ metric: "sales", ...range });
    // 기대 포맷: [{ date: '2025-09-01', value: 100 }, ...]
    setTs(data || []);
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ padding: 16 }}>
        <h2>분석 KPI</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          <Kpi title="총 매출" value={kpis?.totalSales} />
          <Kpi title="주문수" value={kpis?.orders} />
          <Kpi title="고객수" value={kpis?.customers} />
          <Kpi title="전일 대비" value={kpis?.dod} />
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <h3>기간 선택</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="input"
            type="date"
            onChange={(e) => setRange((v) => ({ ...v, from: e.target.value }))}
          />
          <input
            className="input"
            type="date"
            onChange={(e) => setRange((v) => ({ ...v, to: e.target.value }))}
          />
          <button className="btn" onClick={loadDept}>
            부서 매출
          </button>
          <button className="btn" onClick={loadTs}>
            매출 추이
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <h3>부서별 매출</h3>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dept}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <h3>매출 추이</h3>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: any }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value ?? "-"}</div>
    </div>
  );
}
