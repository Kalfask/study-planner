import { Outlet, NavLink, useNavigate } from "react-router-dom";

function Layout()
{
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    }

    const links = [
        {to: '/dashboard', label: 'Dashboard' },
        {to: '/courses', label: 'Courses' },
        {to: '/tasks', label: 'Tasks'},
        {to: '/timer', label: 'Timer'},
        {to: '/schedule', label: 'Schedule'},
        {to: '/stats', label: 'Statistics'},
    ];

       return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <nav style={{
                width: 220,
                background: '#1a1a2e',
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '0 20px 20px',
                    borderBottom: '1px solid #2a2a3e',
                    marginBottom: 10
                }}>
                    <h2 style={{ color: '#7c6aff', margin: 0, fontSize: 20 }}>
                        StudyPlanner
                    </h2>
                </div>

                <div style={{ flex: 1, padding: '0 10px' }}>
                    {links.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            style={({ isActive }) => ({
                                display: 'block',
                                padding: '10px 14px',
                                borderRadius: 8,
                                color: isActive ? '#7c6aff' : '#8b8994',
                                background: isActive ? 'rgba(124,106,255,0.12)' : 'transparent',
                                textDecoration: 'none',
                                fontSize: 14,
                                marginBottom: 4
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div style={{
                    padding: '12px 20px',
                    borderTop: '1px solid #2a2a3e'
                }}>
                    <div style={{ color: '#e8e6e1', fontSize: 13, marginBottom: 8 }}>
                        {username}
                    </div>
                    <button onClick={handleLogout} style={{
                        background: 'none',
                        border: '1px solid #2a2a3e',
                        color: '#8b8994',
                        padding: '6px 12px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 12
                    }}>
                        Logout
                    </button>
                </div>
            </nav>

            <main style={{
                flex: 1,
                background: '#0f0f12',
                padding: 32,
                overflow: 'auto',
                color: '#e8e6e1'
            }}>
                <Outlet />
            </main>
        </div>
    );
    
}

export default Layout;