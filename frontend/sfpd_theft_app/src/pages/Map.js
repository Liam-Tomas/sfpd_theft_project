// import React, { useState } from 'react';
// import styled from 'styled-components';
// import LeafletMap from '../components/charts/LeafletLarge';
// import ClusterMap from '../components/charts/ClusterMap';
// import RiskCalcMap from '../components/charts/RiskCalcMap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import MapLegend from '../components/modals/MapLegend';
// import HeatmapLegend from '../components/modals/HeatmapLegend';
// import Select from 'react-select';

// const FullPageContainer = styled.div`
//   display: flex;
//   height: 100vh;

//   @media (max-width: 868px) {
//     flex-direction: column;
//     margin-top: 60px;
//     padding: 20px;

// }
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 30%;
//   padding: 0px 50px;
//   @media (max-width: 868px) {
//     width: 100%;
//     padding: 0px;

// }

// `;

// const MapContainer = styled.div`
//     flex: 1;
//     height: 100%;
//     @media (max-width: 868px) {
//         margin-top: 20px;

//     }
// `;

// const HomeTitle = styled.h1`
//   font-size: 34px;
//   letter-spacing: -1px;
//   margin-top: 0px;
//   margin-bottom: 0px;
//   font-weight: 600;
//   @media (max-width: 868px) {
//     font-size: 1.7rem;
//     margin-top: 0px;
//     margin-bottom: 0px;
//     text-align: center;
//   }
// `;

// const HomeSubText = styled.p`
//   color: ${(props) => props.theme.textAlt};
//   font-weight: 400;
//   font-size: 17px;
//   line-height: 1.5;
//   margin: 22px 0px;
//   letter-spacing: -1px;
//   @media (max-width: 868px) {
//     font-size: 1.1rem;
//     margin-top: 15px;

//   }
//   @media (max-width: 868px) {
//     display: none;

//   }
// `;

// const TabContainer = styled.div`
//   display: flex;
//   margin-top: 20px;
//   background-color: ${(props) => props.theme.card};
//   border-radius: 100px;
//   @media (max-width: 868px) {
//     margin-bottom: 10px;

//   }
// `;

// const TabButton = styled.div`
//   cursor: pointer;
//   flex: 1;
//   border-radius: 100px;
//   text-align: center;
//   padding: 13px 0;
//   font-weight: 600;
//   font-size: 1.2rem;
//   color: ${({ $isActive, theme }) => ($isActive ? theme.text : theme.text)};
//   background-color: ${({ $isActive, theme }) => ($isActive ? theme.buttonHoverBackground : 'transparent')};
//   transition: 0.3s ease;

//   &:hover {
//     color: ${(props) => props.theme.text};
//     background-color: ${({ $isActive, theme }) => $isActive ? theme.activeTabHover : theme.tabHoverColor};
//   }
// `;

// const RiskCalcMapContainer = styled.div`
//   @media (max-width: 868px) {
//     display: none;
//   }
// `

// const InputContainer = styled.div`
//     display: flex;
//     align-items: center;
//     //   background-color: ${(props) => props.theme.card};
//     border-radius: 8px;
//     margin: 0px 0;
//     margin-top: 0px;
// `;

// const SelectTitle = styled.span`
//     font-size: 16px;
//     color: ${(props) => props.theme.textAlt};  
//     margin-right: 10px;
//     font-weight: 600;
//     @media (max-width: 868px) {
//         display: none;
//       }
// `;

// const SelectWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     position: relative; // Set the position to relative for the wrapper
//     font-size: 16px;
//     outline: none;
//     flex-grow: 1;
//     border-radius: 8px;
//     margin: 10px 0;
//     @media (max-width: 868px) {
//         margin: 8px 0;
//     }
// `;

// const StyledSelect = styled.select`
//   -webkit-appearance: none;

//   -moz-appearance: none;
//   border-radius: 25px;
//   background-color: ${(props) => props.theme.card};
//   color: ${(props) => props.theme.textAlt};
//   border: 1px solid ${(props) => props.theme.buttonSubtle};
//   outline: none;
//   font-weight: 500;
//   cursor: pointer;
//   padding: 10px 20px 10px 20px; /* Adjusted padding to make space for the icon */
//   font-size: 16px;
//   flex-grow: 1;
//   // Rest of your styles
//   padding-right: 30px; // Increase padding to make space for the icon

//   &:focus {
//     border-color: ${(props) => props.theme.primary};
//   }

