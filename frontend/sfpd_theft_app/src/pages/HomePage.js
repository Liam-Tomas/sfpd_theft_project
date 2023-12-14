
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHospital, faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import flowerIMG from '../images/flowerIMG.jpg'
import flowerDarkIMG from '../images/flowerDarkIMG.jpg'
import rainLightIMG from '../images/rainLightIMG.jpg'
import rainDarkIMG from '../images/rainDarkIMG.jpg'
import glassIMG from '../images/glassIMG.jpg'
import { useTheme } from 'styled-components';
import sfLightIMG from '../images/sfLightIMG.jpg'
import sfDarkIMG from '../images/sfDarkIMG.jpg'

const MainContainer = styled.div`
  margin: 7px 8px 11px 11px;
  position: relative; // Needed for absolute positioning of overlay
  padding-bottom: 53px;
  min-height: 92vh;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
   background: ${(props) =>
        props.theme.mode === 'dark'
            ? `url(${sfLightIMG})`
            : `url(${sfLightIMG})`};
  border-radius: 25px;
  background-size: cover;
  object-fit: contain;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.6)'  // Dark overlay for dark mode
    : 'rgba(255, 255, 255, 0.3)'};  // Light overlay for light mode
      border-radius: 25px;
      z-index: 1;  // Ensure the overlay is above the background
  }
  @media (max-width: 768px) {
    align-items: '';

  }

`;


const ContentContainer = styled.div`
  position: relative; // Position relative to stack above the overlay
  z-index: 2; // Higher z-index than the overlay
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

  }
`;

const IconContainer = styled.h1`
    color: ${props => props.theme.textAlt};
    font-size: 1.1rem;
    background: ${props => props.theme.card};
    padding: 8px 13px;
    border-radius:15px;
    transition: 0.15s ease;
    display:none;
`

const Button = styled.div`
    z-index: 100;  // Ensure the overlay is above the background

  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1976D2; // Example blue color
  background: ${props => props.theme.card};
//   box-shadow: rgba(0, 0, 0, 0.2) 1px 3px 7px 0px;
//   box-shadow: rgba(0, 0, 0, 0.01s) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
//   padding: 24px 15px;
  padding: 25px 30px;
  border-radius: 24px;
  transition: background-color 0.15s ease, border-radius 0.3s ease; // Added border-radius to transition
    &:hover {
        background: ${props => props.theme.buttonHoverBackground};
        ${IconContainer} {
            background: ${props => props.theme.secondary};
            color: ${props => props.theme.backgroundColor};
        }
    }
    &:active {
        border-radius: 50px; // Increased border-radius when active
        ${IconContainer} {
            border-radius: 20px; // Increased border-radius when active
        }
    }

    @media (max-width: 868px) {
        padding: 24px 15px;

    }
`;

const ItemHeader = styled.h2`
    color: ${props => props.theme.text};
    margin: 0px;
    margin-bottom: 5px;
    font-weight: 600;

`

const ItemText = styled.p`
    color: ${props => props.theme.textAlt};
    margin: 0px;

`
const HomeHeader = styled.div`
    text-align: center;
    padding: 2rem;
    margin: 0px 140px;
    @media (max-width: 868px) {
        margin: 0px 0px;
        text-align: left;
    }
`

const HomeTitle = styled.h1`
    font-size: 5rem;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 700;
    @media (max-width: 868px) {
        font-size: 2.8rem;
        margin-top: 20px;
    }
`

const HomeSubText = styled.p`
    // color: ${props => props.theme.textAlt};
    font-weight: 500;
    font-size: 1.35rem;
    line-height:1.5;
    margin: 5px 0px 25px 0px;
    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin-top: 15px;

    }
`

