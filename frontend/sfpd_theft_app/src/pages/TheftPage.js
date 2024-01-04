
import React, { useState, useEffect } from 'react';
import LeafletMap from '../components/charts/LeafletMap';
import RiskCalc from '../components/charts/RiskCalc';
import TopLocationsChart from '../components/charts/TopLocationsChart';
import PriceBreakdownChart from '../components/charts/PriceBreakdownChart';
import YearChart from '../components/charts/YearChart';
import ResolutionStatusChart from '../components/charts/ResolutionStatusChart';
import TimeOfDayChart from '../components/charts/TimeOfDayChart';
import SupervisorChart from '../components/charts/SupervisorChart';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 5px 21px;
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

function useMobileScreen(query = '(max-width: 880px)') {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }

    const listener = () => {
      setIsMobile(media.matches);
    };

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [isMobile, query]);

  return isMobile;
}

function HomePage() {
  const isMobile = useMobileScreen();
  //   const apiURL = 'http://127.0.0.1:5000'

  const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';

  return (
    <MainContainer>
      <DashTitle>San Francisco Vehicle Break-in Analysis</DashTitle>
      <StyledGrid>
      <FirstRowLeft>
          <RiskCalc apiEndpoint={`${apiBaseUrl}/get_probability`} />
          {!isMobile && (
            <TopLocationsChart apiEndpoint={`${apiBaseUrl}/top-theft-locations`} />
          )}
        </FirstRowLeft>
        {isMobile && (
          <FirstRowRight>
            <LeafletMap geojsonUrl="/sf_heatmap_theft_new.geojson" />
          </FirstRowRight>
        )}
        {!isMobile && (
          <FirstRowRight>
            <LeafletMap geojsonUrl="/sf_heatmap_theft_new.geojson" />
          </FirstRowRight>
        )}
        {isMobile && (
          <FirstRowLeft>
            <TopLocationsChart apiEndpoint={`${apiBaseUrl}/top-theft-locations`} />
          </FirstRowLeft>
        )}
        <SecondRowItem>
          <YearChart apiEndpoint={`${apiBaseUrl}/get-year-breakdown`} chartLabel="Total Incidents per Year" />
        </SecondRowItem>
        <SecondRowItem>
          <PriceBreakdownChart apiEndpoint={`${apiBaseUrl}/get-price-breakdown`} />
        </SecondRowItem>
        <SecondRowItemSmall>
          <ResolutionStatusChart apiEndpoint={`${apiBaseUrl}/get-status-breakdown`} resolutionField="Resolution_Status" />
        </SecondRowItemSmall>
        <ThirdRowItem>
          <SupervisorChart apiEndpoint={`${apiBaseUrl}/get-supervisor-breakdown`} />
        </ThirdRowItem>
        <ThirdRowItem>
          <TimeOfDayChart apiEndpoint={`${apiBaseUrl}/get-time-breakdown`} chartHeight={390} chartWidth={400} />
        </ThirdRowItem>
      </StyledGrid>
    </MainContainer>
  );
}

export default HomePage;
