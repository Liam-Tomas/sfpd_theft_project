// import React, { useState } from 'react';
// import styled, { keyframes } from 'styled-components';


// const spin = keyframes`
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
// `;

// const LoadingSpinner = styled.div`
//     border: 2px solid rgba(0, 0, 0, 0.1);
//     border-top: 2px solid white; // Spinner color
//     border-radius: 50%;
//     width: 14px; // Ensure width and height are equal
//     height: 14px; // Ensure width and height are equal
//     animation: ${spin} 1s linear infinite;
//     display: inline-block; // Ensures the spinner doesn't get squished
//     position: relative; // To position it correctly in the button
//     margin: 0px .5px;
// `;

// const rippleAnimation = keyframes`
//     to {
//         transform: translate(-50%, -50%) scale(4);
//         opacity: 0;
//     }
// `;

// const RippleSpan = styled.span`
//     position: absolute;
//     border-radius: 40%;
//     transform: translate(-50%, -50%) scale(0);
//     animation: ${rippleAnimation} 0.6s linear;
//     background-color: rgba(255, 255, 255, 0.3);
//     width: 100%;
//     height: 100%;
// `;

// const StyledButton = styled.button`
// // padding: 10px 10px;
//     font-family: 'Metropolis', sans-serif;
//     font-weight: 500;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: ${props => props.$backgroundColor || props.theme.primary}; // Use backgroundColor prop or theme primary color
//     color: white;
//     border: ${props => `2px solid ${props.borderColor || 'transparent'}`}; // Use borderColor prop or default to transparent
//     border-radius: 7px;
//     user-select: none;
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

// const Button = ({ children, loading, padding, ...props }) => {
//     const [coords, setCoords] = useState({ x: -1, y: -1 });
//     const [isRippling, setIsRippling] = useState(false);

//     const handleClick = event => {
//         const rect = event.currentTarget.getBoundingClientRect();
//         setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
//         setIsRippling(true);

//         setTimeout(() => setIsRippling(false), 600); // Match the animation duration
//     };

//     return (
//         <StyledButton {...props}>
//             {loading ? <LoadingSpinner /> : children}
//             {isRippling && !loading && (
//                 <RippleSpan style={{ left: `${coords.x}px`, top: `${coords.y}px` }} />
//             )}
//         </StyledButton>
//     );
// };

// export default Button;

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loading spinner component
const LoadingSpinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1); // Light grey border
  border-top: 3px solid white; // White spinner
  border-radius: 50%;
  width: .8em; // Spinner size
  height: .8em; // Spinner size
  animation: ${spin} 2s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
`;

// Button component
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.$width || '80px'}; // Default width
  height: ${props => props.$height || '35px'}; // Default height
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.theme.primary};
  color: white; // Text color
  border: none;
  border-radius: ${props => props.$borderRadius || '5px'};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1.05rem;
  font-weight: 500;
  font-family: 'Metropolis', sans-serif;

  &:hover {
     background-color: #1565c0; // Darken color on hover
}

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 868px) {
    width: 85%;
  }
`;

// Text inside the button
const ButtonText = styled.span`
  visibility: ${props => props.loading ? 'hidden' : 'visible'};
`;

// Button component with loading state
const Button = ({ children, loading, width, height, ...props }) => {
  return (
    <StyledButton $width={width} $height={height} disabled={loading} {...props}>
      {loading && <LoadingSpinner />}
      <ButtonText loading={loading}>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