//   &:hover, &:focus {
//     background-color: ${(props) => props.theme.cardLighter}; /* Change as needed */
//   }
//   @media (max-width: 868px) {
//     font-size: 16px;

// }
// `;

// const IconContainer = styled.div`
//   position: absolute;
//   right: 20px; // Adjust as needed
//   top: 50%;
//   color: ${(props) => props.theme.textAlt};
//   transform: translateY(-50%); // Center vertically
//   pointer-events: none; // Makes the icon non-interactive
// `;

// const MapButtonContainer = styled.div`
// @media (max-width: 868px) {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//   }
// `

// const UpdateDate = styled.p`
//     color: ${(props) => props.theme.primary};
//     margin-bottom: 20px;

// `

// const TitleContainer = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     // gap: 20px;
// `

// const LegendLink = styled.div`
//     color: ${({ $isActive, theme }) => $isActive ? theme.secondary : theme.secondary}; 
//     // border: 1px solid ${(props) => props.theme.cardFaint};
//     border-radius: 50px;
//     padding: 8px 14px;
//     font-size: .94rem;
//     user-select: none;
//     // font-weight: ${({ $isActive }) => $isActive ? '500' : '400'}; 
//     background-color: ${({ $isActive, theme }) => $isActive ? theme.cardLighter : 'transparent'}; 
//     transition: 0.3s ease;

//     &:hover {
//         background-color: ${(props) => props.theme.cardLighter}; /* Change as needed */
//         cursor: pointer;
//     }
//     &:active {
//         transform: scale(.95);
//     }    
// `
// const options = [
//     { value: 'last_year', label: 'Past Year' },
//     { value: 'last_30_days', label: 'Past 30 Days' },
//     { value: 'last_week', label: 'Past Week' },
//     { value: 'total', label: 'Total Incidents (From 2018)' }
// ];

// const FullHeatmap = () => {

//     const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
//     const apiLocalURL = 'http://127.0.0.1:5000'
//     const [selectedMap, setSelectedMap] = useState('vehicle-theft');
//     const [mapType, setMapType] = useState('HeatMap'); // Track the selected map type
//     const [timeFilter, setTimeFilter] = useState('last_year'); // Set initial state to 'last_year'
//     const [showHeatmapLegend, setShowHeatmapLegend] = useState(false);
//     const [showClusterLegend, setShowClusterLegend] = useState(false);
//     const [selectedOption, setSelectedOption] = React.useState(null);

//     // Handle selection
//     const handleChange = (option) => {
//         setSelectedOption(option);
//     };


//     // Toggle functions for each legend
//     const toggleHeatmapLegend = () => {
//         console.log("Closing Heatmap Legend");

//         setShowHeatmapLegend(!showHeatmapLegend);

//     };

//     const toggleClusterLegend = () => {
//         console.log("Closing Heatmap Legend");

//         setShowClusterLegend(!showClusterLegend);
//     };

//     const handleDropdownSelection = (value) => {
//         handleMapSelection(value);
//         setSelectedMap(value); // Update the selected crime type
//     };

//     // Function to handle time filter selection
//     const handleTimeFilterSelection = (filter) => {
//         setTimeFilter(filter);
//     };

//     const handleMapSelection = (category) => {
//         setSelectedMap(category);
//     };

//     const handleMapTypeSelection = (type) => {
//         setMapType(type);
//     };

//     const getHeatmapGeoJsonUrl = () => {
//         switch (selectedMap) {
//             case 'vehicle-theft':
//                 return '/sf_heatmap_theft_new.geojson';
//             case 'mental-health':
//                 return '/sf_heatmap_mental_new.geojson';
//             case 'assault':
//                 return '/sf_heatmap_assault_new.geojson';
//             case 'drugs':
//                 return '/sf_heatmap_drugs_new.geojson';
//             case 'burglary':
//                 return '/sf_heatmap_burglary_new.geojson';
//             case 'robbery':
//                 return '/sf_heatmap_robbery_new.geojson';
//             case 'homicide':
//                 return '/sf_heatmap_homicide_new.geojson';
//             case 'prostitution':
//                 return '/sf_heatmap_prostitution_new.geojson';
//             case 'car-robbery':
//                 return '/sf_heatmap_car-robbery_new.geojson';
//             case 'disorderly':
//                 return '/sf_heatmap_disorderly_new.geojson';
//             default:
//                 return '/sf_heatmap_theft_new.geojson';
//         }
//     };

