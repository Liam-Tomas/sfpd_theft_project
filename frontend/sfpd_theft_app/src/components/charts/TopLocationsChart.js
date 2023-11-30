
// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TheftLocationsChart = () => {
//     const [chartData, setChartData] = useState(null); // Initially null
//     const api_route = 'http://127.0.0.1:5000/';

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${api_route}/top-theft-locations`);
//                 const data = response.data;
//                 if (data && Array.isArray(data)) {
//                     setChartData({
//                         labels: data.map(item => item.Intersection),
//                         datasets: [{
//                             label: 'Total Incidents',
//                             data: data.map(item => item.Total_Incidents),
//                             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                             borderColor: 'rgba(54, 162, 235, 1)',
//                             borderWidth: 1
//                         }]
//                     });
//                 } else {
//                     console.error('Data is not an array:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const options = {
//         scales: {
//             x: {
//                 type: 'category',
//                 title: {
//                     display: true,
//                     text: 'Intersection'
//                 }
//             },
//             y: {
//                 type: 'linear',
//                 title: {
//                     display: true,
//                     text: 'Total Incidents'
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top'
//             }
//         },
//         // Additional options can be added here
//     };

//     return (
//         <div>
//             <h2>Top Intersecrtions for Vehicle Break-ins</h2>
//             {chartData && <Bar data={chartData} options={options} />}
//         </div>
//     );
// };

// export default TheftLocationsChart;

import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer'
import { ThemeContext } from 'styled-components';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledGrid = styled.div`
    // display: grid;
    // grid-template-columns: 1fr 1fr;
`;

const ChartContainer = styled.div`

`;


const TopLocationsChart = ({ apiEndpoint }) => {
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState(null); // Initially null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Intersection), // Use Intersection for x-axis
                        datasets: [{
                            label: 'Total Incidents of Vehicle Break-ins',
                            data: data.map(item => item.Total_Incidents), // Use Total_Incidents for y-axis
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    });
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    const options = {
        responsive: false, // Disable responsiveness
        maintainAspectRatio: true, // Allow custom aspect ratio
        indexAxis: 'y', // Set the index axis to 'y' for a horizontal bar chart
        scales: {
            x: {
                grid: {
                    color: theme.cardLight, // Using text color from the theme
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Total Incidents'
                },
                title: {
                    color: theme.textAlt, // Using text color from the theme
                },
                ticks: {
                    color: theme.textAlt, // Using text color from the theme
                }
            },
            y: {
                grid: {
                    color: theme.cardLight, // Using text color from the theme
                },
                title: {
                    display: false,
                    text: 'Intersection'
                },
                title: {
                    color: theme.textAlt, // Using text color from the theme
                },
                ticks: {
                    color: theme.textAlt, // Using text color from the theme
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt, // Using text color from the theme for legend labels
                }
                
            }
            
        },
        // Additional options can be added here
    };

    return (
        <MainContainer>
            {/* <h2>Some More Data</h2> */}
            <StyledGrid>
                <ChartContainer>
                    <h3 style={{marginTop:''}}>Most Common Locations</h3>
                    {chartData && (
                        <Bar
                            data={chartData}
                            options={options}
                            height={355} // You can also set the height as needed
                            width={570} // Set the width to a larger value to make it wider
                        />
                    )}
                </ChartContainer>
            </StyledGrid>
        </MainContainer>
    );
};

export default TopLocationsChart;
