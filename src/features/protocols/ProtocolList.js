import { Section, SectionTitle } from "./ProtocolForm.styles";
import { ProtocolCard } from "./ProtocolCard";

export const ProtocolList = ({ protocols, onSelect }) => {
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
                <ProtocolCard
                    key={protocol.id}
                    protocol={protocol}
                    onClick={() => onSelect(protocol)}
                />
            ))}
        </Section>
    );
};