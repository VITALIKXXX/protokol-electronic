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
    touch-action: none;
    overscroll-behavior: contain;

    .signature-canvas {
        display: block;
        width: 100%;
        height: 180px;
        touch-action: none;
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

export const FullscreenOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(2, 6, 23, 0.96);
    padding: 12px;
    display: flex;
`;

export const FullscreenPanel = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const FullscreenHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 18px;

    button {
        border: 0;
        border-radius: 10px;
        padding: 10px 14px;
        background: #334155;
        color: white;
        font-weight: 700;
    }
`;

export const FullscreenCanvasBox = styled.div`
    flex: 1;
    min-height: 0;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: contain;

    .fullscreen-signature-canvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
    }
`;