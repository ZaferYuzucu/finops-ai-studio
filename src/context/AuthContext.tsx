
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { autoSubscribeNewsletter } from '../utils/newsletter';

interface UserProfile {
  uid: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// localStorage keys
const USER_STORAGE_KEY = 'finops_current_user';
const USERS_STORAGE_KEY = 'finops_users';

// Helper functions
function getStoredUser(): UserProfile | null {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as UserProfile;
    // Admin session is handled separately via isAdminAuthenticated flags.
    // Do not treat admin profile as a signed-in "user" for the app navbar/user flow.
    if (parsed?.role === 'admin') {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function setStoredUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

function getAllUsers(): Record<string, { email: string; password: string; role: string }> {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveUser(email: string, password: string, role: string = 'user') {
  const users = getAllUsers();
  const uid = `user_${Date.now()}`;
  users[email] = { email, password, role };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return { uid, email, role };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    const users = getAllUsers();
    if (users[email]) {
      throw new Error('User already exists');
    }
    const user = saveUser(email, password, 'user');
    setStoredUser(user);
    setCurrentUser(user);
    // Auto newsletter subscription (best-effort)
    void autoSubscribeNewsletter(email, 'signup');
  };

  const login = async (email: string, password: string) => {
    const users = getAllUsers();
    const user = users[email];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const userProfile = {
      uid: `user_${email}`,
      email: user.email,
      role: user.role
    };
    
    setStoredUser(userProfile);
    setCurrentUser(userProfile);
    // Auto newsletter subscription (best-effort)
    void autoSubscribeNewsletter(email, 'login');
  };

  const logout = async () => {
    setStoredUser(null);
    setCurrentUser(null);
  };

  const signInWithGoogle = async () => {
    throw new Error('Google sign-in not available in localStorage mode');
  };

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = getStoredUser();
    setCurrentUser(storedUser);
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
