import {
    useNavigate,
} from 'react-router-dom';
import useAuth from '../hooks/use-auth';

export default function LoginPage() {
    let navigate = useNavigate();
    const { signIn } = useAuth();
    const onSubmit = () => {
        signIn({ id: '1', name: 'John Doe' }, () => {
            navigate("/category", { replace: true });
        })
    }
    return (
        <div>
            <p>LOGIN PAGE</p>
            <button onClick={onSubmit}>Sign In</button>
        </div>
    )
}