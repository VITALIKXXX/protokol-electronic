import { useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../../core/firebase/firebaseApp.js";
import {
    ensureUserDoc,
    getMyUserData,
} from "../../core/firebase/usersApi.js";
import { LoginPage } from "./LoginPage.js";
import {
    AuthLoading,
    UserBar,
    UserInfo,
    LogoutButton,
} from "./AuthGate.styles.js";

export const AuthGate = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser) => {
                try {
                    setError("");
                    setUser(firebaseUser);

                    if (!firebaseUser) {
                        setUserData(null);
                        setLoading(false);
                        return;
                    }

                    await ensureUserDoc({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                    });

                    const loadedUserData =
                        await getMyUserData(firebaseUser.uid);

                    setUserData(loadedUserData);
                } catch (authError) {
                    console.error(
                        "Błąd pobierania użytkownika:",
                        authError
                    );

                    setError(
                        "Nie udało się pobrać profilu użytkownika."
                    );
                } finally {
                    setLoading(false);
                }
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <AuthLoading>
                Ładowanie aplikacji...
            </AuthLoading>
        );
    }

    if (!user) {
        return <LoginPage />;
    }

    if (error) {
        return <AuthLoading>{error}</AuthLoading>;
    }

    const role = userData?.role || "worker";

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
                    onClick={() => signOut(auth)}
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