//     const getGeoJsonFileName = (baseName) => {
//         switch (timeFilter) {
//             case 'last_week':
//                 return `${baseName}_last_week.geojson`;
//             case 'last_30_days':
//                 return `${baseName}_last_30_days.geojson`;
//             case 'last_year':
//                 return `${baseName}_last_year.geojson`;
//             case 'total':
//             default:
//                 return `${baseName}_total.geojson`;
//         }
//     };

//     // Function to get the correct GeoJSON URL based on the selected map and time filter
//     const getClusterGeoJsonUrl = () => {
//         let baseName = '/sfpd_cluster_';
//         switch (selectedMap) {
//             case 'vehicle-theft':
//                 baseName += 'theft';
//                 break;
//             case 'mental-health':
//                 baseName += 'mental_health';
//                 break;
//             case 'assault':
//                 baseName += 'assault';
//                 break;
//             case 'drugs':
//                 baseName += 'drugs';
//                 break;
//             case 'burglary':
//                 baseName += 'burglary';
//                 break;
//             case 'robbery':
//                 baseName += 'robbery';
//                 break;
//             case 'homicide':
//                 baseName += 'homicide';
//                 break;
//             case 'prostitution':
//                 baseName += 'prostitution';
//                 break;
//             case 'car-robbery':
//                 baseName += 'car-robbery';
//                 break;
//             case 'disorderly':
//                 baseName += 'disorderly';
//                 break;
//             default:
//                 baseName += 'theft';
//         }
//         return getGeoJsonFileName(baseName);
//     };

//     // Function to get the correct API endpoint based on the selected map
//     const getApiEndpoint = () => {
//         switch (selectedMap) {
//             case 'vehicle-theft':
//                 return `${apiBaseUrl}/get_probability`;
//             case 'mental-health':
//                 return `${apiBaseUrl}/get_rate_mental_health`;
//             case 'assault':
//                 return `${apiBaseUrl}/get-rate-assault`;
//             case 'drugs':
//                 return `${apiBaseUrl}/get-rate-drugs`;
//             case 'burglary':
//                 return `${apiBaseUrl}/get-rate-burglary`;
//             case 'robbery':
//                 return `${apiBaseUrl}/get-rate-robbery`;
//             case 'homicide':
//                 return `${apiBaseUrl}/get-rate-homicide`;
//             case 'prostitution':
//                 return `${apiBaseUrl}/get-rate-prostitution`;
//             case 'car-robbery':
//                 return `${apiBaseUrl}/get-rate-car-robbery`;
//             case 'disorderly':
//                 return `${apiBaseUrl}/get-rate-disorderly`;
//             default:
//                 return `${apiBaseUrl}/get_probability`;
//         }
//     };

//     // Function to render the appropriate legend based on the map type
//     const renderLegend = () => {
//         if (mapType === 'ClusterMap' && showClusterLegend) {
//             return <HeatmapLegend onClose={toggleClusterLegend} />;

//         } else if (mapType === 'HeatMap' && showHeatmapLegend) {
//             return <MapLegend onClose={toggleHeatmapLegend} />;

//         }
//         return null; // Return null if no legend should be displayed
//     };

//     const mapKey = `leaflet-map-${selectedMap}-${timeFilter}`;

