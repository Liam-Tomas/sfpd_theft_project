import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyButton from '../components/utility/Button';
import { useTheme } from 'styled-components';

const MainContainer = styled.div`
  margin: 11px 11px 11px 12px;
  padding-left: 30px;
  padding-right: 360px;
  color: ${props => props.theme.text};
  position: relative; // Needed for absolute positioning of overlay
  min-height: 30vh;
  margin-bottom: 60px;
  display: flex; 
  flex-direction: column;
//   align-items: center;
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
//   position: relative; // Position relative to stack above the overlay
//   z-index: 2; // Higher z-index than the overlay
//   display: flex;
//   min-height: 100vh;
//   flex-direction: column;
//   background: ${props => props.theme.backgroundOpp};

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
    font-size: 46px;
    letter-spacing: -1px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 600;
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




function ContactPage() {
    const theme = useTheme();

    return (
            <ContentContainer>
                <MainContainer>
                    <HomeHeader>
                        {/* <HomeTopText>Hi, my name is</HomeTopText> */}
                        <HomeTitle>Contact</HomeTitle>
                        <HomeSubText>Feel free to reach out to me by email: <StyledEmail>ltarmstrong94@gmail.com</StyledEmail></HomeSubText>
                        <MyButtonContainer>
                            {/* <MyButton padding="16px 20px" fontSize="1.1rem" icon={faGithub}>
                                Resume
                            </MyButton> */}
                        </MyButtonContainer>
                    </HomeHeader>
                </MainContainer>
            </ContentContainer>
    );
}
export default ContactPage;

