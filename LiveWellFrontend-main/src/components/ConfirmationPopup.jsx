import React from 'react';
import styled from 'styled-components';

// Styled components for the confirmation popup
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
`;

const Message = styled.p`
  margin-bottom: 24px;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${props => props.variant === 'delete' ? '#ff4d4f' : '#1890ff'};
  color: white;
  
  &:hover {
    background-color: ${props => props.variant === 'delete' ? '#ff7875' : '#40a9ff'};
  }
`;

/**
 * ConfirmationPopup component
 * @param {Object} props
 * @param {string} props.title - Title of the confirmation popup
 * @param {string} props.message - Message to display in the popup
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {string} props.variant - Variant of the action ('delete', 'confirm', etc.)
 * @param {function} props.onConfirm - Function to call when confirmed
 * @param {function} props.onCancel - Function to call when canceled
 * @param {boolean} props.isOpen - Whether the popup is open
 */
const ConfirmationPopup = ({
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'confirm',
  onConfirm,
  onCancel,
  isOpen
}) => {
  if (!isOpen) return null;
  
  return (
    <Overlay onClick={onCancel}>
      <PopupContainer onClick={e => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>
            {cancelText}
          </CancelButton>
          <ConfirmButton 
            variant={variant} 
            onClick={onConfirm}
          >
            {confirmText}
          </ConfirmButton>
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default ConfirmationPopup;