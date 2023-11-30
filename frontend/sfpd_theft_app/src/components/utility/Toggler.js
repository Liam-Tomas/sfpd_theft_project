// import React from 'react';
// import { func, string } from 'prop-types';
// import styled from "styled-components";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// import Button from './Button'
// import { SunIcon, MoonIcon } from '@heroicons/react/solid'; // for solid icons

// const ToggleContainer = styled.div`
//   position: relative;
//   user-select: none;
//   margin-bottom: 38px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   padding: 13px 17px;
//   border-radius: 50%;
//   justify-content: center;
//   flex-direction: column;
//   transition: background-color 0.6s, box-shadow 0.3s;
//   overflow: hidden;
//   &:hover {
//     box-shadow: 0 0 5px lightgrey;
//   }
//   &:active {
//     transform: scale(0.95);
// }
// `;

// const Toggle = ({ theme, toggleTheme }) => {
//   return (
//     <ToggleContainer theme={theme} onClick={toggleTheme}>
//       {theme === "light" ?
//         <FontAwesomeIcon icon={faSun} fontSize={'1.8rem'}/> :
//         <FontAwesomeIcon icon={faMoon} fontSize={'1.8rem'}/>
//       }
//     </ToggleContainer>
//   );
// };

// Toggle.propTypes = {
//   theme: string.isRequired,
//   toggleTheme: func.isRequired,
// };

// export default Toggle;

import React from 'react';
import { func, string } from 'prop-types';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Button from './Button'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // for solid icons

const StyledSun = styled(SunIcon)`
    width: 24px;
    padding: 12px 15px;
    height: 30px;
    border: 1.5px solid ${props => props.theme.cardLight};
    border-radius: 50%;
    &:hover {
        box-shadow: 0 0 1px ${props => props.theme.primary};

    }


  }
`

const StyledMoon = styled(MoonIcon)`
    width: 24px;
    padding: 12px 15px;
    height: 30px;
    border: 1.5px solid ${props => props.theme.cardLight};
    border-radius: 50%;
    &:hover {
        box-shadow: 0 0 1px ${props => props.theme.primary};

    }


  }
`

const ToggleContainer = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  display: flex;
  margin-bottom: 40px;
  // align-items: center;
  border-radius: 50%;
  // justify-content: center;
  flex-direction: column;
  transition: background-color 0.6s, box-shadow 0.3s;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 1px ${props => props.theme.primary};

}
    &:active {
        transform: scale(0.95);
    }

`;

const Toggle = ({ theme, toggleTheme }) => {
    return (
      <ToggleContainer theme={theme} onClick={toggleTheme}>
        {theme === "light" ?
          <StyledSun className="icon-sun" /> :
          <StyledMoon className="icon-moon" />
        }
      </ToggleContainer>
    );
  };
  

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;