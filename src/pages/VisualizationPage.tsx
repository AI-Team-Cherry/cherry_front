import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
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
import { fetchChart } from "@/api/visualization";

export default function VisualizationPage() {
  const [type, setType] = useState<"line" | "bar" | "pie">("line");
  const [metric, setMetric] = useState("sales");
  const [data, setData] = useState<any[]>([]);

  const run = async () => {
    const res = await fetchChart({ type, metric });
    setData(res?.data || res || []);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            시각화
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <MenuItem value="line">Line</MenuItem>
              <MenuItem value="bar">Bar</MenuItem>
              <MenuItem value="pie">Pie</MenuItem>
            </Select>
            <TextField
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              label="Metric"
            />
            <Button variant="contained" onClick={run}>
              불러오기
            </Button>
          </Box>

          <Box sx={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              {type === "line" ? (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" />
                </LineChart>
              ) : type === "bar" ? (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                  >
                    {data.map((_: any, i: number) => (
                      <Cell key={i} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
