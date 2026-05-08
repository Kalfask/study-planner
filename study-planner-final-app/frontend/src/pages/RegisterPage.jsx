import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";


function RegisterPage()
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try
        {
            const res = await api.post('/auth/register', { username, email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            navigate('/dashboard');
        }catch(err)
        {
            setError(err.response?.data?.error || 'Register failed');
        }
    } 
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
                    Create your account
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password (min 6 characters)"
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
                    Register
                </button>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#8b8994' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#7c6aff', textDecoration: 'none' }}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );

};


export default RegisterPage;