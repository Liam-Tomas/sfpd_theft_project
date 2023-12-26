import React, { useState } from 'react';
import axios from 'axios';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import styled from "styled-components";
import Button from '../utility/Button'; 
import Input from '../utility/Input'; 
import MainContainer from '../utility/MainContainer';
import RiskResultsModal from './RiskResultsModal';

const StyledForm = styled.form`
    display: flex;
    gap: 10px;
    align-items: center;

    @media (max-width: 868px) {
        width: 100%;
        gap: 20px;
        flex-direction: column;
    }
`;

const FormField = styled.div`
    @media (max-width: 868px) {
    width: 100%;

    }
`;

function RiskCalc({ apiEndpoint }) {
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [probability, setProbability] = useState(null);
    const [incidentCount, setIncidentCount] = useState(null);
    const [policeDistrict, setPoliceDistrict] = useState(null);
    const [avgPerMonth, setAvgPerMonth] = useState(null); 
    const [incidentDay, setIncidentDay] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Combine address and zip code
        const completeAddress = `${address}, San Francisco, CA ${zipcode}`;

        try {
            const response = await axios.post(apiEndpoint, { address: completeAddress });
            const data = response.data;

            // Check if probability is undefined, null, NaN, or empty
            if (data.probability === undefined || data.probability === null || isNaN(data.probability) || data.probability === '') {
                throw new Error("Address is not in San Francisco, cannot be located, or is invalid.");
            }
            const probability = response.data.probability; 
            const avgPerMonth = response.data.average_incidents_per_month; 
            const roundedAvg = parseFloat(avgPerMonth).toFixed(2);
            // const incidentCount = response.data.incident_count; 
            const roundedProbability = parseFloat(probability * 100).toFixed(2);
            
            setProbability(roundedProbability);
            setIncidentCount(response.data.incident_count); // Update incident count state
            setIncidentDay(response.data.incident_day_of_week)
            setPoliceDistrict(response.data.police_district)
            setAvgPerMonth(roundedAvg)
            setErrorMessage('');
            setIsModalVisible(true); // Show modal on successful data fetch
            setLoading(false); // Stop loading

        } catch (error) {
            console.error('Error:', error);
    
            // Check if the error is a custom error or an Axios error
            if (error.message === "Address is not in San Francisco, cannot be located, or is invalid.") {
                setErrorMessage(error.message);
                setLoading(false); // Stop loading

            } else if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
                setLoading(false); // Stop loading

            } else {
                setErrorMessage('An error occurred while processing your request.');
                setLoading(false); // Stop loading

            }
            setProbability(null);
            setIncidentCount(null);
            setIncidentDay(null);
            setPoliceDistrict(null)
            setAvgPerMonth(null);
            setIsModalVisible(false); // Hide modal on error
            setLoading(false); // Stop loading

        }
    };

    return <MainContainer>
        <h3>Enter Your Address for Local Insights</h3>
        <StyledForm onSubmit={handleSubmit}>
                <FormField>
                    <Input
                        type="text"
                        required
                        placeholder="Enter SF Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FormField>
                <FormField>
                    <Input
                        type="text"
                        required
                        placeholder="Enter Zip Code"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </FormField>
                <Button type="submit" loading={loading} width="80px" height="42px">Submit</Button>
            </StyledForm>
        {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
        )}

        <RiskResultsModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            data={{
                address: `${address}, ${zipcode}`,
                riskCategory: probability !== null ? categorizeRisk(probability) : '',
                probability,
                incidentCount,
                avgPerMonth,
                incidentDay,
                policeDistrict,
                getRiskCategoryColor 
            }}
        />

    </MainContainer >;

}

export default RiskCalc;

