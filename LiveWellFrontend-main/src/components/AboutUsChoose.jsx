import React from 'react';
import styled from 'styled-components';
import { Building2, Clock, Users, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: #f5f9ff;
  padding: 4rem 2rem;
`;

const Section = styled.section`
  max-width: 1350px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatsContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 1rem;
`;

const StatBox = styled.div`
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #0066ff;
  width: fit-content;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #5ba4fc;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a93eb;
  }
`;

const WhyChooseUsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  background-color: #f0f7ff;
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureText = styled.span`
  color: #4a4a4a;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  height: 400px;
`;

const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const SmallImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SmallImage = styled.img`
  width: 100%;
  height: calc(50% - 0.5rem);
  object-fit: cover;
  border-radius: 12px;
`;

const AboutUsChoose = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/property-search');
  };

  return (
    <Container>
      <Section>
        <ImageWrapper>
          <MainImage src="/assets/modern-interior.jpg" alt="Modern interior space" />
          <StatsContainer>
            <StatBox>
              <StatNumber>650+</StatNumber>
              <StatLabel>Property Sale</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>400+</StatNumber>
              <StatLabel>Flats/Rooms/House Rent</StatLabel>
            </StatBox>
          </StatsContainer>
        </ImageWrapper>
        
        <ContentWrapper>
          <Title>About Us</Title>
          <MainTitle>Rent Your Perfect Space</MainTitle>
          <Description>
            LiveWell connects you to trusted, comfortable spaces with secure booking and effortless management. 
            Discover a seamless way to live, tailored for your peace of mind.
          </Description>
          <Button onClick={handleSubmit}>Book Now</Button>
        </ContentWrapper>
      </Section>

      <WhyChooseUsSection>
        <ContentWrapper>
          <Title>Why Choose Us ?</Title>
          <FeatureList>
            <FeatureItem>
              <IconWrapper>
                <Building2 size={24} color="#5ba4fc" />
              </IconWrapper>
              <FeatureText>Secure Payment With UPI or GooglePay or PhonePay</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <IconWrapper>
                <Clock size={24} color="#5ba4fc" />
              </IconWrapper>
              <FeatureText>24/7 Customer Support</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <IconWrapper>
                <Users size={24} color="#5ba4fc" />
              </IconWrapper>
              <FeatureText>3000+ Customer Review</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <IconWrapper>
                <Home size={24} color="#5ba4fc" />
              </IconWrapper>
              <FeatureText>Short-term or long-term rentals—find what suits you</FeatureText>
            </FeatureItem>
          </FeatureList>
          <Button style={{ marginTop: '2rem' }}>Learn More</Button>
        </ContentWrapper>

        <ImageGrid>
          <LargeImage src="/assets/property-1.jpg" alt="Beautiful house exterior" />
          <SmallImagesContainer>
            <SmallImage src="/assets/property-2.jpg" alt="House detail 1" />
            <SmallImage src="/assets/property-3.jpg" alt="House detail 2" />
          </SmallImagesContainer>
        </ImageGrid>
      </WhyChooseUsSection>
    </Container>
  );
};

export default AboutUsChoose;