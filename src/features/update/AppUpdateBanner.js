import { useEffect, useState } from "react";
import {
    Banner,
    Message,
    UpdateButton,
} from "./AppUpdateBanner.styles";

export const AppUpdateBanner = () => {
    const [registration, setRegistration] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        // Odbieramy informację o nowej wersji.
        const handleUpdate = (event) => {
            setRegistration(event.detail);
        };

        // Nasłuchujemy nowych aktualizacji.
        window.addEventListener("sw-update", handleUpdate);

        // Sprawdzamy, czy aktualizacja już czeka.
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistration()
                .then((existingRegistration) => {
                    if (
                        existingRegistration?.waiting &&
                        navigator.serviceWorker.controller
                    ) {
                        setRegistration(existingRegistration);
                    }
                })
                .catch((error) => {
                    console.warn(
                        "Nie udało się sprawdzić aktualizacji:",
                        error
                    );
                });
        }

        // Usuwamy nasłuchiwanie po zamknięciu komponentu.
        return () => {
            window.removeEventListener("sw-update", handleUpdate);
        };
    }, []);

    useEffect(() => {
        let refreshing = false;

        const handleControllerChange = () => {
            if (refreshing) return;

            refreshing = true;
            window.location.reload();
        };

        navigator.serviceWorker?.addEventListener(
            "controllerchange",
            handleControllerChange
        );

        return () => {
            navigator.serviceWorker?.removeEventListener(
                "controllerchange",
                handleControllerChange
            );
        };
    }, []);

    const handleRefresh = () => {
        setIsUpdating(true);

        const waitingWorker = registration?.waiting;

        if (!waitingWorker) {
            window.location.reload();
            return;
        }

        waitingWorker.postMessage({
            type: "SKIP_WAITING",
        });
    };

    if (!registration) {
        return null;
    }

    return (
        <Banner>
            <Message>
                🆕 Dostępna jest nowa wersja Protokołu Elektronicznego
            </Message>

            <UpdateButton
                type="button"
                onClick={handleRefresh}
                disabled={isUpdating}
            >
                {isUpdating ? "⏳ Aktualizowanie..." : "🔄 Aktualizuj"}
            </UpdateButton>
        </Banner>
    );
};