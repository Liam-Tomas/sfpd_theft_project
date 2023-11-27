import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const ChartWrapper = styled.div`
    width: 400px;  // Set a specific width
    height: 400px; // Set a specific height
    margin: auto;  // Center the chart
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const ResolutionStatusChart = () => {
    const [chartData, setChartData] = useState(null);
    const api_route = 'http://127.0.0.1:5000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_route}/get-status-breakdown`);
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setChartData({
                        labels: data.map(item => item.Resolution_Status),
                        datasets: [{
                            label: 'Incidents by Resolution Status',
                            data: data.map(item => item.Total_Incidents),
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 99, 132, 0.6)'

                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)'
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
    }, []);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    return (
        <div>
            <h3>Incident Resolution Status</h3>
            <ChartWrapper>
                {chartData && (
                    <Pie data={chartData} options={options} />
                )}
            </ChartWrapper>
        </div>
    );
};

export default ResolutionStatusChart;
