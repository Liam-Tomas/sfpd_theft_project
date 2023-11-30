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

export const getRiskCategoryColor = (riskCategory) => {
    switch (riskCategory) {
        case "Very Low Risk":
            return "#15803d";
        case "Low Risk":
            return "#4d7c0f";
        case "Moderate Risk":
            return "#a16207";
        case "High Risk":
            return "#9a3412";
        case "Very High Risk":
            return "#991b1b";
        default:
            return "#808080";
    }
};
