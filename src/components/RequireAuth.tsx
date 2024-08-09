import {
    useLocation,
    Navigate,
} from 'react-router-dom';
import { useSessionStore } from '../store/session';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const user = useSessionStore(state => state.user);
    const location = useLocation();

    if (!user) return <Navigate to='/login' state={{ from: location }} replace />;

    return children;
}