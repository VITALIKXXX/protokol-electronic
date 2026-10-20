
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
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <SplashContainer>
            <SplashLogo>
                <img
                    src="avi-vet-login.png"
                    alt="Avi-Vet SERVICE"
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
