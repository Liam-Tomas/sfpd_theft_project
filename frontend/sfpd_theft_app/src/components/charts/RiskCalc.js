

// import React, { useState } from 'react';
// import axios from 'axios';
// import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
// import styled from "styled-components";
// import Button from '../Button'; // Importing StyledButton
// import Input from './Input'; // Importing StyledInput
// import MainContainer from '../MainContainer';
// import RiskResultsModal from './RiskResultsModal';

// const StyledForm = styled.form`
//     display: flex;
//     gap: 10px;
// `;

// const FormField = styled.div`

// `;

// function RiskCalc() {
//     const [address, setAddress] = useState('');
//     const [zipcode, setZipcode] = useState('');
//     const [probability, setProbability] = useState(null);
//     const [incidentCount, setIncidentCount] = useState(null); // State for incident count
//     const [policeDistrict, setPoliceDistrict] = useState(null); // State for incident count
//     const [avgPerMonth, setAvgPerMonth] = useState(null); // State for incident count
//     const [incidentDay, setIncidentDay] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const handleCloseModal = () => {
//         setIsModalVisible(false);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Combine address and zip code
//         // const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
//         const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
//         const api_route = 'http://127.0.0.1:5000/'
//         try {
//             const response = await axios.post(`${api_route}/get_probability`, { address: completeAddress });
//             const probability = response.data.probability; 
//             const avgPerMonth = response.data.average_incidents_per_month; 
//             const roundedAvg = parseFloat(avgPerMonth).toFixed(2);

//             // const incidentCount = response.data.incident_count; // Assuming I have the probability value

//             const roundedProbability = parseFloat(probability * 100).toFixed(2);
//             setProbability(roundedProbability);
//             setIncidentCount(response.data.incident_count); // Update incident count state
//             setIncidentDay(response.data.incident_day_of_week)
//             setPoliceDistrict(response.data.police_district)
//             setAvgPerMonth(roundedAvg)

//             setErrorMessage('');
//             setIsModalVisible(true); // Show modal on successful data fetch
//         } catch (error) {
//             console.error('Error:', error);
//             if (error.response && error.response.data && error.response.data.error) {
//                 setErrorMessage(error.response.data.error);
//             } else {
//                 setErrorMessage('An error occurred while processing your request.');
//             }
//             setProbability(null);
//             setIncidentCount(null);
//             setIncidentDay(null);
//             setPoliceDistrict(null)
//             setAvgPerMonth(null);
//             setIsModalVisible(false); // Hide modal on error

//         }
//     };

//     const riskCategory = probability !== null ? categorizeRisk(parseFloat(probability)) : '';

//     return <MainContainer>
//         <h3>Relative Risk by Address Calculator</h3>
//         <StyledForm onSubmit={handleSubmit}>
//                 <FormField>
//                     <Input
//                         type="text"
//                         required
//                         placeholder="Enter SF Address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                     />
//                 </FormField>
//                 <FormField>
//                     <Input
//                         type="text"
//                         required
//                         placeholder="Enter Zip Code"
//                         value={zipcode}
//                         onChange={(e) => setZipcode(e.target.value)}
//                     />
//                 </FormField>
//                 <Button type="submit">Calculate</Button>
//             </StyledForm>
//         {errorMessage && (
//             <p style={{ color: 'red' }}>{errorMessage}</p>
//         )}

//         <RiskResultsModal
//             isVisible={isModalVisible}
//             onClose={handleCloseModal}
//             data={{
//                 address: `${address}, ${zipcode}`, // Add the address and zipcode
//                 riskCategory: probability !== null ? categorizeRisk(probability) : '',
//                 probability,
//                 incidentCount,
//                 avgPerMonth,
//                 incidentDay,
//                 policeDistrict,
//                 getRiskCategoryColor // Ensure this function is imported or defined
//             }}
//         />

//     </MainContainer >;

// }

// export default RiskCalc;



import React, { useState } from 'react';
import axios from 'axios';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import styled from "styled-components";
import Button from '../utility/Button'; // Importing StyledButton
import Input from '../utility/Input'; // Importing StyledInput
import MainContainer from '../utility/MainContainer';
import RiskResultsModal from './RiskResultsModal';

const StyledForm = styled.form`
    display: flex;
    gap: 10px;
`;

const FormField = styled.div`

`;

function RiskCalc({ apiEndpoint }) {
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [probability, setProbability] = useState(null);
    const [incidentCount, setIncidentCount] = useState(null); // State for incident count
    const [policeDistrict, setPoliceDistrict] = useState(null); // State for incident count
    const [avgPerMonth, setAvgPerMonth] = useState(null); // State for incident count
    const [incidentDay, setIncidentDay] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Combine address and zip code
        // const completeAddress = `${address}, San Francisco, CA ${zipcode}`;
        const completeAddress = `${address}, San Francisco, CA ${zipcode}`;

        try {
            const response = await axios.post(apiEndpoint, { address: completeAddress });
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
            setIsModalVisible(false); // Hide modal on error

        }
    };

    const riskCategory = probability !== null ? categorizeRisk(parseFloat(probability)) : '';

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
                <Button type="submit">Submit</Button>
            </StyledForm>
        {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
        )}

        <RiskResultsModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            data={{
                address: `${address}, ${zipcode}`, // Add the address and zipcode
                riskCategory: probability !== null ? categorizeRisk(probability) : '',
                probability,
                incidentCount,
                avgPerMonth,
                incidentDay,
                policeDistrict,
                getRiskCategoryColor // Ensure this function is imported or defined
            }}
        />

    </MainContainer >;

}

export default RiskCalc;

