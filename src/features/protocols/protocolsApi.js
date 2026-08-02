import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    getDocs,
    query,
    orderBy,
    limit,
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

export const getNextProtocolNumber = async () => {
    const snapshot = await getDocs(protocolsCollection);
    const currentYear = String(new Date().getFullYear());

    let highestNumber = 0;

    snapshot.forEach((document) => {
        const protocol = document.data();
        const [numberPart, yearPart] = String(
            protocol.protocolNumber || ""
        ).split("/");

        if (yearPart !== currentYear) {
            return;
        }

        const number = Number(numberPart);

        if (Number.isFinite(number) && number > highestNumber) {
            highestNumber = number;
        }
    });

    const nextNumber = highestNumber + 1;

    return `${String(nextNumber).padStart(3, "0")}/${currentYear}`;
};