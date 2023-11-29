import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHospital, faChartBar, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

const MainContainer = styled.div`
  padding: 40px;
  display:flex;
  flex-direction:column;
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
//   margin: 0px 100px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
  background-color: #1976D2; // Example blue color
  background: ${props => props.theme.card};
  box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px;
  padding: 35px 35px;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  &:hover {
    background: ${props => props.theme.backgroundColor};
}
&:hover {
    background: ${props => props.theme.buttonHoverBackground};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 0px;

}
`;

const ItemHeader = styled.h2`
    color: ${props => props.theme.text};
    margin: 0px;
    margin-bottom: 10px;

`

const ItemText = styled.p`
    color: ${props => props.theme.textAlt};
    margin: 0px;

`
const HomeHeader = styled.div`
    text-align: center;
    padding: 2rem;
    width: 800px;
`

const HomeTitle = styled.h1`
    color: ${props => props.theme.textAlt};
    font-size: 3rem;
    margin-bottom: 0px;
    
`

const HomeSubText = styled.p`
    color: ${props => props.theme.textAlt};
    font-size: 1.3rem;
    line-height:1.5;


`

const IconContainer = styled.h1`
    color: ${props => props.theme.textAlt};
    font-size: 1.7rem;
    
`
function HomePage() {
    return (
        <MainContainer>
            <HomeHeader>
                <HomeTitle>SF Crime Analysis</HomeTitle>
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
                <StyledLink to="/">
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
                <StyledLink to="/">
                    <Button>
                        <IconContainer>
                            <FontAwesomeIcon icon={faSquarePollVertical} />                       
                             </IconContainer>
                        <div>
                            <ItemHeader>Other Analysis</ItemHeader>
                            <ItemText>Analysis of incidents of mental health detention.</ItemText>
                        </div>   
                    </Button>
                </StyledLink>
            </ButtonContainer>
        </MainContainer>
    );
}
export default HomePage;
