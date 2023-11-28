// import React from 'react';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// // Styled components
// const NavbarContainer = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100px; // Adjust the width as needed
//   height: 100vh;
//   background-color: #f8fafc;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 20px;
//   box-shadow: rgba(0, 0, 0, 0.01) 0px 5px 15px 0px;    
// `;

// const NavbarItem = styled.div`

//   margin: 15px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   text-align: center;
//   border-radius: 10px; // Rounded corners
//   padding: 8px; // Padding around the icon and text
//   transition: background-color 0.3s, box-shadow 0.3s;

//   &:hover {
//     color: #007bff; // Change hover color
//   }
//   &:hover {
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); // Greyish shadow on hover
//   }

//   &:active {
//     background-color: #007bff; // Fill with color on click
//     color: white;
//   }

//   .icon {
//     margin-bottom: 5px; // Space between icon and text
//   }
// `;

// // Navbar Component
// const Navbar = () => {

//   const handleClick = (label) => {
//     // Implement your navigation logic here
//     console.log(`Navigating to ${label}`);
//   };

//   return (
//     <NavbarContainer>
//       <NavbarItem onClick={() => handleClick("Home")}>
//         <FontAwesomeIcon icon={faHome} className="icon" />
//         Home
//       </NavbarItem>
//       <NavbarItem onClick={() => handleClick("About")}>
//         <FontAwesomeIcon icon={faUser} className="icon" />
//         About
//       </NavbarItem>
//       <NavbarItem onClick={() => handleClick("Contact")}>
//         <FontAwesomeIcon icon={faEnvelope} className="icon" />
//         Contact
//       </NavbarItem>
//       {/* Add more NavbarItems as needed */}
//     </NavbarContainer>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// const rippleAnimation = keyframes`
//   to {
//     transform: scale(4);
//     opacity: 0;
//   }
// `;

// const RippleSpan = styled.span`
//   position: absolute;
//   border-radius: 50%;
//   background-color: rgba(0, 123, 255, 0.3); // Ripple color
//   transform: scale(0);
//   animation: ${rippleAnimation} 600ms linear;
//   width: 100%;
//   height: 100%;
// `;

// const NavbarContainer = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100px; // Adjust the width as needed
//   height: 100vh;
//   background-color: #f8fafc;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 20px;
//   box-shadow: rgba(0, 0, 0, 0.01) 0px 5px 15px 0px;    
// `;

// const NavbarItem = styled.div`

//   margin: 15px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   text-align: center;
//   border-radius: 10px; // Rounded corners
//   padding: 8px; // Padding around the icon and text
//   transition: background-color 0.3s, box-shadow 0.3s;

//   &:hover {
//     color: #007bff; // Change hover color
//   }
//   &:hover {
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); // Greyish shadow on hover
//   }

//   &:active {
//     background-color: #007bff; // Fill with color on click
//     color: white;
//   }

//   .icon {
//     margin-bottom: 5px; // Space between icon and text
//   }
// `;

// const Navbar = () => {
//   const [rippleCoords, setRippleCoords] = useState({ x: -1, y: -1 });
//   const [isRippling, setIsRippling] = useState(false);

//   const handleRipple = (event, label) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setRippleCoords({ 
//       x: event.clientX - rect.left - rect.width / 2,
//       y: event.clientY - rect.top - rect.height / 2 
//     });
//     setIsRippling(true);
//     setTimeout(() => setIsRippling(false), 600);

//     // Implement your navigation logic here
//     console.log(`Navigating to ${label}`);
//   };

//   return (
//     <NavbarContainer>
//       <NavbarItem onClick={(e) => handleRipple(e, "Home")}>
//         {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//         <FontAwesomeIcon icon={faHome} className="icon" />
//         Home
//       </NavbarItem>
//       <NavbarItem onClick={(e) => handleRipple(e, "About")}>
//         {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//         <FontAwesomeIcon icon={faUser} className="icon" />
//         About
//       </NavbarItem>
//       <NavbarItem onClick={(e) => handleRipple(e, "Contact")}>
//         {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//         <FontAwesomeIcon icon={faEnvelope} className="icon" />
//         Contact
//       </NavbarItem>
//       {/* Add more NavbarItems as needed */}
//     </NavbarContainer>
//   );
// };

// export default Navbar;



