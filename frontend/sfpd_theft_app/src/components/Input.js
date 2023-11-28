// import styled from "styled-components";

// const StyledInput = styled.input`
//     padding: 10px;
//     border: 1.5px solid #9e9e9e; // Neutral border color
//     border-radius: 4px;
//     font-size: 1rem;
//     outline: none;
//     transition: border-color 0.2s;

//     &:focus {
//         border-color: #1976d2; // Highlight color on focus
//     }
// `;

// export default StyledInput;

import React from 'react';
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 0.875rem;
    margin-bottom: 5px;
    color: #333;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 1.5px solid ${props => props.error ? '#ff1744' : '#9e9e9e'};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        border-color: #1976d2; // Highlight color on focus
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3); // Adds focus ring
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
