// import styled from "styled-components";

// const Button = styled.button`
//     padding: 10px 15px;
//     background-color: #1976d2; // MUI primary color
//     color: white;
//     border: none;
//     border-radius: 4px;
//     font-size: 1rem;
//     cursor: pointer;
//     transition: background-color 0.2s;
//     position: relative; // Needed to position the ripple span correctly
//     overflow: hidden; // Ensures the ripple effect is contained within the button borders

//     &:hover {
//         background-color: #1565c0; // Darken color on hover
//     }

//     &:disabled {
//         background-color: #e0e0e0;
//         color: #9e9e9e;
//         cursor: not-allowed;
//     }
// `;

// export default Button;

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
`;

const RippleSpan = styled.span`
    position: absolute;
    border-radius: 40%;
    transform: translate(-50%, -50%) scale(0);
    animation: ${rippleAnimation} 0.6s linear;
    background-color: rgba(255, 255, 255, 0.3);
    width: 100%;
    height: 100%;
`;

const StyledButton = styled.button`
    padding: 10px 15px;
    background-color: #1976d2; // MUI primary color
    // background-color: #059669;
    color: white;
    border: none;
    border-radius: 4px;
    user-select: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative; // Needed to position the ripple span correctly
    overflow: hidden; // Ensures the ripple effect is contained within the button borders

    &:hover {
        background-color: #1565c0; // Darken color on hover
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
    }
`;

const Button = ({ children, ...props }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    const handleClick = event => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setIsRippling(true);

        setTimeout(() => setIsRippling(false), 600); // Match the animation duration
    };

    return (
        <StyledButton onClick={handleClick} {...props}>
            {isRippling && <RippleSpan style={{ left: `${coords.x}px`, top: `${coords.y}px` }} />}
            {children}
        </StyledButton>
    );
};

export default Button;
