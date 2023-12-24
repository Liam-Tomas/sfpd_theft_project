import React from 'react';
import styled from 'styled-components';

const LegendContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: auto;
  max-width: 300px;
  @media (max-width: 868px) {
    top: 340px;
    right: 40px;
    font-size: .9rem;
    padding: 12px;

  }
`;

const LegendTitle = styled.h4`
  text-align: center;
  color: black;
  margin-bottom: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  color: black;
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

`;

const HeatmapLegend = ({ onClose }) => {
  return (
    <LegendContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      <LegendTitle>Heatmap Legend</LegendTitle>
      <LegendItem>
        <ColorBox color="#b30000" />
        <Description>&gt; 3.0% Relative Risk</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="#d7301f" />
        <Description>2.0% - 3.0% Relative Risk</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="#ef6548" />
        <Description>1.5% - 2.0% Relative Risk</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="#fc8d59" />
        <Description>1.0% - 1.5% Relative Risk</Description>
      </LegendItem>
      <LegendItem>
        <ColorBox color="#fdad8f" />
        <Description>0.8% - 1.0% Relative Risk</Description>
      </LegendItem>
      {/* Add more legend items as needed based on your getColor function */}
      <div>
      </div>
    </LegendContainer>
  );
};

export default HeatmapLegend;
