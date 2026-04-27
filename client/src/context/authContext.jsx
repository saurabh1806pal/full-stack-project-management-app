import { useState } from "react";
import API from "../api/axios";
import { AuthContext } from "./authCreateContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        try {
            setLoading(true);
            const res = await API.post('/auth/login', data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        try {
            setLoading(true);
            const res = await API.post('/auth/register', data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};