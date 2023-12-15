import React from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletMap';
import RiskCalc from '../components/charts/RiskCalc';
import YearChart from '../components/charts/YearChart';
import TopLocationsChart from '../components/charts/TopLocationsChart';
import ResolutionStatusChart from '../components/charts/ResolutionStatusChart';
import TimeOfDayChart from '../components/charts/TimeOfDayChart';
import SupervisorChart from '../components/charts/SupervisorChart';
import AssaultTypesChart from '../components/charts/AssaultTypeCharts';

const MainContainer = styled.div`
  padding: 5px 20px;
`;

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

function DrugPage() {
  const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';

  return (
    <MainContainer>
      <h1>San Francisco Drug Arrest Analysis (2018 - 2023)</h1>
      <StyledGrid>
        <FirstRowLeft>
          <RiskCalc apiEndpoint={`${apiBaseUrl}/get-rate-drugs`} />
          <TopLocationsChart apiEndpoint="http://127.0.0.1:5000/get-drug-locations" />
        </FirstRowLeft>
        <FirstRowRight>
          <LeafletMap geojsonUrl="/sf_drug_heatmap.geojson" />
        </FirstRowRight>
        <SecondRowItem>
          <YearChart
            apiEndpoint="http://127.0.0.1:5000/get-drug-year"
            chartLabel="Total Incidents per Year"
          />
        </SecondRowItem>
        <SecondRowItem2>
          <TimeOfDayChart apiEndpoint = "http://127.0.0.1:5000/get-drug-time"  chartHeight={245} chartWidth={50}/>
          {/* <MainContainer>derp</MainContainer> */}
        </SecondRowItem2>
        <SecondRowItemSmall>
          <ResolutionStatusChart apiEndpoint="http://127.0.0.1:5000/get-drug-resolution"resolutionField="Resolution"/>
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart apiEndpoint="http://127.0.0.1:5000/get-drug-supervisor" />
        </ThirdRowItem>
        <ThirdRowItem>
          <AssaultTypesChart apiEndpoint="http://127.0.0.1:5000/get-drug-type" />

        </ThirdRowItem>
      </StyledGrid>
    </MainContainer>
  );
}
{/* <TimeOfDayChart apiEndpoint="http://127.0.0.1:5000/get-drug-time" chartHeight={390} chartWidth={400} /> */}


export default DrugPage;