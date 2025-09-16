import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { me } from "@/api/auth";

export default function AuthGate({ children }: PropsWithChildren) {
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const loc = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await me();
        setAuth(token, profile); // store.user 채움
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
        검증 중...
      </div>
    );
  }

  return <>{children}</>;
}
