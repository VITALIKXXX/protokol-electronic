import styled from "styled-components";

export const Box = styled.div`
  padding: 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  margin-top: 14px;
`;

export const CanvasBox = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 2px dashed #94a3b8;

  .signature-canvas {
    width: 100%;
    height: 180px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

export const Button = styled.button`
  border: none;
  background: #2563eb;
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
`;