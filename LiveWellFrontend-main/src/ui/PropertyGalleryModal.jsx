import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import { Pannellum } from "pannellum-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  position: relative;
  width: 90vw;
  max-width: 1000px;
  height: 80vh;
  max-height: 700px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 60;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: white;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  svg {
    color: #333;
    stroke-width: 2.5px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const MediaDisplay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #f8f9fa;
`;

const PanoramicDisplay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #f8f9fa;
`;

const MediaImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const MediaVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 20;

  svg {
    color: #333;
    stroke-width: 2.5px;
  }

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &.left {
    left: 24px;
  }

  &.right {
    right: 24px;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 20;
`;

const TabsContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  height: 60px;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Tab = styled.button`
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  background: ${props => props.active ? '#3a86ff' : '#f1f5f9'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  box-shadow: ${props => props.active ? '0 4px 8px rgba(58, 134, 255, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? '#3a86ff' : '#e2e8f0'};
    transform: ${props => props.active ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.active ? '0 6px 12px rgba(58, 134, 255, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  }
`;

const PropertyGalleryModal = ({ isOpen, onClose, images = [], paranomicImages = [], videoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPanoIndex, setCurrentPanoIndex] = useState(0);
  const [activeView, setActiveView] = useState('normal');
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const allMedia = [
    ...images.map(src => ({ type: 'image', src })),
    ...(videoUrl ? [{ type: 'video', src: videoUrl }] : [])
  ];

  const handlePrevious = () => {
    if (activeView === 'normal') {
      setCurrentIndex((prev) => 
        prev === 0 ? allMedia.length - 1 : prev - 1
      );
    } else {
      setCurrentPanoIndex((prev) => 
        prev === 0 ? paranomicImages.length - 1 : prev - 1
      );
    }
  };

  const handleNext = () => {
    if (activeView === 'normal') {
      setCurrentIndex((prev) => 
        prev === allMedia.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentPanoIndex((prev) => 
        prev === paranomicImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const currentMedia = allMedia[currentIndex];
  const currentPanoImage = paranomicImages[currentPanoIndex];

  const showPanoramicTab = paranomicImages && paranomicImages.length > 0;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>

        <ContentContainer>
          {activeView === 'normal' ? (
            <MediaDisplay>
              {currentMedia.type === 'image' ? (
                <MediaImage
                  src={`http://localhost:3000${currentMedia.src}`}
                  alt={`Gallery item ${currentIndex + 1}`}
                />
              ) : (
                <MediaVideo
                  src={`http://localhost:3000${currentMedia.src}`}
                  controls
                />
              )}

              <NavButton className="left" onClick={handlePrevious}>
                <ChevronLeft size={24} />
              </NavButton>
              
              <NavButton className="right" onClick={handleNext}>
                <ChevronRight size={24} />
              </NavButton>

              <Counter>
                {currentIndex + 1} / {allMedia.length}
              </Counter>
            </MediaDisplay>
          ) : (
            <PanoramicDisplay>
              <Pannellum
                width="100%"
                height="100%"
                image={`http://localhost:3000${currentPanoImage}`}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={true}
                mouseZoom={true}
                autoRotate={-2}
              />
              
              <NavButton className="left" onClick={handlePrevious}>
                <ChevronLeft size={24} />
              </NavButton>
              
              <NavButton className="right" onClick={handleNext}>
                <ChevronRight size={24} />
              </NavButton>

              <Counter>
                {currentPanoIndex + 1} / {paranomicImages.length}
              </Counter>
            </PanoramicDisplay>
          )}
        </ContentContainer>

        {showPanoramicTab && (
          <TabsContainer>
            <Tab 
              active={activeView === 'normal'} 
              onClick={() => setActiveView('normal')}
            >
              Normal View
            </Tab>
            <Tab 
              active={activeView === 'panoramic'} 
              onClick={() => setActiveView('panoramic')}
            >
              360° View
            </Tab>
          </TabsContainer>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default PropertyGalleryModal;