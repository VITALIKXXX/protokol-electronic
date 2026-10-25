import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0% {
        transform: scale(1);
        opacity: .8;
    }

    50% {
        transform: scale(1.25);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: .8;
    }
`;

export const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding: 9px 15px;
    width: fit-content;
    border-radius: 30px;

    background: ${({ $online }) =>
        $online
            ? "rgba(34, 197, 94, 0.10)"
            : "rgba(239, 68, 68, 0.10)"};

    border: 1px solid ${({ $online }) =>
        $online
            ? "rgba(34, 197, 94, 0.30)"
            : "rgba(239, 68, 68, 0.30)"};
`;

export const Dot = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ $online }) => ($online ? "#22c55e" : "#ef4444")};
    box-shadow: 0 0 15px ${({ $online }) => ($online ? "#22c55e" : "#ef4444")};
    animation: ${pulse} 1.5s infinite;
`;

export const Tooltip = styled.span`
    color: #e2e8f0;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
`;