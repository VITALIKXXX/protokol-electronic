import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box, CanvasBox, Buttons, Button } from "./SignaturePad.styles";

export const SignaturePad = ({ onSave }) => {
    const signatureRef = useRef(null);

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    const saveSignature = () => {
        if (signatureRef.current.isEmpty()) {
            alert("Najpierw złóż podpis");
            return;
        }

        const signatureImage = signatureRef.current
            .getCanvas()
            .toDataURL("image/png");

        onSave(signatureImage);
    };

    return (
        <Box>

            <CanvasBox>
                <SignatureCanvas
                    ref={signatureRef}
                    penColor="black"
                    canvasProps={{
                        width: 500,
                        height: 180,
                        className: "signature-canvas",
                    }}
                />
            </CanvasBox>

            <Buttons>
                <Button type="button" onClick={clearSignature}>
                    Wyczyść
                </Button>

                <Button type="button" onClick={saveSignature}>
                    Zapisz podpis
                </Button>
            </Buttons>
        </Box>
    );
};