import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    // 
`;

const YearChart = ({ apiEndpoint, chartLabel }) => {
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Incident_Year.toString()),
                        datasets: [{
                            label: chartLabel,
                            data: data.map(item => item.Total_Incidents),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2
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
            x: {
                grid: {
                    color: theme.cardLight, 
                },
                title: {
                    display: false,
                    text: 'Year',
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
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Total Incidents',
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
        }
    };

    return (
        <MainContainer>
            <h3>Yearly Breakdown</h3>
            <ChartContainer>
                {chartData && (
                    <Line
                        data={chartData}
                        options={options}
                        // height={200}
                        // width={400}
                    />
                )}
            </ChartContainer>
        </MainContainer>
    );
};

export default YearChart;
