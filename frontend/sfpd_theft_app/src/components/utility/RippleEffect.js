import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const RippleSpan = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: ${props => props.theme.buttonHoverBackground};
  transform: scale(0);
  animation: ${rippleAnimation} 600ms linear;
  width: 100%;
  height: 100%;
`;

const RippleEffect = ({ children, onClick }) => {
    const [rippleState, setRippleState] = useState({ x: -1, y: -1, active: false });

    const handleRipple = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setRippleState({
            x: event.clientX - rect.left - rect.width / 2,
            y: event.clientY - rect.top - rect.height / 2,
            active: true
        });
        setTimeout(() => setRippleState({ ...rippleState, active: false }), 600);
        onClick && onClick(event); // Trigger the callback
    };

    return (
        <div onClick={handleRipple}>
            {rippleState.active && <RippleSpan style={{ left: rippleState.x, top: rippleState.y }} />}
            {children}
        </div>
    );
};

export default RippleEffect;
