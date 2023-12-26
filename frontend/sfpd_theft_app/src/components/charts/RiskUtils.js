const otherHighSeverityCrimes = ['homicide'] // Add others as needed


export const categorizeRisk = (probability, totalIncidents, crimeType) => {
    // Base categorization on probability
    let riskCategory = "Unknown Risk";
    if (probability >= 0.02 && probability < 0.1) {
        riskCategory = "Very Low";
    } else if (probability >= 0.1 && probability < 0.3) {
        riskCategory = "Low";
    } else if (probability >= 0.3 && probability < 0.5) {
        riskCategory = "Moderate";
    } else if (probability >= 0.5 && probability < 0.95) {
        riskCategory = "High";
    } else if (probability >= 0.95) {
        riskCategory = "Very High";
    }

    // Adjust for low-frequency, high-severity crimes
    if (crimeType === 'homicide' || otherHighSeverityCrimes.includes(crimeType)) {
        // Defined threshold for which  incident count too low to be "Very High" risk
        const highSeverityThreshold = 5; 
        if (totalIncidents < highSeverityThreshold && riskCategory === "Very High") {
            riskCategory = "Moderate"; 
        }
    }

    return riskCategory;
};

export const getRiskCategoryColor = (riskCategory) => {
    switch (riskCategory) {
        case "Very Low":
            return "#15803d";
        case "Low Risk":
            return "#4d7c0f";
        case "Moderate":
            return "#a16207";
        case "High":
            return "#9a3412";
        case "Very High":
            return "#991b1b";
        default:
            return "#808080";
    }
};
