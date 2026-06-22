import styled from "styled-components";

export const Card = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  background: #111827;
  border: 1px solid rgba(255,255,255,0.08);

  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(37,99,235,0.5);
  }
`;

export const Number = styled.h3`
  margin: 0 0 8px;
  color: #60a5fa;
`;

export const Meta = styled.div`
  color: #e5e7eb;
`;

export const DateText = styled.div`
  margin-top: 8px;
  color: #94a3b8;
  font-size: 14px;
`;