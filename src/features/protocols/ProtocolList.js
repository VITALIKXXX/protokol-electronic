import { Section, SectionTitle } from "./ProtocolForm.styles";

export const ProtocolList = ({ protocols }) => {
    if (!protocols.length) {
        return (
            <Section>
                <SectionTitle>Zapisane protokoły</SectionTitle>
                <p>Brak zapisanych protokołów.</p>
            </Section>
        );
    }

    return (
        <Section>
            <SectionTitle>Zapisane protokoły</SectionTitle>

            {protocols.map((protocol) => (
                <div key={protocol.id}>
                    <strong>{protocol.protocolNumber || "Bez numeru"}</strong> —{" "}
                    {protocol.breeder || "Brak hodowcy"} —{" "}
                    {protocol.executionDate || protocol.orderDate || "Brak daty"}
                </div>
            ))}
        </Section>
    );
};