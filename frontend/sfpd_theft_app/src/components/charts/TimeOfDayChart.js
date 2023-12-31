import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContaineRight from '../utility/MainContainerRight';
import { ThemeContext } from 'styled-components';
import Loading from '../utility/Loading';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    min-height: 240px;
    min-height: 240px;

    margin-right: 30px;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const TimeOfDayChart = ({ apiEndpoint, chartHeight, chartWidth }) => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                setIsLoading(false);
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
        scales: {
            y: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Total Incidents',
                    color: theme.textAlt,
                }
            },
            x: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                title: {
                    display: false,
                    text: 'Time of Day',
                    color: theme.textAlt,
                }
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt,
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
                {isLoading ? (
                    <Loading /> // Show loading spinner when data is being fetched
                ) : (
                    chartData && (
                        <Bar
                        data={chartData}
                        options={options}
                        height={chartHeight}
                        width={chartWidth}

                    />
                    )
                )}
            </ChartContainer>
        </MainContaineRight>
    );
};

export default TimeOfDayChart;
