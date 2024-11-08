
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHospital, faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import flowerIMG from '../images/flowerIMG.jpg'
import flowerDarkIMG from '../images/flowerDarkIMG.jpg'
import rainLightIMG from '../images/rainLightIMG.jpg'
import rainDarkIMG from '../images/rainDarkIMG.jpg'
import glassIMG from '../images/glassIMG.jpg'
import sfLightIMGNew from '../images/sfLightIMG_new.jpg'
import { useTheme } from 'styled-components';
import sfLightIMG from '../images/sfLightIMG.jpg'
import sfDarkIMG from '../images/sfDarkIMG.jpg'
import LargeButton from '../components/utility/LargeButton';
import Footer from '../components/utility/Footer';
import RiskCalcHome from '../components/charts/RiskCalcHome';
import Select from 'react-select';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const HomeContainer = styled.div`
    background: ${props => props.theme.backgroundOpp};

`
const MainContainer = styled.div`
  margin: 10px 13px 11px 12px;
  position: relative; // Needed for absolute positioning of overlay
  min-height: 65vh;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
        props.theme.mode === 'dark'
            ? `url(${sfLightIMGNew})`
            : `url(${sfLightIMGNew})`};
  background: ${props => props.theme.cardOpp};
  border-radius: 25px;
  background-size: cover;
  
  @media (max-width: 868px) {
    @media (max-height: 750px) {
        min-height: 70vh;
    }
    @media (max-height: 700px) {
        min-height: 75vh;
    }
    margin: 70px 15px 10px 15px;
    &:before {
        display: none; // Remove the overlay for mobile devices
      }

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
  gap:15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
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
    background-color: #1976D2; // Example blue color
    background: ${props => props.theme.cardOpp};

    padding: 28px 25px;
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
        padding: 24px 20px;
        // box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 15px 0px;  
        &:hover {
            background: ${props => props.theme.card};


    }
`;

const ItemHeader = styled.h2`
    color: ${props => props.theme.text};
    margin: 0px;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 500;
    @media (max-width: 868px) {
        font-size: 1.3rem;
    }

`

const ItemText = styled.p`
    color: ${props => props.theme.textAlt};
    margin: 0px;
    font-size: 18px;

`
const HomeHeader = styled.div`
    text-align: center;
    // padding: 2rem;
    z-index: 2; // Higher z-index than overlay
    margin: 0px 230px;
    position: relative; // Added for z-index context
    padding-top: 0px;

    @media (max-width: 868px) {
        margin: 0px;
        margin-top:10px;
        
    }


`;

const TextContent = styled.div`
    position: relative;
    z-index: 3; // Ensure this is above the ::before pseudo-element
    // Add your text styles here
`;

const HomeTitle = styled.h1`
    font-size: 100px;
    margin-top: 0px;
    margin-bottom: 0px;
    z-index: 2; // Higher z-index than overlay
    font-weight: 500;
    @media (max-width: 868px) {
        font-size: 42px;
    }
`

const HomeSubText = styled.p`
    color: ${props => props.theme.textAlt};
    font-weight: 400;
    font-size: 22px;
    line-height: 1.5;
    margin: 8px 0px 29px 0px;
    max-width: 900px; // Sets a maximum width
    // padding: 0 5%; // Adds responsive padding on left and right
    text-align: center; // Centers text

    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin: 0px;
        margin-top: 15px;
        padding: 0 3%; // Adjust padding for smaller screens
    }
`;


const ProjectHeader = styled.h1`
    margin-bottom: 10px;
    color: ${props => props.theme.text};
    font-size: 45px;
    margin-left: 20px;
    font-weight: 500;

    @media (max-width: 868px) {
        font-size: 28px;
        margin-bottom: 10px;
    }
    
`

const ProjectSub = styled.p`
    margin: 0px;
    margin-left: 20px;
    margin-bottom: 40px;
    font-size: 22px;
    line-height: 1.5;
    max-width: 700px;
    color: ${props => props.theme.textAlt};
    @media (max-width: 868px) {
        font-size: 18px;
        margin-bottom: 20px;
    }
    

`

const HomeButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;

    @media (max-width: 868px) {
        flex-direction: column;
        margin-top: 20px;
      }
`

const DashContainer = styled.div`
    margin: 140px 110px 155px 110px;

    @media (max-width: 868px) {
        margin: 0px;
        margin-bottom: 50px;
        padding: 10px;
      }

`
const FooterContainer = styled.div`
    // margin: 0px 100px 0px 100px;
    @media (max-width: 868px) {
        margin: 0px;
        padding: 10px;
        font-size: .1rem;
      }
