import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, me } from "@/api/auth";
import { useAuthStore } from "@/store/auth";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();
  const loc = useLocation() as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ employeeId, password });
      const token = data?.access_token || data?.token || data?.jwt;
      if (!token) throw new Error("토큰이 응답에 없습니다.");

      // 먼저 토큰 저장
      setAuth(token, {} as any);

      // /auth/me로 프로필 조회
      const profile = await me();
      setAuth(token, profile);

      nav(loc.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err: any) {
      alert(err?.response?.data?.detail || err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <form
        onSubmit={onSubmit}
        className="card"
        style={{ width: 360, padding: 24 }}
      >
        <h1 style={{ marginBottom: 12 }}>로그인</h1>
        <label>사번 / 아이디</label>
        <input
          className="input"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="employeeId"
          required
        />
        <div style={{ height: 8 }} />
        <label>비밀번호</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <div style={{ height: 16 }} />
        <button className="btn" disabled={loading} style={{ width: "100%" }}>
          {loading ? "로그인 중…" : "로그인"}
        </button>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          아직 계정이 없나요? <Link to="/register">회원가입</Link>
        </div>
      </form>
    </div>
  );
}
