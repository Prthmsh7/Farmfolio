import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// API base URL - update this to your backend URL
const API_URL = 'http://localhost:5000/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (resetToken: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  role: string;
  profilePicture?: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  password: string;
}

// Create context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Configure axios
  axios.defaults.baseURL = API_URL;

  // Set JWT token for all requests
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [isAuthenticated]);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Set token in axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token by requesting user data
        const { data } = await axios.get('/auth/me');
        
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (err) {
        console.error('Authentication check failed:', err);
        setIsAuthenticated(false);
        setUser(null);
        
        // Clear any stored tokens
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        // Clear auth header
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Handle login
  const login = async (email: string, password: string, rememberMe = false): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await axios.post('/auth/login', { email, password });
      
      // Store JWT token
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', data.token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      // Redirect to dashboard or intended page
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const logout = (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // Clear auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setIsAuthenticated(false);
    setUser(null);
    
    navigate('/login');
  };

  // Handle registration
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await axios.post('/auth/register', userData);
      
      // Store JWT token in sessionStorage
      sessionStorage.setItem('token', data.token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const forgotPassword = async (email: string): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await axios.post('/auth/forgot-password', { email });
      
      // In a real app, this would return a message about email being sent
      // For demo purposes, we're returning the reset token
      return data.resetToken || ''; 
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 'Failed to process password reset request.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle reset password
  const resetPassword = async (resetToken: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await axios.post('/auth/reset-password', { 
        resetToken, 
        password 
      });
      
      // Store JWT token in sessionStorage
      sessionStorage.setItem('token', data.token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a ProtectedRoute component to guard routes
export const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page but save the attempted URL
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Show loading indicator or nothing while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthContext; 