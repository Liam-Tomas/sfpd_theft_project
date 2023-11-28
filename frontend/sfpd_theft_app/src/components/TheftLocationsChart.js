
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

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from './MainContainer'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const ChartContainer = styled.div`
`;



const TheftLocationsChart = () => {
    const [chartData, setChartData] = useState(null); // Initially null
    const api_route = 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_route}/top-theft-locations`);
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
    }, []);

    const options = {
        indexAxis: 'y', // Set the index axis to 'y' for a horizontal bar chart
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Total Incidents'
                }
            },
            y: {
                title: {
                    display: false,
                    text: 'Intersection'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        // Additional options can be added here
    };

    return (
        <MainContainer>
            {/* <h2>Some More Data</h2> */}
            <StyledGrid>
                <ChartContainer>
                    <h3 style={{marginTop:''}}>Most Common Locations of Theft in SF</h3>
                    {chartData && (
                        <Bar
                            data={chartData}
                            options={options}
                            height={388} // You can also set the height as needed
                            width={588} // Set the width to a larger value to make it wider
                        />
                    )}
                </ChartContainer>
            </StyledGrid>
        </MainContainer>
    );
};

export default TheftLocationsChart;
