export const ProtocolDetails = ({ protocol }) => {
    if (!protocol) return null;

    return (
        <div>
            <h2>Protokół {protocol.protocolNumber}</h2>

            <p>
                <strong>Hodowca:</strong>{" "}
                {protocol.breeder || "-"}
            </p>

            <p>
                <strong>Data wykonania:</strong>{" "}
                {protocol.executionDate || "-"}
            </p>

            <p>
                <strong>Uwagi:</strong>{" "}
                {protocol.notes || "-"}
            </p>
        </div>
    );
};