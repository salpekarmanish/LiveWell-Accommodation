import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSocket } from '../../context/SocketContext';

const WindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f0f2f5;
`;

const MessageGroup = styled.div`
  margin-bottom: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 5px;
  background: ${props => props.isSender ? '#dcf8c6' : '#fff'};
  align-self: ${props => props.isSender ? 'flex-end' : 'flex-start'};
  margin-left: ${props => props.isSender ? 'auto' : '0'};
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #e6e6e6;
  background: #fff;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  background: #25D366;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #128C7E;
  }
`;

const ChatWindow = ({ selectedChat, currentUser, userType, flatName }) => {
  const [messages, setMessages] = useState([]);
  const [curflatName, setCurFlatName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const socket = useSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/messages/${selectedChat._id}`);
          const data = await response.json();
          setMessages(data.messages);
          console.log("Messages: ", data);
  
          // Mark messages as read after 5 sec delay
          setTimeout(async () => {
            await fetch(`http://localhost:3000/api/messages/read/${selectedChat._id}`, {
              method: 'PATCH',
            });
          }, 5000);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }
  }, [selectedChat]);
  

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message) => {
      if (message.conversationId === selectedChat?._id) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    });

    return () => socket.off('receive_message');
  }, [socket, selectedChat]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const message = {
        conversationId: selectedChat._id,
        senderId: currentUser._id,
        senderType: userType,
        content: newMessage,
        flatName: curflatName || flatName,
      };

      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        socket.emit('send_message', message);
        setMessages(prev => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  console.log("Selected  chat: ", selectedChat);

  if (selectedChat && !(selectedChat.userId?.firstName || selectedChat.ownerId?.firstName)) {
    return (
      <WindowContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h3>Select a conversation to start chatting</h3>
        </div>
      </WindowContainer>
    );
  }

  if (selectedChat===null) {
    return (
      <WindowContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <h3>Select a conversation to start chatting</h3>
        </div>
      </WindowContainer>
    );
  }

  return (
    <WindowContainer>
      <Header>
        <h3>
          {userType === 'owner'
            ? `${selectedChat?.userId?.firstName} ${selectedChat?.userId?.lastName}`
            : `${selectedChat?.ownerId?.firstName} ${selectedChat?.ownerId?.lastName}`}
        </h3>
        <p>( {curflatName || flatName})</p>
      </Header>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageGroup key={message._id}>
            <Message isSender={message.senderId === currentUser._id}>
              {message.content}
            </Message>
          </MessageGroup>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </WindowContainer>
  );
};

export default ChatWindow;