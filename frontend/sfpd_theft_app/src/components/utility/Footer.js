import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
margin: 85px 110px 100px 110px;
text-align: center;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.cardFaint};
  margin: 10px 0px 25px 0px;
`;

const FooterContent = styled.div`
  padding: 10px 5px;
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.cardFaint};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Divider /> 
        <p>&copy; {new Date().getFullYear()} Created and Designed by Liam Armstrong; ltarmstrong94@gmail.com</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
