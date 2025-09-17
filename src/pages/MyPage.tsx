import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuthStore } from "@/store/auth";
import { getResults } from "@/api/query";

export default function MyPage() {
  const user = useAuthStore((s) => s.user);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getResults();
      setAnalyses(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        마이페이지
      </Typography>

      {/* 사용자 정보 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">내 정보</Typography>
          <Box sx={{ mt: 1 }}>
            <Typography>이름: {user?.name}</Typography>
            <Typography>사번: {user?.employeeId}</Typography>
            <Typography>부서: {user?.department}</Typography>
            <Typography>역할: {user?.role}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* 내가 만든 분석 목록 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            내가 만든 분석
          </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : analyses.length > 0 ? (
            <Grid container spacing={2}>
              {analyses.map((a: any) => (
                <Grid item xs={12} key={a.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {a.title || a.query}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {a.createdAt}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              생성한 분석이 없습니다.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
