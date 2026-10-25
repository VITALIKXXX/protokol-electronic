
import styled from "styled-components";


export const ManagerCard = styled.section`
  background: linear-gradient(
    145deg,
    rgba(30, 48, 67, 0.94),
    rgba(12, 27, 43, 0.94)
  );

  border: 1px solid rgba(65, 174, 181, 0.28);
  border-radius: 22px;

  padding: 24px;
  margin-bottom: 24px;

  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media (max-width: 600px) {
    padding: 18px;
    border-radius: 18px;
  }
`;



export const ManagerHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 18px;
  padding-left: 16px;

  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  border-left: 4px solid #609eb5;

  border-radius: 2px;

  @media (max-width: 600px) {
    margin-bottom: 18px;
    padding-bottom: 14px;
    padding-left: 12px;
  }
`;


export const ManagerTitle = styled.h2`
    margin: 0 0 8px;
    color: #f1f5f9;
    font-size: 24px;
`;

export const ManagerSubtitle = styled.p`
    margin: 0;
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.5;
`;


export const Form = styled.form`
  margin-bottom: 24px;
  padding: 24px;

  background: linear-gradient(
    145deg,
    rgba(36, 58, 78, 0.85),
    rgba(20, 37, 55, 0.92)
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-radius: 18px;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 14px;
  }
`;


export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
`;

export const Label = styled.label`
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 600;
`;


export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;

  background: linear-gradient(
    145deg,
    #14263a,
    #101e30
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-radius: 12px;

  color: #f1f5f9;
  padding: 12px 14px;
  font: inherit;
  font-size: 16px;
  color-scheme: dark;

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



export const Select = styled.select`
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;

  background: linear-gradient(
    145deg,
    #14263a,
    #101e30
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-radius: 12px;

  color: #f1f5f9;
  padding: 12px 14px;

  font: inherit;
  font-size: 16px;
  color-scheme: dark;
  cursor: pointer;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

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

  option {
    background: #14263a;
    color: #f1f5f9;
  }
`;


export const FormActions = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 24px;
`;


export const PrimaryButton = styled.button`
  min-height: 48px;
  padding: 13px 20px;

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
    0 6px 20px rgba(30, 110, 135, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  transition:
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

  @media (max-width: 600px) {
    width: 100%;
  }
`;



export const SecondaryButton = styled.button`
  min-height: 48px;
  padding: 13px 20px;

  background: linear-gradient(
    135deg,
    #293e54,
    #203247
  );

  border: 1px solid rgba(116, 166, 190, 0.35);
  border-radius: 12px;

  color: #b4d5e2;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

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


export const Divider = styled.div`
    height: 1px;
    background: #334155;
    margin: 28px 0;
`;

export const ProductList = styled.div`
    display: grid;
    gap: 14px;
`;


export const ProductCard = styled.div`
  background: linear-gradient(
    145deg,
    rgba(36, 58, 78, 0.85),
    rgba(20, 37, 55, 0.92)
  );

  border: 1px solid rgba(116, 166, 190, 0.28);
  border-left: 3px solid #609eb5;
  border-radius: 16px;

  padding: 20px;

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


export const ProductTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const ProductName = styled.h3`
    margin: 0 0 14px;
    color: #f1f5f9;
    font-size: 18px;
`;

export const ProductDetails = styled.div`
    display: grid;
    gap: 9px;
    color: #e2e8f0;
    font-size: 14px;
`;

export const DetailRow = styled.div`
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
`;

export const DetailLabel = styled.span`
    color: #94a3b8;
`;

export const ProductActions = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;


export const EditButton = styled.button`
  min-height: 42px;
  padding: 10px 15px;

  background: linear-gradient(
    135deg,
    #293e54,
    #203247
  );

  border: 1px solid rgba(116, 166, 190, 0.35);
  border-radius: 10px;

  color: #b4d5e2;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  transition:
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
`;


export const DeleteButton = styled.button`
    border: 1px solid rgba(248, 113, 113, 0.4);
    border-radius: 10px;
    padding: 10px 15px;
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: rgba(239, 68, 68, 0.2);
    }
`;

export const EmptyMessage = styled.div`
    padding: 24px;
    text-align: center;
    background: #0f172a;
    border: 1px dashed #475569;
    border-radius: 12px;
    color: #94a3b8;
`;


export const SavedProductsSection = styled.section`
  margin-top: 24px;
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

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 18px;
  }
`;



export const SavedProductsTitle = styled.h2`
  margin: 0 0 22px;
  padding: 0 0 16px 16px;

  color: #f1f5f9;
  font-size: 21px;
  font-weight: 700;

  border-left: 4px solid #609eb5;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
`;

export const SearchInput = styled(Input)`
  margin-bottom: 24px;

  min-height: 54px;
  padding: 14px 18px;

  background: linear-gradient(
    135deg,
    rgba(36, 58, 78, 0.95),
    rgba(16, 32, 49, 0.98)
  );

  border: 1px solid rgba(96, 158, 181, 0.45);
  border-radius: 14px;

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  &:focus {
    border-color: #74b7cf;

    box-shadow:
      0 0 0 3px rgba(116, 183, 207, 0.15),
      0 6px 22px rgba(30, 110, 135, 0.18);
  }

  @media (max-width: 600px) {
    min-height: 50px;
    margin-bottom: 18px;
    padding: 12px 14px;
  }
`;