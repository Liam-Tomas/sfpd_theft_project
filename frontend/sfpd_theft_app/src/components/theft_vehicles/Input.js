import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const Label = styled.label`
    font-size: 0.875rem;
    margin-bottom: 5px;
    `;

const StyledInput = styled.input`
    padding: 10px;
    border: 2px solid ${props => props.theme.cardLight};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    width: 170px;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: ${props => props.theme.card};
    color: ${props => props.theme.textAlt};
    &:focus {
        border-color: #1976d2; // Highlight color on focus
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3); // Adds focus ring
    }
    &::placeholder {
        // color: ${props => props.theme.textAlt};
    }
`;

const ErrorText = styled.span`
    font-size: 0.75rem;
    color: #ff1744;
    margin-top: 5px;
`;

const Input = ({ label, error, errorMessage, ...props }) => {
    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <StyledInput error={error} {...props} />
            {error && <ErrorText>{errorMessage}</ErrorText>}
        </InputContainer>
    );
};

export default Input;
