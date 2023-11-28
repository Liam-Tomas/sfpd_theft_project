// // import React, { useState } from 'react';
// // import LeafletMap from '../components/LeafletMap'; // Import the LeafletMap component
// // import RiskCalc from '../components/RiskCalc';
// // import TheftLocationsChart from '../components/TheftLocationsChart';
// // import styled from 'styled-components';

// // const StyledGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 100px;
// // `
// // function HomePage() {

// //     return (
// //         <div>
// //             <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
// //             <StyledGrid>
// //                 <RiskCalc />
// //                 <LeafletMap />
// //             </StyledGrid>
// //             <TheftLocationsChart />
// //         </div>
// //     );
// // }

// // export default HomePage;

// import React, { useState } from 'react';
// import LeafletMap from '../components/LeafletMap'; // Import the LeafletMap component
// import RiskCalc from '../components/RiskCalc';
// import TheftLocationsChart from '../components/TheftLocationsChart';
// import PriceBreakdownChart from '../components/PriceBreakdownChart';
// import YearChart from '../components/YearChart';
// import styled from 'styled-components';
// import ResolutionStatusChart from '../components/ResolutionStatusChart';

// const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr; 
// `;

// const LeftColumn = styled.div`
// `;

// const RightColumn = styled.div`
// `;

// const StyledFlex = styled.div`
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// `

// function HomePage() {
//     return (
//         <div>
//             <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
//             <StyledGrid>
//                 <LeftColumn>
//                     <RiskCalc />
//                     <TheftLocationsChart />
//                 </LeftColumn>
//                 <RightColumn>
//                     <LeafletMap />
//                 </RightColumn>
//             </StyledGrid>
//             <StyledFlex>
//                     <YearChart />
//                     <PriceBreakdownChart />
//                     <ResolutionStatusChart />
//                 </StyledFlex>
//         </div>
//     );
// }

// export default HomePage;
import React from 'react';
import LeafletMap from '../components/LeafletMap';
import RiskCalc from '../components/RiskCalc';
import TheftLocationsChart from '../components/TheftLocationsChart';
import PriceBreakdownChart from '../components/PriceBreakdownChart';
import YearChart from '../components/YearChart';
import ResolutionStatusChart from '../components/ResolutionStatusChart';
import TimeOfDayChart from '../components/TimeOfDayChart';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 6 columns for easier division */
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
grid-column: span 10; /* Span 2 columns */

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
          <TimeOfDayChart />
        </ThirdRowItem>
      </StyledGrid>
    </div>
  );
}

export default HomePage;
