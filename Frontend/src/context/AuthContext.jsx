// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const register = async (email, password) => {
//     const res = await axios.post('/api/auth/register', { email, password });
//     localStorage.setItem('token', res.data.token);
//     setUser({ token: res.data.token });
//   };

//   const login = async (email, password) => {
//     const res = await axios.post('/api/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     setUser({ token: res.data.token });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Restore token on app reload
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 🔹 OPTION A → if backend expects Authorization: Bearer <token>
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 🔹 OPTION B → if backend expects x-auth-token (uncomment if needed)
      // axios.defaults.headers.common['x-auth-token'] = token;

      setUser({ token });
    }
  }, []);

  const register = async (email, password) => {
    const res = await axios.post('/api/auth/register', { email, password });

    // ✅ store token
    localStorage.setItem('token', res.data.token);

    // 🔹 OPTION A → if backend expects Authorization: Bearer <token>
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

    // 🔹 OPTION B → if backend expects x-auth-token (uncomment if needed)
    // axios.defaults.headers.common['x-auth-token'] = res.data.token;

    setUser({ token: res.data.token });
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });

    // ✅ store token
    localStorage.setItem('token', res.data.token);   

    // 🔹 OPTION A → if backend expects Authorization: Bearer <token>
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

    // 🔹 OPTION B → if backend expects x-auth-token (uncomment if needed)
    // axios.defaults.headers.common['x-auth-token'] = res.data.token;

    setUser({ token: res.data.token });
  };

  const logout = () => {
    // ✅ remove token
    localStorage.removeItem('token');

    // ✅ clear headers
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['x-auth-token'];

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
