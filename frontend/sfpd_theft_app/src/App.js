import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap'; // Import the LeafletMap component
import RiskCalc from './components/RiskCalc';

function App() {

  return (
    <div>
      <h1>San Francisco Vehicle Break-in Analysis (2018 - 2023)</h1>
      <RiskCalc />
      <LeafletMap /> 
    </div>
  );
}

export default App;
