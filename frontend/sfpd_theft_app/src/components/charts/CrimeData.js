export const CrimeData = {

// !!! Car Break-In Data !!!

    breakInTimeOfDay: {
        labels: [
            'Evening (6 PM - 11 PM)', 
            'Afternoon (12 PM - 5 PM)', 
            'Morning (6 AM - 11 AM)', 
            'Night (12 AM - 5 AM)'
        ],
        datasets: [
            {
                label: 'Break-Ins by Time of Day',
                data: [51015, 44625, 25757, 15541],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',  // Green
                    'rgba(255, 159, 64, 0.6)',  // Orange
                    'rgba(54, 162, 235, 0.6)',  // Blue
                    'rgba(153, 102, 255, 0.6)'  // Purple
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', 
                    'rgba(255, 159, 64, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    },
    breakInPrice: {
        labels: ['Over $950', '$200-$950', '$50-$200', 'Under $50', 'Other'],
        datasets: [
            {
                label: 'Break-Ins by Price Category',
                data: [115356, 12268, 4491, 3023, 1800], // Values from your data
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',  // Blue
                    'rgba(75, 192, 192, 0.6)',  // Teal
                    'rgba(255, 206, 86, 0.6)',  // Yellow
                    'rgba(255, 99, 132, 0.6)',  // Red
                    'rgba(153, 102, 255, 0.6)', // Purple
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    },
    breakInYearly: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Break-Ins per Year',
                data: [28476, 28237, 15511, 22229, 24337, 18148],
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for bar charts
                borderColor: 'rgba(54, 162, 235, 1)', // Blue for line charts
                borderWidth: 2,
                fill: false, // Ensures no fill for line charts
            },
        ],
    },
    // below is misnamed: it is really the Top Locations Chart Data for breakin 
    // rename to breakInTopLocations
    carBreakIns: {
      labels: [
            'NORTH POINT ST & LARKIN ST', 
            'BEACH ST & BAKER ST', 
            'BALBOA ST & GREAT HWY', 
            'FRANCISCO ST & MONTGOMERY ST', 
            'TAYLOR ST & BEACH ST', 
            '20TH AVE & WINSTON DR', 
            'VISTA LN & PARKRIDGE DR', 
            'KEARNY ST & FRANCISCO ST', 
            '09TH AVE & LINCOLN WAY', 
            'STEINER ST & HAYES ST'
      ],
      datasets: [
        {
          label: 'Car Break-Ins',
          data: [1424, 1204, 1158, 994, 991, 987, 918, 862, 861, 796], // Hardcoded values
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },  
    breakInSupervisorIncidents: [
        { Supervisor_District: 6, Total_Incidents: 500 },
        { Supervisor_District: 3, Total_Incidents: 450 },
        { Supervisor_District: 9, Total_Incidents: 400 },
        { Supervisor_District: 5, Total_Incidents: 350 },
        { Supervisor_District: 10, Total_Incidents: 300 },
        { Supervisor_District: 11, Total_Incidents: 250 },
        { Supervisor_District: 8, Total_Incidents: 200 },
        { Supervisor_District: 2, Total_Incidents: 150 },
        { Supervisor_District: 1, Total_Incidents: 100 },
        { Supervisor_District: 7, Total_Incidents: 80 },
        { Supervisor_District: 4, Total_Incidents: 50 },
        { Supervisor_District: 0, Total_Incidents: 30 },
      ],
      breakInResolution: {
        labels: ["Resolved", "Unresolved"],
        datasets: [
          {
            label: 'Resolution Status',
            data: [813, 136125],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },


// !!! DRUG ARREST DATA !!!

    // misnamed, this is top locations data
    drugArrests: {
      labels: [
        "MARKET ST & 4TH ST",
        "MISSION ST & 5TH ST",
        "HOWARD ST & 6TH ST",
        "TAYLOR ST & TURK ST",
        "POLK ST & ELLIS ST",
      ],
      datasets: [
        {
          label: 'Drug Arrests',
          data: [500, 450, 400, 350, 300],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    drugSupervisorIncidents: [
        { Supervisor_District: 6, Total_Incidents: 300 }, // Tenderloin, SoMa, etc.
        { Supervisor_District: 3, Total_Incidents: 250 }, // North Beach, Chinatown
        { Supervisor_District: 5, Total_Incidents: 200 }, // Haight-Ashbury, Panhandle
        { Supervisor_District: 9, Total_Incidents: 180 }, // Mission District, Bernal Heights
        { Supervisor_District: 10, Total_Incidents: 150 }, // Bayview, Hunter's Point
        { Supervisor_District: 2, Total_Incidents: 120 }, // Marina, Pacific Heights
        { Supervisor_District: 8, Total_Incidents: 110 }, // Castro, Noe Valley
        { Supervisor_District: 7, Total_Incidents: 100 }, // Twin Peaks, Inner Sunset
        { Supervisor_District: 1, Total_Incidents: 80 },  // Richmond District, Sea Cliff
        { Supervisor_District: 11, Total_Incidents: 70 }, // Excelsior, Outer Mission
        { Supervisor_District: 4, Total_Incidents: 60 },  // Sunset District
        { Supervisor_District: 0, Total_Incidents: 20 },  // Out of SF
      ],

// !!! ASSAULT DATA !!!

    assaultTopLocations: {
        labels: [
          "MISSION ST & 4TH ST",
          "TAYLOR ST & ELLIS ST",
          "MARKET ST & 8TH ST",
          "POLK ST & TURK ST",
          "HOWARD ST & 6TH ST"
        ],
        datasets: [
          {
            label: 'Assault Locations',
            data: [890, 780, 670, 610, 580],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },    
      assaultYear: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: 'Incidents per Year',
            data: [450, 500, 550, 600, 650],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      assaultTimeOfDay: {
        labels: ["Morning", "Afternoon", "Evening", "Night"],
        datasets: [
          {
            label: 'Incidents by Time of Day',
            data: [200, 300, 400, 250],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      assaultTypes: {
        labels: ["Aggravated", "Simple", "Domestic"],
        datasets: [
          {
            label: 'Assault Types',
            data: [200, 150, 100],
            backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      assaultResolution: {
        labels: ["Resolved", "Unresolved", "Pending"],
        datasets: [
          {
            label: 'Resolution Status',
            data: [50, 30, 20],
            backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            borderColor: ['rgba(255, 206, 86, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      assaultSupervisorIncidents: [
        { Supervisor_District: 6, Total_Incidents: 300 }, // Tenderloin, SoMa, etc.
        { Supervisor_District: 3, Total_Incidents: 250 }, // North Beach, Chinatown
        { Supervisor_District: 5, Total_Incidents: 200 }, // Haight-Ashbury, Panhandle
        { Supervisor_District: 9, Total_Incidents: 180 }, // Mission District, Bernal Heights
        { Supervisor_District: 10, Total_Incidents: 150 }, // Bayview, Hunter's Point
        { Supervisor_District: 2, Total_Incidents: 120 }, // Marina, Pacific Heights
        { Supervisor_District: 8, Total_Incidents: 110 }, // Castro, Noe Valley
        { Supervisor_District: 7, Total_Incidents: 100 }, // Twin Peaks, Inner Sunset
        { Supervisor_District: 1, Total_Incidents: 80 },  // Richmond District, Sea Cliff
        { Supervisor_District: 11, Total_Incidents: 70 }, // Excelsior, Outer Mission
        { Supervisor_District: 4, Total_Incidents: 60 },  // Sunset District
        { Supervisor_District: 0, Total_Incidents: 20 },  // Out of SF
      ],

// !!! Mental Health incident data !!!!!!!!

    mentalTopLocations: {
        labels: [
          "MISSION ST & 16TH ST",
          "MARKET ST & 5TH ST",
          "TAYLOR ST & TURK ST",
          "HOWARD ST & 3RD ST",
          "POLK ST & GROVE ST",
        ],
        datasets: [
          {
            label: 'Mental Health Incidents',
            data: [720, 680, 630, 580, 540],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      mentalYear: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: 'Incidents per Year',
            data: [300, 350, 400, 450, 500],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
      mentalTimeOfDay: {
        labels: ["Morning", "Afternoon", "Evening", "Night"],
        datasets: [
          {
            label: 'Incidents by Time of Day',
            data: [150, 200, 300, 180],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      mentalSupervisors: {
        labels: ["Supervisor X", "Supervisor Y", "Supervisor Z"],
        datasets: [
          {
            label: 'Incidents Managed',
            data: [200, 180, 150],
            backgroundColor: 'rgba(255, 205, 86, 0.6)',
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      mentalSeasons: {
        labels: ["Spring", "Summer", "Fall", "Winter"],
        datasets: [
          {
            label: 'Seasonal Incidents',
            data: [250, 300, 280, 260],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
      mentalSupervisorIncidents: [
        { Supervisor_District: 6, Total_Incidents: 500 },
        { Supervisor_District: 3, Total_Incidents: 450 },
        { Supervisor_District: 9, Total_Incidents: 400 },
        { Supervisor_District: 5, Total_Incidents: 350 },
        { Supervisor_District: 10, Total_Incidents: 300 },
        { Supervisor_District: 11, Total_Incidents: 250 },
        { Supervisor_District: 8, Total_Incidents: 200 },
        { Supervisor_District: 2, Total_Incidents: 150 },
        { Supervisor_District: 1, Total_Incidents: 100 },
        { Supervisor_District: 7, Total_Incidents: 80 },
        { Supervisor_District: 4, Total_Incidents: 50 },
        { Supervisor_District: 0, Total_Incidents: 30 },
      ],
}
  
