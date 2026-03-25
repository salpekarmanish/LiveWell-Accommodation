import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  position: relative;
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 100px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const UpdateButton = styled.button`
  padding: 0.75rem 1rem;
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
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.borderDark};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

function UpdateStatusModal({ isOpen, onClose, currentStatus, onUpdateStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [ownerRemark, setOwnerRemark] = useState('');
  const [showRemarkField, setShowRemarkField] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
    setShowRemarkField(currentStatus === 'Resolved');
    setOwnerRemark('');
    setError('');
  }, [currentStatus, isOpen]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setShowRemarkField(newStatus === 'Resolved');
    if (newStatus !== 'Resolved') {
      setOwnerRemark('');
      setError('');
    }
  };

  const validateForm = () => {
    if (status === 'Resolved' && (!ownerRemark || ownerRemark.trim() === '')) {
      setError('Please provide resolution details before marking as Resolved');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onUpdateStatus(status, showRemarkField ? ownerRemark : '');
      setIsSubmitting(false);
    } catch (error) {
      setError('Failed to update status. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Update Complaint Status</ModalTitle>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={status}
              onChange={handleStatusChange}
              disabled={isSubmitting}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>
          </FormGroup>
          
          {showRemarkField && (
            <FormGroup>
              <Label htmlFor="ownerRemark">Resolution Details</Label>
              <TextArea
                id="ownerRemark"
                placeholder="Please provide details about how the complaint was resolved..."
                value={ownerRemark}
                onChange={(e) => setOwnerRemark(e.target.value)}
                disabled={isSubmitting}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormGroup>
          )}
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onClose} disabled={isSubmitting}>
            Cancel
          </CancelButton>
          <UpdateButton 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Status'}
          </UpdateButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default UpdateStatusModal;