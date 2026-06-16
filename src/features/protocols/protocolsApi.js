import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../core/firebase/firebaseApp";

const protocolsCollection = collection(db, "protocols");

export const createProtocol = async (protocol) => {
    await addDoc(protocolsCollection, {
        ...protocol,
        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
    });
};