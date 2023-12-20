// import React, { useState } from 'react';
// import styled from 'styled-components';
// import LeafletMap from '../components/charts/LeafletLarge';
// import ClusterMap from '../components/charts/ClusterMap';
// import RiskCalcMap from '../components/charts/RiskCalcMap'

// const FullPageContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 30%;
//   padding: 0px 50px;
// `;

// const MapContainer = styled.div`
//   flex: 1;
//   height: 100%;
// `;

// const HomeTitle = styled.h1`
//   font-size: 36px;
//   letter-spacing: -1px;
//   margin-top: 0px;
//   margin-bottom: 0px;
//   font-weight: 600;
//   @media (max-width: 868px) {
//     font-size: 2.8rem;
//     margin-top: 20px;
//   }
// `;

// const HomeSubText = styled.p`
//   color: ${(props) => props.theme.textAlt};
//   font-weight: 400;
//   font-size: 17px;
//   line-height: 1.5;
//   letter-spacing: -1px;
//   @media (max-width: 868px) {
//     font-size: 1.1rem;
//     margin-top: 15px;
//   }
// `;

// const MapButton = styled.div`
//   cursor: pointer;
//   position: relative;
//   padding: 10px 35px;
//   transform: ${(props) => (props.isActive ? 'translateX(50px)' : 'translateX(20px)')};
//   font-weight: 600;
//   font-size: 1.35rem;
//   color: ${(props) => (props.isActive ? props.theme.secondary : props.theme.textAlt)};
//   display: flex;
//   align-items: center;
//   transition: 0.3s ease;

//   &::before {
//     content: '';
//     position: absolute;
//     left: ${(props) => (props.isActive ? '-50px' : '-20px')};
//     bottom: 50%;
//     width: ${(props) => (props.isActive ? '73px' : '45px')};
//     height: 2px;
//     background-color: ${(props) => (props.isActive ? props.theme.primary : props.theme.text)};
//     transition: 0.3s ease;
//   }

//   &:hover {
//     color: ${(props) => props.theme.secondary};
//     transform: ${(props) => (props.isActive ? 'translateX(50px)' : 'translateX(50px)')};
//     transition: 0.3s ease;

//     &::before {
//       background-color: ${(props) => props.theme.primary};
//       width: 73px;
//       left: -50px;
//     }
//   }
// `;

// const TabContainer = styled.div`
//   display: flex;
//   margin-top: 20px;
//   background-color: ${(props) => props.theme.cardTab};
//   border-radius: 100px;
// `;

// const TabButton = styled.div`
//   cursor: pointer;
//   flex: 1;
//   border-radius: 100px;
//   text-align: center;
//   padding: 13px 0;
//   font-weight: 600;
//   font-size: 1.25rem;
//   color: ${(props) => (props.isActive ? props.theme.textOpp : props.theme.text)};
//   background-color: ${(props) => (props.isActive ? props.theme.primary : 'transparent')};
//   transition: 0.3s ease;

//   &:hover {
//     color: ${(props) => props.theme.textOpp};
//     background-color: ${(props) => props.theme.primary};
//   }
// `;

// const RiskCalcMapContainer = styled.div`
//   margin-top: 20px;
// `

// const FullHeatmap = () => {

//     const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
//     const apiLocalURL = 'http://127.0.0.1:5000'

//     const [selectedMap, setSelectedMap] = useState('vehicle-theft');
//     const [mapType, setMapType] = useState('HeatMap'); // Track the selected map type

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
//             default:
//                 return '/sf_heatmap_theft_new.geojson';
//         }
//     };

//     const getClusterGeoJsonUrl = () => {
//         switch (selectedMap) {
//             case 'vehicle-theft':
//                 return '/sfpd_cluster_theft.geojson';
//             case 'mental-health':
//                 return '/sfpd_cluster_mental_health.geojson';
//             case 'assault':
//                 return '/sfpd_cluster_assault.geojson';
//             case 'drugs':
//                 return '/sfpd_cluster_drugs.geojson';
//             default:
//                 return '/sfpd_cluster_theft.geojson';
//         }
//     };

//     const mapKey = `leaflet-map-${selectedMap}`;

