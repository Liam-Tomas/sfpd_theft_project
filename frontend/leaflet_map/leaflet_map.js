// Initialize your Leaflet map (assuming it's already done)
// var map = L.map(...);

// Function to determine color based on probability

function getColor(probability) {
    // Adjusted color thresholds to capture a broader range of probabilities
    return probability > 0.1 ? '#67000d' :   // Very dark red for the highest probabilities
           probability > 0.075 ? '#a50f15' :
           probability > 0.05 ? '#7f0000' :   // Dark red for very high probabilities
           probability > 0.04 ? '#de2d26' :     // Slightly lighter red
           probability > 0.03 ? '#fb6a4a' :     // Orange-red
           probability > 0.02 ? '#b30000' :
           probability > 0.01 ? '#d7301f' :
           probability > 0.005 ? '#ef6548' :
           probability > 0.002 ? '#fc8d59' :
           probability > 0.001 ? '#fdbb84' :
           probability > 0.0005 ? '#fdd49e' :
           probability > 0.0001 ? '#fee8c8' :
           '#fff7ec'; // Very low probability, almost off-white
}

// Create a GeoJSON layer and add it to the map
var heatmapLayer = L.geoJSON(null, {
    style: feature => ({
        fillColor: getColor(feature.properties.probability),
        weight: .5,
        opacity: 1,
        color: 'white',
        fillOpacity: .5
    }),
    onEachFeature: onEachFeature  // Add this line
}).addTo(map);


// Function to add interactivity to each feature
function onEachFeature(feature, layer) {
    if (feature.properties) {
        // Log all properties to the console
        console.log("All Properties:", feature.properties);

        var popupContent = "<b>Probability:</b> " + (feature.properties.probability * 100).toFixed(2) + "%";

        // Access specific properties using dot notation
        popupContent += "<br><b>Total Incidents:</b> " + (feature.properties["incident_count"] || 'N/A');
        popupContent += "<br><b>Incident Date:</b> " + (feature.properties["Incident Date"] || 'N/A');
        popupContent += "<br><b>Incident Day of Week:</b> " + (feature.properties["Incident Day of Week"] || 'N/A');
        popupContent += "<br><b>Incident Time:</b> " + (feature.properties["Incident Time"] || 'N/A');
        popupContent += "<br><b>Resolution:</b> " + (feature.properties["Resolution"] || 'N/A');
        popupContent += "<br><b>Police District:</b> " + (feature.properties["Police District"] || 'N/A');

        layer.bindPopup(popupContent);
    }
}

// Fetch the GeoJSON file and add the data to the heatmap layer
fetch('sf_heatmap.geojson') // Replace with the correct path to your GeoJSON file
    .then(response => response.json())
    .then(data => {

        heatmapLayer.addData(data);
    });


// Other possible color functions:
// function getColor(probability) {
//     // Example color gradient - you can adjust these values
//     return probability > 0.5 ? '#800026' :
//            probability > 0.4 ? '#BD0026' :
//            probability > 0.3 ? '#E31A1C' :
//            probability > 0.2 ? '#FC4E2A' :
//            probability > 0.1 ? '#FD8D3C' :
//            probability > 0.05 ? '#FEB24C' :
//            '#FFEDA0'; // Lowest probability color
// }

// function getColor(probability) {
//     // Adjusted for smaller probability values
//     return probability > 0.01 ? '#800026' :
//            probability > 0.005 ? '#BD0026' :
//            probability > 0.001 ? '#E31A1C' :
//            probability > 0.0005 ? '#FC4E2A' :
//            probability > 0.0001 ? '#FD8D3C' :
//            '#FFEDA0'; // Very low probability
// }

// function getColor(probability) {
//     // More nuanced thresholds for higher probabilities
//     return probability > 0.1 ? '#67000d' :   // Very dark red for the highest probabilities
//            probability > 0.075 ? '#a50f15' :
//            probability > 0.05 ? '#cb181d' :
//            probability > 0.025 ? '#ef3b2c' :
//            probability > 0.0125 ? '#fb6a4a' :
//            probability > 0.00625 ? '#fc9272' :
//            probability > 0.003125 ? '#fcbba1' :
//            probability > 0.0015 ? '#fee0d2' :
//            '#fff5f0'; // Very low probability, almost off-white
// }

// function getColor(probability) {
//     // More color gradients between 0.05 and 0.025 probabilities
//     return probability > 0.1 ? '#67000d' :     // Very dark red for the highest probabilities
//            probability > 0.075 ? '#a50f15' :
//            probability > 0.05 ? '#cb181d' :     // Dark red
//            probability > 0.025 ? '#fc9272' :    // Light orange-red
//            probability > 0.02 ? '#fcbba1' :     // Lighter orange
//            probability > 0.01 ? '#fee0d2' :     // Very light orange
//            probability > 0.005 ? '#fff5f0' :    // Almost off-white
//            '#ffffff';                           // White for very low probability
// }