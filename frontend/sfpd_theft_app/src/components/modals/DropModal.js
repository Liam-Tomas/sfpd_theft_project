import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 50%;
  animation: slideIn 0.3s ease-out forwards;

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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LegendContent = styled.div`
  /* Add your styles for the legend content here */
`;

const MapLegend = ({ onClose }) => {
  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <LegendContent>
          {/* legend content goes here */}
          <h2>Map Legend</h2>
          <p>Details about the map symbols and colors...</p>
          {/* Add more content as needed */}
        </LegendContent>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default MapLegend;
