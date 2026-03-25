import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const SidebarContainer = styled.div`
  width: 350px;
  border-right: 1px solid #e6e6e6;
  background: #f8f9fa;
  height: 90%;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  margin-top: 10px;
`;

const ConversationList = styled.div`
  overflow-y: auto;
  height: calc(100% - 90px);
`;

const ConversationItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  background: ${props => props.selected ? '#e6e6e6' : '#fff'};
  
  &:hover {
    background: ${props => props.selected ? '#e6e6e6' : '#f5f5f5'};
  }
`;

const Name = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const FlatName = styled.span`
  color: #999;
  font-size: 14px;
`;

const LastMessage = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999;
  float: right;
`;

const UnreadBadge = styled.span`
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 50%;
  float: right;
`;

const ChatSidebar = ({ conversations, selectedChat, setSelectedChat, currentUser, userType, setConversations }) => {

  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation);

    // Mark messages as read when selecting the chat
    if (conversation.unreadCount > 0) {
      // Update read status in backend
      fetch(`http://localhost:3000/api/messages/read/${conversation._id}`, {
        method: 'PATCH'
      }).then(() => {
        // Update the conversation's unreadCount in the state
        setSelectedChat(prev => ({
          ...prev,
          unreadCount: 0
        }));

        // Update the conversations list to reflect the change
        setConversations(prevConversations => prevConversations.map(conv => 
          conv._id === conversation._id ? { ...conv, unreadCount: 0 } : conv
        ));
      }).catch(error => {
        console.error('Error marking messages as read:', error);
      });
    }
  };

  return (
    <SidebarContainer>
      <Header>
        <h2>Chats <FlatName>({userType})</FlatName></h2>
        <SearchBar placeholder="Search conversations..." />
      </Header>
      <ConversationList>
        {conversations.map(conversation => (
          conversation.userId && conversation?.userId?.firstName !== undefined &&
          <ConversationItem
            key={conversation._id}
            selected={selectedChat?._id === conversation._id}
            onClick={() => handleChatSelect(conversation)}
          >
            <Time>{format(new Date(conversation.updatedAt), 'HH:mm')}</Time>
            <Name>
              {userType === 'owner'
                ? <>
                    {conversation?.userId?.firstName} {conversation?.userId?.lastName} - <FlatName>{conversation?.flatId?.name}</FlatName>
                  </>
                : <>
                    {conversation.ownerId?.firstName} {conversation.ownerId?.lastName} - <FlatName>{conversation?.flatId?.name}</FlatName>
                  </>
              }
            </Name>
            <LastMessage>{conversation.lastMessage || 'No messages yet'}{conversation.unreadCount > 0 && <UnreadBadge>{conversation.unreadCount}</UnreadBadge>}</LastMessage>
          </ConversationItem>
        ))}
      </ConversationList>
    </SidebarContainer>
  );
};

export default ChatSidebar;