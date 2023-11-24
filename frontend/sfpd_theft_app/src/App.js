import React, { useState } from 'react';
import axios from 'axios';
import LeafletMap from './components/LeafletMap'; // Import the LeafletMap component
import RiskCalc from './components/RiskCalc';

function App() {
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [probability, setProbability] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine address and zip code
    // const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
    const completeAddress = `${address}, San Francisco, CA ${zipcode}`;

    try {
      const response = await axios.post('http://127.0.0.1:5000/get_probability', { address: completeAddress });
      const probability = response.data.probability; // Assuming you have the probability value
      const roundedProbability = parseFloat(probability * 100).toFixed(2);
      setProbability(roundedProbability);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
      setProbability(null);
    }
  };

  return (
    <div>
        <RiskCalc />
        <LeafletMap /> 
    </div>
  );
}

export default App;