function HomePage() {
    const theme = useTheme(); 

    return (
        <MainContainer>
                  <ContentContainer>

            <HomeHeader>
                <HomeTitle>SFPD Crime Data Analysis</HomeTitle>
                <HomeSubText>Explore detailed visualizations and analysis on various types of crime in San Francisco, using data from the official SFPD Incident Reports covering 2018 to present (updated monthly).</HomeSubText>
            </HomeHeader>
            <ButtonContainer>
                <StyledLink to="/vehicle-theft">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faCar} />
                        </IconContainer>
                        <div>
                            <ItemHeader>Vehicle Break-In Analysis</ItemHeader>
                            <ItemText>Analysis of break-ins and theft from vehicles.</ItemText>
                        </div>
                    </Button>
                </StyledLink>
                <StyledLink to="/mental-health">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faHospital} />
                        </IconContainer>
                        <div>
                            <ItemHeader>Mental Health Incident Analysis</ItemHeader>
                            <ItemText>Analysis of incidents of mental health detention</ItemText>
                        </div>
                    </Button>
                </StyledLink>
                <StyledLink to="/assault">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faChartBar} />
                        </IconContainer>
                        <div>
                            <ItemHeader>Assault Incident Analysis</ItemHeader>
                            <ItemText>Analysis of assault incidents</ItemText>
                        </div>
                    </Button>
                </StyledLink>
                <StyledLink to="/drugs">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faSquarePollVertical} />
                        </IconContainer>
                        <div>
                            <ItemHeader>Drug Arrest Analysis</ItemHeader>
                            <ItemText>Analysis of drug related arrests</ItemText>
                        </div>
                    </Button>
                </StyledLink>
            </ButtonContainer>
            </ContentContainer>
        </MainContainer>
    );
}
export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCar, faHospital, faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
// import flowerIMG from '../images/flowerIMG.jpg'
// import flowerDarkIMG from '../images/flowerDarkIMG.jpg'
// import rainLightIMG from '../images/rainLightIMG.jpg'
// import rainDarkIMG from '../images/rainDarkIMG.jpg'
// import glassIMG from '../images/glassIMG.jpg'
// import { useTheme } from 'styled-components';
// import sfLightIMG from '../images/sfLightIMG.jpg'
// import sfDarkIMG from '../images/sfDarkIMG.jpg'

// const MainContainer = styled.div`
//   margin: 7px 8px 11px 11px;
//   color: ${props => props.theme.text};
//   position: relative; // Needed for absolute positioning of overlay
//   min-height: 42vh;
//   margin-bottom: 60px;
//   display: flex; 
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//    background: ${(props) =>
//         props.theme.mode === 'dark'
//             ? `url(${sfLightIMG})`
//             : `url(${sfLightIMG})`};
//   border-radius: 25px;
//   background-size: cover;
// //   object-fit: contain;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background: ${props => props.theme.mode === 'dark'
//         ? 'rgba(0, 0, 0, 0.75)'  // Dark overlay for dark mode
//         : 'rgba(255, 255, 255, 0.3)'};  // Light overlay for light mode
//       border-radius: 25px;
//       z-index: 1;  // Ensure the overlay is above the background
//   }
//   @media (max-width: 768px) {
//     align-items: '';

//   }

// `;


// const ContentContainer = styled.div`
//   position: relative; // Position relative to stack above the overlay
//   z-index: 2; // Higher z-index than the overlay
//   display: flex;
//   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: inherit;
// `;

// const ButtonContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap:20px;
//   margin: 0px 150px;
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;

//   }
// `;

// const IconContainer = styled.h1`
//     color: ${props => props.theme.textAlt};
//     font-size: 1.1rem;
//     background: ${props => props.theme.card};
//     padding: 8px 13px;
//     border-radius:15px;
//     transition: 0.15s ease;
// `

// const Button = styled.div`
//     z-index: 100;  // Ensure the overlay is above the background

