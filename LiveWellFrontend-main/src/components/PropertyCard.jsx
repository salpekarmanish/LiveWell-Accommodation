import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const Price = styled.p`
  color: #4B9CE2;
  font-weight: bold;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyCard = ({ image, title, price, rating }) => {
  return (
    <Card>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Price>{price}</Price>
        <Rating>⭐ {rating}</Rating>
      </Content>
    </Card>
  );
};

export default PropertyCard;    