import { IUser } from "../models/user";
import { useSessionStore } from "../store/session";

export default function useAuth() {
    const [
        setUser,
        setValidatingSession
    ] = useSessionStore(state => [
        state.setUser,
        state.setValidatingSession
    ]);

    const signIn = (newUser: IUser, callback: VoidFunction) => {
        setUser(newUser);
        setValidatingSession(false)
        localStorage.setItem('user', JSON.stringify(newUser));
        callback();
    };

    const signOut = (callback: VoidFunction) => {
        setUser(null);
        setValidatingSession(true)
        localStorage.removeItem('user');
        callback();
    };

    return {
        signIn,
        signOut
    }
}