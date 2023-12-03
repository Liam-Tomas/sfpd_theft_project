
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/utility/NavBar';
import HomePage from './pages/HomePage';
import TheftPage from './pages/TheftPage';
import MentalPage from './pages/MentalPage';
import AssaultPage from './pages/AssaultPage';
import AboutPage from './pages/AboutPage';
import DrugsPage from './pages/DrugPage';
import { GlobalStyles } from './components/theme/GlobalStyles';
import { useDarkMode } from './components/theme/DarkMode';
import { lightTheme, darkTheme } from './components/theme/CustomStyles'
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
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Router>
        <FlexContainer>
          <Navbar theme={theme} toggleTheme={themeToggler} />
          <MainContent>
            <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/vehicle-theft" element={<TheftPage />} />
              <Route path="/mental-health" element={<MentalPage />} />
              <Route path="/assault" element={<AssaultPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/drugs" element={<DrugsPage />} />

              {/* Add more routes as needed */}
            </Routes>
          </MainContent>
        </FlexContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
