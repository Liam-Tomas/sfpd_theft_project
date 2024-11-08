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
    border-radius: 7px;
    font-size: 1rem;
    outline: none;
    width: 94%;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: ${props => props.backgroundColor || props.theme.backgroundColor}; // Use backgroundColor from props or default
    color: ${props => props.theme.textAlt};

    &:hover  {
        border-color: ${props => props.theme.hoverShadowColor}; // Highlight color on hover
    }
    &:focus {
        border-color: ${props => props.theme.secondary};
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3); // Adds focus ring
    }

    @media (max-width: 868px) {
        width: 93%;
    }
`;

const ErrorText = styled.span`
    font-size: 0.75rem;
    color: #ff1744;
    margin-top: 5px;
`;

const Input = ({ label, error, errorMessage, width, backgroundColor, ...props }) => {
    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <StyledInput error={error} width={width} backgroundColor={backgroundColor} {...props} />
            {error && <ErrorText>{errorMessage}</ErrorText>}
        </InputContainer>
    );
};

export default Input;
