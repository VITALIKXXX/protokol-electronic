import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    getDocs,
    getDoc,
    query,
    where,
    runTransaction,
} from "firebase/firestore";

import { db } from "../../core/firebase/firebaseApp.js";

const protocolsCollection = collection(db, "protocols");

// ======================================================
// TYMCZASOWY NUMER PROTOKOŁU
// Używany również wtedy, kiedy telefon jest offline.
// ======================================================

export const generateTemporaryProtocolNumber = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    const random = Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase();

    return `TEMP-${day}${month}-${hour}${minute}${second}-${random}`;
};

// ======================================================
// TWORZENIE PROTOKOŁU
// ======================================================

export const createProtocol = async (protocol) => {
    const protocolRef = await addDoc(protocolsCollection, {
        ...protocol,

        protocolNumber:
            protocol.protocolNumber ||
            generateTemporaryProtocolNumber(),

        numberStatus: "temporary",

        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
        updatedAtMs: Date.now(),
    });

    return protocolRef.id;
};

// ======================================================
// NASŁUCHIWANIE PROTOKOŁÓW
// ======================================================

export const subscribeProtocols = (callback) => {
    return onSnapshot(protocolsCollection, (snapshot) => {
        callback(
            snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
        );
    });
};

// ======================================================
// USUWANIE
// ======================================================

export const removeProtocol = async (id) => {
    const protocolRef = doc(db, "protocols", id);

    await deleteDoc(protocolRef);
};

// ======================================================
// EDYCJA
// ======================================================

export const updateProtocol = async (id, protocol) => {
    const protocolRef = doc(db, "protocols", id);

    await updateDoc(protocolRef, {
        ...protocol,
        updatedAtMs: Date.now(),
    });
};

// ======================================================
// LICZNIK PROTOKOŁÓW
//
// Każdy rok ma osobny licznik:
//
// counters/
//     protocols-2026
//         lastNumber: 57
//
// ======================================================

const getCounterRef = (year) => {
    return doc(db, "counters", `protocols-${year}`);
};

// ======================================================
// SPRAWDZENIE / UTWORZENIE LICZNIKA
//
// Przy pierwszym uruchomieniu sprawdzamy stare protokoły,
// żeby nie zacząć numeracji od 001.
// ======================================================

const ensureProtocolCounter = async (year) => {
    const counterRef = getCounterRef(year);

    const counterSnapshot = await getDoc(counterRef);

    if (counterSnapshot.exists()) {
        return;
    }

    const protocolsSnapshot = await getDocs(protocolsCollection);

    let highestNumber = 0;

    protocolsSnapshot.forEach((document) => {
        const protocol = document.data();

        const [numberPart, yearPart] = String(
            protocol.protocolNumber || ""
        ).split("/");

        if (yearPart !== String(year)) {
            return;
        }

        const number = Number(numberPart);

        if (
            Number.isFinite(number) &&
            number > highestNumber
        ) {
            highestNumber = number;
        }
    });

    await runTransaction(db, async (transaction) => {
        const currentCounter =
            await transaction.get(counterRef);

        // Ktoś mógł utworzyć licznik w międzyczasie.
        if (currentCounter.exists()) {
            return;
        }

        transaction.set(counterRef, {
            year: String(year),
            lastNumber: highestNumber,
            createdAt: serverTimestamp(),
        });
    });
};

// ======================================================
// NADANIE FINALNEGO NUMERU
// ======================================================

export const finalizeProtocolNumber = async (protocolId) => {
    if (!navigator.onLine) {
        return;
    }

    const year = String(new Date().getFullYear());

    await ensureProtocolCounter(year);

    const counterRef = getCounterRef(year);
    const protocolRef = doc(db, "protocols", protocolId);

    await runTransaction(db, async (transaction) => {
        const protocolSnapshot =
            await transaction.get(protocolRef);

        if (!protocolSnapshot.exists()) {
            return;
        }

        const protocol = protocolSnapshot.data();

        // Jeśli protokół ma już finalny numer,
        // nic więcej nie robimy.
        if (protocol.numberStatus === "final") {
            return;
        }

        const counterSnapshot =
            await transaction.get(counterRef);

        if (!counterSnapshot.exists()) {
            throw new Error(
                "Nie znaleziono licznika protokołów."
            );
        }

        const lastNumber =
            Number(counterSnapshot.data().lastNumber) || 0;

        const nextNumber = lastNumber + 1;

        const finalProtocolNumber =
            `${String(nextNumber).padStart(3, "0")}/${year}`;

        transaction.update(counterRef, {
            lastNumber: nextNumber,
            updatedAt: serverTimestamp(),
        });

        transaction.update(protocolRef, {
            protocolNumber: finalProtocolNumber,
            numberStatus: "final",
            numberedAt: serverTimestamp(),
        });
    });
};

// ======================================================
// SYNCHRONIZACJA NUMERÓW PO POWROCIE INTERNETU
// ======================================================

export const finalizePendingProtocolNumbers = async () => {
    if (!navigator.onLine) {
        return;
    }

    const pendingProtocolsQuery = query(
        protocolsCollection,
        where("numberStatus", "==", "temporary")
    );

    const snapshot = await getDocs(
        pendingProtocolsQuery
    );

    for (const protocolDocument of snapshot.docs) {
        try {
            await finalizeProtocolNumber(
                protocolDocument.id
            );
        } catch (error) {
            console.error(
                `Błąd nadawania numeru protokołowi ${protocolDocument.id}:`,
                error
            );
        }
    }
};