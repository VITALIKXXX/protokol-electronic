import styled from "styled-components";

export const AuthLoading = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 20px;
    background: #07111f;
    color: #ffffff;
`;

export const UserBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    padding: 10px 18px;
    background: #0b1422;
    color: #dbeafe;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    @media (max-width: 600px) {
        align-items: flex-start;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 14px;
`;

export const LogoutButton = styled.button`
    border: 0;
    border-radius: 10px;
    padding: 9px 12px;
    background: #334155;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
`;