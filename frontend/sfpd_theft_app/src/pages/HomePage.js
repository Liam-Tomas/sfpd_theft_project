import React from 'react';
import LeafletMap from '../components/LeafletMap';
import RiskCalc from '../components/RiskCalc';
import TheftLocationsChart from '../components/TheftLocationsChart';
import PriceBreakdownChart from '../components/PriceBreakdownChart';
import YearChart from '../components/YearChart';
import ResolutionStatusChart from '../components/ResolutionStatusChart';
import TimeOfDayChart from '../components/TimeOfDayChart';
import SupervisorChart from '../components/SupervisorChart';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  
  grid-template-columns: repeat(10, 1fr); /* 6 columns for easier division */
  @media (max-width: 1300px) {
    grid-template-columns: 1fr; /* Use a single column on smaller screens */
  }

 `;

const FirstRowLeft = styled.div`
  grid-column: span 5; /* Span 3 columns */
`;

const FirstRowRight = styled.div`
  grid-column: span 5; /* Span 3 columns */
`;

const SecondRowItem = styled.div`
  grid-column: span 4; /* Span 2 columns */
`;

const SecondRowItemSmall = styled.div`
  grid-column: span 2; /* Span 2 columns */
`;

const ThirdRowItem = styled.div`
  grid-column: span 5; /* Span 2 columns */

`

function HomePage() {
  return (
    <div>
      <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
      <StyledGrid>
        <FirstRowLeft>
          <RiskCalc />
          <TheftLocationsChart />
        </FirstRowLeft>
        <FirstRowRight> 
          <LeafletMap />
        </FirstRowRight>
        <SecondRowItem>
          <YearChart />
        </SecondRowItem>
        <SecondRowItem>
          <PriceBreakdownChart />
        </SecondRowItem>
        <SecondRowItemSmall>
          <ResolutionStatusChart />
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart />
        </ThirdRowItem>
        <ThirdRowItem>
          <TimeOfDayChart />
        </ThirdRowItem>

      </StyledGrid>
    </div>
  );
}

export default HomePage;