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
import { analyzeText } from "@/api/sentiment";

export default function SentimentPage() {
  const [text, setText] = useState("배송 빠르고 품질도 좋아요");
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const r = await analyzeText(text);
      setOut(r);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "분석 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            감성 분석
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={run} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "분석"}
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
