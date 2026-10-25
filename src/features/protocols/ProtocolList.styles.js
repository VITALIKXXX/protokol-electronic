
import styled from "styled-components";

export const DateSection = styled.section`
  margin-bottom: 20px;
  padding: 0;

  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;

  @media (max-width: 600px) {
    margin-bottom: 16px;
  }
`;


export const DateHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  position: sticky;
  top: 0;
  z-index: 5;

  padding: 16px 20px;
  margin-bottom: 14px;

  background: linear-gradient(
    145deg,
    rgba(36, 58, 78, 0.85),
    rgba(20, 37, 55, 0.92)
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-left: 3px solid #609eb5;
  border-radius: 16px;

  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (max-width: 600px) {
    padding: 14px 16px;
    border-radius: 14px;
  }
`;


export const DateTitle = styled.h2`
  margin: 0;

  color: #f1f5f9;
  font-size: 20px;
  font-weight: 750;
  line-height: 1.3;

  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

export const ProtocolCount = styled.span`
  flex-shrink: 0;

  padding: 6px 12px;
  border-radius: 999px;

  background: rgba(45, 212, 191, 0.14);
  border: 1px solid rgba(45, 212, 191, 0.35);

  color: #5eead4;

  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 500px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;

export const ProtocolsContainer = styled.div`
  display: grid;
  gap: 14px;
`;
