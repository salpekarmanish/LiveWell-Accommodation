import React from 'react';
import styled from 'styled-components';

const ChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top:20px;
  

  &:hover {
    background: #43A047;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const InitiateChatButton = ({ ownerId, flatId, currentUser, onChatStart }) => {
  const startChat = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId,
          userId: currentUser._id,
          flatId,
        }),
      });

      const conversation = await response.json();
      onChatStart(conversation);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <ChatButton onClick={startChat}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      Chat with Owner
    </ChatButton>
  );
};  

export default InitiateChatButton;