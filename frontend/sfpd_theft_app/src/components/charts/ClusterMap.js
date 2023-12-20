// import React, { useEffect, useRef, useContext, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster';
// import styled from 'styled-components';
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

// function ClusterMap({ geojsonUrl }) {
//   const mapRef = useRef(null);
//   const theme = useContext(ThemeContext);
//   const [dateFilter, setDateFilter] = useState('total'); // State for date filter
//   const [data, setData] = useState(null); // State to store the full dataset
//   const markersLayer = useRef(null); // Ref to store the marker layer

//   // Function to determine the Mapbox tile layer ID based on the theme
//   const getMapboxTileLayerId = () => {
//     return theme.mode === 'light' ? 'mapbox/light-v10' : 'mapbox/dark-v10';
//   };

//   // Function to update the tile layer
//   const updateTileLayer = () => {
//     if (mapRef.current) {
//       mapRef.current.eachLayer(layer => {
//         if (layer instanceof L.TileLayer) {
//           mapRef.current.removeLayer(layer);
//         }
//       });

//       L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: getMapboxTileLayerId(),
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA'
//       }).addTo(mapRef.current);
//     }
//   };

//   // Function to filter data based on date
//   const filterDataByDate = (inputData) => {
//     if (dateFilter === 'total') {
//       return inputData.features;
//     }

//     const now = new Date();
//     let dateBoundary;
//     switch (dateFilter) {
//       case 'lastWeek':
//         dateBoundary = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
//         break;
//       case 'lastMonth':
//         dateBoundary = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//         break;
//       case 'lastYear':
//         dateBoundary = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
//         break;
//       default:
//         return inputData.features;
//     }

//     return inputData.features.filter(feature => {
//       const incidentDate = new Date(feature.properties['Incident Date']);
//       return incidentDate >= dateBoundary;
//     });
//   };

//   // Fetch and store the full dataset once
//   useEffect(() => {
//     if (!data) {
//       fetch(geojsonUrl)
//         .then(response => response.json())
//         .then(fetchedData => setData(fetchedData));
//     }
//   }, [geojsonUrl, data]);

//   // Handle map initialization and filtering
//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map('map', {
//         center: [37.7749, -122.4194], // Example center coordinates
//         zoom: 13
//       });
//       updateTileLayer();
//       markersLayer.current = L.markerClusterGroup();
//     }

//     if (data) {
//       const filteredData = filterDataByDate(data);

//       // Clear existing markers
//       if (markersLayer.current) {
//         markersLayer.current.clearLayers();
//       }

//       // Add new markers
//       L.geoJSON(filteredData, {
//         onEachFeature: function (feature, layer) {
//           const props = feature.properties;
//           let popupContent = `<b>Category:</b> ${props['Incident Category']}<br>` +
//                              `<b>Date:</b> ${props['Incident Date']}<br>` +
//                              `<b>Time:</b> ${props['Incident Time']}<br>` +
//                              `<b>Resolution:</b> ${props['Resolution']}<br>` +
//                              `<b>District:</b> ${props['Police District']}`;
//           layer.bindPopup(popupContent);
//         },
//         pointToLayer: function (feature, latlng) {
//           return L.marker(latlng);
//         }
//       }).addTo(markersLayer.current);

//       mapRef.current.addLayer(markersLayer.current);
//     }
//   }, [data, dateFilter]); // Rerun when data or dateFilter changes

//   return (
//     <div>
//       <TitleContainer>
//         <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
//           <option value="total">Total</option>
//           <option value="lastWeek">Last Week</option>
//           <option value="lastMonth">Last Month</option>
//           <option value="lastYear">Last Year</option>
//         </select>
//         {/* Additional content */}
//       </TitleContainer>
//       <StyledLeaflet id="map" />
//     </div>
//   );
// }

// export default ClusterMap;


// import React, { useEffect, useRef, useContext } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster';
// import styled from 'styled-components';
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

// const LoadingOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(255, 255, 255, 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 2em;
//   color: red;
// `;

// function ClusterMap({ geojsonUrl }) {
//   const mapRef = useRef(null);
//   const theme = useContext(ThemeContext);

//   // Function to determine the Mapbox tile layer ID based on the theme
//   const getMapboxTileLayerId = () => {
//     return theme.mode === 'light' ? 'mapbox/light-v10' : 'mapbox/dark-v10';
//   };

