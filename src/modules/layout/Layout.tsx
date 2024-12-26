import {
    Link,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useSessionStore } from "../../store/session";
import { useEffect } from "react";
import useAuth from "../../hooks/use-auth";
import Sidebar from "./Sidebar";
import UserPopover from "./UserPopover";
import { useRenderStore } from "../../store/render";
import { MenuIcon } from "../../lib/icons";

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useAuth();
    const toggleSidebarIsOpen = useRenderStore(state => state.toggleSidebarIsOpen);
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

    useEffect(() => {
        if (!user) {
            const newUser = localStorage.getItem('user')
            if (newUser) setUser(JSON.parse(newUser))
        }
        setValidatingSession(false)
    }, [user, setUser, setValidatingSession])

    if (validatingSession) return <div>Validando sesión...</div>

    if (!user) return <Navigate to='/login' state={{ from: location }} replace />;

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="bg-background-secondary grid grid-rows-[max-content_auto] w-full overflow-hidden transition-all duration-200">
                <header className="bg-background flex flex-col gap-1 px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={toggleSidebarIsOpen}
                            className="text-custom-black focus:outline-none"
                        >
                            <MenuIcon />
                        </button>
                        <UserPopover />
                    </div>
                </header>
                <main className="overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div >
        </div >
    )

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