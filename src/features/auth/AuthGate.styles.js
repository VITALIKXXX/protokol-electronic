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