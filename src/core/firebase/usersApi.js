import {
    doc,
    getDoc,
    getDocFromCache,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseApp.js";

export const ensureUserDoc = async ({ uid, email }) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return {
            uid: userSnapshot.id,
            ...userSnapshot.data(),
        };
    }

    const newUserData = {
        email: email || "",
        displayName:
            email?.split("@")[0] || "Pracownik",
        role: "worker",
        createdAt: serverTimestamp(),
    };

    await setDoc(userRef, newUserData);

    return {
        uid,
        ...newUserData,
    };
};

export const getMyUserData = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        return null;
    }

    return {
        uid: userSnapshot.id,
        ...userSnapshot.data(),
    };
};

export const getMyUserDataFromCache = async (uid) => {
    const userRef = doc(db, "users", uid);

    try {
        const userSnapshot =
            await getDocFromCache(userRef);

        if (!userSnapshot.exists()) {
            return null;
        }

        return {
            uid: userSnapshot.id,
            ...userSnapshot.data(),
        };
    } catch (error) {
        console.warn(
            "Profil użytkownika nie jest zapisany w cache:",
            error
        );

        return null;
    }
};