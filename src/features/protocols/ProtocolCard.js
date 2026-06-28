import { useState } from "react";
import { generateProtocolPdf } from "./generateProtocolPdf";
import {
    Card,
    Number,
    Meta,
    DateText,
    Actions,
    ActionButton,
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

                    <Actions>
                        <ActionButton type="button" onClick={() => generateProtocolPdf(protocol)}>
                            PDF
                        </ActionButton>

                        <ActionButton type="button" onClick={() => onEdit(protocol)}>
                            Edytuj
                        </ActionButton>

                        <ActionButton
                            type="button"
                            $variant="danger"
                            onClick={() => onDelete(protocol.id)}
                        >
                            Usuń
                        </ActionButton>
                    </Actions>
                </div>
            )}
        </Card>
    );
};