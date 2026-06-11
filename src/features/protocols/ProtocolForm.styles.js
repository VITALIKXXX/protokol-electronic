import styled from "styled-components";

export const Card = styled.form`
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 18px;
`;

export const Section = styled.section`
  padding: 16px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 20px;
  color: #f8fafc;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  margin-bottom: 14px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #cbd5e1;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #334155;
  background: #e2e4ed;
  color: #131314;
  padding: 12px;
  border-radius: 12px;
  outline: none;
  color-scheme: dark;

  &:focus {
    border-color: #2563eb;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #334155;
  background: #020617;
  color: #e5e7eb;
  padding: 12px;
  border-radius: 12px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #2563eb;
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
  gap: 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  padding: 10px 12px;
  border-radius: 12px;
  color: #e5e7eb;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
  }
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  background: #2563eb;
  color: white;
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    background: #1d4ed8;
  }
`;

export const ProductBlock = styled.div`
  padding: 14px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const SecondaryButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #e5e7eb;
  padding: 11px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ButtonsRow = styled.div`
  margin-top: 18px;
`;