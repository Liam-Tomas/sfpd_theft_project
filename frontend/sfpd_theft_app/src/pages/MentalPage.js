import React from 'react';
import styled from 'styled-components';
import LeafletMap from '../components/charts/LeafletMap';
import RiskCalc from '../components/charts/RiskCalc';
import YearChart from '../components/charts/YearChart';
import TopLocationsChart from '../components/charts/TopLocationsChart';
import ResolutionStatusChart from '../components/charts/ResolutionStatusChart';
import TimeOfDayChart from '../components/theft_vehicles/TimeOfDayChart';

const MainContainer = styled.div`
    padding: 5px 37px;
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

function MentalPage() {
    return (
        <MainContainer>
            <h1>San Francisco Mental Health Incident Analysis (2018 - 2023)</h1>
            <StyledGrid>
                <FirstRowLeft>
                    <RiskCalc apiEndpoint="http://127.0.0.1:5000/get_rate_mental_health" />
                    <TopLocationsChart apiEndpoint="http://127.0.0.1:5000/get-mental-locations" />
                </FirstRowLeft>
                <FirstRowRight>
                <LeafletMap geojsonUrl="/sf_mental_health_heatmap.geojson" />
                </FirstRowRight>
                <SecondRowItem>
                <YearChart
            apiEndpoint= "http://127.0.0.1:5000/get-mental-year"
            chartLabel="Total Incidents per Year"
          />
                </SecondRowItem>
                <SecondRowItem>
                    <div></div>
                </SecondRowItem>
                <SecondRowItemSmall>
                    <ResolutionStatusChart apiEndpoint = "http://127.0.0.1:5000/get-mental-resolution"/>
                </SecondRowItemSmall>
                <ThirdRowItem>
                    <div></div>
                </ThirdRowItem>
                <ThirdRowItem>
                    <TimeOfDayChart apiEndpoint = "http://127.0.0.1:5000/get-mental-time"/>
                </ThirdRowItem>
            </StyledGrid>
        </MainContainer>
    );
}

export default MentalPage;