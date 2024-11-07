export const BreakInData = {
    "breakInTimeOfDay": {
        "labels": [
            "Evening (6 PM - 11 PM)",
            "Afternoon (12 PM - 5 PM)",
            "Morning (6 AM - 11 AM)",
            "Night (12 AM - 5 AM)"
        ],
        "datasets": [
            {
                "label": "Break-Ins by Time of Day",
                "data": [
                    54811,
                    47784,
                    27731,
                    17362
                ],
                "backgroundColor": [
                    // "rgba(75, 192, 192, 0.6)",
                    // "rgba(255, 159, 64, 0.6)",
                    // "rgba(54, 162, 235, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ]
            }
        ]
    },
    "breakInPrice": {
        "labels": [
            "Over $950",
            "$200-$950",
            "$50-$200",
            "Under $50",
            "Other"
        ],
        "datasets": [
            {
                "label": "Break-Ins by Price Category",
                "data": [
                    124394,
                    13129,
                    4836,
                    3356,
                    1973
                ],
                "backgroundColor": [
                    // "rgba(54, 162, 235, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    // "rgba(255, 206, 86, 0.6)",
                    // "rgba(255, 99, 132, 0.6)",
                    // "rgba(153, 102, 255, 0.6)"
                ]
            }
        ]
    },
    "breakInYearly": {
        "labels": [
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024"
        ],
        "datasets": [
            {
                "label": "Break-Ins per Year",
                "data": [
                    28475,
                    28238,
                    15522,
                    22238,
                    24386,
                    20705,
                    8124
                ],
                
                "backgroundColor": "rgba(54, 162, 235, 0.6)",
                "borderColor": "rgba(54, 162, 235, 1)", // Set the line color
                "pointBackgroundColor": "rgba(54, 162, 235, 1)", // Match the dot color
                "borderWidth": 2 // Optional: Makes line more visible
            }
        ]
    },
    "breakInResolution": {
        "labels": [
            "Resolved",
            "Unresolved"
        ],
        "datasets": [
            {
                "label": "Resolution Status",
                "data": [
                    868,
                    146820
                ],
                "backgroundColor": [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(54, 162, 235, 0.6)"
                ],
                "borderColor": "rgba(0, 0, 0, 0)", // Remove the border
                "borderWidth": 1 // Set border width to 0
            }
        ]
    },
    "breakInSupervisorIncidents": [
        {
            "Supervisor District": 3.0,
            "Total_Incidents": 30033
        },
        {
            "Supervisor District": 5.0,
            "Total_Incidents": 19726
        },
        {
            "Supervisor District": 2.0,
            "Total_Incidents": 16290
        },
        {
            "Supervisor District": 6.0,
            "Total_Incidents": 13977
        },
        {
            "Supervisor District": 1.0,
            "Total_Incidents": 9617
        },
        {
            "Supervisor District": 9.0,
            "Total_Incidents": 9548
        },
        {
            "Supervisor District": 7.0,
            "Total_Incidents": 8975
        },
        {
            "Supervisor District": 8.0,
            "Total_Incidents": 8773
        },
        {
            "Supervisor District": 10.0,
            "Total_Incidents": 7417
        },
        {
            "Supervisor District": 4.0,
            "Total_Incidents": 3833
        },
        {
            "Supervisor District": 11.0,
            "Total_Incidents": 3267
        }
    ]
}