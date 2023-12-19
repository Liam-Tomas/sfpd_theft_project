
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
import sfLightIMGNew from '../images/sfLightIMG_new.jpg'
import { useTheme } from 'styled-components';
import sfLightIMG from '../images/sfLightIMG.jpg'
import sfDarkIMG from '../images/sfDarkIMG.jpg'
import LargeButton from '../components/utility/LargeButton';
import Footer from '../components/utility/Footer';

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
//   background: ${props => props.theme.cardOpp};
  border-radius: 25px;
  background-size: cover;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.6)'
        : 'rgba(255, 255, 255, 0.3)'};  // Light overlay for light mode
      border-radius: 25px;
      z-index: 1;  // Ensure the overlay is above the background
  }
  
  @media (max-width: 868px) {
    background: ${props => props.theme.backgroundColor};
    margin: 10px 15px 10px 15px;
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
  gap:20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 15px;
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
    gap: 10px;
    background-color: #1976D2; // Example blue color
    background: ${props => props.theme.cardOpp};

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
        padding: 24px 20px;
        // box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 15px 0px;  
        &:hover {
            background: ${props => props.theme.card};


    }
`;

const ItemHeader = styled.h2`
    color: ${props => props.theme.text};
    margin: 0px;
    
    margin-bottom: 5px;
    font-weight: 600;
    @media (max-width: 868px) {
        font-size: 1.3rem;
    }

`

const ItemText = styled.p`
    color: ${props => props.theme.textAlt};
    margin: 0px;

`
const HomeHeader = styled.div`
    text-align: center;
    // padding: 2rem;
    z-index: 2; // Higher z-index than overlay
    margin: 0px 140px;
    position: relative; // Added for z-index context
    padding-top: 0px;

`;

const TextContent = styled.div`
    position: relative;
    z-index: 3; // Ensure this is above the ::before pseudo-element
    // Add your text styles here
`;

const HomeTitle = styled.h1`
    font-size: 5rem;
    margin-top: 0px;
    margin-bottom: 0px;
    z-index: 2; // Higher z-index than overlay
    font-weight: 600;
    letter-spacing: -.5px;
    @media (max-width: 868px) {
        font-size: 2.2rem;
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
        margin: 0px;
        margin-top: 15px;

    }
`

const ProjectHeader = styled.h1`
    margin-bottom: 10px;
    color: ${props => props.theme.text};
    // font-size: 38px;
    margin-left: 20px;
    font-weight: 600;

    @media (max-width: 868px) {
        font-size: 36px;
        margin-bottom: 0px;
    }
    
`

const ProjectSub = styled.p`
    margin: 0px;
    margin-left: 20px;
    margin-bottom: 50px;
    font-size: 1.15rem;
    line-height: 1.5;
    padding-right: 400px;
    color: ${props => props.theme.textAlt};

`

const HomeButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`

const DashContainer = styled.div`
    margin: 85px 110px 100px 110px;

`

function HomePage() {
    const theme = useTheme();

    return (
        <HomeContainer>
            <MainContainer>
                <ContentContainer>

                    <HomeHeader>
                        <TextContent>
                            <HomeTitle>SFPD Crime Data Analysis</HomeTitle>
                            <HomeSubText>Explore dynamic visualizations and analysis on crime in San Francisco, sourced from official SFPD Incident Reports covering 2018 to present (updated every week).</HomeSubText>
                        </TextContent>
                        <HomeButtonContainer>
                            <StyledLink to="/full-heatmap">

                                <LargeButton
                                    backgroundColor="#2564d4"
                                    color="#ffff"
                                    hoverBackgroundColor="#3b7ef5"
                                >
                                    View Map
                                </LargeButton>
                            </StyledLink>
                            <StyledLink to="/vehicle-theft">

                                <LargeButton
                                    backgroundColor="#aeccfb"
                                    color="#072e6f"
                                    hoverBackgroundColor="#c1dbfd"
                                >Dashboards
                                </LargeButton>
                            </StyledLink>
                        </HomeButtonContainer>
                    </HomeHeader>

                </ContentContainer>
            </MainContainer>
            <DashContainer>
                <ProjectHeader>Interactive Dashboards</ProjectHeader>
                <ProjectSub>Explore dashboards featuring dynamic visualizations. Search your address and get a crime assessment for your immediate neighborhood.</ProjectSub>
                <ButtonContainer>
                    <StyledLink to="/vehicle-theft">
                        <Button>
                            <IconContainer>
                                <FontAwesomeIcon icon={faCar} />
                            </IconContainer>
                            <div>
                                <ItemHeader>Vehicle Break-In Analysis</ItemHeader>
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
                                <ItemHeader>Mental Health Incident Analysis</ItemHeader>
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
                                <ItemText>Analysis of drug arrests</ItemText>
                            </div>
                        </Button>
                    </StyledLink>
                </ButtonContainer>
            </DashContainer>
            <Footer />
        </HomeContainer>
    );
}
export default HomePage;