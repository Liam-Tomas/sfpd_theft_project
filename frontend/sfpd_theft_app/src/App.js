// import React from 'react';
// import Navbar from './components/NavBar'; // Import the Navbar component
// import HomePage from './pages/HomePage'; // Import the HomePage component
// import styled from 'styled-components';

// // Flex container to hold both the navbar and the main content
// const FlexContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// // Main content container to account for the navbar's width
// const MainContent = styled.div`
//   flex-grow: 1; // Takes up remaining space
//   margin-left: 100px; // Same as the navbar's width
// `;

// function App() {
//   return (
//     <FlexContainer>
//       <Navbar /> {/* Navbar on the left */}
//       <MainContent>
//         <HomePage />
//       </MainContent>
//     </FlexContainer>
//   );
// }

// export default App;

import React from 'react';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import { GlobalStyles } from './components/GlobalStyles';
import { useDarkMode } from './components/DarkMode';
import {lightTheme, darkTheme} from './components/CustomStyles'
import styled, { ThemeProvider } from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: 85px;
`;

function App() {
  const [theme, themeToggler] = useDarkMode(); // Use the custom hook
  const currentTheme = theme === 'light' ? lightTheme : darkTheme; // Determine the current theme

  return (
    <ThemeProvider theme={currentTheme}> {/* Apply the theme */}
            <GlobalStyles />

      <FlexContainer>
      <Navbar theme={theme} toggleTheme={themeToggler} />
        <MainContent>
          <HomePage />
        </MainContent>
      </FlexContainer>
    </ThemeProvider>
  );
}

export default App;
