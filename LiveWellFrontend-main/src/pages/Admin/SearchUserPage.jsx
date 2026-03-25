import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const SearchCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const InputGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ResultsTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

const NoResults = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 1.5rem;
  padding: 2rem 0;
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

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #e74c3c;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const SearchUserPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    phone: '',
    aadharNumber: '',
    _id: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    // Validate that at least one search field is filled
    const hasSearchCriteria = Object.values(searchCriteria).some(value => value.trim() !== '');
    
    if (!hasSearchCriteria) {
      setError('Please enter at least one search criterion');
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      Object.entries(searchCriteria).forEach(([key, value]) => {
        if (value.trim()) {
          queryParams.append(key, value.trim());
        }
      });
      
      // Make API call
      const response = await axios.get(`http://localhost:3000/api/admin/search?${queryParams}`);
      
      setSearchResults(response.data || []);
      setSearched(true);
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Failed to search users. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchCriteria({
      name: '',
      email: '',
      phone: '',
      aadharNumber: '',
      _id: '',
    });
    setSearchResults([]);
    setSearched(false);
    setError(null);
  };

  return (
    <PageContainer>
      <Title>Search Users</Title>

      <SearchCard>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={searchCriteria.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={searchCriteria.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={searchCriteria.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            <Input
              id="aadharNumber"
              name="aadharNumber"
              type="text"
              value={searchCriteria.aadharNumber}
              onChange={handleInputChange}
              placeholder="Enter Aadhar number"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <Label htmlFor="_id">User ID</Label>
            <Input
              id="_id"
              name="_id"
              type="text"
              value={searchCriteria._id}
              onChange={handleInputChange}
              placeholder="Enter user ID"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
          <Button onClick={handleClear} style={{ backgroundColor: '#7f8c8d' }}>
            Clear
          </Button>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search Users'}
          </Button>
        </FormGroup>
      </SearchCard>

      {loading ? (
        <LoadingSpinner />
      ) : searched && (
        <ResultsContainer>
          <ResultsTitle>Search Results</ResultsTitle>

          {searchResults.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Aadhar Number</Th>
                  <Th>Role</Th>
                  <Th>Verified</Th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((user) => (
                  <tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.firstName + ' ' + user.lastName || 'N/A'}</Td>
                    <Td>{user.email || 'N/A'}</Td>
                    <Td>{user.phone || 'N/A'}</Td>
                    <Td>{user.aadharCard || 'N/A'}</Td>
                    <Td>{user.role || 'User'}</Td>
                    <Td>{user.isVerified ? 'Yes' : 'No'}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <NoResults>No users found matching your search criteria.</NoResults>
          )}
        </ResultsContainer>
      )}
    </PageContainer>
  );
};

export default SearchUserPage;