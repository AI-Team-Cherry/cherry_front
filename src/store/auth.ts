import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  _id?: string;
  employeeId?: string;
  name?: string;
  role?: string;
  department?: string;
};

type State = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "cherry-auth" }
  )
);
