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

export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
  flex-wrap: wrap;
`;

export const TabButton = styled.button`
  border: 1px solid
    ${({ $active }) =>
    $active ? "#3b82f6" : "#374151"};

  background:
    ${({ $active }) =>
    $active ? "#2563eb" : "#111827"};

  color:
    ${({ $active }) =>
    $active ? "#ffffff" : "#d1d5db"};

  padding: 11px 18px;

  border-radius: 12px;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.15s;

  &:hover {
    background:
      ${({ $active }) =>
    $active ? "#1d4ed8" : "#1f2937"};

    border-color: #4b5563;
  }

  &:active {
    transform: scale(0.98);
  }
`;