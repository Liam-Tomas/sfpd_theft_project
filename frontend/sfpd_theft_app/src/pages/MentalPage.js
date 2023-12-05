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
                <SecondRowItem2>
                    <TimeOfDayChart apiEndpoint = "http://127.0.0.1:5000/get-mental-time"  chartHeight={240} chartWidth={50}/>
                  {/* <PriceBreakdownChart/> */}
                </SecondRowItem2>
                <SecondRowItemSmall>
                    <ResolutionStatusChart apiEndpoint = "http://127.0.0.1:5000/get-mental-resolution"/>
                </SecondRowItemSmall>
                <ThirdRowItem>
                    <SupervisorChart apiEndpoint="http://127.0.0.1:5000/get-mental-supervisor"/>
                </ThirdRowItem>
                <ThirdRowItem>
                <SeasonalChart apiEndpoint= "http://127.0.0.1:5000/get-mental-seasons"> </SeasonalChart>

                </ThirdRowItem>
            </StyledGrid>
        </MainContainer>
    );
}

export default MentalPage;