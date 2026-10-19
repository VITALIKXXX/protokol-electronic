
import styled from "styled-components";

export const Box = styled.div`
  margin-top: 18px;
  padding: 18px;
  background: #1e293b;
  border: 1px solid #40516a;
  border-radius: 16px;

  h3 {
    margin: 0 0 16px;
    color: #f1f5f9;
    font-size: 18px;
    font-weight: 700;
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const CanvasBox = styled.div`
  background: #ffffff;
  border: 2px dashed #64748b;
  border-radius: 12px;
  overflow: hidden;
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
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;


export const Button = styled.button`
  flex: 1 1 auto;
  min-height: 46px;
  padding: 12px 16px;

  background: linear-gradient(
    135deg,
    #438f9c,
    #316c83
  );

  border: 1px solid rgba(125, 195, 210, 0.35);
  border-radius: 12px;

  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  box-shadow:
    0 4px 14px rgba(30, 110, 135, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(
      135deg,
      #53a4b0,
      #397f98
    );

    box-shadow: 0 6px 18px rgba(30, 110, 135, 0.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #85c3d4;
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;



export const FullscreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  width: 100%;
  height: 100dvh;

  background: #101b2a;
  padding: 12px;
  box-sizing: border-box;

  display: flex;
  overflow: hidden;
`;


export const FullscreenPanel = styled.div`
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FullscreenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #f1f5f9;
  font-size: 18px;

  button {
    border: 1px solid #475569;
    border-radius: 10px;
    padding: 12px 16px;
    background: #334155;
    color: #f1f5f9;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    background: #475569;
  }
`;

export const FullscreenCanvasBox = styled.div`
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border: 2px solid #2dd4bf;
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


export const SavedSignature = styled.div`
  margin-top: 16px;
  padding: 16px;

  background: linear-gradient(
    135deg,
    rgba(37, 73, 92, 0.65),
    rgba(20, 45, 65, 0.85)
  );

  border: 1px solid rgba(116, 183, 207, 0.45);
  border-radius: 14px;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

  p {
    margin: 0 0 12px;
    color: #a8d8e8;
    font-size: 15px;
    font-weight: 700;
  }

  img {
    display: block;
    width: 100%;
    max-width: 420px;
    height: 110px;
    object-fit: contain;

    background: #ffffff;
    border: 1px solid #a8c6d6;
    border-radius: 10px;
  }
`;

