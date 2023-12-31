import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer'
import { ThemeContext } from 'styled-components';
import Loading from '../utility/Loading';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    height: 356px;
    padding-bottom: 40px;

    @media (max-width: 868px) {
        marin-bottom: 20px;
    }
`;


const TopLocationsChart = ({ apiEndpoint }) => {
    const [isLoading, setIsLoading] = useState(true);
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                setIsLoading(false); // Stop loading after fetching data
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
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    const options = {
        responsive: true, // Disable responsiveness
        maintainAspectRatio: false, // Allow custom aspect ratio
        indexAxis: 'y', // Set the index axis to 'y' for a horizontal bar chart
        scales: {
            x: {
                grid: {
                    color: theme.cardLight,
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
                <h3>Most Common Locations</h3>
                {isLoading ? (
                    <Loading /> // Show loading spinner when data is being fetched
                ) : (
                    chartData && (
                        <Bar
                            data={chartData}
                            options={options}
                        />
                    )
                )}
            </ChartContainer>
        </MainContainer>

    );
};

export default TopLocationsChart;
