import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";

import {auth, googleProvider} from "../services/firebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Signup
    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    //Login
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    //Google Login
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    //Logout
    const logout = async () => {
        await signOut(auth);
    };


    //Check user state on refresh
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const contextvalue = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        logout
    };

  return (
    <AuthContext.Provider value={contextvalue}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom Auth Hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
