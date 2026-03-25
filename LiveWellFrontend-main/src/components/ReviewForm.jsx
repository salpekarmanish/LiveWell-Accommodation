import React, { useState } from 'react';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating'

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0052a3;
  }
`;

const ReviewForm = ({ isOpen, onClose, onSubmit }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [context, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userName, rating, context });
    console.log({ userName, rating, context });
    onClose();
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Write a Review</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <h3>Rate Us:</h3>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={rating}
            onClick={handleRating}
          />
          <TextArea
            placeholder="Your Review"
            value={context}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
          />
          <SubmitButton type="submit">Submit Review</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReviewForm;