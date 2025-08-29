import React, { Children, createContext, useState } from "react";

// Context
export const UserContext = createContext();

// Context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    console.log(userData);
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
