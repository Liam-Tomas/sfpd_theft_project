import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContaineRight from '../utility/MainContainerRight';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    // Add styles here
`;

const TimeOfDayChart = ({ apiEndpoint }) => {
    const [chartData, setChartData] = useState(null);

    const theme = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Time_Slot),
                        datasets: [{
                            label: 'Total Incidents by Time of Day',
                            data: data.map(item => item.Total_Incidents),
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
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
        scales: {
            y: {
                ticks: {
                    color: theme.textAlt, // Using text color from the theme
                },
                grid: {
                    color: theme.cardLight, // Using text color from the theme
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Total Incidents',
                    color: theme.textAlt, // Using text color from the theme
                }
            },
            x: {
                ticks: {
                    color: theme.textAlt, // Using text color from the theme
                },
                grid: {
                    color: theme.cardLight, // Using text color from the theme
                },
                title: {
                    display: false,
                    text: 'Time of Day',
                    color: theme.textAlt, // Using text color from the theme
                }
            }, 
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt, // Using text color from the theme for legend labels
                }
            },

        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <MainContaineRight>
            <h3>Breakdown by Time of Day</h3>
            <ChartContainer>
                {chartData && (
                    <Bar
                        data={chartData}
                        options={options}
                        height={390}
                        width={400}
                    />
                )}
            </ChartContainer>
        </MainContaineRight>
    );
};

export default TimeOfDayChart;