import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import MainContaineRight from '../utility/MainContainerRight';
import { ThemeContext } from 'styled-components';

const ChartContainer = styled.div`
    min-height: 240px;
    margin-right: 30px;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const TimeOfDayChart = ({ chartData, chartHeight, chartWidth }) => {
    const theme = useContext(ThemeContext);

    // Use CrimeData.breakInTimeOfDay directly

    const options = {
        scales: {
            y: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
                beginAtZero: true,
                title: {
                    display: false,
                }
            },
            x: {
                ticks: {
                    color: theme.textAlt,
                },
                grid: {
                    color: theme.cardLight,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme.textAlt,
                }
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <MainContaineRight>
            <h3>Breakdown by Time of Day</h3>
            <ChartContainer>
                <Bar
                    data={chartData}
                    options={options}
                    height={chartHeight}
                    width={chartWidth}
                />
            </ChartContainer>
        </MainContaineRight>
    );
};

export default TimeOfDayChart;
