import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import MainContaineRight from './MainContainerRight';

const ChartWrapper = styled.div`
    margin: auto;  // Center the chart
    height: 253px; You can also set the height as needed
/>
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
                position: 'bottom'
            }
        }
    };

    return (
        <MainContaineRight>
            <h3>Resolution Status</h3>
            <ChartWrapper>
                {chartData && (
                    <Pie height={500} width={500} data={chartData} options={options} />
                )}
            </ChartWrapper>
        </MainContaineRight>
    );
};

export default ResolutionStatusChart;
