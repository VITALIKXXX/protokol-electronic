
import styled from "styled-components";

export const ManagerCard = styled.section`
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
        padding: 16px;
    }
`;

export const ManagerHeader = styled.div`
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid #334155;
    border-left: 4px solid #2dd4bf;
    padding-left: 14px;
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
    margin-bottom: 28px;
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
    box-sizing: border-box;
    background: #0f172a;
    color: #f1f5f9;
    border: 1px solid #475569;
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
    color-scheme: dark;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #2dd4bf;
        box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.15);
    }
`;

export const Select = styled.select`
    width: 100%;
    box-sizing: border-box;
    background: #0f172a;
    color: #f1f5f9;
    border: 1px solid #475569;
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 15px;
    outline: none;
    color-scheme: dark;

    &:focus {
        border-color: #2dd4bf;
        box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.15);
    }
`;

export const FormActions = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 24px;
`;

export const PrimaryButton = styled.button`
    border: none;
    border-radius: 12px;
    padding: 13px 20px;
    background: #2dd4bf;
    color: #0f172a;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
        background: #5eead4;
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const SecondaryButton = styled.button`
    border: 1px solid #475569;
    border-radius: 12px;
    padding: 13px 20px;
    background: #334155;
    color: #f1f5f9;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #475569;
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
    background: #172338;
    border: 1px solid #334155;
    border-left: 4px solid #2dd4bf;
    border-radius: 14px;
    padding: 20px;
    transition: border-color 0.2s;

    &:hover {
        border-color: #2dd4bf;
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
    border: 1px solid #475569;
    border-radius: 10px;
    padding: 10px 15px;
    background: #334155;
    color: #f1f5f9;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #475569;
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
