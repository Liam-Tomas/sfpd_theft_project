import React, { useState } from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletLarge';
import ClusterMap from '../components/charts/ClusterMap';
import RiskCalcMap from '../components/charts/RiskCalcMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const FullPageContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 868px) {
    flex-direction: column;
    margin-top: 60px;
    padding: 20px;

}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  padding: 0px 50px;
  @media (max-width: 868px) {
    width: 100%;
    padding: 0px;

}

`;

const MapContainer = styled.div`
    flex: 1;
    height: 100%;
    @media (max-width: 868px) {
        margin-top: 20px;

    }
`;

const HomeTitle = styled.h1`
  font-size: 34px;
  letter-spacing: -1px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 600;
  @media (max-width: 868px) {
    font-size: 2.6rem;
    margin-top: 15px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

const HomeSubText = styled.p`
  color: ${(props) => props.theme.textAlt};
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: -1px;
  @media (max-width: 868px) {
    font-size: 1.1rem;
    margin-top: 15px;
    
  }
  @media (max-width: 868px) {
    display: none;

  }
`;

const MapButton = styled.div`
  cursor: pointer;
  position: relative;
  padding: 10px 35px;
  transform: ${({ $isActive }) => ($isActive ? 'translateX(50px)' : 'translateX(20px)')};
  font-weight: 600;
  font-size: 1.35rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.secondary : theme.text)};
  display: flex;
  align-items: center;
  transition: 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: ${({ $isActive }) => ($isActive ? '-50px' : '-20px')};
    bottom: 50%;
    width: ${({ $isActive }) => ($isActive ? '73px' : '45px')};
    height: 2px;
    background-color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.text)};
    transition: 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.secondary};
    transform: ${({ $isActive }) => ($isActive ? 'translateX(50px)' : 'translateX(50px)')};
    transition: 0.3s ease;

    &::before {
      background-color: ${(props) => props.theme.primary};
      width: 73px;
      left: -50px;
    }
  }
  @media (max-width: 868px) {
    transform: none;
    padding: 10px 20px;
    font-size: ${({ $isActive }) => ($isActive ? '1.2rem' : '1.1rem')};
    border: 2px solid ${(props) => props.theme.card};
    border-color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.card)};
    border-radius: ${({ $isActive }) => ($isActive ? '1.2rem' : '0px')};
    &::before {
        content: '';
        position: absolute;
        left: ${({ $isActive }) => ($isActive ? '0px' : '0px')};
        bottom: 50%;
        width: ${({ $isActive }) => ($isActive ? '0px' : '0px')};
        // width: 80px;
        height: 0px;
        background-color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.text)};
        transition: 0.3s ease;
      }
    &:hover {
    color: ${(props) => props.theme.secondary};
    transform: none;
    transition: 0.3s ease;
    
    &::before {
      background-color: none;
      width: 45px;
      left: 225px;
    }
  }

`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: ${(props) => props.theme.cardLighter};
  border-radius: 100px;
  @media (max-width: 868px) {
    margin-bottom: 25px;

  }
`;

const TabButton = styled.div`
  cursor: pointer;
  flex: 1;
  border-radius: 100px;
  text-align: center;
  padding: 13px 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.text : theme.text)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.buttonHoverBackground : 'transparent')};
  transition: 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const RiskCalcMapContainer = styled.div`
  margin-top: 0px;
  @media (max-width: 868px) {
    display: none;
  }
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    //   background-color: ${(props) => props.theme.card};
    padding: 8px 10px;
    border-radius: 8px;
    margin: 0px 0;
    margin-top: 0px;
`;

const SelectTitle = styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.textAlt};  
    margin-right: 16px;
    font-weight: 600;
`;

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative; // Set the position to relative for the wrapper
    font-size: 16px;
    outline: none;
    flex-grow: 1;
    border-radius: 8px;
    margin: 10px 0;
    margin-top: 20px;

`;

const StyledSelect = styled.select`
  -webkit-appearance: none;
  
  -moz-appearance: none;
  border-radius: 25px;
  background-color: ${(props) => props.theme.card};
  color: ${(props) => props.theme.textAlt};
  border: 1px solid ${(props) => props.theme.buttonSubtle};
  outline: none;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 20px 10px 20px; /* Adjusted padding to make space for the icon */
  font-size: 16px;
  flex-grow: 1;
  // Rest of your styles
  padding-right: 30px; // Increase padding to make space for the icon

  &:focus {
    border-color: ${(props) => props.theme.primary};
  }

  &:hover, &:focus {
    background-color: ${(props) => props.theme.cardLighter}; /* Change as needed */
  }

`;

const IconContainer = styled.div`
  position: absolute;
  right: 20px; // Adjust as needed
  top: 50%;
  color: ${(props) => props.theme.textAlt};
  transform: translateY(-50%); // Center vertically
  pointer-events: none; // Makes the icon non-interactive
`;