//     return (
//         <FullPageContainer>
//             <TextContainer>
//                 <UpdateDate>Last Updated: 12.21.2023</UpdateDate>
//                 <TitleContainer>
//                     <HomeTitle>Interactive Map</HomeTitle>
//                     {mapType === 'HeatMap' ? (
//                         <LegendLink onClick={toggleHeatmapLegend} $isActive={showHeatmapLegend}>Toggle Legend</LegendLink>
//                     ) : (
//                         <LegendLink onClick={toggleClusterLegend} $isActive={showClusterLegend}>Toggle Legend</LegendLink>
//                     )}
//                 </TitleContainer>
//                 <TabContainer>
//                     <TabButton onClick={() => handleMapTypeSelection('HeatMap')} $isActive={mapType === 'HeatMap'}>
//                         Cluster Map
//                     </TabButton>
//                     <TabButton onClick={() => handleMapTypeSelection('ClusterMap')} $isActive={mapType === 'ClusterMap'}>
//                         Heat Map
//                     </TabButton>
//                 </TabContainer>
//                 <HomeSubText>
//                     Select a map type above, then choose a crime category below. On heatmaps, click grid cells for insights into each 0.21 sq km area. For cluster maps, select a time filter below and zoom to see individual details. Data is updated weekly, showing SFPD-reported crime incidents since 2018.
//                 </HomeSubText>
//                 <InputContainer>
//                     <SelectWrapper>
//                         <SelectTitle>Select Crime Type:</SelectTitle>
//                         <StyledSelect onChange={(e) => handleDropdownSelection(e.target.value)}>
//                             {/* Options for each type of map */}
//                             <option value="vehicle-theft">Car Break-ins</option>
//                             <option value="assault">Assault</option>
//                             <option value="drugs">Drug Arrests</option>
//                             <option value="mental-health">Mental Health</option>
//                             <option value="burglary">Burglary</option>
//                             <option value="robbery">Robbery</option>
//                             <option value="homicide">Homicide</option>
//                             <option value="prostitution">Prositution</option>
//                             <option value="car-robbery">Car Robbery</option>
//                             <option value="disorderly">Disorderly Conduct</option>
//                         </StyledSelect>
//                         <IconContainer>
//                             <FontAwesomeIcon icon={faChevronDown} />
//                         </IconContainer>
//                     </SelectWrapper>
//                 </InputContainer>
//                 {mapType === 'HeatMap' && (
//                     <InputContainer>
//                         <SelectWrapper>
//                             <SelectTitle>Select Time Filter:</SelectTitle>
//                             <StyledSelect onChange={(e) => handleTimeFilterSelection(e.target.value)}>
//                                 <option value="last_year">Past Year</option>
//                                 <option value="last_30_days">Past 30 Days</option>
//                                 <option value="last_week">Past Week</option>
//                                 <option value="total">Total Incidents (From 2018)</option>
//                             </StyledSelect>
//                             <IconContainer>
//                                 <FontAwesomeIcon icon={faChevronDown} />
//                             </IconContainer>
//                         </SelectWrapper>
//                     </InputContainer>
//                 )}

//                 <RiskCalcMapContainer>
//                     <RiskCalcMap
//                         apiEndpoint={getApiEndpoint()}
//                         selectedMap={selectedMap} // Pass the selected crime type here
//                     />                </RiskCalcMapContainer>
//             </TextContainer>
//             {renderLegend()}
//             <MapContainer>
//                 {mapType === 'HeatMap' ? (
//                     <ClusterMap key={mapKey} geojsonUrl={getClusterGeoJsonUrl()} />
//                 ) : (
//                     <LeafletMap key={mapKey} geojsonUrl={getHeatmapGeoJsonUrl()} />
//                 )}
//             </MapContainer>
//         </FullPageContainer >
//     );
// };

// export default FullHeatmap;

import React, { useState } from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletLarge';
import ClusterMap from '../components/charts/ClusterMap';
import RiskCalcMap from '../components/charts/RiskCalcMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import MapLegend from '../components/modals/MapLegend';
import HeatmapLegend from '../components/modals/HeatmapLegend';
import Select from 'react-select';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

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
    font-size: 1.7rem;
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
  }
`;

const HomeSubText = styled.p`
  color: ${(props) => props.theme.textAlt};
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  margin: 22px 0px;
  letter-spacing: -1px;
  @media (max-width: 868px) {
    font-size: 1.1rem;
    margin-top: 15px;
    
  }
  @media (max-width: 868px) {
    display: none;

  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: ${(props) => props.theme.card};
  border-radius: 100px;
  @media (max-width: 868px) {
    margin-bottom: 10px;

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
    background-color: ${({ $isActive, theme }) => $isActive ? theme.activeTabHover : theme.tabHoverColor};
  }
`;

const RiskCalcMapContainer = styled.div`
  @media (max-width: 868px) {
    display: none;
  }
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    //   background-color: ${(props) => props.theme.card};
    border-radius: 8px;
    margin: 0px 0;
    margin-top: 0px;
`;

const SelectTitle = styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.textAlt};  
    font-weight: 500;
    width: 60%;
    @media (max-width: 868px) {
        display: none;
      }
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
    @media (max-width: 868px) {
        margin: 8px 0;
    }
`;

const UpdateDate = styled.p`
    color: ${(props) => props.theme.primary};
    margin-bottom: 20px;

`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    // gap: 20px;
`

const LegendLink = styled.div`
    color: ${({ $isActive, theme }) => $isActive ? theme.secondary : theme.secondary}; 
    // border: 1px solid ${(props) => props.theme.cardFaint};
    border-radius: 50px;
    padding: 8px 14px;
    font-size: .94rem;
    user-select: none;
    // font-weight: ${({ $isActive }) => $isActive ? '500' : '400'}; 
    background-color: ${({ $isActive, theme }) => $isActive ? theme.cardLighter : 'transparent'}; 
    transition: 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.cardLighter}; /* Change as needed */
        cursor: pointer;
    }
    &:active {
        transform: scale(.95);
    }    
