// import React, { useState } from 'react';
// import LeafletMap from '../components/LeafletMap'; // Import the LeafletMap component
// import RiskCalc from '../components/RiskCalc';
// import TheftLocationsChart from '../components/TheftLocationsChart';
// import styled from 'styled-components';

// const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 100px;
// `
// function HomePage() {

//     return (
//         <div>
//             <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
//             <StyledGrid>
//                 <RiskCalc />
//                 <LeafletMap />
//             </StyledGrid>
//             <TheftLocationsChart />
//         </div>
//     );
// }

// export default HomePage;

import React, { useState } from 'react';
import LeafletMap from '../components/LeafletMap'; // Import the LeafletMap component
import RiskCalc from '../components/RiskCalc';
import TheftLocationsChart from '../components/TheftLocationsChart';
import PriceBreakdownChart from '../components/PriceBreakdownChart';
import YearChart from '../components/YearChart';
import styled from 'styled-components';
import ResolutionStatusChart from '../components/ResolutionStatusChart';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns */
  grid-template-rows: 1fr 1fr; /* Two rows */
  gap: 20px; /* Adjust the gap as needed */
  align-items: start; /* Align items at the start of rows */
`;

const LeftColumn = styled.div`
  grid-column: 1 / 2; /* Left column spans the first column */
  grid-row: 1 / 3; /* Left column spans two rows */
`;

const RightColumn = styled.div`
  grid-column: 2 / 3; /* Right column spans the second column */
  grid-row: 1 / 3; /* Right column spans two rows */
`;

function HomePage() {
    return (
        <div>
            <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
            <StyledGrid>
                <LeftColumn>
                    <RiskCalc />
                    <TheftLocationsChart/>
                </LeftColumn>
                <RightColumn>
                    <LeafletMap />
                </RightColumn>
                <PriceBreakdownChart />
                <YearChart />
                <ResolutionStatusChart />
            </StyledGrid>
        </div>
    );
}

export default HomePage;
