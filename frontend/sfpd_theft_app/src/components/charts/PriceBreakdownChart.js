// import React, { useState, useEffect, useContext } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import styled from 'styled-components';
// import MainContainer from '../utility/MainContainer';
// import { ThemeContext } from 'styled-components';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ChartContainer = styled.div`
//     // Add styles here
// `;

// const PriceBreakdownChart = ({ apiEndpoint }) => {
//     const [chartData, setChartData] = useState(null);
//     const theme = useContext(ThemeContext);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(apiEndpoint);
//                 const data = response.data;
//                 if (data && Array.isArray(data)) {
//                     setChartData({
//                         labels: data.map(item => item.Price_Category),
//                         datasets: [{
//                             label: 'Total Incidents by Price Category',
//                             data: data.map(item => item.Total_Incidents),
//                             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//                             borderColor: 'rgba(255, 99, 132, 1)',
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
//     }, [apiEndpoint]);

//     const options = {
//         scales: {
//             x: {
//                 ticks: {
//                     color: theme.textAlt,
//                 },
//                 grid: {
//                     color: theme.cardLight,
//                 },
//                 beginAtZero: true,
//                 title: {
//                     display: false,
//                     text: 'Price Category',
//                     color: theme.textAlt,
//                 }
//             },
//             y: {
//                 ticks: {
//                     color: theme.textAlt,
//                 },
//                 grid: {
//                     color: theme.cardLight,
//                 },
//                 title: {
//                     display: false,
//                     text: 'Total Incidents',
//                     color: theme.textAlt,

//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top',
//                 labels: {
//                     color: theme.textAlt,
//                 }
//             }
//         },
//     };

//     return (
//         <MainContainer>
//             <h3>Breakdown by Price of Stolen Item</h3>
//             <ChartContainer>
//                 {chartData && (
//                     <Bar
//                         data={chartData}
//                         options={options}

//                     />
//                 )}
//             </ChartContainer>
//         </MainContainer>
//     );
// };

// export default PriceBreakdownChart;

import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    // Add styles here
`;

const PriceBreakdownChart = ({ apiEndpoint }) => {
    // const [chartData, setChartData] = useState(null);
    const theme = useContext(ThemeContext);

    // Commented out the API fetching code for now
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(apiEndpoint);
    //             const data = response.data;
    //             if (data && Array.isArray(data)) {
    //                 setChartData({
    //                     labels: data.map(item => item.Price_Category),
    //                     datasets: [{
    //                         label: 'Total Incidents by Price Category',
    //                         data: data.map(item => item.Total_Incidents),
    //                         backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //                         borderColor: 'rgba(255, 99, 132, 1)',
    //                         borderWidth: 1
    //                     }]
    //                 });
    //             } else {
    //                 console.error('Data is not an array:', data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [apiEndpoint]);

    // Hardcoded data for testing
    const chartData = {
        labels: ['Over $950', '$200-$950', '$50-$200', 'Under $50', 'Other'],
        datasets: [{
            label: 'Total Incidents by Price Category',
            data: [120, 95, 60, 30, 5], // Hardcoded values
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Price Category',
                    color: theme.textAlt,
                }
            },
            y: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                title: {
                    display: false,
                    text: 'Total Incidents',
                    color: theme.textAlt,
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt,
                }
            }
        },
    };

    return (
        <MainContainer>
            <h3>Breakdown by Price of Stolen Item</h3>
            <ChartContainer>
                <Bar
                    data={chartData}
                    options={options}
                />
            </ChartContainer>
        </MainContainer>
    );
};

export default PriceBreakdownChart;
