import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

import {
    db,
} from "../../core/firebase/firebaseApp.js";


const productsCollection =
    collection(
        db,
        "productPresets"
    );


export const subscribeProductPresets =
    (callback) => {

        return onSnapshot(
            productsCollection,

            (snapshot) => {

                const products =
                    snapshot.docs.map(
                        (document) => ({
                            id: document.id,
                            ...document.data(),
                        })
                    );

                products.sort(
                    (a, b) =>
                        String(a.name || "")
                            .localeCompare(
                                String(
                                    b.name || ""
                                ),
                                "pl"
                            )
                );

                callback(products);
            },

            (error) => {
                console.error(
                    "Błąd pobierania preparatów:",
                    error
                );
            }
        );
    };


export const createProductPreset =
    async (product) => {

        await addDoc(
            productsCollection,
            product
        );
    };


export const updateProductPreset =
    async (
        id,
        product
    ) => {

        const productRef =
            doc(
                db,
                "productPresets",
                id
            );

        await updateDoc(
            productRef,
            product
        );
    };


export const removeProductPreset =
    async (id) => {

        const productRef =
            doc(
                db,
                "productPresets",
                id
            );

        await deleteDoc(
            productRef
        );
    };