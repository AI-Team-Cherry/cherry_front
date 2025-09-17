import { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Grid } from "@mui/material";
import { listImages, uploadImage } from "@/api/gallery";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);

  const load = async () => {
    const res = await listImages();
    setImages(res || []);
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    await uploadImage(e.target.files[0]);
    load();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">이미지 갤러리</Typography>
        <Button variant="contained" component="label">
          업로드
          <input hidden type="file" onChange={onUpload} />
        </Button>
      </Box>
      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img.id}>
            <Card>
              <CardContent>
                <img
                  src={img.url}
                  alt={img.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography variant="caption">{img.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {images.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          업로드된 이미지가 없습니다.
        </Typography>
      )}
    </Container>
  );
}
