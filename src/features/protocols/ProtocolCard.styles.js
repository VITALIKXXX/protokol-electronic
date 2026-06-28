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

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
`;

export const ActionButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${({ $variant }) =>
    $variant === "danger" ? "rgba(239, 68, 68, 0.16)" : "rgba(37, 99, 235, 0.18)"};
  color: ${({ $variant }) =>
    $variant === "danger" ? "#fecaca" : "#bfdbfe"};
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: ${({ $variant }) =>
    $variant === "danger" ? "rgba(239, 68, 68, 0.28)" : "rgba(37, 99, 235, 0.3)"};
  }
`;