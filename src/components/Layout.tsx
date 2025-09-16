import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export default function Layout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const linkStyle: React.CSSProperties = {
    padding: "6px 8px",
    borderRadius: 8,
  };

  return (
    <div
      style={{ display: "grid", gridTemplateRows: "64px 1fr", height: "100vh" }}
    >
      <header className="header">
        <Link to="/" className="brand">
          Cherry
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <nav className="nav" style={{ display: "flex", gap: 6 }}>
            <NavLink to="/dashboard" style={linkStyle}>
              대시보드
            </NavLink>
            <NavLink to="/query" style={linkStyle}>
              자연어질의
            </NavLink>
            <NavLink to="/sentiment" style={linkStyle}>
              감성분석
            </NavLink>
            <NavLink to="/analytics" style={linkStyle}>
              분석
            </NavLink>
            <NavLink to="/visualization" style={linkStyle}>
              시각화
            </NavLink>
            <NavLink to="/reports" style={linkStyle}>
              보고서
            </NavLink>
            <NavLink to="/ingest" style={linkStyle}>
              업로드
            </NavLink>
            <NavLink to="/integration" style={linkStyle}>
              연동
            </NavLink>
            <NavLink to="/debug" style={linkStyle}>
              디버그
            </NavLink>
          </nav>
          <div style={{ color: "var(--color-muted)" }}>
            {user?.name || user?.employeeId}
          </div>
          <button
            className="btn"
            style={{ background: "#ef4444" }}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
