
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Toggle from './Toggler';
import { Link } from 'react-router-dom';
import { faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


const NavbarLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Ensures the link color matches your theme
`;

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

const NavbarContainer = styled.div`
  z-index:1000;
  padding: 18px 7px;
  position:fixed;
  // left: 0;
  // top: 0;
  width: 85px;
  height: 100vh;
  background-color: #f8fafc;
  background: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 2px solid ${props => props.theme.borderColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 5px 0px;
`;

const NavbarItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const NavbarItem = styled.div`
  position: relative;
  font-size: .95rem;
  gap:6px;
  font-weight: 600;
  margin: 9px 0;
  cursor: pointer;
  display: flex;
  // align-items: center;
  // justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  transition: background-color 0.8s, box-shadow 0.3s;
  overflow: hidden;
  color: ${props => props.theme.textAlt};
  user-select: none;
  &:hover {
    box-shadow: 0 0 4px ${props => props.theme.hoverShadowColor};
  }
  box-shadow: ${(props) => props.isActive ? '0 0 4px ' + props.theme.hoverShadowColor : 'none'};

`;



// Submenu styled component
const Submenu = styled.div`
  z-index:1000;
  height: 100vh;
  background: ${props => props.theme.backgroundColor};
  position: absolute;
  border-right: 2px solid ${props => props.theme.borderColor};
  left: 98px;
  top: 0;
  width: 200px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  transition: all 0.1s ease;
  transform: translateX(${props => props.isVisible ? '0' : '-30px'});
  opacity: ${props => props.isVisible ? '1' : '0'};

`;

// const SubMenuItem = styled(Link)`
//   font-size: .9rem;
//   display: flex;
//   padding:10px 10px;
//   text-decoration: none;
//   border-radius: 25px;
//   background: red;
//   color: inherit; // Ensures the link color matches your theme
//   &:hover {
//     box-shadow: 0 0 4px ${props => props.theme.hoverShadowColor};
//   }
//   `;


const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation(); // This line gets the current location
  const [showSubmenu, setShowSubmenu] = useState(false); // New state to control submenu visibility
  const [isHovering, setIsHovering] = useState({ dashboard: false, submenu: false });

  const [rippleState, setRippleState] = useState({
    home: { x: -1, y: -1, active: false },
    about: { x: -1, y: -1, active: false },
    contact: { x: -1, y: -1, active: false },
    toggle: { x: -1, y: -1, active: false },
    dashboard: { x: -1, y: -1, active: false }

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
      <NavbarItems>
        <NavbarLink to="/">
          <NavbarItem
            onClick={e => handleRipple(e, 'home')}
            isActive={location.pathname === '/'} // Correct prop syntax
          >
            {rippleState.home.active && <RippleSpan style={{ left: rippleState.home.x, top: rippleState.home.y }}
            />}
            <FontAwesomeIcon icon={faHome} className="icon" />
            Home
          </NavbarItem>
        </NavbarLink>
        <NavbarItem 
          onClick={e => handleRipple(e, 'about')}
        >
          {rippleState.about.active && <RippleSpan style={{ left: rippleState.about.x, top: rippleState.about.y }} />}
          <FontAwesomeIcon icon={faUser} className="icon" />
          About
        </NavbarItem>
        <NavbarItem onClick={e => handleRipple(e, 'contact')}>
          {rippleState.contact.active && <RippleSpan style={{ left: rippleState.contact.x, top: rippleState.contact.y }} />}
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          Contact
        </NavbarItem>
        <div
         onMouseEnter={() => setShowSubmenu(true)} // Show submenu on mouse enter
         onMouseLeave={() => setShowSubmenu(false)} // Hide submenu on mouse leave
        >
         <NavbarItem

          onClick={e => handleRipple(e, 'dashboard')}
          isActive={location.pathname === '/vehicle-theft' || location.pathname === '/mental-health'} // Correct prop syntax
        >
          {rippleState.dashboard.active && <RippleSpan style={{ left: rippleState.dashboard.x, top: rippleState.dashboard.y }} />}
          <FontAwesomeIcon icon={faChartBar} />
          D'board

        </NavbarItem>
        </div>
      </NavbarItems>
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    </NavbarContainer>
    
  );
};


export default Navbar;

