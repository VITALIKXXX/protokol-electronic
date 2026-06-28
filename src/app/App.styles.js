import styled from "styled-components";

export const AppShell = styled.div`
  min-height: 100vh;
  background: #0f172a;
  color: #e5e7eb;
  padding: 20px;
`;

export const Header = styled.header`
  max-width: 980px;
  margin: 0 auto 20px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
`;

export const Subtitle = styled.p`
  margin: 6px 0 0;
  color: #94a3b8;
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
  opacity: .65;
`;
export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px 14px 48px;

  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06);

  color: white;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 14px rgba(37,99,235,.35);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;