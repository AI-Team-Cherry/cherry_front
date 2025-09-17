import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { listReports, generateReport, downloadReport } from "@/api/reports";

export default function ReportsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [format, setFormat] = useState<"pdf" | "xlsx">("pdf");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listReports();
      setItems(res?.items || res || []);
    } finally {
      setLoading(false);
    }
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        보고서
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            보고서 생성
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              type="date"
              label="From"
              InputLabelProps={{ shrink: true }}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <TextField
              type="date"
              label="To"
              InputLabelProps={{ shrink: true }}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="xlsx">Excel</MenuItem>
            </Select>
            <Button variant="contained" onClick={gen}>
              생성
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            생성된 보고서 목록
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : items.length > 0 ? (
            <Grid container spacing={2}>
              {items.map((it: any) => (
                <Grid item xs={12} key={it.id}>
                  <Card variant="outlined">
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {it.title || `Report ${it.id}`}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {it.createdAt}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        onClick={() => dl(it.id, it.title || "report")}
                      >
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              생성된 보고서가 없습니다.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
