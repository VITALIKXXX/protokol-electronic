import styled from "styled-components";


export const ManagerCard = styled.section`
    background: #111827;
    border: 1px solid #273449;
    border-radius: 18px;
    padding: 24px;
    margin-bottom: 24px;
`;


export const ManagerHeader = styled.div`
    margin-bottom: 24px;
`;


export const ManagerTitle = styled.h2`
    margin: 0 0 6px;
    color: #f9fafb;
    font-size: 26px;
`;


export const ManagerSubtitle = styled.p`
    margin: 0;
    color: #9ca3af;
    font-size: 14px;
`;


export const Form = styled.form`
    margin-bottom: 28px;
`;


export const FormGrid = styled.div`
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;


export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;


export const Label = styled.label`
    color: #e5e7eb;
    font-size: 14px;
    font-weight: 600;
`;


export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;

    background: #e5e7eb;
    color: #111827;

    border: 2px solid transparent;
    border-radius: 10px;

    padding: 12px 14px;

    font-size: 15px;

    outline: none;

    transition:
        border-color 0.2s,
        box-shadow 0.2s;

    &:focus {
        border-color: #3b82f6;

        box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.18);
    }
`;


export const Select = styled.select`
    width: 100%;
    box-sizing: border-box;

    background: #e5e7eb;
    color: #111827;

    border: 2px solid transparent;
    border-radius: 10px;

    padding: 12px 14px;

    font-size: 15px;

    outline: none;

    &:focus {
        border-color: #3b82f6;

        box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.18);
    }
`;


export const FormActions = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    margin-top: 20px;
`;


export const PrimaryButton = styled.button`
    border: none;
    border-radius: 10px;

    padding: 11px 18px;

    background: #2563eb;
    color: white;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    transition:
        transform 0.15s,
        background 0.15s;

    &:hover {
        background: #1d4ed8;
    }

    &:active {
        transform: scale(0.98);
    }
`;


export const SecondaryButton = styled.button`
    border: 1px solid #4b5563;
    border-radius: 10px;

    padding: 11px 18px;

    background: transparent;
    color: #e5e7eb;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
        background: #1f2937;
    }
`;


export const Divider = styled.div`
    height: 1px;
    background: #273449;
    margin: 26px 0;
`;


export const ProductList = styled.div`
    display: grid;
    gap: 14px;
`;


export const ProductCard = styled.div`
    background: #182235;
    border: 1px solid #2b3a52;

    border-radius: 14px;

    padding: 18px;
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
    margin: 0 0 12px;

    color: #f9fafb;

    font-size: 18px;
`;


export const ProductDetails = styled.div`
    display: grid;
    gap: 7px;

    color: #d1d5db;

    font-size: 14px;
`;


export const DetailRow = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`;


export const DetailLabel = styled.span`
    color: #9ca3af;
`;


export const ProductActions = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;


export const EditButton = styled.button`
    border: none;
    border-radius: 9px;

    padding: 9px 14px;

    background: #334155;
    color: #f8fafc;

    font-weight: 600;

    cursor: pointer;

    &:hover {
        background: #475569;
    }
`;


export const DeleteButton = styled.button`
    border: 1px solid #7f1d1d;
    border-radius: 9px;

    padding: 9px 14px;

    background: rgba(127, 29, 29, 0.2);
    color: #fecaca;

    font-weight: 600;

    cursor: pointer;

    &:hover {
        background: rgba(127, 29, 29, 0.38);
    }
`;


export const EmptyMessage = styled.div`
    padding: 20px;

    text-align: center;

    border: 1px dashed #374151;
    border-radius: 12px;

    color: #9ca3af;
`;