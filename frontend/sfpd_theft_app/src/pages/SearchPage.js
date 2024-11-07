import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyButton from '../components/utility/Button';
import { useTheme } from 'styled-components';
import RiskCalcMain from '../components/charts/RiskCalcHome';

const MainContainer = styled.div`
  margin: 11px 11px 11px 12px;
  padding-left: 30px;
  padding-right: 360px;
  color: ${props => props.theme.text};
  position: relative; // Needed for absolute positioning of overlay
  min-height: 35vh;
  margin-bottom: 60px;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-size: cover;
  background: ${props => props.theme.cardOpp};


  @media (max-width: 900px) {
    padding: 10px;
    min-height: 250px;

    margin-top: 70px;

    }

`;

const ContentContainer = styled.div`
    @media (max-width: 900px) {
        margin: 70px 0px 0px 0px;
    }


`;

const HomeHeader = styled.div`
    margin: 0px 10px;
    z-index: 2; // Add a higher z-index
    @media (max-width: 868px) {
        margin: 0px 0px;
        text-align: left;
    }
`

const HomeTitle = styled.h1`
    font-size: 60px;
    letter-spacing: -1px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 500;
    margin: 15px 0px 0px 0px;

    @media (max-width: 868px) {
        font-size: 2.8rem;
        margin-top: 20px;
    }
`

const HomeSubText = styled.p`
    color: ${props => props.theme.textAlt};
    font-weight: 400;
    font-size: 20px;
    line-height:1.5;
    letter-spacing: -1px;
    margin: 15px 0px 0px 0px;

    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin-top: 15px;

    }`


const MyButtonContainer = styled.p`
    display: flex;
    align-items: center;
    // justify-content: center;
    gap: 10px
`

const StyledEmail = styled.span`
    color: ${props => props.theme.secondary};
    font-weight: 600;

`

function SearchPage() {
    const theme = useTheme();

    return (
        <ContentContainer>
            {/* <MainContainer>
                <HomeHeader>
                    <HomeTitle>Crime Risk Calculator</HomeTitle>
                    <HomeSubText>Select a type of crime from below, then enter an address in SF to recieve a crime assessment for the immediate neighborhood, within 0.2km (0.1mi) radius of the location.<StyledEmail></StyledEmail></HomeSubText>
                </HomeHeader>
            </MainContainer> */}
            <RiskCalcMain />

        </ContentContainer>
    );
}
export default SearchPage;

