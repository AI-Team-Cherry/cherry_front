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
import { debugModel } from "@/api/debug";

export default function DebugPage() {
  const [input, setInput] = useState("이 문장을 분석해줘");
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const r = await debugModel({ text: input });
      setOut(r);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "디버그 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            모델 디버그
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={run} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "실행"}
          </Button>

          {out && (
            <Box mt={2}>
              <Typography variant="subtitle1">결과</Typography>
              <pre
                style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}
              >
                {JSON.stringify(out, null, 2)}
              </pre>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
