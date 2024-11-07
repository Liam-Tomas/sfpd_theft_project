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
import { CrimeData } from '../components/charts/CrimeData'; // Adjust the path as necessary
import { DrugData } from '../components/data/DrugData'
 
const MainContainer = styled.div`
  padding: 5px 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr); 
  
  @media (max-width: 1300px) {
    grid-template-columns: 1fr; 
  }
`;

const FirstRowLeft = styled.div`
  grid-column: span 5; 
`;

const FirstRowRight = styled.div`
  grid-column: span 5; 
`;

const SecondRowItem = styled.div`
  grid-column: span 4; 
`;

const SecondRowItem2 = styled.div`
  grid-column: span 4; 
  margin-right: 20px;
`;

const SecondRowItemSmall = styled.div`
  grid-column: span 2; 
`;

const ThirdRowItem = styled.div`
  grid-column: span 5; 
`;

const DashTitle = styled.h1`
  @media (max-width: 880px) {
    margin-top: 65px;
  }
`;

function DrugPage() {

  const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';

  return (
    <MainContainer>
      <DashTitle>San Francisco Drug Arrest Dashboard</DashTitle>
      <StyledGrid>
        <FirstRowLeft>
        <RiskCalc apiEndpoint={`${apiBaseUrl}/get_rate_drugs`} />
          <TopLocationsChart chartData={DrugData.drugTopLocations} />
        </FirstRowLeft>
        <FirstRowRight>
          <LeafletMap geojsonUrl="/heatmaps/sf_heatmap_drugs_new.geojson" />
        </FirstRowRight>
        <SecondRowItem>
          <YearChart
            chartData={DrugData.drugYear} // Replace with specific Year data for drugs if available
            chartLabel="Total Incidents per Year"
          />
        </SecondRowItem>
        <SecondRowItem2>
          <TimeOfDayChart 
            chartData={DrugData.drugTimeOfDay} // Replace with specific Time of Day data for drugs if available
            chartHeight={245} 
            chartWidth={50}
          />
        </SecondRowItem2>
        <SecondRowItemSmall>
          <ResolutionStatusChart 
            chartData={DrugData.drugResolution} // Replace with specific Resolution data for drugs if available
            resolutionField="Resolution"
          />
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart chartData={CrimeData.drugSupervisorIncidents} /> 
        </ThirdRowItem>
        <ThirdRowItem>
          <AssaultTypesChart chartData={CrimeData.assaultTypes} />
        </ThirdRowItem>
      </StyledGrid>
    </MainContainer>
  );
}

export default DrugPage;