//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background-color: #1976D2; // Example blue color
//   background: ${props => props.theme.card};
//   box-shadow: rgba(0, 0, 0, 0.1) 1px 3px 7px 0px;
//   padding: 24px 15px;
//   border-radius: 24px;
//   transition: background-color 0.15s ease, border-radius 0.3s ease; // Added border-radius to transition
//     &:hover {
//         background: ${props => props.theme.buttonHoverBackground};
//         ${IconContainer} {
//             background: ${props => props.theme.secondary};
//             color: ${props => props.theme.backgroundColor};
//         }
//     }
//     &:active {
//         // border-radius: 30px; // Increased border-radius when active
//         ${IconContainer} {
//             border-radius: 20px; // Increased border-radius when active
//         }
//     }

//     @media (max-width: 868px) {
//         padding: 24px 15px;

//     }
// `;

// const ItemHeader = styled.h2`
//     color: ${props => props.theme.text};
//     margin: 0px;
//     margin-bottom: 5px;
//     font-weight: 600;

// `

// const ItemText = styled.p`
//     color: ${props => props.theme.textAlt};
//     margin: 0px;

// `
// const HomeHeader = styled.div`
//     text-align: center;
//     padding: 2rem;
//     margin: 0px 60px;
//     z-index: 2; // Add a higher z-index


//     @media (max-width: 868px) {
//         margin: 0px 0px;
//         text-align: left;
//     }
// `

// const HomeTitle = styled.h1`
//     font-size: 5rem;
//     margin-top: 0px;
//     margin-bottom: 0px;
//     font-weight: 700;
//     @media (max-width: 868px) {
//         font-size: 2.8rem;
//         margin-top: 20px;
//     }
// `

// const HomeSubText = styled.p`
//     // color: ${props => props.theme.textAlt};
//     font-weight: 500;
//     font-size: 1.35rem;
//     line-height:1.5;
//     margin: 5px 0px 25px 0px;
//     @media (max-width: 868px) {
//         font-size: 1.1rem;
//         margin-top: 15px;

//     }
// `

// function HomePage() {
//     const theme = useTheme();

//     return (
//         <div>
//             <ContentContainer>
//             <MainContainer>
//                     <HomeHeader>
//                         <HomeTitle>SFPD Crime Data Analysis</HomeTitle>
//                         <HomeSubText>Explore detailed visualizations and analysis on various types of crime in San Francisco, using data from the official SFPD Incident Reports covering 2018 to present (updated monthly).</HomeSubText>
//                     </HomeHeader>
//             </MainContainer>
//             <ButtonContainer>
//                 <StyledLink to="/vehicle-theft">
//                     <Button>
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faCar} />
//                         </IconContainer>
//                         <div>
//                             <ItemHeader>Theft From Vehicles Analysis</ItemHeader>
//                             <ItemText>Analysis of car break-ins using SFPD Incident Reports.</ItemText>
//                         </div>
//                     </Button>
//                 </StyledLink>
//                 <StyledLink to="/mental-health">
//                     <Button>
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faHospital} />
//                         </IconContainer>
//                         <div>
//                             <ItemHeader>Mental Health Incident Analysis</ItemHeader>
//                             <ItemText>Analysis of incidents of mental health detention.</ItemText>
//                         </div>
//                     </Button>
//                 </StyledLink>
//                 <StyledLink to="/assault">
//                     <Button>
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faChartBar} />
//                         </IconContainer>
//                         <div>
//                             <ItemHeader>Assault Incident Analysis</ItemHeader>
//                             <ItemText>Analysis of incidents of assault in SF.</ItemText>
//                         </div>
//                     </Button>
//                 </StyledLink>
//                 <StyledLink to="/drugs">
//                     <Button>
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faSquarePollVertical} />
//                         </IconContainer>
//                         <div>
//                             <ItemHeader>Drug Arrest Analysis</ItemHeader>
//                             <ItemText>Analysis of drug related arrests.</ItemText>
//                         </div>
//                     </Button>
//                 </StyledLink>
//             </ButtonContainer>
//         </ContentContainer>
//             </div >
//     );
// }
// export default HomePage;

