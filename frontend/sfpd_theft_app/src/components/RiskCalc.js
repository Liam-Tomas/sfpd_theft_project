import React, { useState } from 'react';
import axios from 'axios';


function RiskCalc() {
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

    return <div>
                <h1>SF Relative Risk of Vehicle Break-in by Address</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter SF Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{
                            marginRight:"5px",
                        }}
                    />
                    <input
                        type="text"
                        required
                        placeholder="Enter Zip Code"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        style={{
                            marginRight:"5px",
                        }}
                    />
                    <button type="submit">Calculate Risk</button>
                </form>
                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                {probability !== null && !errorMessage && (
                    <p>Relative Risk: {probability}%**</p>
                )}
                <p>**Represents the chance of a vehicle break-in occurring in this area relative to all recorded vehicle break-ins in SF since 2018.
                    In simpler terms, out of every 100 vehicle break-ins reported in the city, {probability} happened in this particular area from 2018-2023.</p>
            </div>;
}

export default RiskCalc;