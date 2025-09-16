import api from "./client";

export type LoginPayload = { employeeId: string; password: string };
export type RegisterPayload = {
  employeeId: string;
  password: string;
  name: string;
  department?: string;
  role?: string;
};

export async function login(payload: LoginPayload) {
  try {
    // JSON 요청 (employeeId/password 그대로)
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (err) {
    // 백엔드가 OAuth2PasswordRequestForm 방식을 쓰는 경우 fallback
    const form = new URLSearchParams();
    form.set("username", payload.employeeId);
    form.set("password", payload.password);
    const { data } = await api.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  }
}

export async function register(payload: RegisterPayload) {
  // 회원가입은 JSON body 고정
  const { data } = await api.post("/auth/register", {
    employeeId: payload.employeeId,
    password: payload.password,
    name: payload.name,
    department: payload.department,
    role: payload.role ?? "user",
  });
  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data;
}
