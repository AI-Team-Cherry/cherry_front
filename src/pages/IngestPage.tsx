import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { uploadFile } from "@/api/ingest";

export default function IngestPage() {
  const [file, setFile] = useState<File | null>(null);

  const run = async () => {
    if (!file) return;
    try {
      await uploadFile(file);
      alert("업로드 완료");
      setFile(null);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "업로드 실패");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            데이터 업로드
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button variant="contained" onClick={run} disabled={!file}>
              업로드
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
