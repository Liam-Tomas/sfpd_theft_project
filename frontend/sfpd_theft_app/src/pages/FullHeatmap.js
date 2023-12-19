import React, { useState } from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletLarge'; // Adjust the import path as necessary
import Button from '../components/utility/Button';
import { Link } from 'react-router-dom';

const FullPageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 28%;
  padding: 0px 50px;

`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const HomeTitle = styled.h1`
    font-size: 36px;
    letter-spacing: -1px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: 600;
    @media (max-width: 868px) {
        font-size: 2.8rem;
        margin-top: 20px;
    }
`

const HomeSubText = styled.p`
    color: ${props => props.theme.textAlt};
    font-weight: 400;
    font-size: 18px;
    line-height:1.5;
    letter-spacing: -1px;
    @media (max-width: 868px) {
        font-size: 1.1rem;
        margin-top: 15px;

    }`

const StyledLink = styled(Link)`
    margin-top: 20px;
    text-decoration: none;
    color: inherit; // Ensures the link color matches your theme

  
    `;

const MapButton = styled.div`

    cursor: pointer;
    position: relative;
    padding: 10px 35px;
    margin-left: ${props => props.isActive ? '50px' : '20px'}; // Adjust based on active state
    font-weight: 600;
    font-size: 1.3rem;
    color: ${props => props.isActive ? props.theme.secondary : props.theme.text};
    display: flex;
    align-items: center;
    transition: margin-left 0.3s ease;
  
    &::before {
        content: '';
        position: absolute;
        left: ${props => props.isActive ? '-50px' : '-20px'};
        bottom: 50%;
        transform: translateY(50%);
        width: ${props => props.isActive ? '73px' : '45px'};
        height: 2px;
        background-color: ${props => props.isActive ? props.theme.primary : props.theme.text};
        transition: 0.3s ease;
    }
  
    &:hover {
        color: ${props => props.theme.secondary};
        margin-left: 50px;
        transition: 0.3s ease;

        &::before {
            background-color: ${props => props.theme.primary};
            width: 73px;
            left: -50px;
        }
    }
`;




const FullHeatmap = () => {
    // State to hold the current selected map category
    const [selectedMap, setSelectedMap] = useState('vehicle-theft');
    // Function to handle map category selection
    const handleMapSelection = (category) => {
        setSelectedMap(category);
    };

    // Determine the geojson URL based on the selected map
    const getGeoJsonUrl = () => {
        switch (selectedMap) {
            case 'vehicle-theft':
                return '/sf_heatmap_theft_new.geojson';
            case 'mental-health':
                return '/sf_heatmap_mental_new.geojson';
            case 'assault':
                return '/sf_heatmap_assault_new.geojson';
            case 'drugs':
                return '/sf_heatmap_drugs_new.geojson';
            default:
                return '/sf_heatmap_theft_new.geojson';
        }
    };

    const mapKey = `leaflet-map-${selectedMap}`;


    return (
        <FullPageContainer>
            <TextContainer>
                <HomeTitle>Interactive Heatmap</HomeTitle>
                <HomeSubText>Click on a category of crime below to choose your map. Then, click on individual cells to explore crime insights for that area.
                    Each grid cell represents 0.21 sq km. The scale is based on the relative rate since 2018. Data is updated
                    every week.
                </HomeSubText>
                <MapButton
                    onClick={() => handleMapSelection('vehicle-theft')}
                    isActive={selectedMap === 'vehicle-theft'}
                >
                    Car Break-ins
                </MapButton>
                <MapButton 
                  onClick={() => handleMapSelection('mental-health')}
                  isActive={selectedMap === 'mental-health'}
                >
                    Mental Health
                </MapButton>
                <MapButton 
                  onClick={() => handleMapSelection('assault')}
                  isActive={selectedMap === 'assault'}
                >
                    Assault Incidents
                </MapButton>
                <MapButton 
                  onClick={() => handleMapSelection('drugs')}
                  isActive={selectedMap === 'drugs'}

                >
                    Drug Arrests
                </MapButton>
                <StyledLink to="/vehicle-theft">
                    <p>Back to Dashboard</p>
                </StyledLink>

            </TextContainer>
            <MapContainer>
                <LeafletMap key={mapKey} geojsonUrl={getGeoJsonUrl()} />
            </MapContainer>
        </FullPageContainer>
    );
};

export default FullHeatmap;
