import { useEffect, useState } from "react";
import { Wrapper, Dot, Tooltip } from "./NetworkStatus.styles";

export const NetworkStatus = () => {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setOnline(true);
        const goOffline = () => setOnline(false);

        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return (
        <Wrapper>
            <Dot online={online} />

            <Tooltip>
                {online
                    ? "🟢 Online — dane synchronizują się z Firebase."
                    : "🔴 Offline — protokoły zapiszą się lokalnie i zostaną wysłane po odzyskaniu połączenia."}
            </Tooltip>
        </Wrapper>
    );
};