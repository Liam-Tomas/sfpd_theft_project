import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { CrimeData } from '../charts/CrimeData'; // Adjust the path if necessary

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    height: 234px;
`;

const YearChart = ({ chartData, chartLabel }) => {
    const theme = useContext(ThemeContext);

    // Clone data and inject dynamic theme colors
    const dynamicChartData = {
        ...CrimeData.breakInYearly,
        datasets: CrimeData.breakInYearly.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: `${theme.primary}80`, // Add transparency
            borderColor: theme.primary,
            pointBackgroundColor: theme.primary,
            borderWidth: 2,
        })),
    };

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
                <Line
                    data={chartData}
                    options={options}
                />
            </ChartContainer>
        </MainContainer>
    );
};

export default YearChart;
