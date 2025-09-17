import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { getKpis } from "@/api/analytics";

export default function DashboardPage() {
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const k = await getKpis();
        setKpis(k);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        대시보드
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="총 매출" value={kpis?.totalSales} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="주문수" value={kpis?.orders} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="고객수" value={kpis?.customers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="전일 대비" value={kpis?.dod} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

function KpiCard({ title, value }: { title: string; value: any }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {value ?? "-"}
        </Typography>
      </CardContent>
    </Card>
  );
}
