import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #0066ff;
  width: fit-content;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  &:last-child {
    grid-column: ${props => props.$isLarge ? '1 / -1' : 'auto'};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${props => props.$isLarge ? '400px' : '300px'};
  object-fit: cover;
`;

const Rating = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RatingScore = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
`;

const Stars = styled.div`
  color: #ffd700;
  font-size: 0.875rem;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  color: white;
`;

const CardLabel = styled.div`
  background: white;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const CardDescription = styled.p`
  font-size: 1.125rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const OurChoice = () => {
  const choices = [
    {
      id: 1,
      image: '/assets/professional-space.jpg',
      rating: 4.9,
      reviews: '650+',
      label: 'For Professionals',
      description: 'Affordable and convenient spaces',
      isLarge: false
    },
    {
      id: 2,
      image: '/assets/student-space.jpg',
      rating: 4.0,
      reviews: '400+',
      label: 'For Students',
      description: 'Find Your Perfect Student Space',
      isLarge: false
    },
    {
      id: 3,
      image: '/assets/family-space.jpg',
      rating: 4.5,
      reviews: '900+',
      label: 'For Families',
      description: 'The Perfect Place for Your Family',
      isLarge: true
    }
  ];

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <Section>
      <Title>Our Choice</Title>
      <CardGrid>
        {choices.map((choice) => (
          <Card key={choice.id} $isLarge={choice.isLarge}>
            <CardImage src={choice.image} alt={choice.label} $isLarge={choice.isLarge} />
            <Rating>
              <RatingScore>{choice.rating}</RatingScore>
              <Stars>{renderStars(choice.rating)}</Stars>
              <ReviewCount>{choice.reviews} Reviews</ReviewCount>
            </Rating>
            <CardContent>
              <CardLabel>{choice.label}</CardLabel>
              <CardDescription>"{choice.description}"</CardDescription>
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
};

export default OurChoice;