import React, { useState } from 'react';
import LeafletMap from '../components/LeafletMap'; // Import the LeafletMap component
import RiskCalc from '../components/RiskCalc';
import TheftLocationsChart from '../components/TheftLocationsChart';
import styled from 'styled-components';

const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 100px;
`
function HomePage() {

    return (
        <div>
            <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
            <StyledGrid>
                <RiskCalc />
                <LeafletMap />
            </StyledGrid>
            <TheftLocationsChart />
        </div>
    );
}

export default HomePage;
