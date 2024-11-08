import React, { useState } from 'react';
import axios from 'axios';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import styled from "styled-components";
import Button from '../utility/Button';
import RiskResultsModal from './RiskResultsModal';

const MainContainer = styled.div`
`

const StyledForm = styled.form`
    display: flex;
    gap: 22px;
    align-items: center;
    @media (max-width: 868px) {
        flex-direction: column;
        width: 100%;
    }
`;

const HomeSubText = styled.p`
  color: ${(props) => props.theme.textAlt};
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: -1px;
  @media (max-width: 868px) {
    font-size: 1.1rem;
    margin-top: 15px;
  }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 0.875rem;
    margin-bottom: 5px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid ${props => props.theme.cardLight};
    border-radius: 4px;
    height: 20px;
    font-size: 1rem;
    outline: none;
    width: ${props => props.width || '170px'}; // Use width from props or default
    transition: border-color 0.2s, box-shadow 0.2s;
    background: ${props => props.$backgroundColor || props.theme.card}; // Use $backgroundColor from props or default
    color: ${props => props.theme.text};
    font-family: 'Metropolis', sans-serif;
    &::placeholder {
        color: ${props => props.theme.text};
        opacity: 1 !important;
        }
    &:hover  {
        border-color: ${props => props.theme.hoverShadowColor}; // Highlight color on hover
    }
    &:focus {
        border-color: ${props => props.theme.secondary};
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.3); // Adds focus ring
    }

    @media (max-width: 868px) {
        width: 93%;
    }

`;

const ErrorText = styled.span`
    font-size: 0.75rem;
    color: #ff1744;
    margin-top: 5px;
`;


const FormField = styled.div`

`;

const RiskCalcMap = ({ apiEndpoint, selectedMap }) => {
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
                throw new Error("Address is not in San Francisco, is invalid, or area has no recorded incidents.");
            }

            const probability = response.data.probability;
            const avgPerMonth = response.data.average_incidents_per_month;
            const roundedAvg = parseFloat(avgPerMonth).toFixed(2);
            // const incidentCount = response.data.incident_count; // Assuming I have the probability value
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
            if (error.message === "Address is not in San Francisco, is invalid, or area has no recorded incidents.") {
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

        }
    };

    const crimeTypeNames = {
        "vehicle-theft": "Car Break-ins",
        "assault": "Assault",
        "drugs": "Drug Arrests",
        "mental-health": "Mental Health",
        "burglary": "Burglary",
        "robbery": "Robbery",
        "homicide": "Homicide",
        "prostitution": "Prostitution",
        "car-robbery": "Car Robbery",
        "disorderly": "Disorderly Conduct"
        // ... add the rest as needed
    };

    const friendlyName = crimeTypeNames[selectedMap] || "Unknown Crime Type";



    return <MainContainer>
        <h3>Search Address for Local Insights</h3>
        <HomeSubText>
        </HomeSubText>
        <StyledForm onSubmit={handleSubmit}>
            <FormField>
                <StyledInput
                    width="94%"
                    $backgroundColor="transparent"
                    type="text"
                    required
                    placeholder="Enter SF Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </FormField>
            <FormField>
                <StyledInput
                    width="94%"
                    $backgroundColor="transparent"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
            </FormField>
            <Button
                $backgroundColor=''
                type="submit"
                loading={loading}
                width="60px"
                height="40px"
            >
                Go
            </Button>
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
                crimeType: friendlyName,
                getRiskCategoryColor
            }}
        />

    </MainContainer >;

}

export default RiskCalcMap;

