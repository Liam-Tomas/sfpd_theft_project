import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart type
import axios from 'axios';
import MainContainer from '../utility/MainContainer';
import styled from 'styled-components';


const ChartContainer = styled.div`
width: 420px;
height: 250px;
margin: 20px;
`

const AssaultTypesChart = ({ apiEndpoint }) => {
    const [chartData, setChartData] = useState(null);

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
                const topCategories = data.slice(0, 5);
                const chartData = {
                    labels: customLabels,
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
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Incident Count'
                }
            }
        }
    };

    return (
        <MainContainer>
            <ChartContainer>
            <h3>Top 5 Incident Categories</h3>
            {chartData && (
                <Bar // Use Bar chart type
                    data={chartData}
                    options={options}
                    height={200}
                    width={400}
                />
            )}
            </ChartContainer>
        </MainContainer>
    );
};

export default AssaultTypesChart;
