import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Container = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    background-color: #f0f0f0;
  }

  &.left {
    left: 16px;
  }

  &.right {
    right: 16px;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
  z-index: 10;
`;

const Property360View = ({ panoramicImages = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!panoramicImages || panoramicImages.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? panoramicImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === panoramicImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container>
      <Title>360° Property View</Title>

      <Pannellum
        width="100%"
        height="500px"
        image={`http://localhost:3000${panoramicImages[currentIndex]}`}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        mouseZoom={true}
        autoRotate={-2}
      >
        {/* Hotspot can be added dynamically if needed */}
        <Pannellum.Hotspot
          type="custom"
          pitch={12.41}
          yaw={117.76}
          handleClick={(evt, name) => console.log(name)}
          name="Hotspot Info"
        />
      </Pannellum>

      <NavButton className="left" onClick={handlePrevious}>
        <ChevronLeft className="w-6 h-6" />
      </NavButton>
      
      <NavButton className="right" onClick={handleNext}>
        <ChevronRight className="w-6 h-6" />
      </NavButton>

      {panoramicImages.length > 1 && (
        <Counter>
          {currentIndex + 1} / {panoramicImages.length}
        </Counter>
      )}
    </Container>
  );
};

export default Property360View;