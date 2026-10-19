
import styled from "styled-components";


export const Card = styled.form`
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
`;

export const Section = styled.section`
  padding: 24px;

  background: linear-gradient(
    145deg,
    rgba(30, 48, 67, 0.94),
    rgba(12, 27, 43, 0.94)
  );

  border: 1px solid rgba(65, 174, 181, 0.28);
  border-radius: 22px;

  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  //backdrop-filter: blur(14px);
 // -webkit-backdrop-filter: blur(14px);

  @media (max-width: 600px) {
    padding: 18px;
    border-radius: 18px;
  }
`;





export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 0 0 20px;
  padding-bottom: 16px;

  color: #f1f5f9;
  font-size: clamp(18px, 3vw, 21px);
  font-weight: 700;
  line-height: 1.35;

  border-bottom: 1px solid rgba(148, 163, 184, 0.15);

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 24px;
    flex-shrink: 0;

    background: linear-gradient(
      180deg,
      #74b7cf,
      #477b9b
    );

    border-radius: 6px;
  }

  @media (max-width: 600px) {
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    font-size: 18px;
  }
`;




export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;


export const Field = styled.label`
  display: grid;
  gap: 7px;
  margin-bottom: 14px;
  align-self: start;
  min-width: 0;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #cbd5e1;
`;


export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;

  border: 1px solid rgba(116, 166, 190, 0.28);
  background: linear-gradient(
    145deg,
    #14263a,
    #101e30
  );

  color: #f1f5f9;
  padding: 12px 14px;
  border-radius: 12px;

  font: inherit;
  font-size: 16px;
  color-scheme: dark;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: #91a5b9;
  }

  &:hover:not(:disabled) {
    border-color: #6c9eb6;
  }

  &:focus {
    outline: none;
    border-color: #74b7cf;
    box-shadow:
      0 0 0 3px rgba(116, 183, 207, 0.13),
      0 0 16px rgba(45, 125, 160, 0.10);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[type="date"],
  &[type="time"] {
    min-height: 48px;
    cursor: pointer;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.85;
  }

  option {
    background: #1e293b;
    color: #f1f5f9;
  }
`;



export const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;

  border: 1px solid rgba(116, 166, 190, 0.28);
  background: linear-gradient(
    145deg,
    #14263a,
    #101e30
  );

  color: #f1f5f9;
  padding: 12px 14px;
  border-radius: 12px;

  font: inherit;
  font-size: 16px;
  color-scheme: dark;
  resize: vertical;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: #91a5b9;
  }

  &:hover:not(:disabled) {
    border-color: #6c9eb6;
  }

  &:focus {
    outline: none;
    border-color: #74b7cf;

    box-shadow:
      0 0 0 3px rgba(116, 183, 207, 0.13),
      0 0 16px rgba(45, 125, 160, 0.10);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;



export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  box-sizing: border-box;
  padding: 12px 14px;

  background: linear-gradient(
    135deg,
    #27394d,
    #203044
  );

  border: 1px solid rgba(116, 166, 190, 0.25);
  border-radius: 12px;
  color: #e2e8f0;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #30465d;
    border-color: #74b7cf;
  }

  &:has(input:checked) {
    background: linear-gradient(
      135deg,
      #25495c,
      #1c394d
    );

    border-color: #74b7cf;

    box-shadow:
      inset 0 0 0 1px rgba(116, 183, 207, 0.15),
      0 4px 16px rgba(20, 90, 125, 0.12);

    color: #e0f2fe;
    font-weight: 600;
  }

  &:focus-within {
    outline: 2px solid #85c3d4;
    outline-offset: 2px;
  }

  input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    accent-color: #579bad;
    cursor: pointer;
  }
`;



export const Button = styled.button`
  width: 100%;
  min-height: 50px;
  padding: 14px 20px;

  background: linear-gradient(
    135deg,
    #438f9c,
    #316c83
  );

  border: 1px solid rgba(125, 195, 210, 0.35);
  border-radius: 14px;

  color: #ffffff;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 6px 20px rgba(30, 110, 135, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

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

    box-shadow: 0 8px 24px rgba(30, 110, 135, 0.28);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #85c3d4;
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;



export const ProductBlock = styled.div`
  margin: 16px 0;
  padding: 22px;

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

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: #74b7cf;

    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(116, 183, 207, 0.12);
  }

  @media (max-width: 600px) {
    padding: 14px;
    margin: 12px 0;
    border-radius: 12px;
  }
`;



export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 46px;
  padding: 12px 18px;

  background: linear-gradient(
    135deg,
    #293e54,
    #203247
  );

  color: #b4d5e2;
  border: 1px solid rgba(116, 166, 190, 0.35);
  border-radius: 12px;

  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: #354f67;
    border-color: #74b7cf;
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


export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #334155;

  @media (max-width: 600px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;


export const MobileFormHint = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    margin-bottom: 16px;
    padding: 12px 14px;
    background: #172f3a;
    border: 1px solid #2c6667;
    border-radius: 12px;
    color: #99f6e4;
    font-size: 13px;
    line-height: 1.5;
  }
`;
