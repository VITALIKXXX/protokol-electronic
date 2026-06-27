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
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    position: relative;
    width: fit-content;
`;

export const Dot = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ online }) => (online ? "#22c55e" : "#ef4444")};
    box-shadow: 0 0 15px ${({ online }) => (online ? "#22c55e" : "#ef4444")};
    animation: ${pulse} 1.5s infinite;
`;

export const Tooltip = styled.div`
    display: none;
    position: absolute;
    top: 28px;
    left: 0;
    padding: 10px 14px;
    border-radius: 10px;
    background: #111827;
    color: white;
    white-space: nowrap;
    font-size: 13px;
    border: 1px solid rgba(255,255,255,.1);

    ${Wrapper}:hover & {
        display: block;
    }
`;