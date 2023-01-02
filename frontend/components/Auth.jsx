import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const redirect = (url) => {
    const redirectUrl = url || '/login';
    router.push(redirectUrl);
  };
  const checkAuth = () => {
    user ?? redirect();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, redirect, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
