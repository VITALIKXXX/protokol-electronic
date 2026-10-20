
import styled, { keyframes } from "styled-components";

const logoAppear = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.7) translateY(15px);
    }

    30% {
        opacity: 1;
        transform: scale(1.08) translateY(0);
    }

    50%, 100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
`;

const textAppear = keyframes`
    0%, 20% {
        opacity: 0;
        transform: translateY(15px);
    }

    60%, 100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const lineAppear = keyframes`
    from {
        width: 0;
    }

    to {
        width: 95px;
    }
`;

export const SplashContainer = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 24px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
`;

export const SplashLogo = styled.div`
    margin-bottom: 20px;
    animation: ${logoAppear} 2s ease forwards;

    img {
        display: block;
        width: 300px;
        max-width: 85vw;
        height: auto;
        object-fit: contain;
    }
`;

export const SplashTitle = styled.h1`
    margin: 0;
    color: #10243c;
    font-size: 25px;
    font-weight: 800;
    letter-spacing: 1.3px;
    animation: ${textAppear} 2s ease forwards;
`;

export const SplashSubtitle = styled.p`
    margin: 4px 0 0;
    color: #008eac;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    animation: ${textAppear} 2s ease forwards;
`;

export const SplashLine = styled.div`
    height: 3px;
    margin: 23px 0 18px;
    background: #2dd4bf;
    border-radius: 8px;
    animation: ${lineAppear} 2s ease forwards;
`;

export const SplashLoading = styled.p`
    margin: 0 0 12px;
    color: #64748b;
    font-size: 12px;
`;

export const SplashProgress = styled.div`
    width: 150px;
    height: 5px;
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
`;

export const SplashProgressFill = styled.div`
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background: #13b9ae;
    border-radius: 10px;
    transition: width 2s linear;
`;
