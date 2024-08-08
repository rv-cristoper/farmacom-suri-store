import { create } from 'zustand'
import { IUser } from '../models/user'

interface SessionState {
    user: IUser | null,
    setUser: (user: IUser | null) => void
}

export const useSessionStore = create<SessionState>(set => ({
    user: null,
    setUser: (user) => set({ user }),
}))