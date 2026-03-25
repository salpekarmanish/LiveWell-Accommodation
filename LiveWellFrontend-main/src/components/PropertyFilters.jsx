import React from 'react';
import styled from 'styled-components';
import { FaBed, FaHome, FaBuilding } from 'react-icons/fa';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: ${props => props.active ? '#4B9CE2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#4B9CE2' : '#e0e0e0'};
  }
`;

const PropertyFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <FilterContainer>
      <FilterButton 
        active={activeFilter === 'rooms'} 
        onClick={() => setActiveFilter('rooms')}
      >
        <FaBed /> Rooms
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'flats'} 
        onClick={() => setActiveFilter('flats')}
      >
        <FaBuilding /> Flats
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'houses'} 
        onClick={() => setActiveFilter('houses')}
      >
        <FaHome /> Houses
      </FilterButton>
    </FilterContainer>
  );
};

export default PropertyFilters;