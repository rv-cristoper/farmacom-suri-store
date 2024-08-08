import {
    useLocation,
    Navigate,
} from 'react-router-dom';
import useAuth from '../hooks/use-auth';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const { user } = useAuth()
    const location = useLocation();

    if (!user) return <Navigate to='/login' state={{ from: location }} replace />;

    return children;
}