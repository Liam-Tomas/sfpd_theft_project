import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import MainContainer from '../utility/MainContainer';
import { ThemeContext } from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
    margin-top: 20px;
`;

const PriceBreakdownChart = ({ chartData }) => {
    const theme = useContext(ThemeContext);

    const options = {
        scales: {
            x: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Price Category',
                    color: theme.textAlt,
                },
            },
            y: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                title: {
                    display: false,
                    text: 'Total Incidents',
                    color: theme.textAlt,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt,
                },
            },
        },
    };

    return (
        <MainContainer>
            <h3>Breakdown by Price of Stolen Item</h3>
            <ChartContainer>
                <Bar data={chartData} options={options} />
            </ChartContainer>
        </MainContainer>
    );
};

export default PriceBreakdownChart;
