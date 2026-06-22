export const ProtocolDetails = ({ protocol, onDelete }) => {
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
            {onDelete && (
                <button type="button" onClick={() => onDelete(protocol.id)}>
                    Usuń protokół
                </button>
            )}
        </div>
    );
};