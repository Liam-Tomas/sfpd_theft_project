import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleInfo, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Toggle from './Toggler';
import { Link } from 'react-router-dom';
import { faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { HomeIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

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
    width: 280px;

    z-index: 2500; // Ensure it is above the HamBar
    transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '-100%'});
    transition: transform 0.2s ease;
  }
`;



const NavbarLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Ensures the link color matches your theme
`;

const NavbarItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 868px) {
    align-items: flex-start; // Align items to the left
    margin: 50px 0px 0px 40px;
    width: 100%;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  padding: 7.5px 17.5px;
  border-radius: 20px;
  background-color: ${({ $isActive, theme }) => $isActive ? theme.buttonHoverBackground : 'none'};
  color: ${({ $isActive, theme }) => $isActive ? theme.secondary : 'none'};
  transition: background-color 0.15s;
  @media (max-width: 868px) {
    font-size: 1.2rem;
  }

`

const NavbarItem = styled.div`
  position: relative;
  gap: 1px;
  font-size: .8rem;
  align-items: center;
  font-weight: 400;
  margin: 9px 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 4px 17px;
  // transition: background-color 0.2s, box-shadow 0.3s;
  // overflow: hidden;
  color: ${props => props.theme.textAlt};
  user-select: none;
  color: ${({ $isActive, theme }) => $isActive ? theme.text : 'none'};


  &:hover {
    color: ${props => props.theme.text};
    ${StyledIcon} {
      background-color: ${({ $isActive, theme }) => $isActive ? theme.buttonHoverBackground : theme.card2};
    }
  }
    
  &:active {
    color: ${props => props.theme.text};
    
    ${StyledIcon} {
      transform: scale(.92);
    }
  }

  @media (max-width: 868px) {
    width: 215px;
    background-color: ${({ $isActive, theme }) => $isActive ? theme.buttonHoverBackground : 'none'};

    border-radius: 20px;
    padding: 4px 25px 4px 0px;
    gap:5px;
    font-size: 1.1rem;
    flex-direction: row; // Change to row in mobile mode
    &:hover {
        background-color: ${props => props.theme.buttonHoverBackground};
     
      }
  

`;

const slideIn = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SubMenu = styled.div`
animation: ${slideIn} 0.3s forwards;
display: ${props => props.isVisible ? 'flex' : 'none'};
opacity: 0;  // Start with the submenu invisible
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
  @media (max-width: 868px) {
    display: none;
  }
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

const HamBar = styled.div`
  display: none; // Hidden by default
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; // Full width
  background: ${props => props.theme.backgroundColor}; // Adjust the background as needed
  padding: 18px 0px;
  z-index: 2100; // Ensure it is above the HamBar
  @media (max-width: 868px) {
    display: flex; // Show only on mobile screens
    justify-content: space-between;
    align-items: center;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  z-index: 2200; // Ensure it is above the HamBar
  border: none;
  color: ${props => props.theme.textAlt};
  cursor: pointer;
  font-size: 24px;
`;



const MobileHamburgerButton = styled(HamburgerButton)`
  display: none; // Hidden by default
  top: 0;
  left: 0;
  padding: 18px 20px;
  @media (max-width: 868px) {
    display: block; // Show only on mobile screens
    position: absolute; // Use static or adjust as needed within the container
  }
`;

const SubmenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: ${props => props.theme.cardLighter};
  z-index: 3000; // Higher than the NavbarContainer
  transform: translateX(${({ $isSubmenuOpen }) => $isSubmenuOpen ? '0' : '-100%'});
  transition: transform 0.2s ease;
  display: none; // Hidden by default

  @media (max-width: 868px) {
    display: flex; // Show only on mobile screens
    flex-direction: column;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: ${props => props.theme.primary};
  cursor: pointer;
  font-size: 1.1em;
  padding: 15px;
`;

const MobileSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation(); // This line gets the current location
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  let navbarContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  let submenuRef = useRef(null);

  const handleMouseEnter = () => {
    setIsSubmenuVisible(true);
  };

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleDashboardClick = () => {
    setIsSubmenuOpen(true);
    setActiveMenuItem('dashboard');
  };

  const handleBackClick = () => {
    setIsSubmenuOpen(false);
    setActiveMenuItem(null);
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
    closeMenu(); // Add this line to close the menu
    closeSubmenu();
  };

  const handleAboutClick = (e) => {
    handleRipple(e, 'about');
    closeSubmenu();
  };

  // Handler to close both the submenu and the main menu
  const handleSubmenuItem = () => {
    setIsMenuOpen(false); // Close the main menu
    setIsSubmenuOpen(false); // Close the submenu
  };


  return (
    <div>
      <NavbarContainer $isOpen={isMenuOpen} ref={navbarContainerRef}>
        <MobileHamburgerButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </MobileHamburgerButton>

        <NavbarItems>
          <NavbarLink to="/">
            <NavbarItem
              onClick={handleHomeClick}
              $isActive={location.pathname === '/'}
            >
              {/* {rippleState.home.active && <RippleSpan style={{ left: rippleState.home.x, top: rippleState.home.y }}/>} */}
              <StyledIcon icon={faHome} $isActive={location.pathname === '/'} />
              {/* <StyledHomeIcon  isActive={location.pathname === '/'}/> */}
              Home
            </NavbarItem>
          </NavbarLink>
          <NavbarLink to="/about">
            <NavbarItem
              onClick={handleHomeClick}
              $isActive={location.pathname === '/about'}
            >
              {/* {rippleState.about.active && <RippleSpan style={{ left: rippleState.about.x, top: rippleState.about.y }} />} */}
              <StyledIcon icon={faCircleInfo} $isActive={location.pathname === '/about'} />
              About
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/contact">
            <NavbarItem
              onClick={handleHomeClick}
              $isActive={location.pathname === '/contact'}
            >
              <StyledIcon icon={faEnvelope} $isActive={location.pathname === '/contact'} />
              Contact
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/map">

            <NavbarItem
              onClick={handleHomeClick}
              $isActive={location.pathname === '/map'}
            >
              <StyledIcon icon={faMap} $isActive={location.pathname === '/map'} />
              Map
            </NavbarItem>
          </NavbarLink>

          <NavbarItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDashboardClick}
            $isActive={location.pathname === '/vehicle-theft' || location.pathname === '/mental-health' || location.pathname === '/assault' || location.pathname === '/drugs'}
          >
            {/* {rippleState.dashboard.active && <RippleSpan style={{ left: rippleState.dashboard.x, top: rippleState.dashboard.y }} />} */}
            <StyledIcon icon={faChartBar} $isActive={location.pathname === '/vehicle-theft' || location.pathname === '/mental-health' || location.pathname === '/assault' || location.pathname === '/drugs'} />
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
      <SubmenuOverlay $isSubmenuOpen={isSubmenuOpen}>
        <BackButton onClick={handleBackClick}>Back</BackButton>
        <MobileSubContainer>
          <SubMenuItem to="/vehicle-theft" onClick={handleSubmenuItem}>Car Break-in Analysis</SubMenuItem>
          <SubMenuItem to="/mental-health" onClick={handleSubmenuItem}>Mental Health Analysis</SubMenuItem>
          <SubMenuItem to="/assault" onClick={handleSubmenuItem}>Assault Analysis</SubMenuItem>
          <SubMenuItem to="/drugs" onClick={handleSubmenuItem}>Drug Analysis</SubMenuItem>
        </MobileSubContainer>
      </SubmenuOverlay>
      <HamBar>
        <HamburgerButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </HamburgerButton>
      </HamBar>
    </div>
  );
};


export default Navbar;

