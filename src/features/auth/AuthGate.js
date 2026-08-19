import { useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import { auth } from "../../core/firebase/firebaseApp.js";

import {
    ensureUserDoc,
    getMyUserData,
    getMyUserDataFromCache,
} from "../../core/firebase/usersApi.js";

import { LoginPage } from "./LoginPage.js";

import {
    AuthLoading,
    UserBar,
    UserInfo,
    LogoutButton,
} from "./AuthGate.styles.js";


// =====================================================
// LOKALNY CACHE UŻYTKOWNIKA
//
// Zapamiętujemy ostatnie poprawnie pobrane dane użytkownika.
// Dzięki temu aplikacja może wystartować offline,
// nawet jeśli Firestore cache akurat ich nie zwróci.
// =====================================================

const USER_CACHE_KEY = "protocol-electronic-user";


const saveUserToLocalCache = (userData) => {
    try {
        localStorage.setItem(
            USER_CACHE_KEY,
            JSON.stringify(userData)
        );
    } catch (error) {
        console.warn(
            "Nie udało się zapisać użytkownika lokalnie:",
            error
        );
    }
};


const getUserFromLocalCache = () => {
    try {
        const value = localStorage.getItem(
            USER_CACHE_KEY
        );

        if (!value) {
            return null;
        }

        return JSON.parse(value);
    } catch (error) {
        console.warn(
            "Nie udało się odczytać użytkownika lokalnie:",
            error
        );

        return null;
    }
};


// =====================================================
// AUTH GATE
// =====================================================

export const AuthGate = ({ children }) => {
    const [user, setUser] = useState(null);

    const [userData, setUserData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                setLoading(true);
                setError("");
                setUser(firebaseUser);


                // =============================================
                // BRAK ZALOGOWANEGO UŻYTKOWNIKA
                // =============================================

                if (!firebaseUser) {
                    setUserData(null);
                    setLoading(false);

                    return;
                }


                // =============================================
                // PODSTAWOWE DANE AWARYJNE
                //
                // UWAGA:
                // Nigdy nie nadajemy tutaj roli ADMIN.
                // Jeśli nie możemy sprawdzić roli,
                // bezpiecznie przyjmujemy WORKER.
                // =============================================

                const fallbackUserData = {
                    uid: firebaseUser.uid,

                    email:
                        firebaseUser.email || "",

                    displayName:
                        firebaseUser.email
                            ?.split("@")[0] ||
                        "Pracownik",

                    role: "worker",
                };


                try {
                    let loadedUserData = null;


                    // =========================================
                    // ONLINE
                    // =========================================

                    if (navigator.onLine) {
                        await ensureUserDoc({
                            uid: firebaseUser.uid,
                            email:
                                firebaseUser.email,
                        });


                        loadedUserData =
                            await getMyUserData(
                                firebaseUser.uid
                            );


                        if (loadedUserData) {
                            saveUserToLocalCache(
                                loadedUserData
                            );
                        }
                    }


                    // =========================================
                    // OFFLINE
                    // =========================================

                    else {
                        try {
                            loadedUserData =
                                await getMyUserDataFromCache(
                                    firebaseUser.uid
                                );
                        } catch (cacheError) {
                            console.warn(
                                "Firestore cache niedostępny:",
                                cacheError
                            );
                        }


                        // Jeżeli Firestore cache nie ma danych,
                        // próbujemy naszego localStorage.

                        if (!loadedUserData) {
                            loadedUserData =
                                getUserFromLocalCache();
                        }
                    }


                    // =========================================
                    // OSTATECZNY FALLBACK
                    // =========================================

                    if (!loadedUserData) {
                        loadedUserData =
                            fallbackUserData;
                    }


                    setUserData(
                        loadedUserData
                    );
                } catch (authError) {
                    console.error(
                        "Błąd pobierania użytkownika:",
                        authError
                    );


                    // =========================================
                    // JEŚLI ONLINE COŚ SIĘ NIE UDAŁO,
                    // PRÓBUJEMY CACHE
                    // =========================================

                    let cachedUserData = null;


                    try {
                        cachedUserData =
                            await getMyUserDataFromCache(
                                firebaseUser.uid
                            );
                    } catch (cacheError) {
                        console.warn(
                            "Nie udało się pobrać użytkownika z Firestore cache:",
                            cacheError
                        );
                    }


                    // =========================================
                    // POTEM localStorage
                    // =========================================

                    if (!cachedUserData) {
                        cachedUserData =
                            getUserFromLocalCache();
                    }


                    // =========================================
                    // NA KOŃCU WORKER FALLBACK
                    // =========================================

                    setUserData(
                        cachedUserData ||
                        fallbackUserData
                    );
                } finally {
                    setLoading(false);
                }
            }
        );


        return () => unsubscribe();
    }, []);


    // =====================================================
    // ŁADOWANIE
    // =====================================================

    if (loading) {
        return (
            <AuthLoading>
                Ładowanie aplikacji...
            </AuthLoading>
        );
    }


    // =====================================================
    // NIEZALOGOWANY
    // =====================================================

    if (!user) {
        return <LoginPage />;
    }


    // =====================================================
    // BŁĄD
    // =====================================================

    if (error) {
        return (
            <AuthLoading>
                {error}
            </AuthLoading>
        );
    }


    const role =
        userData?.role || "worker";


    // =====================================================
    // APLIKACJA
    // =====================================================

    return (
        <>
            <UserBar>
                <UserInfo>
                    Zalogowany:{" "}

                    <strong>
                        {userData?.displayName ||
                            user.email}
                    </strong>


                    <span>
                        Rola:{" "}

                        <strong>
                            {role === "admin"
                                ? "ADMIN"
                                : "WORKER"}
                        </strong>
                    </span>
                </UserInfo>


                <LogoutButton
                    type="button"
                    onClick={() =>
                        signOut(auth)
                    }
                >
                    Wyloguj
                </LogoutButton>
            </UserBar>


            {children({
                user,
                userData,
                role,
            })}
        </>
    );
};