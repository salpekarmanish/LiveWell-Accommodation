import React from 'react';
import styled from 'styled-components';
import { FaBed, FaHome, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #4B9CE2;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const Location = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0 0 16px 0;
`;

const PriceRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Price = styled.span`
  color: #4B9CE2;
  font-weight: bold;
`;

const Rating = styled.div`
  background: #4B9CE2;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

const SeeMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: #333;
  }
`;

const PropertyCard = ({ image, title, location, price, rating, hasBookTag }) => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/property-search');
  };

  return (
    <Card>
      <ImageContainer>
        <Image src={image} alt={title} />
        {hasBookTag && <BookTag>Book Now</BookTag>}
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Location>{location}</Location>
        <PriceRatingContainer>
          <Price>{price}</Price>
          <Rating>⭐ {rating}</Rating>
        </PriceRatingContainer>
        <SeeMoreButton onClick={handleSubmit}>See More</SeeMoreButton>
      </Content>
    </Card>
  );
};

export default PropertyCard;