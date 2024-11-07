import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import MainContaineRight from '../utility/MainContainerRight';
import { ThemeContext } from 'styled-components';

const ChartWrapper = styled.div`
    margin: auto;  
    height: 244px;
`;

ChartJS.register(ArcElement, Tooltip, Legend);

const ResolutionStatusChart = ({ chartData }) => {
    const theme = useContext(ThemeContext);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: theme.textAlt,
                },
            },
        },
    };

    return (
        <MainContaineRight>
            <h3>Resolution Status</h3>
            <ChartWrapper>
                {chartData ? (
                    <Pie data={chartData} options={options} />
                ) : (
                    <p>No data available</p>
                )}
            </ChartWrapper>
        </MainContaineRight>
    );
};

export default ResolutionStatusChart;
