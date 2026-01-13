
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { autoSubscribeNewsletter } from '../utils/newsletter';
import { migrateUserDashboards } from '../utils/userDashboards';

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
// IMPORTANT: This key is used across admin pages + helper HTML tools in /public.
// Keep it stable to avoid "same email, different uid" issues.
const USERS_MGMT_KEY = 'finops_users_management';
// Legacy/experimental key used in some versions (keep read+merge for safe migration)
const USERS_MGMT_KEY_V1 = 'finops_users_mgmt_v1';

// Helper functions
function normalizeEmail(email: string): string {
  return String(email || '').trim().toLowerCase();
}

function stableUidForEmail(email: string): string {
  // Deterministic uid: same email => same uid in every login.
  return `user_${normalizeEmail(email)}`;
}

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

function readMgmtUsers(key: string): any[] {
  try {
    const raw = localStorage.getItem(key) || '[]';
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeMgmtUsers(users: any[]) {
  try {
    localStorage.setItem(USERS_MGMT_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

/**
 * Ensure user exists in the user-management list and uses a deterministic id.
 * Returns the stable uid and any legacy ids we should migrate dashboards from.
 */
function ensureMgmtUser(email: string, role: string = 'user'): { uid: string; legacyIds: string[] } {
  const emailNorm = normalizeEmail(email);
  const uid = stableUidForEmail(emailNorm);

  // Merge legacy list (if present) into the main management list by email (best-effort)
  const primary = readMgmtUsers(USERS_MGMT_KEY);
  const legacy = readMgmtUsers(USERS_MGMT_KEY_V1);
  const merged = [...primary];

  if (legacy.length > 0) {
    legacy.forEach((u) => {
      const e = normalizeEmail(u?.email || '');
      if (!e) return;
      const exists = merged.some((x) => normalizeEmail(x?.email || '') === e);
      if (!exists) merged.push(u);
    });
    // After merging, keep a single source of truth.
    try {
      localStorage.removeItem(USERS_MGMT_KEY_V1);
    } catch {
      // ignore
    }
  }

  let mgmtUser = merged.find((u: any) => normalizeEmail(u?.email || '') === emailNorm);
  const legacyIds: string[] = [];
  if (mgmtUser) {
    const oldId = String(mgmtUser.id || mgmtUser.userId || '').trim();
    if (oldId && oldId !== uid) legacyIds.push(oldId);

    // Enforce deterministic id
    if (mgmtUser.id !== uid) {
      mgmtUser.legacyId = mgmtUser.id || mgmtUser.userId;
      mgmtUser.id = uid;
    }
    // Keep role in sync (admin list is informational; local auth controls actual role checks)
    if (role) mgmtUser.role = role;
    if (!mgmtUser.createdAt) mgmtUser.createdAt = new Date().toISOString();
    if (mgmtUser.isActive === undefined) mgmtUser.isActive = true;
  } else {
    mgmtUser = {
      id: uid,
      email: emailNorm,
      displayName: emailNorm.split('@')[0],
      createdAt: new Date().toISOString(),
      role,
      isActive: true,
    };
    merged.push(mgmtUser);
  }

  // Also migrate from older fallback patterns used in some code paths
  const legacyFallbacks = [`user_${email}`, `user_${emailNorm}`];
  legacyFallbacks.forEach((x) => {
    if (x && x !== uid && !legacyIds.includes(x)) legacyIds.push(x);
  });

  writeMgmtUsers(merged);
  return { uid, legacyIds };
}

function saveUser(email: string, password: string, role: string = 'user') {
  const users = getAllUsers();
  const emailNorm = normalizeEmail(email);
  
  const { uid, legacyIds } = ensureMgmtUser(emailNorm, role);
  users[emailNorm] = { email: emailNorm, password, role };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Dashboard UID migration: keep user's dashboards visible after uid standardization.
  legacyIds.forEach((oldId) => {
    try {
      migrateUserDashboards(oldId, uid);
    } catch {
      // ignore
    }
  });

  return { uid, email: emailNorm, role };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    const emailNorm = normalizeEmail(email);
    const users = getAllUsers();
    if (users[emailNorm] || users[email]) {
      throw new Error('User already exists');
    }
    const user = saveUser(emailNorm, password, 'user');
    setStoredUser(user);
    setCurrentUser(user);
    // Auto newsletter subscription (best-effort)
    void autoSubscribeNewsletter(emailNorm, 'signup');
  };

  const login = async (email: string, password: string) => {
    const emailNorm = normalizeEmail(email);
    const users = getAllUsers();
    // Backward compatibility: older data may have been stored under non-normalized keys
    const user = users[emailNorm] ?? users[email];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Deterministic uid (and migration from any legacy uid buckets)
    const { uid, legacyIds } = ensureMgmtUser(emailNorm, user.role || 'user');
    legacyIds.forEach((oldId) => {
      try {
        migrateUserDashboards(oldId, uid);
      } catch {
        // ignore
      }
    });
    
    const userProfile = {
      uid,
      email: user.email,
      role: user.role
    };
    
    setStoredUser(userProfile);
    setCurrentUser(userProfile);
    // Auto newsletter subscription (best-effort)
    void autoSubscribeNewsletter(emailNorm, 'login');
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
    if (storedUser?.email) {
      const stableUid = stableUidForEmail(storedUser.email);
      if (stableUid && storedUser.uid && storedUser.uid !== stableUid) {
        // Migrate dashboards from previously stored uid bucket, then normalize session uid.
        try {
          migrateUserDashboards(storedUser.uid, stableUid);
        } catch {
          // ignore
        }
        // Also make sure the management list uses deterministic id.
        try {
          ensureMgmtUser(storedUser.email, storedUser.role || 'user');
        } catch {
          // ignore
        }
        const normalized = { ...storedUser, uid: stableUid };
        setStoredUser(normalized);
        setCurrentUser(normalized);
        setLoading(false);
        return;
      }
    }
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
