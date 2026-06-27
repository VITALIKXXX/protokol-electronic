import { Section, SectionTitle } from "./ProtocolForm.styles";
import { ProtocolCard } from "./ProtocolCard";

export const ProtocolList = ({ protocols, onEdit, onDelete }) => {
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
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Section>
    );
};