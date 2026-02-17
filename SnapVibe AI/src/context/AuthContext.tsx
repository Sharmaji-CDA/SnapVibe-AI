import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import {
  ensureUserDoc,
  getUserProfile,
  type UserProfile,
} from "../services/user.service";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser) {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        setUser(currentUser);

        // Ensure user document exists
        await ensureUserDoc(currentUser.uid);

        let userProfile = await getUserProfile(currentUser.uid);
        if (!userProfile) {
          setProfile(null);
          setLoading(false);
          return;
        }

        const now = new Date();
        const today = now.toDateString();

        /* ---------------- DAILY AI RESET ---------------- */
        if (userProfile.lastAIReset) {
          const lastResetDate = new Date(
            userProfile.lastAIReset.seconds
              ? userProfile.lastAIReset.seconds * 1000
              : userProfile.lastAIReset
          ).toDateString();

          if (lastResetDate !== today) {
            await updateDoc(doc(db, "users", currentUser.uid), {
              aiUsed: 0,
              lastAIReset: now,
            });

            userProfile.aiUsed = 0;
          }
        } else {
          // First-time reset initialization
          await updateDoc(doc(db, "users", currentUser.uid), {
            lastAIReset: now,
          });
        }

        /* ---------------- SUBSCRIPTION EXPIRY CHECK ---------------- */
        if (
          userProfile.subscriptionStatus === "active" &&
          userProfile.subscriptionEnd
        ) {
          const endDate = new Date(
            userProfile.subscriptionEnd.seconds
              ? userProfile.subscriptionEnd.seconds * 1000
              : userProfile.subscriptionEnd
          );

          if (endDate < now) {
            await updateDoc(doc(db, "users", currentUser.uid), {
              subscriptionStatus: "expired",
              plan: "basic",
              accountType: "user",
            });

            userProfile.subscriptionStatus = "expired";
            userProfile.plan = "basic";
            userProfile.accountType = "user";
          }
        }

        setProfile(userProfile);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await ensureUserDoc(cred.user.uid);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshProfile = async () => {
    if (!auth.currentUser) return;
    const updatedProfile = await getUserProfile(auth.currentUser.uid);
    setProfile(updatedProfile);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
