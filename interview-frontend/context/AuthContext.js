import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('user', JSON.stringify({ username, token }));
            setUser({ username, token });
            router.push('/dashboard');
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message || error.message);
        }
    };

    const register = async (username, password) => {
        try {
            await axios.post('/api/auth/register', { username, password });
            alert('Registration successful! You can now login.');
            router.push('/login');
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