//     return (
//         <FullPageContainer>
//             <TextContainer>
//                 <HomeTitle>Interactive Map</HomeTitle>
//                 <TabContainer>
//                     <TabButton onClick={() => handleMapTypeSelection('HeatMap')} isActive={mapType === 'HeatMap'}>
//                         Cluster Map
//                     </TabButton>
//                     <TabButton onClick={() => handleMapTypeSelection('ClusterMap')} isActive={mapType === 'ClusterMap'}>
//                         Heat Map
//                     </TabButton>
//                 </TabContainer>
//                 <HomeSubText>
//                     Choose a type of map from above. Then, pick a category of crime below. For heatmaps, click on grid cells for insights into each 0.21 sq km area. For the cluster map, zoom in for more precise data. The data,
//                     updated weekly, reflects rates reported by the SFPD since 2018.
//                 </HomeSubText>
//                 <MapButton
//                     onClick={() => handleMapSelection('vehicle-theft')}
//                     isActive={selectedMap === 'vehicle-theft'}
//                 >
//                     Car Break-ins
//                 </MapButton>
//                 <MapButton
//                     onClick={() => handleMapSelection('mental-health')}
//                     isActive={selectedMap === 'mental-health'}
//                 >
//                     Mental Health
//                 </MapButton>
//                 <MapButton
//                     onClick={() => handleMapSelection('assault')}
//                     isActive={selectedMap === 'assault'}
//                 >
//                     Assault Incidents
//                 </MapButton>
//                 <MapButton
//                     onClick={() => handleMapSelection('drugs')}
//                     isActive={selectedMap === 'drugs'}
//                 >
//                     Drug Arrests
//                 </MapButton>
//                 <RiskCalcMapContainer>
//                     <RiskCalcMap apiEndpoint={`${apiBaseUrl}/get_probability`} />
//                 </RiskCalcMapContainer>
//             </TextContainer>
//             <MapContainer>
//                 {mapType === 'HeatMap' ? (
//                     <ClusterMap key={mapKey} geojsonUrl={getClusterGeoJsonUrl()} />
//                 ) : (
//                     <LeafletMap key={mapKey} geojsonUrl={getHeatmapGeoJsonUrl()} />
//                 )}
//             </MapContainer>
//         </FullPageContainer>
//     );
// };

// export default FullHeatmap;


import React, { useState } from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletLarge';
import ClusterMap from '../components/charts/ClusterMap';
import RiskCalcMap from '../components/charts/RiskCalcMap'

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
`;

const HomeTitle = styled.h1`
  font-size: 36px;
  letter-spacing: -1px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 600;
  @media (max-width: 868px) {
    font-size: 2.6rem;
    margin-top: 20px;
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
`;

const MapButton = styled.div`
  cursor: pointer;
  position: relative;
  padding: 10px 35px;
  transform: ${(props) => (props.isActive ? 'translateX(50px)' : 'translateX(20px)')};
  font-weight: 600;
  font-size: 1.35rem;
  color: ${(props) => (props.isActive ? props.theme.secondary : props.theme.textAlt)};
  display: flex;
  align-items: center;
  transition: 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: ${(props) => (props.isActive ? '-50px' : '-20px')};
    bottom: 50%;
    width: ${(props) => (props.isActive ? '73px' : '45px')};
    height: 2px;
    background-color: ${(props) => (props.isActive ? props.theme.primary : props.theme.text)};
    transition: 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.secondary};
    transform: ${(props) => (props.isActive ? 'translateX(50px)' : 'translateX(50px)')};
    transition: 0.3s ease;

    &::before {
      background-color: ${(props) => props.theme.primary};
      width: 73px;
      left: -50px;
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: ${(props) => props.theme.cardLighter};
  border-radius: 100px;
`;

const TabButton = styled.div`
  cursor: pointer;
  flex: 1;
  border-radius: 100px;
  text-align: center;
  padding: 13px 0;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${(props) => (props.isActive ? props.theme.text : props.theme.text)};
  background-color: ${(props) => (props.isActive ? props.theme.buttonHoverBackground : 'transparent')};
  transition: 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;

const RiskCalcMapContainer = styled.div`
  margin-top: 20px;
`

const FullHeatmap = () => {

    const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
    const apiLocalURL = 'http://127.0.0.1:5000'

    const [selectedMap, setSelectedMap] = useState('vehicle-theft');
    const [mapType, setMapType] = useState('HeatMap'); // Track the selected map type

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

    const getClusterGeoJsonUrl = () => {
        switch (selectedMap) {
            case 'vehicle-theft':
                return '/sfpd_cluster_theft.geojson';
            case 'mental-health':
                return '/sfpd_cluster_mental_health.geojson';
            case 'assault':
                return '/sfpd_cluster_assault.geojson';
            case 'drugs':
                return '/sfpd_cluster_drugs.geojson';
            default:
                return '/sfpd_cluster_theft.geojson';
        }
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

    const mapKey = `leaflet-map-${selectedMap}`;

    return (
        <FullPageContainer>
            <TextContainer>
                <HomeTitle>Interactive Map</HomeTitle>
                <TabContainer>
                    <TabButton onClick={() => handleMapTypeSelection('HeatMap')} isActive={mapType === 'HeatMap'}>
                        Cluster Map
                    </TabButton>
                    <TabButton onClick={() => handleMapTypeSelection('ClusterMap')} isActive={mapType === 'ClusterMap'}>
                        Heat Map
                    </TabButton>
                </TabContainer>
                <HomeSubText>
                    Choose a type of map from above. Then, pick a category of crime below. For heatmaps, click on grid cells for insights into each 0.21 sq km area. For the cluster map, zoom in for more precise data. The data,
                    updated weekly, reflects incidents of the selected crime reported by the SFPD since 2018.
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
        </FullPageContainer>
    );
};

export default FullHeatmap;
