import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SeasonalIncidentsChart = ({ apiEndpoint }) => {
    const theme = useContext(ThemeContext);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;

                // Assuming data is in the format: [{season: 'Spring', year: '2018', count: 37642}, ...]

                // Extract unique years and seasons
                const years = [...new Set(data.map(item => item.year))];
                const seasons = [...new Set(data.map(item => item.season))];

                // Create datasets for each season
                const datasets = seasons.map(season => {
                    return {
                        label: season,
                        data: years.map(year => {
                            const entry = data.find(item => item.year === year && item.season === season);
                            return entry ? entry.count : 0;
                        }),
                        backgroundColor: `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.6)`,
                        borderColor: `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
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
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: theme.cardLight
                },
                stacked: false,
            },
            y: {
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
        <div>
            <h3>Seasonal Incident Counts</h3>
            {chartData && (
                <Bar
                    data={chartData}
                    options={options}
                    height={400}
                    width={600}
                />
            )}
        </div>
    );
};

export default SeasonalIncidentsChart;
