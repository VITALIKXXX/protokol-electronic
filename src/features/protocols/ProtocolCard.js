
import { useState } from "react";
import { generateProtocolPdfV2 } from "./generateProtocolPdfV2";

import {
    Card,
    Number,
    Meta,
    DateText,
    Actions,
    ActionButton,
} from "./ProtocolCard.styles";

export const ProtocolCard = ({
    protocol,
    onEdit,
    onDelete,
    role,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isAdmin = role === "admin";

    return (
        <Card onClick={() => setIsOpen((prev) => !prev)}>
            <Number>
                {protocol.protocolNumber || "Bez numeru"}
            </Number>

            <Meta>
                <strong>Hodowca:</strong>{" "}
                {protocol.breeder || "Brak"}
            </Meta>

            <DateText>
                Data wykonania:{" "}
                {protocol.executionDate ||
                    protocol.orderDate ||
                    "Brak daty"}
            </DateText>

            {isOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                    }}
                >
                    <Meta>
                        <strong>Osoba zlecająca:</strong>{" "}
                        {protocol.orderingPerson || "-"}
                    </Meta>

                    <Meta>
                        <strong>Uwagi:</strong>{" "}
                        {protocol.notes || "-"}
                    </Meta>

                    {protocol.createdBy?.name && (
                        <Meta>
                            <strong>Utworzył:</strong>{" "}
                            {protocol.createdBy.name}
                        </Meta>
                    )}

                    <Actions>
                        <ActionButton
                            type="button"
                            onClick={() => generateProtocolPdfV2(protocol)}
                        >
                            PDF
                        </ActionButton>

                        <ActionButton
                            type="button"
                            onClick={() => onEdit(protocol)}
                        >
                            Edytuj
                        </ActionButton>

                        <ActionButton
                            type="button"
                            $variant="danger"
                            disabled={!isAdmin}
                            title={
                                isAdmin
                                    ? "Usuń protokół"
                                    : "Funkcja dostępna tylko dla administratora"
                            }
                            onClick={() => {
                                if (!isAdmin) return;
                                onDelete(protocol.id);
                            }}
                        >
                            {isAdmin ? "Usuń" : "🔒 Usuń"}
                        </ActionButton>
                    </Actions>
                </div>
            )}
        </Card>
    );
};
