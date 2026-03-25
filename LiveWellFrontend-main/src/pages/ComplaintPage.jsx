// src/components/ComplaintPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import  GlobalStyles  from '../styles/GlobalStyles';
import ComplaintList from '../components/Complaint/ComplaintList'
import ComplaintDetails from '../components/Complaint/ComplaintDetails';
import UpdateStatusModal from '../components/Complaint/UpdateStatusModal';
import LoadingSpinner from '../components/Complaint/LoadingSpinner';
import EmptyState from '../components/Complaint/EmptyState';
import { ComplaintService } from '../components/Complaint/ComplaintService';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin: 0;
`;

const RoleToggle = styled.div`
  display: flex;
  align-items: center;
`;

const RoleLabel = styled.label`
  margin-right: 1rem;
  font-weight: 500;
`;

const RoleSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailContainer = styled.div`
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

function ComplaintPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'user';

//   const [role, setRole] = useState('user');
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      const data = await ComplaintService.fetchComplaints(user?._id);
      console.log(data);
      setComplaints(data);
      if (data.length > 0) {
        setSelectedComplaint(data[0]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateStatus = async (status, ownerRemark) => {
    if (!selectedComplaint) return;

    try {
      const updatedComplaint = await ComplaintService.updateComplaintStatus(
        selectedComplaint._id,
        status,
        ownerRemark
      );
      
      // Update complaints list with the updated complaint
      setComplaints(complaints.map(c => 
        c._id === updatedComplaint._id ? updatedComplaint : c
      ));
      
      // Update selected complaint
      setSelectedComplaint(updatedComplaint);
      
      toast.success(`Complaint status updated to ${status}`);
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to update complaint status');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageContainer>
        <Header>
          <Title>Complaint Management System</Title>
          <RoleToggle>
            <RoleLabel>Viewing as:</RoleLabel>
            <RoleSelect 
              value={role} 
              // onChange={(e) => setRole(e.target.value)}
            >
              <option value={role}>{role}</option>
              {/* <option value="owner">Owner</option> */}
            </RoleSelect>
          </RoleToggle>
        </Header>
        
        <Main>
          {isLoading ? (
            <LoadingSpinner />
          ) : complaints.length === 0 ? (
            <EmptyState 
              title="No Complaints Found" 
              message="There are no complaints in the system yet." 
            />
          ) : (
            <>
              <ComplaintList 
                complaints={complaints} 
                selectedComplaintId={selectedComplaint?._id} 
                onSelectComplaint={handleSelectComplaint}
                isLoading={false}
              />
              
              <DetailContainer>
                {selectedComplaint ? (
                  <ComplaintDetails 
                    complaint={selectedComplaint}
                    userRole={role}
                    onUpdateClick={handleOpenModal}
                  />
                ) : (
                  <EmptyState 
                    title="No Complaint Selected" 
                    message="Please select a complaint to view details." 
                  />
                )}
              </DetailContainer>
            </>
          )}
        </Main>
        
        {isModalOpen && selectedComplaint && (
          <UpdateStatusModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            currentStatus={selectedComplaint.status}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
        
        {/* <ToastContainer 
          position="bottom-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      </PageContainer>
    </ThemeProvider>
  );
}

export default ComplaintPage;