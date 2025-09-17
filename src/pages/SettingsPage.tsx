import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuthStore } from "@/store/auth";
import { useTheme } from "@/theme/ThemeProviderWrapper";
import { updateProfile } from "@/api/auth";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  const { colorMode, toggleColorMode } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [role, setRole] = useState(user?.role || "user");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const updated = await updateProfile({
        name,
        department,
        role,
      });
      setAuth(token, updated);
      alert("프로필이 저장되었습니다.");
    } catch (e: any) {
      alert(e?.response?.data?.detail || "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        설정
      </Typography>

      {/* 프로필 설정 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            프로필 설정
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="부서"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
            <Button variant="contained" onClick={save} disabled={saving}>
              {saving ? "저장 중…" : "저장"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 테마 설정 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            테마 설정
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            현재 모드: {colorMode}
          </Typography>
          <Button variant="outlined" onClick={toggleColorMode}>
            테마 전환
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
