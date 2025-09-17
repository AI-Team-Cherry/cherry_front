import api from "./client";

export interface GalleryImage {
  id: string;
  name: string;
  url: string;
  createdAt?: string;
}

export async function listImages(): Promise<GalleryImage[]> {
  const { data } = await api.get("/gallery");
  return data;
}

export async function uploadImage(file: File): Promise<GalleryImage> {
  const form = new FormData();
  form.append("file", file);

  const { data } = await api.post("/gallery/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
