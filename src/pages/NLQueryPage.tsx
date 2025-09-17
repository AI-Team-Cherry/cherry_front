import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { submitQuery, getResults } from "@/api/query";
import { useAuthStore } from "@/store/auth";

export default function NLQueryPage() {
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            자연어 질의 → Mongo
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              value={q}
              onChange={(e) => setQ(e.target.value)}
              label="질의 입력"
            />
            <Button variant="contained" onClick={run} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "실행"}
            </Button>
          </Box>

          {resp && (
            <Box mt={2}>
              <Typography variant="subtitle1">응답</Typography>
              <pre
                style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}
              >
                {JSON.stringify(resp, null, 2)}
              </pre>
            </Box>
          )}

          {results?.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1">최근 결과</Typography>
              <pre
                style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}
              >
                {JSON.stringify(results, null, 2)}
              </pre>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
