import React, { useState, useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import MainContaineRight from '../utility/MainContainerRight';
import { ThemeContext } from 'styled-components';

const ChartWrapper = styled.div`
    margin: auto;  // Center the chart
    height: 240px; You can also set the height as needed
/>
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const ResolutionStatusChart = ({ apiEndpoint, resolutionField }) => {
    
    const [chartData, setChartData] = useState(null);
    // const api_route = 'http://127.0.0.1:5000/';
    const theme = useContext(ThemeContext);

    const generateColors = (count) => {
        const palette = [
            'rgba(54, 162, 235, 0.6)', // Blue
            'rgba(255, 99, 132, 0.6)',  // Red
            'rgba(255, 206, 86, 0.6)',  // Yellow
            'rgba(75, 192, 192, 0.6)',  // Green
            // Add more colors as needed
        ];
        return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiEndpoint);
                const data = response.data;
                console.log(data); // Debug: Log the data

                if (data && Array.isArray(data)) {
                    const colorArray = generateColors(data.length);
                    setChartData({
                        labels: data.map(item => item[resolutionField]), // Use resolutionField dynamically
                        datasets: [{
                            label: 'Incidents by Resolution Status',
                            data: data.map(item => item.Total_Incidents),
                            backgroundColor: colorArray,
                            borderColor: colorArray.map(color => color.replace('0.6', '1')),
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
    }, [apiEndpoint, resolutionField]);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: theme.textAlt, // Using text color from the theme for legend labels
                }
                
            }
        }
    };

    return (
        <MainContaineRight>
            <h3>Resolution Status</h3>
            <ChartWrapper>
                {chartData && (
                    <Pie data={chartData} options={options} />
                )}
            </ChartWrapper>
        </MainContaineRight>
    );
};

export default ResolutionStatusChart;
