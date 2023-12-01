import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1000px;
  padding: 2px 20px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
`;

const Paragraph = styled.p`
    font-size:1.05rem;
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
            <Paragraph>
                <strong>Flask Backend:</strong> At the core of this project is a Flask backend, serving as the backbone for data processing, 
                analysis, and retrieval. It powers various functionalities, including the calculation of crime incident probabilities and 
                the retrieval of data for different types of analyses. The Flask API enables seamless communication between the frontend and 
                backend, allowing for dynamic data updates and real-time interactions.
            </Paragraph>
            <Paragraph>
                <strong>Geospatial Analysis:</strong> One of the project's standout features is its geospatial analysis. Python scripts 
                generate a finely detailed geospatial grid over San Francisco. This grid serves as the foundation for mapping and spatial
                 analysis, offering insights into the spatial distribution of incidents. Using geopandas, the project leverages spatial 
                 data operations to create GeoDataFrames and calculate incident probabilities within each grid cell.
            </Paragraph>
            <Paragraph>
                <strong>Localized Crime Analysis:</strong> 
                The project introduces a feature that allows users to input their addresses, converting them to latitude and 
                longitude coordinates. This information is then used to identify the nearest grid cell, providing highly localized 
                insights into crime rates specific to that area. This localized analysis is a useful tool for both policymakers and 
                the public to understand crime dynamics at a granular level.
            </Paragraph>
            <Paragraph>
                <strong>Comprehensive Visualization:</strong> The frontend of the project is built using React, providing an interactive and 
                visually engaging UI. It dynamically renders heatmaps, data visualizations, and interactive maps sourced from the 
                Flask API. The project uses MySQL for data management. Backend Python scripts perform SQL queries to process crime data, while 
                the frontend dynamically visualizes this data. The integration of Leaflet for map visualization, Chart.js for dynamic charts, and treemaps 
                for data representation enhances the user's ability to explore and comprehend crime data.
            </Paragraph>
            <div>
                © 2023 Liam Armstrong. All Rights Reserved.
            </div>
        </PageContainer>
    );
}

export default AboutPage;
