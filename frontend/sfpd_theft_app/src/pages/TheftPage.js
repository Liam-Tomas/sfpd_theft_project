import React from 'react';
import LeafletMap from '../components/charts/LeafletMap';
import RiskCalc from '../components/charts/RiskCalc';
import TopLocationsChart from '../components/charts/TopLocationsChart';
import PriceBreakdownChart from '../components/theft_vehicles/PriceBreakdownChart';
import YearChart from '../components/charts/YearChart';
import ResolutionStatusChart from '../components/charts/ResolutionStatusChart';
import TimeOfDayChart from '../components/theft_vehicles/TimeOfDayChart';
import SupervisorChart from '../components/charts/SupervisorChart';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 5px 21px;
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
  const apiURL = 'http://127.0.0.1:5000'
  return (
    <MainContainer>
      <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
      <StyledGrid>
        <FirstRowLeft>
          <RiskCalc apiEndpoint={`${apiURL}/get_probability`} />
          <TopLocationsChart apiEndpoint="http://127.0.0.1:5000/top-theft-locations" />
        </FirstRowLeft>
        <FirstRowRight> 
          <LeafletMap geojsonUrl="/sf_heatmap_detailed_v6.geojson" />
        </FirstRowRight>
        <SecondRowItem>
          <YearChart
            apiEndpoint={`${apiURL}/get-year-breakdown`}
            chartLabel="Total Incidents per Year"
          />
        </SecondRowItem>
        <SecondRowItem>
          <PriceBreakdownChart/>
        </SecondRowItem>
        <SecondRowItemSmall>
          <ResolutionStatusChart apiEndpoint="http://127.0.0.1:5000/get-status-breakdown"/>
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart apiEndpoint="http://127.0.0.1:5000/get-supervisor-breakdown"/>
        </ThirdRowItem>
        <ThirdRowItem>
          <TimeOfDayChart apiEndpoint="http://127.0.0.1:5000/get-time-breakdown"/>
        </ThirdRowItem>
      </StyledGrid>
    </MainContainer>
  );
}

export default HomePage;