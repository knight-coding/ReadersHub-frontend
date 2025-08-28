import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [role, setRole] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://localhost:4000/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.loggedIn) {
          setLoggedIn(true);
          setUser(res.data.user);
          setRole(res.data.role);
        } else {
          setLoggedIn(false);
          setUser({});
          setRole([]);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setUser({});
        setRole([]);
      });
  }, []);

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:4000/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      localStorage.removeItem('accessToken');
      setLoggedIn(false);
      setUser(null);
      setRole([]);
      if (res.ok) {
        // Navigate('/');
      } else {
        console.error('Error in logout call:', await res.text());
      }
    } catch (error) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, role, logout, setLoggedIn, setUser, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
