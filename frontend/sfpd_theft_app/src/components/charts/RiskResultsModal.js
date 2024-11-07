import React from 'react';
import styled from 'styled-components';
import Button from '../utility/Button';
import { categorizeRisk, getRiskCategoryColor } from './RiskUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const ModalContent = styled.div`
  position: relative;
  background: ${props => props.theme.card};
  margin: 280px;
  padding: 35px 50px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  animation: slideIn 0.3s ease-out forwards;
  max-width:900px;
  @media (max-width: 868px) {
    height: 100%;
    width: 1000px;
    margin: 0px;
    padding-top: 200px;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.theme.textAlt};
`;

const ModalHeader = styled.h1`
  margin-top: 1rem;
  @media (max-width: 868px) {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
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
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding-left:20px;
  position: relative;
  &::before {
    content: ''; 
    position: absolute;
    left: 0;
    top: 0; 
    bottom: 0;
    height: 48px;
    width: 2px;
    background-color: ${props => props.theme.cardLight};
  }
`;

const ResultNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  @media (max-width: 868px) {
    font-size: 1.1rem;
    padding: 0px 5px 5px 5px;
  }
`;

const ResultText = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.textAlt};
  @media (max-width: 868px) {
    font-size: .8rem;
  }
`;

const SubText = styled.p`
  color: ${props => props.theme.textAlt};
  @media (max-width: 868px) {
    font-size:.8rem;
  }
`;

const RiskResultsModal = ({ isVisible, onClose, data }) => {
  if (!isVisible) return null;

  const closeOnOutsideClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const {
    riskCategory,
    probability,
    incidentCount,
    avgPerMonth,
    incidentDay,
    policeDistrict,
    crimeType,
    address
  } = data;

  return (
    <ModalOverlay onClick={closeOnOutsideClick}>
      <ModalContent>
        <CloseIcon icon={faTimes} onClick={onClose} />
        <ModalHeader>{crimeType} Report: {address}</ModalHeader>
        <ResultGrid>
          <ResultItem>
            <ResultNumber style={{ color: getRiskCategoryColor(riskCategory) }}>{riskCategory}</ResultNumber>
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
        </SubText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RiskResultsModal;
