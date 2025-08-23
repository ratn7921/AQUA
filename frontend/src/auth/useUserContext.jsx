// src/auth/useUserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/auth/me').then(res => {
      setUser(res.data);
      setLoading(false);
    }).catch(()=> setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);
