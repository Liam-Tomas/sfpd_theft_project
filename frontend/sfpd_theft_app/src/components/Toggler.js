import React from 'react';
import { func, string } from 'prop-types';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Button from './Button'

const ToggleContainer = styled.div`
  position: relative;
  user-select: none;
  margin-bottom: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 50%;
  justify-content: center;
  flex-direction: column;
  transition: background-color 0.6s, box-shadow 0.3s;
  overflow: hidden;
  color: ${props => props.theme.textAlt};
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer theme={theme} onClick={toggleTheme}>
      {theme === "light" ?
        <FontAwesomeIcon icon={faSun} fontSize={'2rem'}/> :
        <FontAwesomeIcon icon={faMoon} fontSize={'2rem'}/>
      }
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
