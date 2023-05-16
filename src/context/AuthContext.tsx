import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import request from "@/utils/request";
import storage from "@/utils/storage";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = storage.get("AuthToken");
      const loggedInUser = storage.get("user");
      if (token && loggedInUser) {
        setUser({
          username: loggedInUser,
        });
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  const login = async (credentials: ICredentials) => {
    try {
      const response = await request({
        method: "POST",
        url: "/login",
        data: credentials,
      });

      const { session: token, user } = response;

      if (token) {
        storage.set("AuthToken", token);
        storage.set("user", user);
        setUser(user);
      }
    } catch (error: any) {
      console.error(error?.message || "Error: Authentication");
    }
  };

  const logout = () => {
    storage.remove("AuthToken");
    storage.remove("user");
    setUser({
      username: "",
    });
    window.location.pathname = "/sign-in";
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context as AuthContextType;
}

export { AuthProvider, useAuth };
