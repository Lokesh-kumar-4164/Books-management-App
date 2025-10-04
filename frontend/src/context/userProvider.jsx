import { useState } from "react";
import  UserContext from "../context/userContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (_id, email, name) => setUser({ _id, name, email });
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider 