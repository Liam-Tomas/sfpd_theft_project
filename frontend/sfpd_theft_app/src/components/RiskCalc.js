import React, { useState } from 'react';
import axios from 'axios';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import styled from "styled-components";

const StyledGrid = styled.div`
    display: flex;
    gap:40px;
`
const TopRow = styled.div`

`
const BottomRow = styled.div`

`

const MiddleRow = styled.div`

`

function RiskCalc() {
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [probability, setProbability] = useState(null);
    const [incidentCount, setIncidentCount] = useState(null); // State for incident count
    const [policeDistrict, setPoliceDistrict] = useState(null); // State for incident count
    const [avgPerMonth, setAvgPerMonth] = useState(null); // State for incident count
    const [incidentDay, setIncidentDay] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Combine address and zip code
        // const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
        const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
        const api_route = 'http://127.0.0.1:5000/'
        try {
            const response = await axios.post(`${api_route}/get_probability`, { address: completeAddress });
            const probability = response.data.probability; // Assuming I have the probability value
            const avgPerMonth = response.data.average_incidents_per_month; // Assuming I have the probability value
            const roundedAvg = Math.round(avgPerMonth)
            // const incidentCount = response.data.incident_count; // Assuming I have the probability value

            const roundedProbability = parseFloat(probability * 100).toFixed(2);
            setProbability(roundedProbability);
            setIncidentCount(response.data.incident_count); // Update incident count state
            setIncidentDay(response.data.incident_day_of_week)
            setPoliceDistrict(response.data.police_district)
            setAvgPerMonth(roundedAvg)

            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while processing your request.');
            }
            setProbability(null);
            setIncidentCount(null);
            setIncidentDay(null);
            setPoliceDistrict(null)
            setAvgPerMonth(null);

        }
    };

    const riskCategory = probability !== null ? categorizeRisk(parseFloat(probability)) : '';

    return <div>
        <h2>SF Relative Risk of Vehicle Break-in by Address</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                required
                placeholder="Enter SF Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                    marginRight: "5px",
                }}
            />
            <input
                type="text"
                required
                placeholder="Enter Zip Code"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                style={{
                    marginRight: "5px",
                }}
            />
            <button type="submit">Calculate Risk</button>
        </form>
        {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
        )}

        <div>
            {probability !== null && !errorMessage && (
                <div>
                    <div>
                        <StyledGrid>
                            <TopRow>
                                <p>Risk Category: <span style={{ color: getRiskCategoryColor(riskCategory) }}>{riskCategory}</span></p>
                                <p>Relative Risk: {probability}%**</p>
                            </TopRow>
                            <MiddleRow>
                                <p>Total Incidents: {incidentCount}</p>
                                <p>Monthly Average: {avgPerMonth}</p>
                            </MiddleRow>
                            <BottomRow>

                                <p>Most Common Day: {incidentDay}</p>
                                <p>Police District: {policeDistrict}</p>
                            </BottomRow>
                        </StyledGrid>
                    </div>
                    <p style={{ marginTop: '0px' }}>**Represents the chance of a vehicle break-in occurring in the area 0.21 square kilometers, or 0.081 square miles around this address, relative to all recorded vehicle break-ins in SF since 2018.
                        In simpler terms, out of every 100 vehicle break-ins reported in the city, {probability} happened in this particular area from 2018-2023.
                    </p>
                </div>
            )}
        </div>

    </div >;

}

export default RiskCalc;

