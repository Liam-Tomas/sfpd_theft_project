import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { ThemeContext } from 'styled-components';
import MainContainerRight from '../utility/MainContainerRight';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartWrapper = styled.div`
    height: 431px;
`;


const SeasonalChart = ({ apiEndpoint }) => {
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;

                // Assuming data is in the format: [{season: 'Spring', year: '2018', count: 37642}, ...]
                // Extract unique years and seasons
                const years = [...new Set(data.map(item => item.Year))];
                const seasons = [...new Set(data.map(item => item.Season))];

                // Define a fixed set of colors for seasons
                const seasonColors = {
                    'Spring': 'rgba(255, 99, 132, 0.6)',
                    'Summer': 'rgba(54, 162, 235, 0.6)',
                    'Fall': 'rgba(255, 206, 86, 0.6)',
                    'Winter': 'rgba(75, 192, 192, 0.6)'
                };
                // Create datasets for each season
                const datasets = seasons.map(season => {
                    return {
                        label: season,
                        data: years.map(year => {
                            const entry = data.find(item => item.Year === year && item.Season === season);
                            return entry ? entry.IncidentCount : 0;
                        }),
                        backgroundColor: seasonColors[season],
                        borderColor: seasonColors[season].replace('0.6', '1'),
                        borderWidth: 1
                    };
                });

                setChartData({
                    labels: years,
                    datasets: datasets
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: {
                    color: theme.textAlt, 
                },
                grid: {
                    color: theme.cardLight
                },
                stacked: false,
            },
            y: {
                ticks: {
                    color: theme.textAlt, 
                },
                grid: {
                    color: theme.cardLight
                },
                beginAtZero: true,
                stacked: false,
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt
                }
            }
        }
    };

    return (
        <MainContainerRight>
            <ChartWrapper>
                <h3>Seasonal Incident Counts</h3>
                {chartData && (
                    <Bar
                        data={chartData}
                        options={options}
                        height={430}
                        width={700}
                    />
                )}
            </ChartWrapper>
        </MainContainerRight>

    );
};

export default SeasonalChart;
