import { useState, useEffect, createContext, useContext } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUserProfile = async (userId = null) => {
        const uid = userId || user?.uid;
        if (!uid) return null;

        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const profileData = userDoc.data();
                setUserProfile(profileData);
                return profileData;
            }
            return null;
        } catch (error) {
            console.error('Error refreshing user profile:', error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                await refreshUserProfile(user.uid);
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, name, age) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });

            const profileData = {
                name: name,
                email: email,
                age: age,
                points: 0,
                streakDays: 0,
                level: 1,
                badges: [],
                createdAt: new Date(),
                lastCheckIn: null,
                completedActivities: [],
                mood: 'neutral'
            };

            await setDoc(doc(db, 'users', result.user.uid), profileData);

            setUserProfile(profileData);

            return result.user;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            sessionStorage.removeItem('welcomeShown');
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        userProfile,
        loading,
        register,
        login,
        logout,
        refreshUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};