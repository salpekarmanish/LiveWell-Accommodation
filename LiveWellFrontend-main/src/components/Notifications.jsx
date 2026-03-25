import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MdNotifications, MdDeleteSweep, MdCircle } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

// Animation for new notifications
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    font-size: 24px;
    color: #333;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 1s infinite;
  animation-iteration-count: 3;
`;

const NotificationContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: #f8f9fa;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

const NotificationBody = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #666;
  display: block;
  margin-top: 4px;
`;

const UnreadIndicator = styled(MdCircle)`
  color: #3498db;
  font-size: 10px;
  margin-top: 5px;
`;

const EmptyState = styled.div`
  padding: 24px 16px;
  text-align: center;
  color: #666;
`;

const NotificationFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  border-top: 1px solid #eee;
`;

const ClearButton = styled.button`
  background-color: transparent;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e74c3c;
    color: white;
  }
  
  svg {
    font-size: 16px;
  }
`;

// Helper function to format time
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
};

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch notifications on mount and set up polling
    fetchNotifications();
    
    // Poll for new notifications every minute
    const intervalId = setInterval(fetchNotifications, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  const fetchNotifications = () => {
    axios.get(`http://localhost:3000/api/notifications?userId=${userId}`)
      .then(res => setNotifications(res.data))
      .catch(err => console.error('Failed to fetch notifications:', err));
  };

  const clearNotifications = () => {
    axios.post('http://localhost:3000/api/notifications/clear', { userId })
      .then(() => {
        setNotifications([]);
        setIsOpen(false);
      })
      .catch(err => console.error('Failed to clear notifications:', err));
  };

  const markAsRead = (notificationId) => {
    axios.post(`http://localhost:3000/api/notifications/read`, { notificationId })
      .then(() => {
        // Update local state to mark as read
        setNotifications(prevNotifications => 
          prevNotifications.map(notif => 
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );
      })
      .catch(err => console.error('Failed to mark notification as read:', err));
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <NotificationIcon onClick={() => setIsOpen(!isOpen)}>
        <MdNotifications />
        {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      </NotificationIcon>
      
      <NotificationContainer $isVisible={isOpen}>
        <NotificationHeader>
          <NotificationTitle>Notifications</NotificationTitle>
          {notifications.length > 0 && (
            <span style={{ fontSize: '14px', color: '#666' }}>
              {unreadCount} new
            </span>
          )}
        </NotificationHeader>
        
        <NotificationBody>
          {notifications.length === 0 ? (
            <EmptyState>
              <p>No notifications yet</p>
              <small>We'll notify you when something arrives</small>
            </EmptyState>
          ) : (
            notifications.map((notif) => (
              <NotificationItem 
                key={notif._id || notif.id}
                onClick={() => !notif.read && markAsRead(notif._id || notif.id)}
              >
                {!notif.read && <UnreadIndicator />}
                <NotificationContent>
                  <NotificationMessage>{notif.message}</NotificationMessage>
                  <NotificationTime>{formatTime(notif.createdAt || new Date())}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))
          )}
        </NotificationBody>
        
        {notifications.length > 0 && (
          <NotificationFooter>
            <ClearButton onClick={clearNotifications}>
              <MdDeleteSweep />
              Clear all
            </ClearButton>
          </NotificationFooter>
        )}
      </NotificationContainer>
    </div>
  );
};

export default Notifications;