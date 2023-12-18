 export const categorizeRisk = (probability) => {
    if (probability >= 0.02 && probability < 0.1) {
        return "Very Low";
    } else if (probability >= 0.1 && probability < 0.3) {
        return "Low";
    } else if (probability >= 0.3 && probability < 0.5) {
        return "Moderate";
    } else if (probability >= 0.5 && probability < 0.95) {
        return "High";
    } else if (probability >= 0.95 && probability <= 30.0) {
        return "Very High";
    } else {
        return "Unknown Risk";
    }
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
