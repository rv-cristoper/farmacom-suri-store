import { IUser } from "../models/user";
import { useSessionStore } from "../store/session";

export default function useAuth() {
    const [user, setUser] = useSessionStore(state => [state.user, state.setUser]);

    const signIn = (newUser: IUser, callback: VoidFunction) => {
        setUser(newUser);
        callback();
    };

    const signOut = (callback: VoidFunction) => {
        setUser(null);
        callback();
    };

    return {
        user,
        signIn,
        signOut
    }
}