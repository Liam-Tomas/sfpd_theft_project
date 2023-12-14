import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer'
import { ThemeContext } from 'styled-components';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
                            label: 'Total Incidents',
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
                    color: theme.textAlt, 
                },
                ticks: {
                    color: theme.textAlt, 
                }
            },
            y: {
                grid: {
                    color: theme.cardLight,
                },
                title: {
                    display: false,
                    text: 'Intersection'
                },
                title: {
                    color: theme.textAlt,
                },
                ticks: {
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
                <ChartContainer>
                    <h3 style={{marginTop:''}}>Most Common Locations</h3>
                    {chartData && (
                        <Bar
                            data={chartData}
                            options={options}
                            height={355} 
                            width={570} 
                        />
                    )}
                </ChartContainer>
        </MainContainer>
    );
};

export default TopLocationsChart;
