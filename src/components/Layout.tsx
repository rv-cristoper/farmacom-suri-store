import {
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import { useSessionStore } from "../store/session";
import { useEffect } from "react";
import useAuth from "../hooks/use-auth";

export default function Layout() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const [
        user,
        setUser,
        validatingSession,
        setValidatingSession
    ] = useSessionStore(state => [
        state.user,
        state.setUser,
        state.validatingSession,
        state.setValidatingSession
    ]);

    const onSubmit = () => {
        signOut(() => navigate("/login"))
    }

    const fetchingBase = () => {
        if (!user) {
            const newUser = localStorage.getItem('user')
            newUser && setUser(JSON.parse(newUser))
            return setValidatingSession(false)
        }
        console.log(user)
    }

    useEffect(() => {
        fetchingBase()
    }, [user])

    if (validatingSession) return <div>Validando sesión...</div>

    return (
        <div>
            <ul>
                <li>
                    <Link to="/category">Categorías</Link>
                </li>
                <li>
                    <Link to="/product">Productos</Link>
                </li>
            </ul>
            <button onClick={onSubmit}>Cerrar sesión</button>
            <Outlet />
        </div>
    )
}