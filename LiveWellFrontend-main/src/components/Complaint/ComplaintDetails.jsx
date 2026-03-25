import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const DetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`;

const UpdateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StatusLabel = styled.span`
  margin-right: 0.5rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: ${({ status, theme }) => theme.statusColors[status] || theme.colors.textLight};
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const InfoLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`;

const ComplaintSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ComplaintText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const RemarkSection = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 1rem;
`;

const RemarkTitle = styled.h4`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const RemarkText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
`;

const NoRemarkText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
`;

function ComplaintDetails({ complaint, userRole, onUpdateClick }) {
  return (
    <DetailsContainer>
      <Header>
        <Title>{complaint?.complaint}</Title>
        {userRole === 'owner' && (
          <UpdateButton onClick={onUpdateClick}>
            Update Status
          </UpdateButton>
        )}
      </Header>
      
      <StatusSection>
        <StatusLabel>Status:</StatusLabel>
        <StatusBadge status={complaint.status}>{complaint.status}</StatusBadge>
      </StatusSection>
      
      <InfoSection>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Complaint Type</InfoLabel>
            <InfoValue>{complaint.complaintType}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Flat</InfoLabel>
            <InfoValue>{complaint?.flatId?.name}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Created On</InfoLabel>
            <InfoValue>
              {format(new Date(complaint.createdAt), 'MMM d, yyyy')}
            </InfoValue>
          </InfoItem>
        </InfoGrid>
      </InfoSection>
      
      <ComplaintSection>
        <SectionTitle>Complaint Details</SectionTitle>
        <ComplaintText>{complaint.complaint}</ComplaintText>
      </ComplaintSection>
      
      <RemarkSection>
        <RemarkTitle>Owner's Remarks</RemarkTitle>
        {complaint.ownerRemark ? (
          <RemarkText>{complaint.ownerRemark}</RemarkText>
        ) : (
          <NoRemarkText>No remarks added yet</NoRemarkText>
        )}
      </RemarkSection>
    </DetailsContainer>
  );
}

export default ComplaintDetails;