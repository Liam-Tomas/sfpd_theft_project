import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from './MainContainer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    // Add styles here
`;

const PriceBreakdownChart = () => {
    const [chartData, setChartData] = useState(null);
    const api_route = 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_route}/get-price-breakdown`);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Price_Category),
                        datasets: [{
                            label: 'Total Incidents by Price Category',
                            data: data.map(item => item.Total_Incidents),
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
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
    }, []);

    const options = {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Price Category'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Incidents'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        // Additional options can be added here
    };

    return (
        <MainContainer>
            <h3>Breakdown by Price Category</h3>
            <ChartContainer>
                {chartData && (
                    <Bar
                        data={chartData}
                        options={options}

                    />
                )}
            </ChartContainer>
        </MainContainer>
    );
};

export default PriceBreakdownChart;
