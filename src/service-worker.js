import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// CRA podczas npm run build automatycznie wstawi tutaj
// listę wszystkich plików aplikacji.
precacheAndRoute(self.__WB_MANIFEST);

// Dzięki temu po otwarciu aplikacji bez internetu
// zostanie pokazany zapisany index.html.
const navigationHandler = createHandlerBoundToURL(
    `${process.env.PUBLIC_URL}/index.html`
);

const navigationRoute = new NavigationRoute(navigationHandler, {
    denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
});

registerRoute(navigationRoute);

// Ikony i obrazy zapisujemy w pamięci telefonu.
registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
        cacheName: "protocol-images",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);

// Pozostałe pliki z Netlify:
// najpierw szybka wersja z pamięci, później aktualizacja.
registerRoute(
    ({ request, url }) =>
        request.method === "GET" &&
        url.origin === self.location.origin &&
        ["style", "script", "font"].includes(request.destination),
    new StaleWhileRevalidate({
        cacheName: "protocol-static-files",
    })
);

// Pozwala później aktywować nową wersję aplikacji.
self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});