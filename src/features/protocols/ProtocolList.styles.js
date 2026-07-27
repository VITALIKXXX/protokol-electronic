import styled from "styled-components";

export const DateSection = styled.section`
    margin-bottom: 32px;
    padding: 16px;

    border: 1px solid rgba(96, 165, 250, 0.18);
    border-radius: 20px;

    background: rgba(15, 23, 42, 0.55);

    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);

    @media (max-width: 600px) {
        margin-bottom: 24px;
        padding: 12px;
        border-radius: 16px;
    }
`;

export const DateHeader = styled.div`
    position: sticky;
    top: 8px;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    margin-bottom: 16px;
    padding: 14px 18px;

    border: 1px solid rgba(96, 165, 250, 0.4);
    border-radius: 14px;

    background: linear-gradient(
        135deg,
        #1e3a8a,
        #1d4ed8
    );

    color: #ffffff;

    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);

    @media (max-width: 500px) {
        padding: 12px 14px;
    }
`;

export const DateTitle = styled.h2`
    margin: 0;

    font-size: 20px;
    font-weight: 800;
    line-height: 1.3;

    @media (max-width: 500px) {
        font-size: 17px;
    }
`;

export const ProtocolCount = styled.span`
    flex-shrink: 0;

    padding: 6px 10px;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.16);

    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

export const ProtocolsContainer = styled.div`
    display: grid;
    gap: 16px;
`;