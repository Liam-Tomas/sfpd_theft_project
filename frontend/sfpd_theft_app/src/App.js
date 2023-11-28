import React from 'react';
import Navbar from './components/NavBar'; // Import the Navbar component
import HomePage from './pages/HomePage'; // Import the HomePage component
import styled from 'styled-components';

// Flex container to hold both the navbar and the main content
const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Main content container to account for the navbar's width
const MainContent = styled.div`
  flex-grow: 1; // Takes up remaining space
  margin-left: 100px; // Same as the navbar's width
`;

function App() {
  return (
    <FlexContainer>
      <Navbar /> {/* Navbar on the left */}
      <MainContent>
        <HomePage /> {/* Main content pushed to the right */}
      </MainContent>
    </FlexContainer>
  );
}

export default App;
