
import styled from "styled-components";

export const Card = styled.div`
  background: linear-gradient(
    145deg,
    rgba(36, 58, 78, 0.85),
    rgba(20, 37, 55, 0.92)
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-left: 3px solid #609eb5;
  border-radius: 16px;

  padding: 20px;
  margin-bottom: 0;

  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #74b7cf;

    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.18),
      0 0 0 1px rgba(116, 183, 207, 0.10);
  }

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 14px;
  }
`;

export const Number = styled.h3`
  margin: 0 0 14px;
  color: #f1f5f9;
  font-size: 18px;
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
