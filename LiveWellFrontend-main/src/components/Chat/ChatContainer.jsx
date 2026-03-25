import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { useSocket } from '../../context/SocketContext';

const Container = styled.div`
  display: flex;
  height: 85vh;
  width: 95%;
  max-width: 1400px;
  margin: 10px auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatContainer = ({ currentUser, userType, initialChat, onClose, flatName   }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(initialChat);
  const socket = useSocket();

  // Update selected chat when initialChat changes
  useEffect(() => {
    if (initialChat) {
      setSelectedChat(initialChat);
      setConversations(prev => {
        if (!prev.find(conv => conv._id === initialChat._id)) {
          return [initialChat, ...prev];
        }
        return prev;
      });
    }
  }, [initialChat]);

  useEffect(() => {
    // Fetch conversations from API
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/conversations/${userType}/${currentUser._id}`);
        const data = await response.json();
        const validConversations = data.filter(conv => 
          conv && conv._id && (userType === 'owner' ? conv.userId : conv.ownerId) && conv.userId !== null
        );
        console.log(validConversations);
        setConversations(validConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    if (currentUser?._id) {
      fetchConversations();
    }
    // fetchConversations();
  }, [currentUser._id, userType]);

  useEffect(() => {
    if (!socket) return;

    // Join user's room
    socket.emit('user_connected', { userId: currentUser._id, userType });

    socket.on('new_message', (message) => {
      // Update conversations list
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv._id === message.conversationId) {
            return {
              ...conv,
              lastMessage: message.content,
              updatedAt: new Date().toISOString()
            };
          }
          return conv;
        });
        return [...updated].sort((a, b) => 
          new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      });

      // Update selected chat if it's the current conversation
      if (selectedChat?._id === message.conversationId) {
        setSelectedChat(prev => ({
          ...prev,
          lastMessage: message.content,
          updatedAt: new Date().toISOString()
        }));
      }
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, currentUser, userType, selectedChat]);

  return (
    <Container>
      <ChatSidebar 
        conversations={conversations}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        currentUser={currentUser}
        userType={userType}
        flatName={flatName}
        setConversations={setConversations}
      />
      <ChatWindow 
        selectedChat={selectedChat}
        currentUser={currentUser}
        userType={userType}
        flatName={flatName}
      />
    </Container>
  );
};

export default ChatContainer;