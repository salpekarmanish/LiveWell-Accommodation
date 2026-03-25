import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import OurChoice from '../components/OurChoice';
import AboutUs from '../components/AboutUsChoose';
import WhyChooseUs from '../components/WhyChooseUs';
import RenterReview from '../components/RenterReview';
import BestRecommendation from '../components/BestRecommendation';


const HomeContainer = styled.div``;

const Section = styled.section`
  padding: 4rem 5%;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <BestRecommendation />
      <OurChoice />
      <AboutUs />
      {/* <WhyChooseUs /> */}
      <RenterReview />
    </HomeContainer>
  );
};

export default Home;