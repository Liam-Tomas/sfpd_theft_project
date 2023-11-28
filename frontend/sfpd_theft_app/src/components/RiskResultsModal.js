import React from 'react';
import styled from 'styled-components';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import Button from './Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; // Ensure it's above other content
`;

// Styled component for the modal content
const ModalContent = styled.div`
  background-color: white;
  padding: 25px 40px;
  margin: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001; // Above the overlay
`;

const ModalHeader = styled.h2`
`
// Styled components for the grid and rows
const StyledGrid = styled.div`
  display: flex;
  gap: 40px;
  font-size:1.1rem;
`;

const TopRow = styled.div`
  /* Add styles for TopRow here if needed */
`;

const MiddleRow = styled.div`
  /* Add styles for MiddleRow here if needed */
`;

const BottomRow = styled.div`
  /* Add styles for BottomRow here if needed */
`;

const StyledButton = styled(Button)`
    margin: 15px 0px;    
`;

// The modal component
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
      <ModalHeader>Risk Analysis for {address}</ModalHeader>
        <StyledGrid>
          <TopRow>
            <p><b>Risk Category</b>: <span style={{ color: getRiskCategoryColor(riskCategory) }}>{riskCategory}</span></p>
            <p><b>Relative Risk</b>: {probability}%**</p>
          </TopRow>
          <MiddleRow>
            <p><b>Total Incidents</b>: {incidentCount}</p>
            <p><b>Monthly Average</b>: {avgPerMonth}</p>
          </MiddleRow>
          <BottomRow>
            <p><b>Most Common Day</b>: {incidentDay}</p>
            <p><b>Police District</b>: {policeDistrict}</p>
          </BottomRow>
        </StyledGrid>
        <p style={{ marginTop: '0px' }}>
            **Represents the chance of a vehicle break-in occurring in the area 0.21 square kilometers, or 0.081 square miles around this address, relative to all recorded vehicle break-ins in SF since 2018.
            In simpler terms, out of every 100 vehicle break-ins reported in the city, {probability} happened in this particular area from 2018-2023.
        </p>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RiskResultsModal;
