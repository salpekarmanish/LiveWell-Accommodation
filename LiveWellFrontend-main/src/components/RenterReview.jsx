import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.section`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  
  &::after {
    content: '';
    display: block;
    width: 180px;
    height: 2px;
    background: #0066ff;
    margin: 0.5rem auto;
  }
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 2rem;
  animation: ${scroll} 30s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 1rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, white, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, white, transparent);
  }
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  min-width: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8f4ff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background: ${props => props.$bgColor || '#ffebee'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ReviewerName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const ReviewText = styled.p`
  color: #666;
  line-height: 1.6;
  font-style: italic;
  
  &::before {
    content: '"';
    font-size: 2rem;
    color: #ddd;
    line-height: 0;
    margin-right: 0.5rem;
  }
`;

const RentersReview = () => {
  const reviews = [
    {
      id: 1,
      name: 'Riya',
      image: '/assets/reviewer-1.jpg',
      bgColor: '#ffebee',
      text: 'LiveWell made finding a reliable place effortless, and the seamless booking process saved me so much time. It\'s truly a game-changer!'
    },
    {
      id: 2,
      name: 'Vikram',
      image: '/assets/reviewer-2.jpg',
      bgColor: '#e3f2fd',
      text: 'I loved how easy it was to manage rent and visitor check-ins with LiveWell. It\'s the most convenient rental experience I\'ve had!'
    },
    {
      id: 3,
      name: 'Rima',
      image: '/assets/reviewer-3.jpg',
      bgColor: '#f3e5f5',
      text: 'LiveWell\'s interface is fantastic—simple, fast, and reliable. It\'s my go-to for finding quality places and a worry-free experience!'
    },
    {
      id: 4,
      name: 'Ashish',
      image: '/assets/reviewer-4.jpg',
      bgColor: '#fff3e0',
      text: 'The platform is intuitive, and the secure verification features made me feel safe. LiveWell is perfect for hassle-free stays!'
    }
  ];

  // Double the reviews array to create seamless infinite scroll
  const doubledReviews = [...reviews, ...reviews];

  return (
    <Container>
      <Title>Renter's Review</Title>
      <CarouselContainer>
        <CarouselTrack>
          {doubledReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`}>
              <Avatar $bgColor={review.bgColor}>
                <AvatarImage src={review.image} alt={review.name} />
              </Avatar>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewText>{review.text}</ReviewText>
            </ReviewCard>
          ))}
        </CarouselTrack>
      </CarouselContainer>
    </Container>
  );
};

export default RentersReview;