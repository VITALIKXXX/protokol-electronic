import { useState } from "react";
import { generateProtocolPdf } from "./generateProtocolPdf";
import {
    Card,
    Number,
    Meta,
    DateText,
} from "./ProtocolCard.styles";

export const ProtocolCard = ({ protocol, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card onClick={() => setIsOpen((prev) => !prev)}>
            <Number>{protocol.protocolNumber || "Bez numeru"}</Number>

            <Meta>Hodowca: {protocol.breeder || "Brak"}</Meta>

            <DateText>
                Data wykonania: {protocol.executionDate || protocol.orderDate || "Brak daty"}
            </DateText>

            {isOpen && (
                <div onClick={(e) => e.stopPropagation()}>
                    <p>
                        <strong>Osoba zlecająca:</strong>{" "}
                        {protocol.orderingPerson || "-"}
                    </p>

                    <p>
                        <strong>Uwagi:</strong> {protocol.notes || "-"}
                    </p>

                    <button type="button" onClick={() => generateProtocolPdf(protocol)}>
                        PDF
                    </button>

                    <button type="button" onClick={() => onEdit(protocol)}>
                        Edytuj
                    </button>

                    <button type="button" onClick={() => onDelete(protocol.id)}>
                        Usuń
                    </button>
                </div>
            )}
        </Card>
    );
};