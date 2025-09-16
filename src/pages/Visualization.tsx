import { useState } from "react";
import { fetchChart } from "@/api/visualization";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Visualization() {
  const [type, setType] = useState<"line" | "bar" | "pie">("line");
  const [metric, setMetric] = useState("sales");
  const [data, setData] = useState<any[]>([]);

  const run = async () => {
    const res = await fetchChart({ type, metric });
    // 기대 포맷 예: line/bar: [{ label, value }...]  / pie: [{ name, value }...]
    setData(res?.data || res || []);
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2>시각화</h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="pie">Pie</option>
        </select>
        <input
          className="input"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          placeholder="metric (e.g., sales)"
        />
        <button className="btn" onClick={run}>
          불러오기
        </button>
      </div>

      <div style={{ height: 360, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          )}
          {type === "bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          )}
          {type === "pie" && (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={120}>
                {data.map((_: any, i: number) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
