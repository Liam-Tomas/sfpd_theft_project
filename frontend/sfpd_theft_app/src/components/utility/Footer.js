import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from 'styled-components';

const FooterContainer = styled.footer`
// margin: 30px 110px 0px 110px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.cardLight};
  margin: 15px 0px 15px 0px;
`;

const FooterContent = styled.div`
  padding: 15px 5px;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.theme.cardFaint};
  @media (max-width: 868px) {
    font-size: .8rem;
  }
`;

const FooterFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 1.4rem;
    color: ${props => props.theme.cardLight};

`

const SquigglyLine = ({ color = 'black', width = 2 }) => (
    <svg width="100%" height="20" viewBox="0 0 2000 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 Q25,-10 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10 T550,10 T600,10 T650,10 T700,10 T750,10 T800,10 T850,10 T900,10 T950,10 T1000,10 T1050,10 T1100,10 T1150,10 T1200,10 T1250,10 T1300,10 T1350,10 T1400,10 T1450,10 T1500,10 T1550,10 T1600,10 T1650,10 T1700,10 T1750,10 T1800,10 T1850,10 T1900,10 T1950,10 T2000,10" stroke={color} fill="none" strokeWidth={width} />
    </svg>
);

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Footer = () => {
    const theme = useTheme();

    return (
        <FooterContainer>
            <FooterContent>
                <Divider />
                {/* <SquigglyLine color={theme.cardLight} />  Squiggly line divider */}

                <FooterFlex>
                    <p>&copy; {new Date().getFullYear()} Created and Designed by Liam Armstrong; ltarmstrong94@gmail.com</p>
                    <StyledLink
            href="https://github.com/Liam-Tomas"
            target="_blank"
            rel="noopener noreferrer"
          >
                    <StyledIcon icon={faGithub} />
                    </StyledLink>
                </FooterFlex>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
