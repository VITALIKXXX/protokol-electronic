import styled from "styled-components";

export const LoginPageWrapper = styled.main`
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 20px;
    background: #07111f;
`;

export const LoginCard = styled.section`
    width: 100%;
    max-width: 420px;
    padding: 28px;
    border-radius: 22px;
    background: #111c2d;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
`;

export const LoginTitle = styled.h1`
    margin: 0;
    color: #ffffff;
    font-size: 26px;
`;

export const LoginSubtitle = styled.p`
    margin: 8px 0 24px;
    color: #94a3b8;
`;

export const LoginForm = styled.form`
    display: grid;
    gap: 14px;
`;

export const LoginInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 14px 16px;
    border-radius: 13px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    font-size: 16px;

    &::placeholder {
        color: #7f8da3;
    }

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
    }
`;

export const LoginButton = styled.button`
    padding: 14px 16px;
    border: 0;
    border-radius: 13px;
    background: #2563eb;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
        opacity: 0.6;
        cursor: wait;
    }
`;

export const ErrorMessage = styled.p`
    margin: 0;
    color: #fca5a5;
`;