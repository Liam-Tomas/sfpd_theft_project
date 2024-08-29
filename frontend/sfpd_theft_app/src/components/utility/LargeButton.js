import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    padding: ${({ $padding }) => $padding || '23px 33px'};
    font-family: 'Metropolis', sans-serif;
    font-size: ${({ $fontSize }) => $fontSize || '1.4rem'};
    font-weight: 500;
    background-color: ${({ $backgroundColor, theme }) => $backgroundColor || theme.buttonColor};
    color: ${({ $color, theme }) => $color || theme.textOpp};
    border: none;
    border-radius: 50px;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
    overflow: hidden;

    &:hover {
        background-color: ${({ $hoverBackgroundColor, theme }) => $hoverBackgroundColor || theme.buttonHover};

        // background: ${props => props.theme.buttonHover};
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
    }

    @media (max-width: 868px) {
        font-size: ${({ $fontSize }) => $fontSize || '1.2rem'};
        padding: ${({ $padding }) => $padding || '20px 30px'};

    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin-right: 8px;
`

const LargeButton = ({ children, padding, fontSize, backgroundColor, color, hoverBackgroundColor, icon, ...props }) => {
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    const handleClick = event => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        setIsRippling(true);

        setTimeout(() => setIsRippling(false), 600);
    };

    return (
        <StyledButton
            onClick={handleClick}
            $padding={padding}
            $fontSize={fontSize}
            $backgroundColor={backgroundColor}
            $color={color}
            $hoverBackgroundColor={hoverBackgroundColor}
            {...props}
        >
            {icon && <StyledIcon icon={icon} />}
            {isRippling && <RippleSpan style={{ left: `${coords.x}px`, top: `${coords.y}px` }} />}
            {children}
        </StyledButton>
    );
};

export default LargeButton;
