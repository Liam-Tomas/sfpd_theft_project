import React from 'react';
import LeafletMap from '../components/theft_vehicles/LeafletMap';
import RiskCalc from '../components/theft_vehicles/RiskCalc';
import TheftLocationsChart from '../components/theft_vehicles/TheftLocationsChart';
import PriceBreakdownChart from '../components/theft_vehicles/PriceBreakdownChart';
import YearChart from '../components/theft_vehicles/YearChart';
import ResolutionStatusChart from '../components/theft_vehicles/ResolutionStatusChart';
import TimeOfDayChart from '../components/theft_vehicles/TimeOfDayChart';
import SupervisorChart from '../components/theft_vehicles/SupervisorChart';
import styled from 'styled-components';
import Navbar from '../components/NavBar';

const MainContainer = styled.div`
  padding: 5px 40px;

`
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
    <MainContainer>
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
    </MainContainer>
  );
}

export default HomePage;