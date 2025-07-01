import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase/config';

export const createUserProfile = async (uid, userData) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        points: 0,
        streakDays: 0,
        level: 1
    });
};

export const getUserProfile = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};

export const updateUserPoints = async (uid, points) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        points: points,
        lastActivityDate: new Date()
    });
};

export const saveMoodEntry = async (uid, moodData) => {
    const moodRef = collection(db, 'moods');
    await addDoc(moodRef, {
        userId: uid,
        ...moodData,
        timestamp: new Date()
    });
};
