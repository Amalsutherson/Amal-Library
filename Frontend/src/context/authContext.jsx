import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  setAccessToken,
  clearAccessToken,
} from "../services/authService";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  async function restoreSession() {

    try {

      await refreshAccessToken();

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

    } catch (error) {

      console.log(
        "No active session."
      );

      clearAccessToken();

      setUser(null);

    } finally {

      setLoading(false);
    }
  }


  useEffect(() => {

    restoreSession();

  }, []);


  async function login(credentials) {

    const result =
      await loginUser(credentials);

    setUser(result.user);

    return result;
  }


  async function register(data) {

    const result =
      await registerUser(data);

    setUser(result.user);

    return result;
  }


  async function logout() {

    await logoutUser();

    clearAccessToken();

    setUser(null);
  }


  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),

    login,
    register,
    logout,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  return useContext(AuthContext);
}