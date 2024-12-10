import { useState, useEffect, useContext, createContext } from "react";
import axios from "../config/axios";

const AuthContext = createContext();

     
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  // Add error handling for localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsedData = JSON.parse(data);
        setAuth({
          ...auth,
          user: parsedData.user,
          token: parsedData.token,
        });
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
