import {
    Card,
    Number,
    Meta,
    DateText,
} from "./ProtocolCard.styles";

export const ProtocolCard = ({ protocol }) => {
    return (
        <Card>
            <Number>
                {protocol.protocolNumber || "Bez numeru"}
            </Number>

            <Meta>
                Hodowca: {protocol.breeder || "Brak"}
            </Meta>

            <DateText>
                {protocol.executionDate || protocol.orderDate || "Brak daty"}
            </DateText>
        </Card>
    );
};