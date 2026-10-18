
import { useEffect, useState } from "react";
import {
    SplashContainer,
    SplashLogo,
    SplashTitle,
    SplashSubtitle,
    SplashLine,
    SplashLoading,
    SplashProgress,
    SplashProgressFill,
} from "./SplashScreen.styles.js";

export const SplashScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setProgress(100);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <SplashContainer>
            <SplashLogo>
                <img
                    src="/icon-192.png"
                    alt="Logo Protokołu"
                />
            </SplashLogo>

            <SplashTitle>
                PROTOKÓŁ
            </SplashTitle>

            <SplashSubtitle>
                ELEKTRONICZNY
            </SplashSubtitle>

            <SplashLine />

            <SplashLoading>
                Uruchamianie aplikacji...
            </SplashLoading>

            <SplashProgress>
                <SplashProgressFill
                    $progress={progress}
                />
            </SplashProgress>
        </SplashContainer>
    );
};
