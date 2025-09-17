import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("user");
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ employeeId, password, name, department, role });
      alert("회원가입 완료. 로그인 해주세요.");
      nav("/login");
    } catch (err: any) {
      alert(err?.response?.data?.detail || "회원가입 실패");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            회원가입
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              label="사번"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
            <TextField
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" type="submit">
              가입
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
