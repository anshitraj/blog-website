
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with actual API call
    console.log('Login attempt:', { email, password });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - replace with actual API response
    const mockUser: User = {
      id: '1',
      name: email === 'admin@example.com' ? 'Admin User' : 'Regular User',
      email,
      role: email === 'admin@example.com' ? 'admin' : 'user'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string, role: string) => {
    // Mock registration - replace with actual API call
    console.log('Signup attempt:', { name, email, password, role });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - replace with actual API response
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: role as 'user' | 'admin'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
