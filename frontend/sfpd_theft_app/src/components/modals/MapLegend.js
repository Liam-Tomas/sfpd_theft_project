import React from 'react';
import styled from 'styled-components';

const LegendContainer = styled.div`
  background-color: ${(props) => props.theme.cardLighter};
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: auto;
  max-width: 300px;
  @media (max-width: 868px) {
    top: 395px;
    right: 40px;
    font-size: .9rem;
    padding: 12px;
  }
`;

const LegendTitle = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  margin-right: 10px;
  border-radius: 3px;
`;

const Description = styled.span`
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondary};

`;

const SubText = styled.p`
  margin: 0px;
  display: none;
`
const MapLegend = ({ onClose }) => {
  return (
    <LegendContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      <LegendTitle>Cluster Map Legend</LegendTitle>
      <LegendItem>
        <ColorBox color="rgba(156, 204, 210, 0.8)" />
        <Description>0 - 19 Incidents</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="rgba(72, 209, 204, 0.8)" />
        <Description>20 - 399 Incidents</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="rgba(0, 123, 167, 0.8)" />
        <Description>400 - 1999 Incidents</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="rgba(0, 75, 112, 0.95)" />
        <Description>2000+ Incidents</Description>
      </LegendItem>
      <SubText>
        Data sourced from DataSF covering 2018 to present.
      </SubText>
    </LegendContainer>
  );
};



export default MapLegend;
