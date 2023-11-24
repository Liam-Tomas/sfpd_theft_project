 export const categorizeRisk = (probability) => {
    if (probability >= 0.02 && probability < 0.1) {
        return "Very Low Risk";
    } else if (probability >= 0.1 && probability < 0.3) {
        return "Low Risk";
    } else if (probability >= 0.3 && probability < 0.5) {
        return "Moderate Risk";
    } else if (probability >= 0.5 && probability < 0.95) { // Corrected range for High Risk
        return "High Risk";
    } else if (probability >= 0.95 && probability <= 3.0) {
        return "Very High Risk";
    } else {
        return "Unknown Risk";
    }
};

export const getRiskColor = (riskCategory) => {
    switch (riskCategory) {
        case "Very Low Risk":
            return "#98FB98";
        case "Low Risk":
            return "#9ACD32";
        case "Moderate Risk":
            return "#FFD700";
        case "High Risk":
            return "#FFA500";
        case "Very High Risk":
            return "#FF0000";
        default:
            return "#808080";
    }
};