const MapButtonContainer = styled.div`
@media (max-width: 868px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const FullHeatmap = () => {

    const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
    const apiLocalURL = 'http://127.0.0.1:5000'

    const [selectedMap, setSelectedMap] = useState('vehicle-theft');
    const [mapType, setMapType] = useState('HeatMap'); // Track the selected map type

    const [timeFilter, setTimeFilter] = useState('last_year'); // Set initial state to 'last_year'

    // Function to handle time filter selection
    const handleTimeFilterSelection = (filter) => {
        setTimeFilter(filter);
    };

    const handleMapSelection = (category) => {
        setSelectedMap(category);
    };

    const handleMapTypeSelection = (type) => {
        setMapType(type);
    };

    const getHeatmapGeoJsonUrl = () => {
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

    const getGeoJsonFileName = (baseName) => {
        switch (timeFilter) {
            case 'last_week':
                return `${baseName}_last_week.geojson`;
            case 'last_30_days':
                return `${baseName}_last_30_days.geojson`;
            case 'last_year':
                return `${baseName}_last_year.geojson`;
            case 'total':
            default:
                return `${baseName}_total.geojson`;
        }
    };

    // Updated function to get the correct GeoJSON URL based on the selected map and time filter
    const getClusterGeoJsonUrl = () => {
        let baseName = '/sfpd_cluster_';
        switch (selectedMap) {
            case 'vehicle-theft':
                baseName += 'theft';
                break;
            case 'mental-health':
                baseName += 'mental_health';
                break;
            case 'assault':
                baseName += 'assault';
                break;
            case 'drugs':
                baseName += 'drugs';
                break;
            default:
                baseName += 'theft';
        }
        return getGeoJsonFileName(baseName);
    };

    // Function to get the correct API endpoint based on the selected map
    const getApiEndpoint = () => {
        switch (selectedMap) {
            case 'vehicle-theft':
                return `${apiBaseUrl}/get_probability`;
            case 'mental-health':
                return `${apiBaseUrl}/get_rate_mental_health`;
            case 'assault':
                return `${apiBaseUrl}/get-rate-assault`;
            case 'drugs':
                return `${apiBaseUrl}/get-rate-drugs`;
            default:
                return `${apiBaseUrl}/get_probability`;
        }
    };

    const mapKey = `leaflet-map-${selectedMap}-${timeFilter}`;

    return (
        <FullPageContainer>
            <TextContainer>
                <HomeTitle>Interactive Map</HomeTitle>
                <TabContainer>
                    <TabButton onClick={() => handleMapTypeSelection('HeatMap')} $isActive={mapType === 'HeatMap'}>
                        Cluster Map
                    </TabButton>
                    <TabButton onClick={() => handleMapTypeSelection('ClusterMap')} $isActive={mapType === 'ClusterMap'}>
                        Heat Map
                    </TabButton>
                </TabContainer>
                <HomeSubText>
                    Select a map type above, then choose a crime category below. On heatmaps, click grid cells for insights into each 0.21 sq km area. For cluster maps, zoom in for detailed data and select a time filter below. Data is updated weekly, showing SFPD-reported crime incidents since 2018.
                </HomeSubText>
                <MapButtonContainer>
                    <MapButton
                        onClick={() => handleMapSelection('vehicle-theft')}
                        $isActive={selectedMap === 'vehicle-theft'}
                    >
                        Car Break-ins
                    </MapButton>
                    <MapButton
                        onClick={() => handleMapSelection('assault')}
                        $isActive={selectedMap === 'assault'}
                    >
                        Assault
                    </MapButton>
                    <MapButton
                        onClick={() => handleMapSelection('drugs')}
                        $isActive={selectedMap === 'drugs'}
                    >
                        Drug Arrests
                    </MapButton>
                    <MapButton
                        onClick={() => handleMapSelection('mental-health')}
                        $isActive={selectedMap === 'mental-health'}
                    >
                        Mental Health
                    </MapButton>
                </MapButtonContainer>
                {mapType === 'HeatMap' && (

                    <InputContainer>
                        <SelectWrapper>
                            <SelectTitle>Time Filter:</SelectTitle>
                            <StyledSelect onChange={(e) => handleTimeFilterSelection(e.target.value)}>
                                <option value="last_year">Past Year</option>
                                <option value="last_30_days">Past 30 Days</option>
                                <option value="last_week">Past Week</option>
                                <option value="total">Total Incidents (From 2018)</option>
                            </StyledSelect>
                            <IconContainer>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </IconContainer>
                        </SelectWrapper>
                    </InputContainer>
                )}

                <RiskCalcMapContainer>
                    <RiskCalcMap apiEndpoint={getApiEndpoint()} />
                </RiskCalcMapContainer>
            </TextContainer>
            <MapContainer>
                {mapType === 'HeatMap' ? (
                    <ClusterMap key={mapKey} geojsonUrl={getClusterGeoJsonUrl()} />
                ) : (
                    <LeafletMap key={mapKey} geojsonUrl={getHeatmapGeoJsonUrl()} />
                )}
            </MapContainer>
        </FullPageContainer >
    );
};

export default FullHeatmap;
