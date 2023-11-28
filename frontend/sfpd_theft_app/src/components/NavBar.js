import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Toggle from './Toggler';

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
  width: 85px;
  height: 100vh;
  background-color: #f8fafc;
  background: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
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
  color: ${props => props.theme.textAlt};
  user-select: none;
  &:hover {
    box-shadow: 0 0 5px ${props => props.theme.hoverShadowColor};
  }

  .icon {
    margin-bottom: 5px;
  }
`;



const Navbar = ({ theme, toggleTheme }) => {
    const [rippleState, setRippleState] = useState({
        home: { x: -1, y: -1, active: false },
        about: { x: -1, y: -1, active: false },
        contact: { x: -1, y: -1, active: false },
        toggle: { x: -1, y: -1, active: false }
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
            </NavbarItems >
            <Toggle theme={theme} toggleTheme={toggleTheme} />
        </NavbarContainer>
    );
};

export default Navbar;
