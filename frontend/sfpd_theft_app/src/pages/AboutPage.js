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


function AboutPage() {
    return (
        <PageContainer>
            <Title>Geospatial Analysis and Visualization of SFPD Incident Data</Title>
            <Paragraph>The project github can be viewed here: <StyledLink href="https://github.com/Liam-Tomas/sfpd_theft_project" target="_blank" rel="noopener noreferrer">github.com/Liam-Tomas/sfpd-theft-project</StyledLink>
            </Paragraph>
            <SectionTitle>Project Overview</SectionTitle>
            <Paragraph>
                This project represents an advanced analysis of incident data reported to the San Francisco Police Department (SFPD), focusing on creating an interactive experience for users to understand localized crime dynamics. This project combines a variety of different technologies, including Flask for the backend, geopandas for geospatial analysis, and interactive visualization techniques. The objective is to provide an in-depth understanding of the dynamics of urban crime in San Francisco.
            </Paragraph>
            <SectionTitle>Key Technical Highlights</SectionTitle>
            <TechSection>
                <Paragraph>
                    <TechTitle>Technologies Used:</TechTitle>
                    Flask (backend), React (frontend), Geopandas (geospatial analysis), MySQL, Leaflet, Chart.js, Pandas, OpenCage Geocoder, Matplotlib.                </Paragraph>
                <Paragraph>
                    <TechTitle>Interactive Heatmap:</TechTitle> The frontend of the project is built using React, providing an interactive and
                    Visualizes crime data across San Francisco, offering users a comprehensive overview of crime distribution.                </Paragraph>
                {/* <Paragraph>
                <TechTitle>Flask Backend:</TechTitle> The Flask backend powers various functionalities, including the calculation of crime incident probabilities and 
                endpoints for use in frontend visualizations. 
            </Paragraph> */}
                <Paragraph>
                    <TechTitle>Geospatial Analysis:</TechTitle> Python scripts generate a finely detailed geospatial grid over San Francisco. This grid serves as the foundation for creating the heatmap, offering insights into the spatial distribution of crime incidents. Using geopandas, the project leverages spatial data operations to create GeoDataFrames and calculate incident probabilities within each grid cell.
                </Paragraph>
                <Paragraph>
                    <TechTitle>Localized Crime Analysis:</TechTitle>
                    Allows users to input an address, which is converted into coordinates to provide specific crime data for that location.
                </Paragraph>
                <Paragraph>
                    <TechTitle>Dynamic Data Presentation:</TechTitle>
                    Utilizes Chart.js to render JSON data returned from SQL queries, providing real-time data visualization.                </Paragraph>
            </TechSection>            <Footer>
                © 2023 Liam Armstrong. All Rights Reserved.
            </Footer>
        </PageContainer>
    );
}

export default AboutPage;
