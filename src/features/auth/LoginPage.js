import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../core/firebase/firebaseApp.js";
import {
    LoginPageWrapper,
    LoginCard,
    LoginTitle,
    LoginSubtitle,
    LoginForm,
    LoginInput,
    LoginButton,
    ErrorMessage,
} from "./LoginPage.styles.js";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            setError("Wpisz email i hasło.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );
        } catch (loginError) {
            console.error("Błąd logowania:", loginError);
            setError("Nieprawidłowy email lub hasło.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <LoginPageWrapper>
            <LoginCard>
                <LoginTitle>Protokół elektroniczny</LoginTitle>

                <LoginSubtitle>
                    Zaloguj się, aby przejść do aplikacji
                </LoginSubtitle>

                <LoginForm onSubmit={handleSubmit}>
                    <LoginInput
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Email"
                        autoComplete="email"
                    />

                    <LoginInput
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Hasło"
                        autoComplete="current-password"
                    />

                    {error && (
                        <ErrorMessage>{error}</ErrorMessage>
                    )}

                    <LoginButton
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Logowanie..."
                            : "Zaloguj"}
                    </LoginButton>
                </LoginForm>
            </LoginCard>
        </LoginPageWrapper>
    );
};