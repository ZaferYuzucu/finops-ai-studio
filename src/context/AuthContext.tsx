
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserProfile {
  uid: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signInWithGoogle: () => Promise<any>;
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Yeni kullanıcı için Firestore'da bir belge oluştur
    await setDoc(doc(db, 'kullanicilar', user.uid), {
      email: user.email,
      role: 'user' // Varsayılan rol
    });
    return userCredential;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        const userDocRef = doc(db, 'kullanicilar', user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userRole = userDocSnap.data()?.role || 'user';
            setCurrentUser({ uid: user.uid, email: user.email, role: userRole });
          } else {
            // Firestore'da belge yoksa, varsayılan rol ile oluştur
            await setDoc(userDocRef, { email: user.email, role: 'user' });
            setCurrentUser({ uid: user.uid, email: user.email, role: 'user' });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setCurrentUser({ uid: user.uid, email: user.email, role: 'user' });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
