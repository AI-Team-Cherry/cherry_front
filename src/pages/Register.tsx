import { useState } from "react";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <form
        onSubmit={onSubmit}
        className="card"
        style={{ width: 420, padding: 24 }}
      >
        <h1 style={{ marginBottom: 12 }}>회원가입</h1>
        <label>사번</label>
        <input
          className="input"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <div style={{ height: 8 }} />
        <label>이름</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div style={{ height: 8 }} />
        <label>부서</label>
        <input
          className="input"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <div style={{ height: 8 }} />
        <label>역할</label>
        <select
          className="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <div style={{ height: 8 }} />
        <label>비밀번호</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={{ height: 16 }} />
        <button className="btn" style={{ width: "100%" }}>
          가입
        </button>
      </form>
    </div>
  );
}
