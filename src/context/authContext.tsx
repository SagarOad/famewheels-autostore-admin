import axios from "axios";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  } | null;
  token: string | null;
}

const AuthContext = createContext<
  | {
      authState: AuthState;
      login: (token: string) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
  });
  const router = useRouter();

  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const login = async (token: string) => {
    try {
      const data = await axios.get(`${BASE_URL}/getUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthState({
        user: data?.data,
        token: token,
      });

      localStorage.setItem("userData", JSON.stringify(data?.data));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthState({
          user: response?.data,
          token: token,
        });

        localStorage.setItem("userData", JSON.stringify(response?.data));
      } catch (error) {
        console.error("Error fetching user information:", error);
        setAuthState({
          user: null,
          token: null,
        });
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    };

    // Check if there is a stored token in the authentication state
    if (token) {
      // Fetch user information on component mount
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
