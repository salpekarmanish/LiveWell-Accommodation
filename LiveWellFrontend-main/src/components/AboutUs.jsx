import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 4rem 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  font-size: 2rem;
  font-weight: bold;
  
  span {
    display: block;
    font-size: 1rem;
    color: #666;
    font-weight: normal;
  }
`;

const AboutContent = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  background: #4B9CE2;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
`;

const AboutUs = () => {
  return (
    <AboutSection>
      <Stats>
        <StatItem>
          650+
          <span>Happy User</span>
        </StatItem>
        <StatItem>
          400+
          <span>Property</span>
        </StatItem>
        <img src="/assets/modern-interior.jpg" alt="Modern Interior" />
      </Stats>
      
      <AboutContent>
        <h2>About Us</h2>
        <h3>Rent Your Perfect Space</h3>
        <p>LiveWell connects you to trusted, comfortable spaces that match your lifestyle. Experience hassle-free management. Discover a seamless way to live, tailored for your peace of mind.</p>
        <Button>Start Now</Button>
      </AboutContent>
    </AboutSection>
  );
};

export default AboutUs;