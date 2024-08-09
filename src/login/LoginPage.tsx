import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const onSubmit = () => {
        signIn({ id: '1', name: 'John Doe' }, () => {
            navigate("/category", { replace: true });
        })
    }
    return (
        <div>
            <p>LOGIN PAGE</p>
            <button onClick={onSubmit}>Iniciar sesión</button>
        </div>
    )
}