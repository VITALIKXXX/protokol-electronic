
import styled from "styled-components";

export const Card = styled.div`
  padding: 14px 18px;
  margin-bottom: 10px;

  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 14px;

  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: #243449;
    border-color: #2dd4bf;
  }

  @media (max-width: 600px) {
    padding: 12px 14px;
    margin-bottom: 8px;
  }
`;

export const Number = styled.h3`
  margin: 0 0 6px;
  color: #5eead4;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
`;

export const Meta = styled.div`
  margin: 0;
  padding: 0;

  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.5;

  p {
    margin: 4px 0;
  }

  strong {
    color: #f8fafc;
    font-weight: 600;
  }
`;

export const DateText = styled.div`
  margin-top: 8px;
  padding-top: 8px;

  border-top: 1px solid #334155;

  color: #94a3b8;
  font-size: 13px;
  line-height: 1.4;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 12px;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

export const ActionButton = styled.button`
  min-height: 44px;

  border: 1px solid ${({ $variant }) =>
    $variant === "danger" ? "#b45353" : "#2dd4bf"};

  background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(45, 212, 191, 0.12)"};

  color: ${({ $variant }) =>
    $variant === "danger" ? "#fca5a5" : "#5eead4"};

  padding: 11px 16px;
  border-radius: 12px;

  cursor: pointer;
  font-size: 14px;
  font-weight: 700;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.24)"
      : "rgba(45, 212, 191, 0.22)"};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #5eead4;
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    flex: 1 1 auto;
    padding: 12px;
  }
`;
