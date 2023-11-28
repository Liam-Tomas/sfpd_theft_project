import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import MainContainer from './MainContainer';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    // Add styles here
`;

const YearChart = () => {
    const [chartData, setChartData] = useState(null);
    const api_route = 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_route}/get-year-breakdown`);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Incident_Year.toString()),
                        datasets: [{
                            label: 'Total Incidents per Year',
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
    }, []);

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            },
            y: {
                beginAtZero: true,
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
                        height={180}
                        width={380}
                    />
                )}
            </ChartContainer>
        </MainContainer>
    );
};

export default YearChart;
