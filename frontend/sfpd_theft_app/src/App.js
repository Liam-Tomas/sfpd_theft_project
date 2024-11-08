
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/utility/NavBar';
import HomePage from './pages/HomePage';
import TheftPage from './pages/TheftPage';
import MentalPage from './pages/MentalPage';
import AssaultPage from './pages/AssaultPage';
import AboutPage from './pages/AboutPage';
import DrugsPage from './pages/DrugPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import Map from './pages/Map';
import { GlobalStyles } from './components/theme/GlobalStyles';
import { useDarkMode } from './components/theme/DarkMode';
import { lightTheme, darkTheme } from './components/theme/CustomStyles'
import styled, { ThemeProvider } from 'styled-components';
import ErrorBoundary from './components/utility/ErrorBoundary';
import ScrollToTop from './components/utility/ScrollToTop';

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: 85px;

  @media (max-width: 868px) {
    margin-left: 0px;
  }
`;

function App() {
  const [theme, themeToggler] = useDarkMode();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme; // Determine the current theme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <FlexContainer>
          <Navbar theme={theme} toggleTheme={themeToggler} />
          <MainContent>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vehicle-theft" element={<TheftPage />} />
                <Route path="/mental-health" element={<MentalPage />} />
                <Route path="/assault" element={<AssaultPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/drugs" element={<DrugsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/map" element={<Map />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </ErrorBoundary>
          </MainContent>
        </FlexContainer>
      </Router>
    </ThemeProvider >
  );
}

export default App;