//   // Function to update the tile layer
//   const updateTileLayer = () => {
//     if (mapRef.current) {
//       mapRef.current.eachLayer(layer => {
//         if (layer instanceof L.TileLayer) {
//           mapRef.current.removeLayer(layer);
//         }
//       });

//       L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: getMapboxTileLayerId(),
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
//       }).addTo(mapRef.current);
//     }
//   };

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map('map', {
//         center: [37.7749, -122.4194], // Example center coordinates
//         zoom: 13
//       });

//       updateTileLayer();

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

//       mapRef.current.addLayer(markers);
//     }
//   }, [geojsonUrl]); // Dependency array includes geojsonUrl

//   useEffect(() => {
//     updateTileLayer(); // Update the tile layer when the theme changes
//   }, [theme]); // Dependency array includes theme

//   return (
//     <div>
//       <TitleContainer>
//         {/* Additional content can be placed here */}
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
import { createGlobalStyle } from 'styled-components';

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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: red;
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
      const markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          const childCount = cluster.getChildCount();
          let color;
          // if (childCount < 100) {
          //   color = 'rgba(0, 128, 0, 0.6)'; // Faded green
          // } else if (childCount < 800) {
          //   color = 'rgba(100, 149, 237, 0.6)'; // Faded cornflower blue
          // } else if (childCount < 3800) {
          //   color = 'rgba(255, 165, 0, 0.6)'; // Faded orange
          // } else {
          //   color = 'rgba(255, 0, 0, 0.6)'; // Faded red
          // }

          //   if (childCount < 100) {
          //     color = 'rgba(100, 149, 237, 0.6)'; // Faded Cornflower Blue
          //   } else if (childCount < 800) {
          //     color = 'rgba(255, 127, 80, 0.6)'; // Faded Coral
          //   } else if (childCount < 3800) {
          //     color = 'rgba(0, 128, 128, 0.6)'; // Faded Teal
          //   } else {
          //     color = 'rgba(220, 20, 60, 0.6)'; // Deep Crimson
          // }

          // if (childCount < 100) {
          //   color = 'rgba(147, 112, 219, 0.6)'; // Soft Lavender
          // } else if (childCount < 800) {
          //   color = 'rgba(0, 255, 255, 0.6)'; // Muted Cyan
          // } else if (childCount < 3800) {
          //   color = 'rgba(0, 123, 167, 0.6)'; // Rich Cerulean
          // } else {
          //   color = 'rgba(220, 20, 60, 0.6)'; // Deep Crimson
          // }
          if (childCount < 100) {
            color = 'rgba(156, 204, 210, 0.7)'; // Darker Powder Blue
          } else if (childCount < 800) {
            color = 'rgba(107, 225, 182, 0.7)'; // Darker Muted Aqua
          } else if (childCount < 3800) {
            color = 'rgba(0, 123, 167, 0.7)'; // Deep Cerulean
          } else {
            color = 'rgba(138, 43, 226, 0.6)'; // Violet
          }
          // if (childCount < 100) {
          //   color = 'rgba(64, 224, 208, 0.6)'; // Pale Turquoise
          // } else if (childCount < 800) {
          //   color = 'rgba(255, 191, 0, 0.6)'; // Soft Amber
          // } else if (childCount < 3800) {
          //   color = 'rgba(255, 140, 0, 0.6)'; // Vivid Tangerine
          // } else {
          //   color = 'rgba(220, 20, 60, 0.6)'; // Deep Crimson
          // }

          // if (childCount < 100) {
          //   color = 'rgba(135, 206, 235, 0.6)'; // Sky Blue
          // } else if (childCount < 800) {
          //   color = 'rgba(255, 182, 193, 0.6)'; // Rose Pink
          // } else if (childCount < 3800) {
          //   color = 'rgba(138, 43, 226, 0.6)'; // Violet
          // } else {
          //   color = 'rgba(220, 20, 60, 0.6)'; // Crimson Red
          // }

          return new L.DivIcon({
            html: `<div style="background-color: ${color}; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px; color: white;">${childCount}</div>`,
            className: 'marker-cluster', // Ensure this matches your existing class if needed
            iconSize: new L.Point(40, 40),
            iconAnchor: new L.Point(20, 20)
          });
        }
      });

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
              // Use the SVG as a custom icon
              var customIcon = L.icon({
                iconUrl: '/icons/customIcon.svg', // URL to your SVG file in the public directory
                iconSize: [24, 24], // Size of the icon
                iconAnchor: [12, 12] // Point of the icon which will correspond to marker's location
              });
              return L.marker(latlng, { icon: customIcon });
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





