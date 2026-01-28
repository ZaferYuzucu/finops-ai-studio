import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserProfile {
  uid: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const ADMIN_EMAIL = 'zaferyuzucu@gmail.com';

function checkIsAdmin(user: UserProfile | null): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() || user.role === 'admin';
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

async function getUserRole(uid: string, email: string): Promise<string> {
  const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  if (isAdminEmail) return 'admin';
  
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role || 'user';
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
  }
  
  return 'user';
}

async function saveUserToFirestore(uid: string, email: string, role: string) {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const role = await getUserRole(userCredential.user.uid, email);
    await saveUserToFirestore(userCredential.user.uid, email, role);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    throw new Error('Google sign-in not implemented');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        const role = await getUserRole(firebaseUser.uid, email);
        await saveUserToFirestore(firebaseUser.uid, email, role);
        
        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = checkIsAdmin(currentUser);

  const value = {
    currentUser,
    loading,
    isAdmin,
    signup,
    login,
    logout,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
