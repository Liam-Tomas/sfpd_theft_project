// import React, { useEffect, useRef, useContext, useState} from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExpand } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import { ThemeContext } from 'styled-components';

// const StyledLeaflet = styled.div`
//   height: 100vh;
//   @media (max-width: 868px) {
//     // Your responsive CSS if needed
//   }
// `;

// const TitleContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const StyledIcon = styled(FontAwesomeIcon)`
//   font-size: 1.2rem;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: inherit;
// `;



// function ClusterMap({ geojsonUrl }) {
//   const mapRef = useRef(null);
//   const theme = useContext(ThemeContext);

// // Function to determine the Mapbox tile layer ID based on the theme
// const getMapboxTileLayerId = () => {
//     return theme.mode === 'light' ? 'mapbox/light-v10' : 'mapbox/dark-v10';
//   };
//   useEffect(() => {
    
//     if (!mapRef.current) {
//       const map = L.map('map', {
//         center: [37.7749, -122.4194],
//         zoom: 13
//       });

//       L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//       id: getMapboxTileLayerId(), // Use the function to determine the tile layer ID
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
//       }).addTo(map);

//       const markers = L.markerClusterGroup();

//       fetch(geojsonUrl)
//         .then(response => response.json())
//         .then(data => {
//           L.geoJSON(data, {
//             onEachFeature: function (feature, layer) {
//               const props = feature.properties;
//               let popupContent = `<b>Category:</b> ${props['Incident Category']}<br>` +
//                                  `<b>Date:</b> ${props['Incident Date']}<br>` +
//                                  `<b>Time:</b> ${props['Incident Time']}<br>` +
//                                  `<b>Resolution:</b> ${props['Resolution']}<br>` +
//                                  `<b>District:</b> ${props['Police District']}`;
//               layer.bindPopup(popupContent);
//             },
//             pointToLayer: function (feature, latlng) {
//               return L.marker(latlng);
//             }
//           }).addTo(markers);
//         });

//       map.addLayer(markers);
//       mapRef.current = map;
//     }
//   }, [geojsonUrl, theme]); // Dependency array includes geojsonUrl
  

//   return (
//     <div>
//       <TitleContainer>
//       </TitleContainer>

//       <StyledLeaflet id="map" />
//     </div>
//   );
// }

// export default ClusterMap;

import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';

const StyledLeaflet = styled.div`
  height: 100vh;
  @media (max-width: 868px) {
    // Your responsive CSS if needed
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function ClusterMap({ geojsonUrl }) {
  const mapRef = useRef(null);
  const theme = useContext(ThemeContext);

  // Function to determine the Mapbox tile layer ID based on the theme
  const getMapboxTileLayerId = () => {
    return theme.mode === 'light' ? 'mapbox/light-v10' : 'mapbox/dark-v10';
  };

  // Function to update the tile layer
  const updateTileLayer = () => {
    if (mapRef.current) {
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          mapRef.current.removeLayer(layer);
        }
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: getMapboxTileLayerId(),
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
      }).addTo(mapRef.current);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: [37.7749, -122.4194], // Example center coordinates
        zoom: 13
      });

      updateTileLayer();

      const markers = L.markerClusterGroup();

      fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
              const props = feature.properties;
              let popupContent = `<b>Category:</b> ${props['Incident Category']}<br>` +
                                 `<b>Date:</b> ${props['Incident Date']}<br>` +
                                 `<b>Time:</b> ${props['Incident Time']}<br>` +
                                 `<b>Resolution:</b> ${props['Resolution']}<br>` +
                                 `<b>District:</b> ${props['Police District']}`;
              layer.bindPopup(popupContent);
            },
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng);
            }
          }).addTo(markers);
        });

      mapRef.current.addLayer(markers);
    }
  }, [geojsonUrl]); // Dependency array includes geojsonUrl

  useEffect(() => {
    updateTileLayer(); // Update the tile layer when the theme changes
  }, [theme]); // Dependency array includes theme

  return (
    <div>
      <TitleContainer>
        {/* Additional content can be placed here */}
      </TitleContainer>
      <StyledLeaflet id="map" />
    </div>
  );
}

export default ClusterMap;
