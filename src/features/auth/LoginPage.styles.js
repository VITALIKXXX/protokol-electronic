
import styled from "styled-components";

export const LoginPageWrapper = styled.main`
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;

    display: grid;
    place-items: center;

    padding: 20px;
    box-sizing: border-box;

    background: #101b2a;
`;

export const LoginCard = styled.section`
    width: min(100%, 420px);
    box-sizing: border-box;

    padding: 36px 30px;

    background: linear-gradient(
        145deg,
        #1e293b,
        #172338
    );

    border: 1px solid #334155;
    border-radius: 22px;

    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);

    @media (max-width: 480px) {
        padding: 28px 20px;
        border-radius: 18px;
    }
`;

export const LoginTitle = styled.h1`
    margin: 0;

    color: #f1f5f9;
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(26px, 6vw, 32px);
    font-weight: 800;
    line-height: 1.2;
    text-align: center;

    &::before {
        content: "📋";
        display: block;
        font-size: 42px;
        margin-bottom: 18px;
    }
`;

export const LoginSubtitle = styled.p`
    margin: 12px 0 28px;

    color: #94a3b8;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
`;

export const LoginForm = styled.form`
    display: grid;
    gap: 16px;
`;

export const LoginInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 15px 16px;

    background: #0f172a;
    color: #f1f5f9;

    border: 1px solid #475569;
    border-radius: 12px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;

    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #2dd4bf;
        box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.15);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: #f1f5f9;
        -webkit-box-shadow: 0 0 0 1000px #0f172a inset;
        caret-color: #f1f5f9;
        transition: background-color 9999s ease-out;
    }
`;

export const LoginButton = styled.button`
    width: 100%;

    padding: 15px 18px;

    background: #2dd4bf;
    color: #0f172a;

    border: none;
    border-radius: 12px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 800;

    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover:not(:disabled) {
        background: #5eead4;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.6;
        cursor: wait;
    }
`;

export const ErrorMessage = styled.p`
    margin: 0;

    padding: 12px 14px;

    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(248, 113, 113, 0.3);
    border-radius: 10px;

    color: #fca5a5;
    font-size: 14px;
    text-align: center;
`;
