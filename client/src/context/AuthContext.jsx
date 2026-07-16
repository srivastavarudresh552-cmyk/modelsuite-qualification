// #3
import { createContext, useContext, useState } from 'react';
import API from '../api/axios';
import { clearStoredUser, readStoredUser, saveStoredUser } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // — if token is expired, user stays "logged in" until a request fails
  const [user, setUser] = useState(() => readStoredUser());

  const login = (userData) => {
    saveStoredUser(userData);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch {
      // Ignore server-side logout errors and still clear the client session.
    } finally {
      clearStoredUser();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
