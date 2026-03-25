import React from 'react';
import styled from 'styled-components';

const WhySection = styled.section`
  padding: 4rem 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
`;

const ReasonsList = styled.div`
  h2 {
    margin-bottom: 2rem;
  }
`;

const Reason = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: #4B9CE2;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Button = styled.button`
  background: #4B9CE2;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
`;

const WhyChooseUs = () => {
  return (
    <WhySection>
      <ReasonsList>
        <h2>Why Choose Us?</h2>
        <Reason>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <p>Secure Payment with UPI or GooglePay or PhonePay</p>
        </Reason>
        <Reason>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <p>24/7 Customer Support</p>
        </Reason>
        <Reason>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <p>100K+ Customer Review</p>
        </Reason>
        <Button>Learn More</Button>
      </ReasonsList>
      
      <ImageGrid>
        <img src="/assets/property-1.jpg" alt="Property" />
        <img src="/assets/property-2.jpg" alt="Property" />
        <img src="/assets/property-2.jpg" alt="Property" />
        <img src="/assets/property-3.jpg" alt="Property" />
      </ImageGrid>
    </WhySection>
  );
};

export default WhyChooseUs;