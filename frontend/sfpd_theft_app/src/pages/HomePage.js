
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

const MainContainer = styled.div`
  margin: 7px 8px 11px 11px;
  padding-bottom: 53px;
  z-index: -100;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//   background: ${(props) =>
    props.theme.mode === 'dark'
      ? `url(${rainDarkIMG})`
      : `url(${rainLightIMG})`};
  border-radius: 25px;
  background-size: cover;
  object-fit: contain;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:20px;
`;

const IconContainer = styled.h1`
    color: ${props => props.theme.textAlt};
    font-size: 1.1rem;
    background: ${props => props.theme.card};
    padding: 8px 13px;
    border-radius:15px;
    transition: 0.25s ease;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1976D2; // Example blue color
  background: ${props => props.theme.card};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 15px 0px;
  padding: 24px 15px;
  border-radius: 24px;
  transition: background-color 0.2s ease, border-radius 0.3s ease; // Added border-radius to transition
  &:hover {
    background: ${props => props.theme.backgroundColor};
    }
    &:hover {
        background: ${props => props.theme.buttonHoverBackground};
        ${IconContainer} {
            background: ${props => props.theme.secondary};
            color: ${props => props.theme.backgroundColor};
        }
    }
    &:active {
        border-radius: 30px; // Increased border-radius when active
        ${IconContainer} {
            border-radius: 20px; // Increased border-radius when active
        }
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
    width: 1020px;
`

const HomeTitle = styled.h1`
    font-size: 5rem;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 700;

`

const HomeSubText = styled.p`
    // color: ${props => props.theme.textAlt};
    font-weight: 500;
    font-size: 1.4rem;
    line-height:1.5;
    margin: 5px 0px 25px 0px;

`


// const StyledIcon = styled.h1`
//     color: ${props => props.theme.textAlt};
//     font-size: 1.7rem;
    
// `

function HomePage() {
    const theme = useTheme(); // Access the current theme

    return (
        <MainContainer>
            <HomeHeader>
                <HomeTitle>SFPD Crime Data Analysis</HomeTitle>
                <HomeSubText>Explore in-depth analysis and visualizations on various categories of crime in San Francisco using the offical SFPD Incident Report (2018 - 2023).</HomeSubText>
            </HomeHeader>
            <ButtonContainer>
                <StyledLink to="/vehicle-theft">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faCar} /> 
                        </IconContainer>
                        <div>
                            <ItemHeader>Theft From Vehicles Analysis</ItemHeader>
                            <ItemText>Analysis of car break-ins using SFPD Incident Reports.</ItemText>
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
                            <ItemText>Analysis of incidents of mental health detention.</ItemText>
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
                            <ItemText>Analysis of incidents of assault in SF.</ItemText>
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
                            <ItemText>Analysis of drug related arrests.</ItemText>
                        </div>   
                    </Button>
                </StyledLink>
            </ButtonContainer>
        </MainContainer>
    );
}
export default HomePage;
