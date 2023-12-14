import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Toggle from './Toggler';
import { Link } from 'react-router-dom';
import { faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavbarContainer = styled.div`
  z-index:1000;
  padding: 15px 0px;
  position:fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #f8fafc;
  background: ${props => props.theme.cardLighter};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // border-right: 1px solid ${props => props.theme.borderColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 5px 0px;

  @media (max-width: 868px) {
    width: 80px; // Adjust width as needed
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

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
  z-index: 1000;
  background-color: ${props => props.theme.buttonHoverBackground};
  background-color: ${props => props.theme.cardLighter};
  transform: scale(0);
  animation: ${rippleAnimation} 600ms linear;
  width: 100%;
  height: 100%;
`;



const NavbarItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  padding: 7.5px 17.5px;
  border-radius: 20px;
  background-color: ${(props) => props.isActive ? props.theme.buttonHoverBackground : 'none'};
  color: ${(props) => props.isActive ? props.theme.text : 'none'};
  transition: background-color 0.15s;

`

const NavbarItem = styled.div`
  position: relative;
  gap: 1px;
  font-size: .8rem;
  align-items: center;
  font-weight: 500;
  margin: 9px 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 4px 17px;
  // transition: background-color 0.2s, box-shadow 0.3s;
  // overflow: hidden;
  color: ${props => props.theme.textAlt};
  user-select: none;
  color: ${(props) => props.isActive ? props.theme.text : 'none'};
  &:hover {
    color: ${props => props.theme.text};
    ${StyledIcon} {
      background-color: ${props => props.theme.buttonHoverBackground};
    }
  &:active {
    color: ${props => props.theme.text};
    
    ${StyledIcon} {
      transform: scale(.92);
    }
  }
`;

const SubMenu = styled.div`
  position: absolute;
  height:100vh;
  background-color: ${props => props.theme.cardLighter};
  top: 0;
  left: 100%; // Adjust as needed to position correctly
  width: 200px; 
  z-index: 100; 
  display: flex;
  flex-direction: column;
  border-rdaius: 15px;
  gap: 10px;
  padding: 25px 15px 15px 15px;
  box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.2); // Adjust as needed
  border-left: 1px solid ${props => props.theme.cardLight};

`;

const SubMenuItem = styled(Link)`
  text-decoration: none;
  transition: background-color 0.15s;
  font-size: .95rem;
  color: inherit; // Ensures the link color matches your theme
  padding: 10px 15px;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
  &:active {
    transform: scale(.98);
`;

const HamburgerButton = styled.button`
  background: none;
  color :red;
  border: none;
  display: none; // Hidden by default
  cursor: pointer;
  font-size: 24px;
  position: fixed;
  top: 10px; // Adjust the position as needed
  left: 10px;
  z-index: 1100; // Make sure it's above other elements

  @media (max-width: 768px) {
    display: block; // Show only on mobile screens
  }
`;

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation(); // This line gets the current location
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  let navbarContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let submenuRef = useRef(null);

  const handleMouseEnter = () => {
    setIsSubmenuVisible(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = (e) => {
    // Ensure that relatedTarget exists and is a Node
    if (!e.relatedTarget || !(e.relatedTarget instanceof Node)) {
      setIsSubmenuVisible(false);
      return;
    }

    // Check if the mouse is still within the NavbarContainer
    if (navbarContainerRef.current && !navbarContainerRef.current.contains(e.relatedTarget)) {
      setIsSubmenuVisible(false);
    }
  };

  const closeSubmenu = () => {
    setIsSubmenuVisible(false);
  };



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

  const handleHomeClick = (e) => {
    handleRipple(e, 'home');
    closeSubmenu();
  };

  const handleAboutClick = (e) => {
    handleRipple(e, 'about');
    closeSubmenu();
  };

  return (
    <div>
      <NavbarContainer isOpen={isMenuOpen} ref={navbarContainerRef}>
        <NavbarItems>
          <NavbarLink to="/">
            <NavbarItem
              onClick={handleHomeClick}
            >
              {/* {rippleState.home.active && <RippleSpan style={{ left: rippleState.home.x, top: rippleState.home.y }}/>} */}
              <StyledIcon icon={faHome} isActive={location.pathname === '/'} // Correct prop syntax
              />
              Home
            </NavbarItem>
          </NavbarLink>
          <NavbarLink to="/about">
            <NavbarItem
              onClick={handleAboutClick}
            >
              {/* {rippleState.about.active && <RippleSpan style={{ left: rippleState.about.x, top: rippleState.about.y }} />} */}
              <StyledIcon icon={faUser} isActive={location.pathname === '/about'} />
              About
            </NavbarItem>
          </NavbarLink>
          <NavbarLink to="/contact">

            <NavbarItem onClick={handleAboutClick}>
              {/* {rippleState.contact.active && <RippleSpan style={{ left: rippleState.contact.x, top: rippleState.contact.y }} />} */}
              <StyledIcon icon={faEnvelope} isActive={location.pathname === '/contact'} />
              Contact
            </NavbarItem>
          </NavbarLink>

          <NavbarItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={e => handleRipple(e, 'dashboard')}
          >
            {/* {rippleState.dashboard.active && <RippleSpan style={{ left: rippleState.dashboard.x, top: rippleState.dashboard.y }} />} */}
            <StyledIcon icon={faChartBar} isActive={location.pathname === '/vehicle-theft' || location.pathname === '/mental-health' || location.pathname === '/assault' || location.pathname === '/drugs'} />
            D'board
          </NavbarItem>


          {isSubmenuVisible && (
            <SubMenu ref={submenuRef} onMouseLeave={handleMouseLeave}>
              <SubMenuItem to="/vehicle-theft" onClick={closeSubmenu}>Car Break-in Analysis</SubMenuItem>
              <SubMenuItem to="/mental-health" onClick={closeSubmenu}>Mental Health Analysis</SubMenuItem>
              <SubMenuItem to="/assault" onClick={closeSubmenu}>Assault Analysis</SubMenuItem>
              <SubMenuItem to="/drugs" onClick={closeSubmenu}>Drug Analysis</SubMenuItem>
            </SubMenu>
          )}

        </NavbarItems>

        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </NavbarContainer>
      <HamburgerButton onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </HamburgerButton>
    </div>
  );
};


export default Navbar;

