export const MentalHealthData = {
    "mentalTopLocations": {
        "labels": [
            "WELSH ST \\ 05TH ST",
            "TEHAMA ST \\ 09TH ST",
            "EDDY ST \\ LEAVENWORTH ST",
            "HYDE ST \\ BUSH ST",
            "EDDY ST \\ MASON ST",
            "ELLIS ST \\ TAYLOR ST",
            "EDDY ST \\ JONES ST",
            "22ND ST \\ POTRERO AVE",
            "TAYLOR ST \\ EDDY ST",
            "06TH ST \\ MISSION ST"
        ],
        "datasets": [
            {
                "label": "Mental Health Incidents by Location",
                "data": [
                    153,
                    144,
                    117,
                    106,
                    100,
                    91,
                    89,
                    89,
                    87,
                    79
                ],
                "backgroundColor": "rgba(54, 162, 235, 0.6)",
                "borderColor": "rgba(54, 162, 235, 1)",
                "borderWidth": 1
            }
        ]
    },
    "mentalYear": {
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
                "label": "Mental Health Incidents per Year",
                "data": [
                    3889,
                    3461,
                    2788,
                    2657,
                    2308,
                    2221,
                    1605
                ],
                "backgroundColor": "rgba(75, 192, 192, 0.6)",
                "borderColor": "rgba(54, 162, 235, 1)", // Set the line color
                "pointBackgroundColor": "rgba(54, 162, 235, 1)", // Match the dot color
                "borderWidth": 2 // Optional: Make the line more visible
            }
        ]
    },
    "mentalResolution": {
        "labels": [
            "Open or Active",
            "Cite or Arrest Adult",
            "Unfounded",
            "Exceptional Adult"
        ],
        "datasets": [
            {
                "label": "Resolution Status",
                "data": [
                    17716,
                    981,
                    134,
                    98
                ],
                "backgroundColor": [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(54, 162, 235, 0.6)"
                ],
                "borderColor": "rgba(0, 0, 0, 0)", // Remove the border
                "borderWidth": 1 // Set border width to 0
            }
        ]
    },
    "mentalTimeOfDay": {
        "labels": [
            "Afternoon (12 PM - 5 PM)",
            "Evening (6 PM - 11 PM)",
            "Morning (6 AM - 11 AM)",
            "Night (12 AM - 5 AM)"
        ],
        "datasets": [
            {
                "label": "Mental Health Incidents by Time of Day",
                "data": [
                    6229,
                    5271,
                    4957,
                    2472
                ],
                "backgroundColor": [
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)"
                ]
            }
        ]
    },
    "mentalSupervisorIncidents": [
        {
            "Supervisor District": 6.0,
            "Total_Incidents": 4121
        },
        {
            "Supervisor District": 3.0,
            "Total_Incidents": 2990
        },
        {
            "Supervisor District": 5.0,
            "Total_Incidents": 2941
        },
        {
            "Supervisor District": 9.0,
            "Total_Incidents": 2065
        },
        {
            "Supervisor District": 8.0,
            "Total_Incidents": 1343
        },
        {
            "Supervisor District": 10.0,
            "Total_Incidents": 1305
        },
        {
            "Supervisor District": 2.0,
            "Total_Incidents": 941
        },
        {
            "Supervisor District": 11.0,
            "Total_Incidents": 913
        },
        {
            "Supervisor District": 7.0,
            "Total_Incidents": 811
        },
        {
            "Supervisor District": 1.0,
            "Total_Incidents": 787
        },
        {
            "Supervisor District": 4.0,
            "Total_Incidents": 683
        }
    ],
    "mentalSeasons": {
        "labels": [
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall",
            "Winter",
            "Spring",
            "Summer",
            "Fall"
        ],
        "datasets": [
            {
                "label": "Incidents by Season",
                "data": [
                    668,
                    993,
                    1031,
                    920,
                    552,
                    861,
                    922,
                    850,
                    529,
                    722,
                    679,
                    655,
                    424,
                    657,
                    710,
                    683,
                    357,
                    584,
                    596,
                    608,
                    392,
                    592,
                    522,
                    583,
                    291,
                    476,
                    493,
                    345
                ],
                "backgroundColor": "rgba(255, 159, 64, 0.6)",
                "borderColor": "rgba(255, 159, 64, 1)",
                "borderWidth": 1
            }
        ]
    }
}