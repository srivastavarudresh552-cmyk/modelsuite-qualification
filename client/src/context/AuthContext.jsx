//RDS
import { createContext, useContext, useState } from 'react';
import { clearStoredUser, readStoredUser, saveStoredUser } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // — if token is expired, user stays "logged in" until a request fails
  const [user, setUser] = useState(() => readStoredUser());

  const login = (userData) => {
    saveStoredUser(userData);
    setUser(userData);
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
