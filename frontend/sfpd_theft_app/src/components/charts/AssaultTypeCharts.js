import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import MainContainerRight from '../utility/MainContainerRight';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';

const ChartContainer = styled.div`
    width: 580px;
    height: 370px;
    margin-left:20px;
    padding-bottom: 62px;

    @media (max-width: 868px) {
        width: 330px;
        height: 270px;        
    }
`

const AssaultTypesChart = ({ apiEndpoint }) => {
    const [chartData, setChartData] = useState(null);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;

                // Sort the data by incident count in descending order
                data.sort((a, b) => b.Incident_Count - a.Incident_Count);
                const customLabels = [
                    'Other Weapon',
                    'Force',
                    'Knife',
                    'Gun',
                    'Non-Aggravated',
                ];
                // Extract the top 5 categories and create chart data
                const topCategories = data.slice(0, 10);
                const chartData = {
                    labels: topCategories.map(item => item['Incident_Description']), // Accessing 'Incident Description'
                    datasets: [{
                        label: 'Incident Count',
                        data: topCategories.map(item => item.Incident_Count),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(54, 162, 235, 0.6)' 
                        ],
                    }]
                };

                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [apiEndpoint]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Make the chart horizontal
        scales: {
            x: {
                ticks: {
                    color: theme.textAlt, 
                },
                grid: {
                    color: theme.cardLight
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Incident Count'
                }
            },
            y: {
                ticks: {
                    color: theme.textAlt, 
                },
                grid: {
                    color: theme.cardLight
                },
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
        <MainContainerRight>
            <ChartContainer>
            <h3>Top 10 Incident Categories</h3>
            {chartData && (
                <Bar
                    data={chartData}
                    options={options}

                />
            )}
            </ChartContainer>
        </MainContainerRight>
    );
};

export default AssaultTypesChart;
