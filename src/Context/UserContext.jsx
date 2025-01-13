import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  function logOut() {
    setToken(localStorage.removeItem("userToken"));
  }

  return (
    <UserContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
