import { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function LoginPage()
{
    const [username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const res = await api.post('/auth/login', {username, password});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            navigate('/dashboard')
        }
        catch(err)
        {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            background: '#0f0f12',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#1a1a22',
                border: '1px solid #2a2a36',
                borderRadius: 16,
                padding: 36,
                width: 340
            }}>
                <h1 style={{ color: '#7c6aff', fontSize: 24, marginBottom: 4 }}>
                    StudyPlanner
                </h1>
                <p style={{ color: '#8b8994', fontSize: 13, marginBottom: 24 }}>
                    Sign in to continue
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(245,86,74,0.12)',
                        color: '#f5564a',
                        padding: '8px 12px',
                        borderRadius: 8,
                        fontSize: 13,
                        marginBottom: 16
                    }}>
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button type="submit" style={{
                    width: '100%',
                    padding: '10px 0',
                    background: '#7c6aff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    cursor: 'pointer',
                    marginTop: 8
                }}>
                    Login
                </button>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#8b8994' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#7c6aff', textDecoration: 'none' }}>
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );

    const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #2a2a36',
    background: '#0f0f12',
    color: '#e8e6e1',
    fontSize: 13,
    marginBottom: 12,
    boxSizing: 'border-box'

    };

}
export default LoginPage;