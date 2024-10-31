import { create } from "zustand";
import { IUser } from "../models/user";

interface ISessionState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  validatingSession: boolean;
  setValidatingSession: (validatingSession: boolean) => void;
}

export const useSessionStore = create<ISessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  validatingSession: true,
  setValidatingSession: (validatingSession) => set({ validatingSession }),
}));
