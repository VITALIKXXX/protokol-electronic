import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
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