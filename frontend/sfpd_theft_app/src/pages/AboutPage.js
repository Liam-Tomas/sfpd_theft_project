import React from 'react';
import styled from 'styled-components';

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
        background-color: ${props => props.theme.card};
        border-radius: 15px;
        margin:0px;
        padding: 10px;

    }
`;

const TechTitle = styled.h3`
    text-align: left;
    margin: 0px;
    padding: 5px 0px;
`;



function AboutPage() {
    return (
        <PageContainer>
            <Title>Geospatial Analysis and Visualization of SFPD Incident Data</Title>
            <SectionTitle>Project Overview</SectionTitle>
            <Paragraph>
                This project represents an advanced analysis of incident data reported to the San Francisco Police Department (SFPD). While its initial focus was on thefts from vehicles, it has since evolved to encompass a broad spectrum of crime types. This project combines a variety of different technologies, including Flask for the backend, geospatial analysis, and interactive visualization techniques. The objective is to provide an in-depth understanding of the intricate dynamics of urban crime in San Francisco.
            </Paragraph>
            <SectionTitle>Key Technical Highlights</SectionTitle>
            <TechSection>
            <Paragraph>
                <TechTitle>Comprehensive Visualization:</TechTitle> The frontend of the project is built using React, providing an interactive and 
                visually engaging UI. It dynamically renders heatmaps, data visualizations, and interactive maps sourced from the 
                Flask API. Using MySQL for data management, backend Python scripts perform SQL queries 
                to process crime data, while the frontend dynamically visualizes the data. The integration of Leaflet for map visualization, Chart.js for dynamic charts, and treemaps 
                for data representation enhances the user's ability to explore and comprehend crime data.
            </Paragraph>
            {/* <Paragraph>
                <TechTitle>Flask Backend:</TechTitle> The Flask backend powers various functionalities, including the calculation of crime incident probabilities and 
                endpoints for use in frontend visualizations. 
            </Paragraph> */}
            <Paragraph>
                <TechTitle>Geospatial Analysis:</TechTitle> One of the project's standout features is its geospatial analysis. Python scripts 
                 generate a finely detailed geospatial grid over San Francisco. This grid serves as the foundation for mapping and spatial
                 analysis, offering insights into the spatial distribution of incidents. Using geopandas, the project leverages spatial 
                 data operations to create GeoDataFrames and calculate incident probabilities within each grid cell.
            </Paragraph>
            <Paragraph>
                <TechTitle>Localized Crime Analysis:</TechTitle> 
                The project introduces a feature that allows users to input their addresses, converting them to latitude and 
                longitude coordinates. This information is then used to identify the nearest grid cell, providing highly localized 
                insights into crime rates specific to that area. This localized analysis is a useful tool for both policymakers and 
                the public to understand crime dynamics at a granular level.
            </Paragraph>
            </TechSection>
            <Paragraph>The project github can be viewed here: github.com/Liam-Tomas</Paragraph>
            <Footer>
                © 2023 Liam Armstrong. All Rights Reserved.
            </Footer>
        </PageContainer>
    );
}

export default AboutPage;
