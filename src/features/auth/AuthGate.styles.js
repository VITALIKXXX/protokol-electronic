
import styled from "styled-components";

export const AuthLoading = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    display: grid;
    place-items: center;
    margin: 0;
    padding: 20px;
    background: #ffffff;
    color: #111111;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`;

export const UserBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;

    margin: 16px 16px 20px;
    padding: 20px;

    background: linear-gradient(
        145deg,
        #17263c,
        #101b2a
    );

    border: 1px solid #30445f;
    border-radius: 20px;

    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

    color: #f1f5f9;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
        margin: 12px 12px 18px;
    }
`;



export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;

    .user-badge,
    .role-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 12px 16px;
        border-radius: 30px;
    }

    .user-badge {
        background: rgba(37, 99, 235, 0.12);
        border: 1px solid rgba(96, 165, 250, 0.4);
        color: #dbeafe;
    }

    .role-badge {
        background: rgba(45, 212, 191, 0.1);
        border: 1px solid rgba(45, 212, 191, 0.35);
        color: #99f6e4;
    }

    strong {
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
    }

    @media (max-width: 600px) {
        justify-content: center;
        gap: 10px;

        .user-badge,
        .role-badge {
            padding: 10px 12px;
        }
    }
`;


export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    min-height: 44px;
    padding: 12px 22px;

    background: rgba(239, 68, 68, 0.09);
    border: 1px solid rgba(248, 113, 113, 0.3);
    border-radius: 12px;

    color: #fca5a5;
    font-size: 14px;
    font-weight: 700;

    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
        background: rgba(239, 68, 68, 0.17);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;
