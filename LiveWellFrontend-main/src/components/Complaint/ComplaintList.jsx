import React from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

const ListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ListTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ComplaintItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s;
  
  background-color: ${({ $isSelected, theme }) => 
    $isSelected ? theme.colors.backgroundLight : theme.colors.background};
  
  &:hover {
    background-color: ${({ theme, $isSelected }) => 
      $isSelected ? theme.colors.backgroundLight : '#f8fafc'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ComplaintTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ComplaintMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
`;

const FlatName = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: ${({ $status, theme }) => theme.statusColors[$status] || theme.colors.textLight};
`;

const DateInfo = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 0.5rem;
`;

function ComplaintList({ complaints, selectedComplaintId, onSelectComplaint, isLoading }) {
  if (isLoading) {
    return (
      <ListContainer>
        <ListHeader>
          <ListTitle>Complaints</ListTitle>
        </ListHeader>
        <LoadingMessage>Loading complaints...</LoadingMessage>
      </ListContainer>
    );
  }

  if (!complaints || complaints.length === 0) {
    return (
      <ListContainer>
        <ListHeader>
          <ListTitle>Complaints</ListTitle>
        </ListHeader>
        <EmptyMessage>No complaints found</EmptyMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>Complaints ({complaints?.length})</ListTitle>
      </ListHeader>
      {complaints?.map(complaint => (
        <ComplaintItem
          key={complaint._id}
          $isSelected={selectedComplaintId === complaint._id}
          onClick={() => onSelectComplaint(complaint)}
        >
          <ComplaintTitle>{complaint.complaint}</ComplaintTitle>
          <ComplaintMeta>
            <FlatName>Flat: {complaint?.flatId?.name}</FlatName>
            <StatusBadge $status={complaint.status}>{complaint.status}</StatusBadge>
          </ComplaintMeta>
          <DateInfo>
            {formatDistance(new Date(complaint.createdAt), new Date(), { addSuffix: true })}
          </DateInfo>
        </ComplaintItem>
      ))}
    </ListContainer>
  );
}

export default ComplaintList;