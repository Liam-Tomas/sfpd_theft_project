
import React from 'react';
import styled from 'styled-components';
import Button from '../utility/Button';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;


  
`;

const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-top: 20px;
    padding-bottom: 10px;
    gap: 20px;
    @media (max-width: 868px) {
      grid-template-columns: 1fr 1fr;
      gap: 10px;

    }

`

const ModalContent = styled.div`
  background: ${props => props.theme.card};
  margin:280px;
  padding: 35px 50px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  @media (max-width: 868px) {
    height: 100%;
    padding-top: 200px;

  }

`;

const ModalHeader = styled.h1`
  margin-top: 1rem;
  @media (max-width: 868px) {
    text-align: center;
    margin-bottom: 30px;
  }
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding-left:20px;

  position: relative; // Set position context for pseudo-element
  &::before {
    content: ''; 
    position: absolute;
    left: 0; // Adjust if necessary
    top: 0; 
    bottom: 0;
    height: 60px;
    width: 2px; // Make sure this is wide enough to be visible
    background-color: ${props => props.theme.cardLight};
  }
`;

const ResultNumber = styled.span`
  font-size: 1.5rem;
  padding: 0px 0px 3px 0px;
  font-weight: 700;
  color: ${props => props.theme.text};
  @media (max-width: 868px) {
    font-size: 1.4rem;
    padding: 0px 5px 5px 5px;


  }
  
`;

const ResultText = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.textAlt};
  @media (max-width: 868px) {
    font-size: 1rem;

  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  @media (max-width: 868px) {
    margin: 0 auto;
    margin-top: 30px;
}
`;

const SubText = styled.p`
    color: ${props => props.theme.textAlt};
    @media (max-width: 868px) {
      font-size:.9rem;
    }
    
`;

const RiskResultsModal = ({ isVisible, onClose, data }) => {
    if (!isVisible) return null;

    const {
        riskCategory,
        probability,
        incidentCount,
        avgPerMonth,
        incidentDay,
        policeDistrict,
        address
    } = data;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>{address}</ModalHeader>
                <ResultGrid>
                <ResultItem>
                        <ResultNumber><span style={{ color: getRiskCategoryColor(riskCategory) }}>{riskCategory}</span></ResultNumber>
                        <ResultText>Risk Category</ResultText>
                    </ResultItem>
                    <ResultItem>
                        <ResultNumber>{incidentCount}</ResultNumber>
                        <ResultText>Total Incidents</ResultText>
                    </ResultItem>
                    <ResultItem>
                        <ResultNumber>{avgPerMonth}</ResultNumber>
                        <ResultText>Monthly Average</ResultText>
                    </ResultItem>
                    <ResultItem>
                        <ResultNumber>{probability}%</ResultNumber>
                        <ResultText>Relative Rate**</ResultText>
                    </ResultItem>
                    <ResultItem>
                        <ResultNumber>{incidentDay}</ResultNumber>
                        <ResultText>Most Common Day</ResultText>
                    </ResultItem>
                    <ResultItem>
                        <ResultNumber>{policeDistrict}</ResultNumber>
                        <ResultText>Police District</ResultText>
                    </ResultItem>
                </ResultGrid>
                <SubText>
                  **Represents the rate of this crime occurring in the area 0.21 square kilometers, or 0.081 square miles around this address, relative to all recorded incidents since 2018.
                     In simpler terms, out of every 100 incidents of this crime reported by the SFPD, {probability} happened in this particular area from 2018-2023.
                </SubText>
                <StyledButton onClick={onClose}>Close</StyledButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default RiskResultsModal;
