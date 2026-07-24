import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseApp.js";

export const ensureUserDoc = async ({ uid, email }) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.data();
    }

    const newUserData = {
        email: email || "",
        displayName: email?.split("@")[0] || "Pracownik",
        role: "worker",
        createdAt: serverTimestamp(),
    };

    await setDoc(userRef, newUserData);

    return newUserData;
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