import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';


const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid white; // Spinner color
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: ${spin} 1s linear infinite;
`;

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
    padding: ${props => props.padding || '10px 15px'}
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px; 
    background-color: ${props => props.backgroundColor || props.theme.primary}; // Use backgroundColor prop or theme primary color
    color: white;
    border: ${props => `2px solid ${props.borderColor || 'transparent'}`}; // Use borderColor prop or default to transparent
    border-radius: 7px;
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

const Button = ({ children, loading, padding, ...props }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    const handleClick = event => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setIsRippling(true);

        setTimeout(() => setIsRippling(false), 600); // Match the animation duration
    };

    return (
        <StyledButton {...props}>
            {loading ? <LoadingSpinner /> : children}
            {isRippling && !loading && (
                <RippleSpan style={{ left: `${coords.x}px`, top: `${coords.y}px` }} />
            )}
        </StyledButton>
    );
};

export default Button;
