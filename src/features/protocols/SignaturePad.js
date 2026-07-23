import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
    Box,
    CanvasBox,
    Buttons,
    Button,
    FullscreenOverlay,
    FullscreenPanel,
    FullscreenHeader,
    FullscreenCanvasBox,
} from "./SignaturePad.styles";

export const SignaturePad = ({ onSave, title = "Podpis" }) => {
    const signatureRef = useRef(null);
    const fullscreenSignatureRef = useRef(null);

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!isFullscreen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isFullscreen]);

    const clearSignature = (ref) => {
        ref.current?.clear();
    };

    const saveSignature = (ref) => {
        if (!ref.current || ref.current.isEmpty()) {
            alert("Najpierw złóż podpis");
            return;
        }

        const signatureImage = ref.current
            .getCanvas()
            .toDataURL("image/png");

        onSave(signatureImage);
        setIsFullscreen(false);
    };

    const openFullscreen = () => {
        setIsFullscreen(true);
    };

    return (
        <Box>
            <h3>{title}</h3>

            <CanvasBox>
                <SignatureCanvas
                    ref={signatureRef}
                    penColor="black"
                    canvasProps={{
                        width: 900,
                        height: 220,
                        className: "signature-canvas",
                    }}
                />
            </CanvasBox>

            <Buttons>
                <Button
                    type="button"
                    onClick={() => clearSignature(signatureRef)}
                >
                    Wyczyść
                </Button>

                <Button
                    type="button"
                    onClick={() => saveSignature(signatureRef)}
                >
                    Zapisz podpis
                </Button>

                <Button type="button" onClick={openFullscreen}>
                    Podpisz na pełnym ekranie
                </Button>
            </Buttons>

            {isFullscreen && (
                <FullscreenOverlay>
                    <FullscreenPanel>
                        <FullscreenHeader>
                            <strong>{title}</strong>

                            <button
                                type="button"
                                onClick={() => setIsFullscreen(false)}
                            >
                                Zamknij
                            </button>
                        </FullscreenHeader>

                        <FullscreenCanvasBox>
                            <SignatureCanvas
                                ref={fullscreenSignatureRef}
                                penColor="black"
                                canvasProps={{
                                    className: "fullscreen-signature-canvas",
                                }}
                            />
                        </FullscreenCanvasBox>

                        <Buttons>
                            <Button
                                type="button"
                                onClick={() =>
                                    clearSignature(fullscreenSignatureRef)
                                }
                            >
                                Wyczyść
                            </Button>

                            <Button
                                type="button"
                                onClick={() =>
                                    saveSignature(fullscreenSignatureRef)
                                }
                            >
                                Zapisz podpis
                            </Button>
                        </Buttons>
                    </FullscreenPanel>
                </FullscreenOverlay>
            )}
        </Box>
    );
};