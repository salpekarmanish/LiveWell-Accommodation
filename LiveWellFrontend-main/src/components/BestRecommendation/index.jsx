import React, { useState } from 'react';
import styled from 'styled-components';
import PropertyCard from './PropertyCard';
import { FaBed, FaHome, FaBuilding } from 'react-icons/fa';

const Section = styled.section`
  padding: 40px 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? '#4B9CE2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.active ? '#4B9CE2' : '#e0e0e0'};
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const properties = {
  rooms: [
    {
      id: 1,
      image: '/assets/single-room.jpg',
      title: 'Single Room',
      location: 'Brown Street, Jakarta',
      price: '₹500/month',
      rating: '4.9',
      hasBookTag: true
    },
    {
      id: 2,
      image: '/assets/twin-room.jpg',
      title: 'Twin Bedded Room',
      location: 'Green Park, Jakarta',
      price: '₹800/month',
      rating: '4.1',
      hasBookTag: true
    },
    {
      id: 3,
      image: '/assets/luxury-room.jpg',
      title: 'Luxury Standard Room',
      location: 'Palm Street, Jakarta',
      price: '₹1200/month',
      rating: '4.9',
      hasBookTag: true
    }
  ],
  flats: [
    {
        id: 1,
        image: '/assets/single-room.jpg',
        title: 'Single Room',
        location: 'Brown Street, Jakarta',
        price: '₹500/month',
        rating: '4.9',
        hasBookTag: true
      },
      {
        id: 2,
        image: '/assets/twin-room.jpg',
        title: 'Twin Bedded Room',
        location: 'Green Park, Jakarta',
        price: '₹800/month',
        rating: '4.1',
        hasBookTag: true
      },
      {
        id: 3,
        image: '/assets/luxury-room.jpg',
        title: 'Luxury Standard Room',
        location: 'Palm Street, Jakarta',
        price: '₹1200/month',
        rating: '4.9',
        hasBookTag: true
      }
  ],
  houses: [
    {
        id: 1,
        image: '/assets/single-room.jpg',
        title: 'Single Room',
        location: 'Brown Street, Jakarta',
        price: '₹500/month',
        rating: '4.9',
        hasBookTag: true
      },
      {
        id: 2,
        image: '/assets/luxury-room.jpg',
        title: 'Twin Bedded Room',
        location: 'Green Park, Jakarta',
        price: '₹800/month',
        rating: '4.1',
        hasBookTag: true
      },
      {
        id: 3,
        image: '/assets/luxury-room.jpg',
        title: 'Luxury Standard Room',
        location: 'Palm Street, Jakarta',
        price: '₹1200/month',
        rating: '4.9',
        hasBookTag: true
      }
  ]
};

const BestRecommendation = () => {
  const [activeFilter, setActiveFilter] = useState('rooms');

  return (
    <Section>
      <Header>
        <Title>Best Recommendation</Title>
        <FilterButtons>
          <FilterButton 
            active={activeFilter === 'rooms'} 
            onClick={() => setActiveFilter('rooms')}
          >
            <FaBed /> Flats
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'flats'} 
            onClick={() => setActiveFilter('flats')}
          >
            <FaBuilding /> PG's
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'houses'} 
            onClick={() => setActiveFilter('houses')}
          >
            <FaHome /> Hostel
          </FilterButton>
        </FilterButtons>
      </Header>
      <PropertyGrid>
        {properties[activeFilter].map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </PropertyGrid>
    </Section>
  );
};

export default BestRecommendation;