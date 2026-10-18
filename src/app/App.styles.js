import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
  }

  body {
    background: #101b2a;
  }

  * {
    box-sizing: border-box;
  }
`;

export const AppShell = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  background: #101b2a;
  color: #f1f5f9;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.5;

  padding: 24px 20px;

  @media (max-width: 600px) {
    padding: 16px 12px;
  }
`;

export const Header = styled.header`
  max-width: 980px;
  margin: 0 auto 24px;
  padding: 8px 0 16px;
  border-bottom: 1px solid #334155;
`;

export const Title = styled.h1`
  margin: 0;
  color: #f8fafc;
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 750;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #94a3b8;
  line-height: 1.5;
`;

export const Main = styled.main`
  max-width: 980px;
  margin: 0 auto;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 18px auto 28px;
  position: relative;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  opacity: 0.85;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 18px 15px 48px;
  border-radius: 14px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #f1f5f9;
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:hover {
    border-color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.18);
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? "#2dd4bf" : "#475569")};
  background: ${({ $active }) => ($active ? "#2dd4bf" : "#1e293b")};
  color: ${({ $active }) => ($active ? "#10212b" : "#e2e8f0")};
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#5eead4" : "#334155")};
    border-color: #2dd4bf;
  }

  &:focus-visible {
    outline: 3px solid #5eead4;
    outline-offset: 3px;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    flex: 1 1 auto;
    padding: 12px 14px;
  }
`;