`

const SearchButton = styled.div`
    position: absolute; 
    top: 15px; 
    right: 15px;
    padding: 19px 21px;
    background-color: ${props => props.theme.searchColor};
    color: ${props => props.theme.textAlt};
    border-radius: 18px; 
    cursor: pointer; 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: 0.15s;
    font-size: 15px;
    &:hover {
        background-color: ${props => props.theme.searchHover};
    }
    @media (max-width: 868px) {
        top: 15px; 
        right: 15px; 
        font-size: 16px;
        padding: 14px 19px;

      }
`;


const SearchText = styled.span`
    margin-left: 10px;
    font-size: 15px;
    font-weight: 500;

`

const SquigglyLine = ({ color = 'black', width = 1.5 }) => (
    <svg width="100%" height="20" viewBox="0 0 2000 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 Q25,-10 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10 T550,10 T600,10 T650,10 T700,10 T750,10 T800,10 T850,10 T900,10 T950,10 T1000,10 T1050,10 T1100,10 T1150,10 T1200,10 T1250,10 T1300,10 T1350,10 T1400,10 T1450,10 T1500,10 T1550,10 T1600,10 T1650,10 T1700,10 T1750,10 T1800,10 T1850,10 T1900,10 T1950,10 T2000,10" stroke={color} fill="none" strokeWidth={width} />
    </svg>
);

function HomePage() {
    const theme = useTheme();

    return (
        <HomeContainer>
            <MainContainer>
                <StyledLink to="/search">
                     <SearchButton>
                        <FontAwesomeIcon icon={faSearch} /> 
                        <SearchText>Search Address</SearchText>
                    </SearchButton>
                </StyledLink>

                <ContentContainer>
                    <HomeHeader>
                        <TextContent>
                            <HomeTitle>SF Crime Map</HomeTitle>
                            {/* <HomeSubText>Explore dynamic visualizations of crime data in San Francisco, sourced from official SFPD Reports covering 2018 to present, updated every week.</HomeSubText> */}
                            <HomeSubText>Explore San Francisco crime data: View interactive maps, get neighborhood crime reports by address, and see detailed dashboards for various crime types.</HomeSubText>
                        </TextContent>
                        <HomeButtonContainer>
                            <StyledLink to="/map">

                                <LargeButton
                                    backgroundColor={theme.primary}
                                    color={theme.primaryText}
                                >
                                    View Map

                                </LargeButton>
                            </StyledLink>
                            <StyledLink to="/vehicle-theft">
                                <LargeButton
                                    backgroundColor={theme.buttonSubtle}
                                    color={theme.text}
                                    hoverBackgroundColor={theme.buttonSubtleHover}
                                >Dashboards
                                </LargeButton>
                            </StyledLink>
                            <StyledLink to="/vehicle-theft">
                            </StyledLink>
                        </HomeButtonContainer>
                    </HomeHeader>
                </ContentContainer>
            </MainContainer>

            <DashContainer>
                <ProjectHeader>Interactive Dashboards</ProjectHeader>
                <ProjectSub>View comprehensive dashboards on SF crime data.</ProjectSub>
                <ButtonContainer>
                    <StyledLink to="/vehicle-theft">
                        <Button>
                            <IconContainer>
                                <FontAwesomeIcon icon={faCar} />
                            </IconContainer>
                            <div>
                                <ItemHeader>Vehicle Break-In Dashboard</ItemHeader>
                                <ItemText>Analysis of vehicle break-ins</ItemText>
                            </div>
                        </Button>
                    </StyledLink>
                    <StyledLink to="/mental-health">
                        <Button>
                            <IconContainer>
                                <FontAwesomeIcon icon={faHospital} />
                            </IconContainer>
                            <div>
                                <ItemHeader>Mental Health Incident Dashboard</ItemHeader>
                                <ItemText>Analysis of mental health detention</ItemText>
                            </div>
                        </Button>
                    </StyledLink>
                    <StyledLink to="/assault">
                        <Button>
                            <IconContainer>
                                <FontAwesomeIcon icon={faChartBar} />
                            </IconContainer>
                            <div>
                                <ItemHeader>Assault Incident Dashboard</ItemHeader>
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
                                <ItemHeader>Drug Arrest Dashboard</ItemHeader>
                                <ItemText>Analysis of drug arrests</ItemText>
                            </div>
                        </Button>
                    </StyledLink>

                </ButtonContainer>
            </DashContainer>

            <SquigglyLine color={theme.cardLight} />  {/* Squiggly line divider */}

            <RiskCalcHome />
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </HomeContainer>
    );
}
export default HomePage;