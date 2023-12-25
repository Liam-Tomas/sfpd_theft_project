import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import styled from "styled-components";
import Button from '../utility/Button';
import Input from '../utility/Input';
import RiskResultsModal from './RiskResultsModal';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 75vh;
    gap: 30px;
    align-items: center;
    justify-content: center;
    

`
const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 5px;
    @media (max-width: 868px) {
        flex-direction: column;
        width: 100%;
    }
`;

const FormField = styled.div`

`;

const CalcHeader = styled.div`
    text-align: center;

`

const CalcTitle = styled.h1`
    margin-bottom: 10px;
    color: ${props => props.theme.text};
    font-size: 45px;
    font-weight: 600;
    
    @media (max-width: 868px) {
        font-size: 32px;
        margin-bottom: 10px;
    }
    
`

const CalcSub = styled.p`
    margin: 0px 240px;
    font-size: 22px;
    line-height: 1.5;
    color: ${props => props.theme.textAlt};
    @media (max-width: 868px) {
        margin: 0px;

    }

`
const TabContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0px;
  background-color: ${(props) => props.theme.card};
  border-radius: 100px;
  @media (max-width: 868px) {
    width: 95%;

  }
`;

const TabButton = styled.div`
  cursor: pointer;
  flex: 1;
  border-radius: 100px;
  text-align: center;
  padding: 17px 0;
  font-weight: 600;
  font-size: 1.rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.activeText : theme.text)};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.buttonHoverBackground : 'transparent')};
  transition: 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.text};
    background-color: ${({ $isActive, theme }) => $isActive ? theme.activeTabHover : theme.tabHoverColor};
  }
  @media (max-width: 868px) {
    font-size: .7rem;
    padding: 15px 0;


  }

  ${({ $isActive }) => $isActive && `
    &::before {
      transform: scaleX(1);
    }
  `}
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
    padding: 12px 14px;
    border: 2px solid ${props => props.theme.cardLight};
    border-radius: 50px;
    font-size: 1rem;
    outline: none;
    width: ${props => props.width || '190px'}; // Use width from props or default
    transition: border-color 0.2s, box-shadow 0.2s;
    background: ${props => props.$backgroundColor || props.theme.card}; // Use $backgroundColor from props or default
    color: ${props => props.theme.textAlt};

    &:hover  {
        border-color: ${props => props.theme.hoverShadowColor}; // Highlight color on hover
    }
    &:focus {
        border-color: #1976d2; // Highlight color on focus
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

function RiskCalcHome() {
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
    const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
    const [selectedCrime, setSelectedCrime] = useState('vehicle-theft');
    const [apiEndpoint, setApiEndpoint] = useState('');

    const getApiEndpoint = (crime) => {
        const apiBaseUrl = 'https://sfpd-theft-project-flask.onrender.com';
        switch (crime) {
            case 'vehicle-theft':
                return `${apiBaseUrl}/get_probability`;
            case 'mental-health':
                return `${apiBaseUrl}/get_rate_mental_health`;
            case 'assault':
                return `${apiBaseUrl}/get-rate-assault`;
            case 'drugs':
                return `${apiBaseUrl}/get-rate-drugs`;
            case 'burglary':
                return `${apiBaseUrl}/get-rate-burglary`;
            case 'car-robbery':
                return `${apiBaseUrl}/get-rate-car-robbery`;
            default:
                return `${apiBaseUrl}/get_probability`;
        }
    };

    // Update API endpoint when the selected crime changes
    useEffect(() => {
        setApiEndpoint(getApiEndpoint(selectedCrime));
    }, [selectedCrime]);

    const handleCrimeSelection = (crime) => {
        setSelectedCrime(crime);
    };
    // Function to get the correct API endpoint based on the selected map


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

    const friendlyName = crimeTypeNames[selectedCrime] || "Unknown Crime Type";


    return <MainContainer>
        <CalcHeader>
            <CalcTitle>Crime Risk Calculator</CalcTitle>
            <CalcSub>Pick a type of crime from below and then enter an SF address to get a crime assessment for the immediate neighborhood, 0.2km around the entered address.</CalcSub>
        </CalcHeader>
        <TabContainer>
            <TabButton onClick={() => handleCrimeSelection('vehicle-theft')} $isActive={selectedCrime === 'vehicle-theft'}>
                Car Break-ins
            </TabButton>
            <TabButton onClick={() => handleCrimeSelection('assault')} $isActive={selectedCrime === 'assault'}>
                Assault
            </TabButton>
            <TabButton onClick={() => handleCrimeSelection('burglary')} $isActive={selectedCrime === 'burglary'}>
                Burglary
            </TabButton>
            <TabButton onClick={() => handleCrimeSelection('drugs')} $isActive={selectedCrime === 'drugs'}>
                Drugs
            </TabButton>
            <TabButton onClick={() => handleCrimeSelection('robbery')} $isActive={selectedCrime === 'robbery'}>
                Robbery
            </TabButton>
            <TabButton onClick={() => handleCrimeSelection('car-robbery')} $isActive={selectedCrime === 'car-robbery'}>
                Car Theft
            </TabButton>
        </TabContainer>
        <StyledForm onSubmit={handleSubmit}>
            <FormField>
                <StyledInput
                    type="text"
                    $backgroundColor="transparent"
                    required
                    placeholder="Enter SF Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </FormField>
            <FormField>
                <StyledInput
                    type="text"
                    $backgroundColor="transparent"
                    required
                    placeholder="Enter Zip Code"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
            </FormField>
            <Button
                type="submit"
                loading={loading}
                $width="70px"
                $height="45px"
                $borderRadius="50px"
            >Go</Button>
        </StyledForm>
        {
            errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )
        }

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

export default RiskCalcHome;

