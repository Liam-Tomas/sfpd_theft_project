import React from 'react';
import styled from 'styled-components';
import Button from '../components/utility/Button';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
    padding: 2px 20px;
`;

const Title = styled.h1`
    margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
`;

const Paragraph = styled.p`
    // font-size:1.05rem;
`;

const Footer = styled.div`
`;

const TechSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
    * {
        // background-color: ${props => props.theme.card};
        border-radius: 15px;
        margin:0px;
        // padding: 10px;

    }
`;

const TechTitle = styled.h3`
    text-align: left;
    margin: 0px;
    padding: 5px 0px;
`;

const StyledLink = styled.a`
    color: ${props => props.theme.OppHoverBackground};
    font-weight: 500;

`

const StyledEmail = styled.span`
    color: ${props => props.theme.OppHoverBackground};
    font-weight: 500;
`



function ContactPage() {
    return (
        <PageContainer>
            <Title>Contact</Title>
            <Paragraph>Feel free to reach out to me by email at <StyledEmail>ltarmstrong94@gmail.com</StyledEmail></Paragraph>
            <Paragraph>The project github can be viewed here: <StyledLink href="https://github.com/Liam-Tomas/sfpd_theft_project" target="_blank" rel="noopener noreferrer">github.com/Liam-Tomas/sfpd-theft-project</StyledLink>            
            </Paragraph>
        </PageContainer>
    );
}

export default ContactPage;
