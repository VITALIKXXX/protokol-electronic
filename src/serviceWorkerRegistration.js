const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);


export const register = (config) => {
    if (!("serviceWorker" in navigator)) {
        return;
    }


    window.addEventListener("load", () => {
        const swUrl =
            `${process.env.PUBLIC_URL}/service-worker.js`;


        // Podczas npm start na localhost
        // nie używamy service workera.
        if (isLocalhost) {
            return;
        }


        navigator.serviceWorker
            .register(swUrl)
            .then((registration) => {

                // ==========================================
                // NOWA WERSJA JUŻ CZEKA
                //
                // Może się zdarzyć, że update został pobrany
                // zanim aplikacja zdążyła podpiąć listener.
                // ==========================================

                if (
                    registration.waiting &&
                    navigator.serviceWorker.controller
                ) {
                    console.log(
                        "Dostępna jest nowa wersja aplikacji."
                    );

                    config?.onUpdate?.(
                        registration
                    );
                }


                // ==========================================
                // WYKRYWANIE NOWEJ WERSJI
                // ==========================================

                registration.onupdatefound = () => {
                    const installingWorker =
                        registration.installing;


                    if (!installingWorker) {
                        return;
                    }


                    installingWorker.onstatechange = () => {

                        if (
                            installingWorker.state !==
                            "installed"
                        ) {
                            return;
                        }


                        // Stara wersja już kontroluje stronę,
                        // czyli właśnie pobraliśmy aktualizację.
                        if (
                            navigator.serviceWorker.controller
                        ) {
                            console.log(
                                "Dostępna jest nowa wersja aplikacji."
                            );


                            config?.onUpdate?.(
                                registration
                            );


                            return;
                        }


                        // Pierwsza instalacja PWA.
                        console.log(
                            "Aplikacja została zapisana do pracy offline."
                        );


                        config?.onSuccess?.(
                            registration
                        );
                    };
                };


                // ==========================================
                // SPRAWDZENIE AKTUALIZACJI
                //
                // Przy każdym uruchomieniu aplikacji
                // sprawdzamy, czy Netlify ma nową wersję.
                // ==========================================

                const checkForUpdate = () => {
                    if (!navigator.onLine) {
                        return;
                    }

                    registration
                        .update()
                        .catch((error) => {
                            console.warn(
                                "Nie udało się sprawdzić aktualizacji:",
                                error
                            );
                        });
                };


                // Sprawdzamy od razu po uruchomieniu.
                checkForUpdate();


                // Sprawdzamy po powrocie internetu.
                window.addEventListener(
                    "online",
                    checkForUpdate
                );


                // Bardzo ważne dla telefonu/PWA:
                //
                // Gdy użytkownik wraca do aplikacji
                // po tym, jak była w tle,
                // ponownie pytamy o nową wersję.
                document.addEventListener(
                    "visibilitychange",
                    () => {
                        if (
                            document.visibilityState ===
                            "visible"
                        ) {
                            checkForUpdate();
                        }
                    }
                );
            })
            .catch((error) => {
                console.error(
                    "Service worker registration failed:",
                    error
                );
            });
    });
};


export const unregister = () => {
    if (!("serviceWorker" in navigator)) {
        return;
    }


    navigator.serviceWorker.ready
        .then((registration) => {
            registration.unregister();
        })
        .catch((error) => {
            console.error(
                error.message
            );
        });
};