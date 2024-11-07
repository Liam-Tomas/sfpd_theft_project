import React from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletMap';
import RiskCalc from '../components/charts/RiskCalc';
import YearChart from '../components/charts/YearChart';
import TopLocationsChart from '../components/charts/TopLocationsChart';
import ResolutionStatusChart from '../components/charts/ResolutionStatusChart';
import TimeOfDayChart from '../components/charts/TimeOfDayChart';
import SupervisorChart from '../components/charts/SupervisorChart';
import SeasonalChart from '../components/charts/SeasonalChart';
import PriceBreakdownChart from '../components/charts/PriceBreakdownChart';
import { CrimeData } from '../components/charts/CrimeData'; // Adjust the path as necessary
import { MentalHealthData } from '../components/data/MentalHealthData'

const MainContainer = styled.div`
    padding: 5px 21px;
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 6 columns for easier division */
  @media (max-width: 1000px) {
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

const SecondRowItem2 = styled.div`
  grid-column: span 4; /* Span 2 columns */
  margin-right: 20px;
`;


const SecondRowItemSmall = styled.div`
  grid-column: span 2; /* Span 2 columns */
`;

const ThirdRowItem = styled.div`
  grid-column: span 5; /* Span 2 columns */

`

const DashTitle = styled.h1`
  @media (max-width: 880px) {
    margin-top: 65px;
  }
`;

function MentalPage() {
  const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
  const apiLocalURL = 'http://127.0.0.1:5000'

  return (
    <MainContainer>
      <DashTitle>San Francisco Mental Health Incident Analysis</DashTitle>
      <StyledGrid>
        <FirstRowLeft>
          <RiskCalc apiEndpoint={`${apiBaseUrl}/get_rate_mental_health`} />
          <TopLocationsChart chartData={MentalHealthData.mentalTopLocations} />
        </FirstRowLeft>
        <FirstRowRight>
          <LeafletMap geojsonUrl="/heatmaps/sf_heatmap_mental_health_new.geojson" />
        </FirstRowRight>
        <SecondRowItem>
        <YearChart chartData={MentalHealthData.mentalYear} chartLabel="Total Incidents per Year" />

        </SecondRowItem>
        <SecondRowItem2>
        <TimeOfDayChart chartData={MentalHealthData.mentalTimeOfDay} chartHeight={245} chartWidth={50} />

          {/* <PriceBreakdownChart/> */}
        </SecondRowItem2>
        <SecondRowItemSmall>
          <ResolutionStatusChart chartData={MentalHealthData.mentalResolution} resolutionField="Resolution" />
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart chartData={CrimeData.mentalSupervisorIncidents} />

        </ThirdRowItem>
        <ThirdRowItem>
          <SeasonalChart chartData={MentalHealthData.mentalSeasons} />

        </ThirdRowItem>
      </StyledGrid>
    </MainContainer>
  );
}

export default MentalPage;