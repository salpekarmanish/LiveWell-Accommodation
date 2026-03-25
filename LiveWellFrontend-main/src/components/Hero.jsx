import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  position: relative;
  height: 600px;
  background-image: url('/assets/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2rem 5%;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin-top: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
`;

const SearchButton = styled.button`
  background: #4B9CE2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Hero = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/property-search');
    } else {
      navigate('/login');
    }
  };

  return (
    <HeroSection>
      <HeroContent>
        <Title>Redefine Living, Redefine Comfort.</Title>
        <p>LiveWell brings you a new level of ease in finding and selecting your perfect home.</p>
        <SearchContainer>
          <SearchInput type="text" placeholder="Location" />
          <SearchInput type="text" placeholder="Type" />
          <SearchInput type="text" placeholder="Price Range" />
          <SearchButton onClick={handleSearchClick}>Search</SearchButton>
        </SearchContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;