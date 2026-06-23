import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../core/firebase/firebaseApp.js";

const protocolsCollection = collection(db, "protocols");

export const createProtocol = async (protocol) => {
    await addDoc(protocolsCollection, {
        ...protocol,
        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
    });
};

export const subscribeProtocols = (callback) => {
    return onSnapshot(protocolsCollection, (snapshot) => {
        callback(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        );
    });
};

export const removeProtocol = async (id) => {
    const protocolRef = doc(db, "protocols", id);
    await deleteDoc(protocolRef);
};

export const updateProtocol = async (id, protocol) => {
    const protocolRef = doc(db, "protocols", id);

    await updateDoc(protocolRef, {
        ...protocol,
        updatedAtMs: Date.now(),
    });
};