`




const crimeTypeOptions = [
    { value: 'vehicle-theft', label: 'Car Break-ins' },
    { value: 'assault', label: 'Assault' },
    { value: 'drugs', label: 'Drug Arrests' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'burglary', label: 'Burglary' },
    { value: 'robbery', label: 'Robbery' },
    { value: 'homicide', label: 'Homicide' },
    { value: 'prostitution', label: 'Prostitution' },
    { value: 'car-robbery', label: 'Car Robbery' },
    { value: 'disorderly', label: 'Disorderly Conduct' }
];

const timeFilterOptions = [
    { value: 'last_year', label: 'Past Year' },
    { value: 'last_30_days', label: 'Past 30 Days' },
    { value: 'last_week', label: 'Past Week' },
    { value: 'total', label: 'Total Incidents (From 2018)' }
];

const FullHeatmap = () => {
    const theme = useContext(ThemeContext);
    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: '100%', // Make the select box fill the full container width
            backgroundColor: theme.backgroundColor,

            borderColor: theme.cardLight,
            color: theme.text,
            cursor: 'pointer', // Setting cursor here

            "&:hover": {
                borderColor: theme.buttonHoverBackground, // Change to the lighter color you want on hover
                // backgroundColor: theme.card,
            },
            // other styles...
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? theme.card2 : theme.card,
            color: state.isSelected ? theme.primary : theme.text,
            cursor: 'pointer', // Set cursor to pointer for options

            // other styles...
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: theme.text,
            // other styles...
        }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: '212px', // Adjust this value to suit your needs
            // Add other styles like padding, if necessary
        }),
        menu: (provided, state) => ({
            ...provided,
            zIndex: '10000',

            cursor: 'pointer', // Setting cursor here

            backgroundColor: theme.card,

            // other styles...
        }),
        // Add other parts like menuList, indicatorsContainer, etc., if needed
    };


    const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
    const apiLocalURL = 'http://127.0.0.1:5000'
    const [selectedMap, setSelectedMap] = useState('vehicle-theft');
    const [mapType, setMapType] = useState('HeatMap'); // Track the selected map type
    const [timeFilter, setTimeFilter] = useState('last_year'); // Set initial state to 'last_year'
    const [showHeatmapLegend, setShowHeatmapLegend] = useState(false);
    const [showClusterLegend, setShowClusterLegend] = useState(false);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [selectedCrimeType, setSelectedCrimeType] = useState({ value: 'vehicle-theft', label: 'Car Break-ins' });
    const [selectedTimeFilter, setSelectedTimeFilter] = useState({ value: 'last_year', label: 'Past Year' });
    // Handle selection
    const handleChange = (option) => {
        setSelectedOption(option);
    };


    // Toggle functions for each legend
    const toggleHeatmapLegend = () => {
        console.log("Closing Heatmap Legend");

        setShowHeatmapLegend(!showHeatmapLegend);

    };

    const toggleClusterLegend = () => {
        console.log("Closing Heatmap Legend");

        setShowClusterLegend(!showClusterLegend);
    };


    const handleDropdownSelection = (selectedOption) => {
        if (selectedOption) {
            setSelectedCrimeType(selectedOption); // Update the selectedCrimeType state
            setSelectedMap(selectedOption.value); // Directly use the selected option's value
        }
    };


    // Function to handle time filter selection
    const handleTimeFilterSelection = (selectedOption) => {
        if (selectedOption) {
            setSelectedTimeFilter(selectedOption); // Update the state with the new selected option
            setTimeFilter(selectedOption.value); // Update the time filter state with the new value
        }
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
            case 'burglary':
                return '/sf_heatmap_burglary_new.geojson';
            case 'robbery':
                return '/sf_heatmap_robbery_new.geojson';
            case 'homicide':
                return '/sf_heatmap_homicide_new.geojson';
            case 'prostitution':
                return '/sf_heatmap_prostitution_new.geojson';
            case 'car-robbery':
                return '/sf_heatmap_car-robbery_new.geojson';
            case 'disorderly':
                return '/sf_heatmap_disorderly_new.geojson';
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

    // Function to get the correct GeoJSON URL based on the selected map and time filter
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
            case 'burglary':
                baseName += 'burglary';
                break;
            case 'robbery':
                baseName += 'robbery';
                break;
            case 'homicide':
                baseName += 'homicide';
                break;
            case 'prostitution':
                baseName += 'prostitution';
                break;
            case 'car-robbery':
                baseName += 'car-robbery';
                break;
            case 'disorderly':
                baseName += 'disorderly';
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
            case 'burglary':
                return `${apiBaseUrl}/get-rate-burglary`;
            case 'robbery':
                return `${apiBaseUrl}/get-rate-robbery`;
            case 'homicide':
                return `${apiBaseUrl}/get-rate-homicide`;
            case 'prostitution':
                return `${apiBaseUrl}/get-rate-prostitution`;
            case 'car-robbery':
                return `${apiBaseUrl}/get-rate-car-robbery`;
            case 'disorderly':
                return `${apiBaseUrl}/get-rate-disorderly`;
            default:
                return `${apiBaseUrl}/get_probability`;
        }
    };

    // Function to render the appropriate legend based on the map type
    const renderLegend = () => {
        if (mapType === 'ClusterMap' && showClusterLegend) {
            return <HeatmapLegend onClose={toggleClusterLegend} />;

        } else if (mapType === 'HeatMap' && showHeatmapLegend) {
            return <MapLegend onClose={toggleHeatmapLegend} />;

        }
        return null; // Return null if no legend should be displayed
    };

    const mapKey = `leaflet-map-${selectedMap}-${timeFilter}`;

    return (
        <FullPageContainer>
            <TextContainer>
                <UpdateDate>Last Updated: 12.21.2023</UpdateDate>
                <TitleContainer>
                    <HomeTitle>Interactive Map</HomeTitle>
                    {mapType === 'HeatMap' ? (
                        <LegendLink onClick={toggleHeatmapLegend} $isActive={showHeatmapLegend}>Toggle Legend</LegendLink>
                    ) : (
                        <LegendLink onClick={toggleClusterLegend} $isActive={showClusterLegend}>Toggle Legend</LegendLink>
                    )}
                </TitleContainer>
                <TabContainer>
                    <TabButton onClick={() => handleMapTypeSelection('HeatMap')} $isActive={mapType === 'HeatMap'}>
                        Cluster Map
                    </TabButton>
                    <TabButton onClick={() => handleMapTypeSelection('ClusterMap')} $isActive={mapType === 'ClusterMap'}>
                        Heat Map
                    </TabButton>
                </TabContainer>
                <HomeSubText>
                    Select a map type above, then choose a crime category below. On heatmaps, click grid cells for insights into each 0.21 sq km area. For cluster maps, select a time filter below and zoom to see individual details. Data is updated weekly, showing SFPD-reported crime incidents since 2018.
                </HomeSubText>
                <InputContainer>
                    <SelectWrapper>
                        <SelectTitle>Select Crime Type:</SelectTitle>
                        <div style={{ width: '100%' }}> {/* Use a div to enforce width */}
                            <Select
                                styles={customStyles} // 
                                value={selectedCrimeType} // Make sure this matches the state you're updating
                                onChange={handleDropdownSelection}
                                options={crimeTypeOptions}
                                isSearchable={false} // Add this line to disable the text box on mobile
                            />
                        </div>
                    </SelectWrapper>
                </InputContainer>
                {mapType === 'HeatMap' && (
                    <InputContainer>
                        <SelectWrapper>
                            <SelectTitle>Select Time Filter:</SelectTitle>
                            <div style={{ width: '100%' }}> {/* Use a div to enforce width */}
                                <Select
                                    styles={customStyles}
                                    value={selectedTimeFilter} // State for this selection
                                    onChange={handleTimeFilterSelection}
                                    options={timeFilterOptions}
                                    isSearchable={false} // Add this line to disable the text box on mobile

                                />
                            </div>
                        </SelectWrapper>
                    </InputContainer>
                )}

                <RiskCalcMapContainer>
                    <RiskCalcMap
                        apiEndpoint={getApiEndpoint()}
                        selectedMap={selectedMap} // Pass the selected crime type here
                    />                </RiskCalcMapContainer>
            </TextContainer>
            {renderLegend()}
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