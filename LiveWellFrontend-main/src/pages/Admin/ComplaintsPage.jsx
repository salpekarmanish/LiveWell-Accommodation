import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  background-color: #f7f9fc;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 4px solid ${props => props.color};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 1.5rem;
  text-align: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
  font-size: 1.5rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'open': return '#3498db30';
      case 'in progress': return '#f39c1230';
      case 'resolved': return '#2ecc7130';
      case 'pending': return '#95a5a630';
      default: return '#ecf0f1';
    }
  }};
  color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'open': return '#3498db';
      case 'in progress': return '#f39c12';
      case 'resolved': return '#2ecc71';
      case 'pending': return '#95a5a6';
      default: return '#7f8c8d';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: ${props => props.active ? '2px solid #3498db' : '1px solid #ddd'};
  background-color: ${props => props.active ? '#e6f7ff' : 'white'};
  color: ${props => props.active ? '#3498db' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-size: 1.5rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || '#3498db'};
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;

  &:hover {
    filter: brightness(90%);
  }
`;

const UpdateStatusModal = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  background-color: ${props => props.primary ? '#3498db' : '#e0e0e0'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#d0d0d0'};
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    isDeleted: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    maintenance: 0,
    security: 0,
    other: 0
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const token = JSON.parse(localStorage.getItem('token'));

  const rowsPerPage = 10;

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/people/complaints', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Set complaints
      setComplaints(response.data || []);

      // Calculate stats
      if (response.data && response.data.length > 0) {
        const totalComplaints = response.data.length;
        const openCount = response.data.filter(c => c.status.toLowerCase() === 'open').length;
        const inProgressCount = response.data.filter(c => c.status.toLowerCase() === 'in progress').length;
        const resolvedCount = response.data.filter(c => c.status.toLowerCase() === 'resolved').length;

        const maintenanceCount = response.data.filter(c => c.complaintType.toLowerCase() === 'maintenance').length;
        const securityCount = response.data.filter(c => c.complaintType.toLowerCase() === 'security').length;
        const otherTypeCount = totalComplaints - maintenanceCount - securityCount;

        setStats({
          total: totalComplaints,
          open: openCount,
          inProgress: inProgressCount,
          resolved: resolvedCount,
          maintenance: maintenanceCount,
          security: securityCount,
          other: otherTypeCount
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setLoading(false);
    }
  };

  // Filter complaints based on selected filters
  const filteredComplaints = complaints.filter(complaint => {
    // Filter by status
    if (filters.status !== 'all' && complaint.status.toLowerCase() !== filters.status.toLowerCase()) {
      return false;
    }

    // Filter by type
    if (filters.type !== 'all' && complaint.complaintType.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }

    // Filter by isDeleted status
    if (filters.isDeleted === 'active' && complaint.isDeleted) {
      return false;
    }

    if (filters.isDeleted === 'deleted' && !complaint.isDeleted) {
      return false;
    }

    return true;
  });

  // Get current page complaints
  const indexOfLastComplaint = currentPage * rowsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - rowsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  // Calculate page numbers
  const totalPages = Math.ceil(filteredComplaints.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleUpdateStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setShowStatusModal(true);
  };

  const submitStatusUpdate = async () => {
    if (!selectedComplaint || !newStatus) return;

    try {
      // This is a mock implementation - replace with your actual API endpoint
      await axios.put(`http://localhost:3000/api/people/complaints/${selectedComplaint._id}`, {
        status: newStatus
      });

      // Update local state
      const updatedComplaints = complaints.map(c =>
        c._id === selectedComplaint._id ? { ...c, status: newStatus } : c
      );
      toast.success('Complaint status updated successfully', { position: "top-right" });

      setComplaints(updatedComplaints);

      // Update stats
      const updatedStats = { ...stats };

      // Decrement old status count
      if (selectedComplaint.status.toLowerCase() === 'open') updatedStats.open--;
      else if (selectedComplaint.status.toLowerCase() === 'in progress') updatedStats.inProgress--;
      else if (selectedComplaint.status.toLowerCase() === 'resolved') updatedStats.resolved--;

      // Increment new status count
      if (newStatus.toLowerCase() === 'open') updatedStats.open++;
      else if (newStatus.toLowerCase() === 'in progress') updatedStats.inProgress++;
      else if (newStatus.toLowerCase() === 'resolved') updatedStats.resolved++;

      setStats(updatedStats);

      // Close modal
      setShowStatusModal(false);
      setSelectedComplaint(null);

    } catch (error) {
      console.error('Error updating complaint status:', error);
      toast.error('Error updating complaint status', { position: "top-right" });
      // Show error message to user
    }
  };

  return (
    <PageContainer>
      <Title>Complaint Management</Title>

      <StatsContainer>
        <StatCard color="#3498db">
          <StatValue color="#3498db">{stats.total}</StatValue>
          <StatLabel>Total Complaints</StatLabel>
        </StatCard>

        <StatCard color="#e74c3c">
          <StatValue color="#e74c3c">{stats.open}</StatValue>
          <StatLabel>Open Complaints</StatLabel>
        </StatCard>

        <StatCard color="#f39c12">
          <StatValue color="#f39c12">{stats.inProgress}</StatValue>
          <StatLabel>In Progress</StatLabel>
        </StatCard>

        <StatCard color="#2ecc71">
          <StatValue color="#2ecc71">{stats.resolved}</StatValue>
          <StatLabel>Resolved</StatLabel>
        </StatCard>
      </StatsContainer>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <FilterSelect
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Complaint Type</FilterLabel>
          <FilterSelect
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="all">All Types</option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Security</option>
            <option value="amenities">Amenities</option>
            <option value="neighbor">Neighbor Issues</option>
            <option value="other">Other</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <FilterSelect
            name="isDeleted"
            value={filters.isDeleted}
            onChange={handleFilterChange}
          >
            <option value="all">All Complaints</option>
            <option value="active">Active Only</option>
            <option value="deleted">Deleted Only</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Complaint</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Created</Th>
                <Th>Updated</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {currentComplaints.length > 0 ? (
                currentComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <Td>{complaint._id.slice(-8)}</Td>
                    <Td>{complaint.complaint}</Td>
                    <Td>{complaint.complaintType}</Td>
                    <Td>
                      <StatusBadge status={complaint.status}>
                        {complaint.status}
                      </StatusBadge>
                    </Td>
                    <Td>{formatDate(complaint.createdAt)}</Td>
                    <Td>{formatDate(complaint.updatedAt)}</Td>
                    <Td>
                      {/* <ActionButton onClick={() => handleUpdateStatus(complaint)}>
                        Update Status
                      </ActionButton> */}
                      <ActionButton
                        color={complaint.isDeleted ? '#27ae60' : '#e74c3c'}
                      >
                        {complaint.isDeleted ? 'Restore' : 'Delete'}
                      </ActionButton>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="7">
                    <NoResults>No complaints found matching your filters.</NoResults>
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>

              {pageNumbers.map(number => (
                <PageButton
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </PageButton>
              ))}

              <PageButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {showStatusModal && (
        <UpdateStatusModal>
          <ModalContent>
            <ModalTitle>Update Complaint Status</ModalTitle>
            <FilterLabel>New Status</FilterLabel>
            <FilterSelect
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Pending">Pending</option>
            </FilterSelect>

            <ModalButtons>
              <ModalButton onClick={() => setShowStatusModal(false)}>Cancel</ModalButton>
              <ModalButton primary onClick={submitStatusUpdate}>Update Status</ModalButton>
            </ModalButtons>
          </ModalContent>
        </UpdateStatusModal>
      )}
    </PageContainer>
  );
};

export default ComplaintsPage;