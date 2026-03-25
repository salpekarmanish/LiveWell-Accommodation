import React from 'react';
import styled from 'styled-components';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.borderDark};
`;

const EmptyTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

function EmptyState({ title = "No Data Available", message = "There are no complaints to display" }) {
  return (
    <EmptyContainer>
      <EmptyIcon>📋</EmptyIcon>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyMessage>{message}</EmptyMessage>
    </EmptyContainer>
  );
}

export default EmptyState;
