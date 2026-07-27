import { Section, SectionTitle } from "./ProtocolForm.styles";
import { ProtocolCard } from "./ProtocolCard";
import {
    DateSection,
    DateHeader,
    DateTitle,
    ProtocolCount,
    ProtocolsContainer,
} from "./ProtocolList.styles";

export const ProtocolList = ({
    protocols,
    onEdit,
    onDelete,
    role,
}) => {
    if (!protocols.length) {
        return (
            <Section>
                <SectionTitle>Zapisane protokoły</SectionTitle>
                <p>Brak zapisanych protokołów.</p>
            </Section>
        );
    }

    const getProtocolNumber = (protocolNumber) => {
        return Number(protocolNumber?.split("/")[0]) || 0;
    };

    const sortedProtocols = [...protocols].sort((a, b) => {
        const dateA = a.executionDate || "";
        const dateB = b.executionDate || "";

        if (dateA !== dateB) {
            return dateB.localeCompare(dateA);
        }

        return (
            getProtocolNumber(b.protocolNumber) -
            getProtocolNumber(a.protocolNumber)
        );
    });

    const groupedProtocols = sortedProtocols.reduce(
        (groups, protocol) => {
            const date =
                protocol.executionDate || "no-date";

            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(protocol);

            return groups;
        },
        {}
    );

    const getLocalDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");
        const day = String(date.getDate()).padStart(
            2,
            "0"
        );

        return `${year}-${month}-${day}`;
    };

    const formatDateHeader = (date) => {
        if (date === "no-date") {
            return "Brak daty wykonania";
        }

        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const todayKey = getLocalDateKey(today);
        const yesterdayKey =
            getLocalDateKey(yesterday);

        if (date === todayKey) {
            return "Dzisiaj";
        }

        if (date === yesterdayKey) {
            return "Wczoraj";
        }

        const [year, month, day] =
            date.split("-");

        return `${day}.${month}.${year}`;
    };

    const getProtocolCountText = (count) => {
        if (count === 1) {
            return "1 protokół";
        }

        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(
                lastTwoDigits >= 12 &&
                lastTwoDigits <= 14
            )
        ) {
            return `${count} protokoły`;
        }

        return `${count} protokołów`;
    };

    return (
        <Section>
            <SectionTitle>
                Zapisane protokoły
            </SectionTitle>

            {Object.entries(groupedProtocols).map(
                ([date, protocolsForDate]) => (
                    <DateSection key={date}>
                        <DateHeader>
                            <DateTitle>
                                📅{" "}
                                {formatDateHeader(date)}
                            </DateTitle>

                            <ProtocolCount>
                                {getProtocolCountText(
                                    protocolsForDate.length
                                )}
                            </ProtocolCount>
                        </DateHeader>

                        <ProtocolsContainer>
                            {protocolsForDate.map(
                                (protocol) => (
                                    <ProtocolCard
                                        key={
                                            protocol.id
                                        }
                                        protocol={
                                            protocol
                                        }
                                        onEdit={onEdit}
                                        onDelete={
                                            onDelete
                                        }
                                        role={role}
                                    />
                                )
                            )}
                        </ProtocolsContainer>
                    </DateSection>
                )
            )}
        </Section>
    );
};