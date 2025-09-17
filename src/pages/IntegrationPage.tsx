import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { getIntegrationStatus, triggerSync } from "@/api/integration";

export default function IntegrationPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const data = await getIntegrationStatus();
      setStatus(data);
    } catch (e: any) {
      alert(e?.response?.data?.detail || "상태 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const runSync = async () => {
    setSyncing(true);
    try {
      await triggerSync();
      alert("동기화 요청이 완료되었습니다.");
      loadStatus();
    } catch (e: any) {
      alert(e?.response?.data?.detail || "동기화 실패");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            외부 시스템 연동
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              <Typography variant="body1">
                현재 상태: <strong>{status?.status || "알 수 없음"}</strong>
              </Typography>
              {status?.lastSync && (
                <Typography variant="caption" color="text.secondary">
                  마지막 동기화: {status.lastSync}
                </Typography>
              )}
              <Button variant="contained" onClick={runSync} disabled={syncing}>
                {syncing ? "동기화 중…" : "수동 동기화"}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
