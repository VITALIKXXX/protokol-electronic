
import styled from "styled-components";

export const Card = styled.form`
  width: 100%;
  box-sizing: border-box;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 16px;
  }
`;


export const Section = styled.section`
  padding: 22px 0;

  &:first-child {
    padding-top: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #334155;
  }

  @media (max-width: 600px) {
    padding: 16px 0;
  }
`;



export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 0 0 20px;
  padding-bottom: 12px;

  color: #f8fafc;
  font-size: clamp(18px, 3vw, 21px);
  font-weight: 700;
  line-height: 1.35;

  border-bottom: 1px solid #334155;

  &::before {
    content: "";
    display: block;
    width: 4px;
    height: 24px;
    flex-shrink: 0;
    background: #2dd4bf;
    border-radius: 4px;
  }

  @media (max-width: 600px) {
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 10px;
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
  border: 1px solid #475569;
  background: #0f172a;
  color: #f1f5f9;
  padding: 12px 14px;
  border-radius: 12px;
  font: inherit;
  font-size: 16px;
  color-scheme: dark;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:hover {
    border-color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.16);
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
  box-sizing: border-box;
  min-height: 100px;
  border: 1px solid #475569;
  background: #0f172a;
  color: #f1f5f9;
  padding: 12px 14px;
  border-radius: 12px;
  font: inherit;
  font-size: 16px;
  resize: vertical;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #2dd4bf;
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.16);
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

  background: #273449;
  border: 1px solid #3b4b62;
  border-radius: 12px;
  color: #e2e8f0;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #304158;
    border-color: #2dd4bf;
  }

  &:has(input:checked) {
    background: #173e42;
    border-color: #2dd4bf;
    box-shadow: inset 0 0 0 1px rgba(45, 212, 191, 0.2);
    color: #ccfbf1;
    font-weight: 600;
  }

  &:focus-within {
    outline: 2px solid #5eead4;
    outline-offset: 2px;
  }

  input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    accent-color: #2dd4bf;
    cursor: pointer;
  }
`;


export const Button = styled.button`
  width: 100%;
  min-height: 48px;
  border: 1px solid #2dd4bf;
  background: #2dd4bf;
  color: #10212b;
  padding: 13px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: #5eead4;
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid #99f6e4;
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
  background: #172436;
  border: 1px solid #40516a;
  border-left: 4px solid #2dd4bf;
  border-radius: 16px;

  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #2dd4bf;
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

  background: #26374b;
  color: #5eead4;
  border: 1px solid #3d6970;
  border-radius: 12px;

  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: #304b5b;
    border-color: #2dd4bf;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #99f6e4;
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