// import React, { useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// const rippleAnimation = keyframes`
//   to {
//     transform: scale(4);
//     opacity: 0;
//   }
// `;

// const RippleSpan = styled.span`
//   position: absolute;
//   border-radius: 50%;
//   background-color: blue;
//   transform: scale(0);
//   animation: ${rippleAnimation} 600ms linear;
//   width: 100%;
//   height: 100%;
// `;

// const NavbarContainer = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100px; // Adjust the width as needed
//   height: 100vh;
//   background-color: #f8fafc;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 20px;
//   box-shadow: rgba(0, 0, 0, 0.01) 0px 5px 15px 0px;    
// `;

// const NavbarItem = styled.div`
//   position: relative;
//   margin: 10px 0;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px; // Rounded corners
//   padding: 8px; // Padding around the icon and text
//   transition: background-color 0.3s, box-shadow 0.3s;
//   overflow: hidden;

//   &:hover {
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); // Greyish shadow on hover
//   }

//   .icon {
//     margin-bottom: 5px;
//   }
// `;

// const Navbar = () => {
//   const [rippleCoords, setRippleCoords] = useState({ x: -1, y: -1 });
//   const [isRippling, setIsRippling] = useState(false);

//   const handleRipple = (event) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setRippleCoords({ 
//       x: event.clientX - rect.left - rect.width / 2,
//       y: event.clientY - rect.top - rect.height / 2 
//     });
//     setIsRippling(true);
//     setTimeout(() => setIsRippling(false), 600);
//   };

//   return (
//         <NavbarContainer>
//           <NavbarItem onClick={(e) => handleRipple(e, "Home")}>
//             {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//             <FontAwesomeIcon icon={faHome} className="icon" />
//             Home
//           </NavbarItem>
//           <NavbarItem onClick={(e) => handleRipple(e, "About")}>
//             {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//             <FontAwesomeIcon icon={faUser} className="icon" />
//             About
//           </NavbarItem>
//           <NavbarItem onClick={(e) => handleRipple(e, "Contact")}>
//             {isRippling && <RippleSpan style={{ left: rippleCoords.x, top: rippleCoords.y }} />}
//             <FontAwesomeIcon icon={faEnvelope} className="icon" />
//             Contact
//           </NavbarItem>
//           {/* Add more NavbarItems as needed */}
//         </NavbarContainer>
//       );
//     };

// export default Navbar;

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const RippleSpan = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: #007bff;
  transform: scale(0);
  animation: ${rippleAnimation} 600ms linear;
  width: 100%;
  height: 100%;
`;

const NavbarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 105px;
  height: 100vh;
  background-color: #f8fafc;
//   background-color: #e2e8f0;
  background-color: #f1f5f9;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 5px 0px;
`;

const NavbarItem = styled.div`
  position: relative;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 8px;
  transition: background-color 0.8s, box-shadow 0.3s;
  overflow: hidden;
  color: rgb(98 116 129);
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .icon {
    margin-bottom: 5px;
  }

//     &:active {
//     background-color: #007bff; // Fill with color on click
//     color: white;
//   }
`;

const Navbar = () => {
  const [rippleState, setRippleState] = useState({
    home: { x: -1, y: -1, active: false },
    about: { x: -1, y: -1, active: false },
    contact: { x: -1, y: -1, active: false }
  });

  const handleRipple = (event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRippleState({
      ...rippleState,
      [item]: {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
        active: true
      }
    });
    setTimeout(() => setRippleState(prevState => ({
      ...prevState,
      [item]: { ...prevState[item], active: false }
    })), 600);
  };

  return (
    <NavbarContainer>
      <NavbarItem onClick={e => handleRipple(e, 'home')}>
        {rippleState.home.active && <RippleSpan style={{ left: rippleState.home.x, top: rippleState.home.y }} />}
        <FontAwesomeIcon icon={faHome} className="icon" />
        Home
      </NavbarItem>
      <NavbarItem onClick={e => handleRipple(e, 'about')}>
        {rippleState.about.active && <RippleSpan style={{ left: rippleState.about.x, top: rippleState.about.y }} />}
        <FontAwesomeIcon icon={faUser} className="icon" />
        About
      </NavbarItem>
      <NavbarItem onClick={e => handleRipple(e, 'contact')}>
        {rippleState.contact.active && <RippleSpan style={{ left: rippleState.contact.x, top: rippleState.contact.y }} />}
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        Contact
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;

