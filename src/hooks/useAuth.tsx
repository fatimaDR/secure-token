
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services/authService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // Clear any invalid tokens
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token, refreshToken } = await authService.login(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { user: userData, token, refreshToken } = await authService.register(name, email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");
      if (!refreshTokenValue) {
        throw new Error("No refresh token found");
      }

      const { token, refreshToken: newRefreshToken } = await authService.refreshToken(refreshTokenValue);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);
      return;
    } catch (error) {
      console.error("Token refresh error:", error);
      // Handle expired refresh token
      logout();
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
