import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './library/appwrite'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authService.getCurrentUser();
                setUser(res);
            } catch (e) {
              console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login({ email, password });
            const res = await authService.getCurrentUser();
            setUser(res);
        } catch (error) {
            throw new Error(error.message);
        }
    };
    
    const signUp = async (email, password, name) => {
      try {
          const res = await authService.createAccount({ email, password, name });
          setUser(res);
      } catch (error) {
          throw new Error(error.message);
      }
  };
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            if (error.code === 401) {
                console.log("Unauthorized error, redirecting to login...");
                navigate('/login');
            } else {
                throw new Error(error.message);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
