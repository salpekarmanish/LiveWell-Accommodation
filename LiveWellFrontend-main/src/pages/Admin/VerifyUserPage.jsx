import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationPopup from '../../components/ConfirmationPopup';

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

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#555'};
  border: none;
  border-bottom: ${props => props.active ? '3px solid #2980b9' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#f5f5f5'};
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

const Button = styled.button`
  background-color: ${props => props.variant === 'unverify' ? '#e74c3c' : '#2ecc71'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.variant === 'unverify' ? '#c0392b' : '#27ae60'};
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  font-size: 1.5rem;
`;

const SearchButton = styled(Button)`
  background-color: #3498db;
  
  &:hover {
    background-color: #2980b9;
  }
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

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: ${props => props.variant === 'owner' ? '#9b59b6' : '#3498db'};
  color: white;
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

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
`;

const StatLabel = styled.div`
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
`;

const VerifyUserPage = () => {
    const [activeTab, setActiveTab] = useState('unverified');
    const [users, setUsers] = useState([]);
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [processingIds, setProcessingIds] = useState(new Set());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userStats, setUserStats] = useState({
        totalVerified: 0,
        totalUnverified: 0,
        totalOwners: 0,
        totalRegularUsers: 0
    });
    const [actionType, setActionType] = useState('verify');

    const rowsPerPage = 10;

    useEffect(() => {
        fetchUsers();
    }, [activeTab]);

    useEffect(() => {
        // Filter users when searchTerm changes
        if (searchTerm.trim() === '') {
            setFilteredUsers([...users, ...owners]);
        } else {
            const term = searchTerm.toLowerCase();
            const filtered = [...users, ...owners].filter(user =>
                (user.firstName && user.firstName.toLowerCase().includes(term)) ||
                (user.lastName && user.lastName.toLowerCase().includes(term)) ||
                (user.name && user.name.toLowerCase().includes(term)) || // For owners
                (user.email && user.email.toLowerCase().includes(term)) ||
                (user.phone && user.phone.toString().includes(term)) ||
                (user.aadharCard && user.aadharCard.toString().includes(term)) ||
                (user._id && user._id.toLowerCase().includes(term))
            );

            setFilteredUsers(filtered);
        }
    }, [searchTerm, users, owners]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Use different endpoint based on active tab
            const endpoint = activeTab === 'verified' 
                ? 'http://localhost:3000/api/admin/getVerifiedUser'
                : 'http://localhost:3000/api/admin/getNewUser';
                
            const response = await axios.get(endpoint);
            setUsers(response.data.users || []);
            setOwners(response.data.owners || []);
            setFilteredUsers([...(response.data.users || []), ...(response.data.owners || [])]);
            
            // Update stats
            setUserStats({
                totalVerified: activeTab === 'verified' ? (response.data.users?.length || 0) + (response.data.owners?.length || 0) : userStats.totalVerified,
                totalUnverified: activeTab === 'unverified' ? (response.data.users?.length || 0) + (response.data.owners?.length || 0) : userStats.totalUnverified,
                totalOwners: response.data.owners?.length || 0,
                totalRegularUsers: response.data.users?.length || 0
            });
            
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching ${activeTab} users:`, error);
            toast.error(`Failed to load ${activeTab} users`, { position: "top-right" });
            setLoading(false);
        }
    };

    const handleUserAction = (id) => {
        setCurrentUserId(id);
        setActionType(activeTab === 'unverified' ? 'verify' : 'unverify');
        setIsPopupOpen(true);
    };

    const confirmUserAction = async () => {
        try {
            setProcessingIds(prev => new Set(prev).add(currentUserId));

            const endpoint = actionType === 'verify'
                ? `http://localhost:3000/api/admin/makeVerified/${currentUserId}`
                : `http://localhost:3000/api/admin/revokeVerification/${currentUserId}`;
                
            await axios.put(endpoint);

            // Update local state after successful action
            const actionMessage = actionType === 'verify' ? 'User Verified Successfully' : 'User Verification Revoked';
            toast.success(actionMessage, { position: "top-right" });

            // Remove user from the list
            setUsers(prevUsers => prevUsers.filter(user => user._id !== currentUserId));
            setOwners(prevOwners => prevOwners.filter(owner => owner._id !== currentUserId));
            setFilteredUsers(prevFiltered => prevFiltered.filter(user => user._id !== currentUserId));

            // Update stats
            if (actionType === 'verify') {
                setUserStats(prev => ({
                    ...prev,
                    totalVerified: prev.totalVerified + 1,
                    totalUnverified: prev.totalUnverified - 1
                }));
            } else {
                setUserStats(prev => ({
                    ...prev,
                    totalVerified: prev.totalVerified - 1,
                    totalUnverified: prev.totalUnverified + 1
                }));
            }

        } catch (error) {
            console.error(`Error ${actionType === 'verify' ? 'verifying' : 'unverifying'} user:`, error);
            toast.error(`Error ${actionType === 'verify' ? 'verifying' : 'unverifying'} user`, { position: "top-right" });
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(currentUserId);
                return newSet;
            });
            setIsPopupOpen(false);
        }
    };

    const cancelAction = () => {
        setIsPopupOpen(false);
    };

    // Get current users
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate page numbers
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <PageContainer>
            <Title>User Verification Management</Title>

            <TabContainer>
                <Tab 
                    active={activeTab === 'unverified'} 
                    onClick={() => {
                        setActiveTab('unverified');
                        setCurrentPage(1);
                        setSearchTerm('');
                    }}
                >
                    Unverified Users
                </Tab>
                <Tab 
                    active={activeTab === 'verified'} 
                    onClick={() => {
                        setActiveTab('verified');
                        setCurrentPage(1);
                        setSearchTerm('');
                    }}
                >
                    Verified Users
                </Tab>
            </TabContainer>

            <StatsContainer>
                <StatCard>
                    <StatNumber>{activeTab === 'verified' ? userStats.totalVerified : userStats.totalUnverified}</StatNumber>
                    <StatLabel>Total {activeTab === 'verified' ? 'Verified' : 'Unverified'} Users</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{owners.length}</StatNumber>
                    <StatLabel>Property Owners</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{users.length}</StatNumber>
                    <StatLabel>Regular Users</StatLabel>
                </StatCard>
            </StatsContainer>

            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search by name, email, phone, aadhar, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton>Search</SearchButton>
            </SearchContainer>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Phone</Th>
                                <Th>Aadhar Number</Th>
                                <Th>Role</Th>
                                <Th>Action</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((user) => (
                                    <tr key={user._id}>
                                        <Td>{user._id.substring(0, 10)}...</Td>
                                        <Td>{(user.firstName + ' ' + user.lastName) || user.name || 'N/A'}</Td>
                                        <Td>{user.email || 'N/A'}</Td>
                                        <Td>{user.phone || 'N/A'}</Td>
                                        <Td>{user.aadharCard || 'N/A'}</Td>
                                        <Td>
                                            <Badge variant={owners.some(o => o._id === user._id) ? 'owner' : 'user'}>
                                                {owners.some(o => o._id === user._id) ? 'Owner' : 'User'}
                                            </Badge>
                                        </Td>
                                        <Td>
                                            <Button
                                                variant={activeTab === 'verified' ? 'unverify' : 'verify'}
                                                onClick={() => handleUserAction(user._id)}
                                                disabled={processingIds.has(user._id)}
                                            >
                                                {processingIds.has(user._id) ? 'Processing...' : 
                                                 activeTab === 'verified' ? 'Revoke Verification' : 'Verify'}
                                            </Button>
                                        </Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Td colSpan="7" style={{ textAlign: 'center' }}>
                                        No {activeTab} users found
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

            <ConfirmationPopup
                isOpen={isPopupOpen}
                title={actionType === 'verify' ? "Confirm User Verification" : "Revoke User Verification"}
                message={actionType === 'verify' ? 
                    "Are you sure you want to verify this user?" : 
                    "Are you sure you want to revoke verification for this user?"}
                confirmText="Yes"
                cancelText="No"
                onConfirm={confirmUserAction}
                onCancel={cancelAction}
                variant={actionType === 'verify' ? "confirm" : "danger"}
            />
        </PageContainer>
    );
};

export default VerifyUserPage;