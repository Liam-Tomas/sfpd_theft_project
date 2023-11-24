import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap'; // Import the LeafletMap component
import RiskCalc from './components/RiskCalc';

function App() {

  return (
    <div>
        <RiskCalc />
        <LeafletMap /> 
    </div>
  );
}

export default App;
