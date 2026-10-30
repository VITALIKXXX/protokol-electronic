
import {
    doc,
    getDoc,
    getDocFromCache,
} from "firebase/firestore";

import { db } from "./firebaseApp.js";

// Sprawdza, czy administrator utworzył profil użytkownika.
export const ensureUserDoc = async ({ uid }) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        throw new Error(
            "Brak profilu użytkownika. Skontaktuj się z administratorem."
        );
    }

    return {
        uid: userSnapshot.id,
        ...userSnapshot.data(),
    };
};

// Pobiera profil użytkownika online.
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

// Pobiera profil z lokalnego cache Firestore.
export const getMyUserDataFromCache = async (uid) => {
    const userRef = doc(db, "users", uid);

    try {
        const userSnapshot = await getDocFromCache(userRef);

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
