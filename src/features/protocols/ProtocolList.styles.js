
import styled from "styled-components";

export const DateSection = styled.section`
  margin-bottom: 28px;
  padding: 16px;

  border: 1px solid #334155;
  border-radius: 18px;

  background: #172436;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 14px;
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

  padding: 14px 18px;
  margin-bottom: 14px;

  background: linear-gradient(
    135deg,
    #203449,
    #17434a
  );

  border: 1px solid #326b70;
  border-left: 4px solid #2dd4bf;
  border-radius: 12px;

  @media (max-width: 600px) {
    padding: 12px;
    gap: 8px;
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
