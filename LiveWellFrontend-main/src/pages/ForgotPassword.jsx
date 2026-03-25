// ForgotPassword.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  width: 400px;
  max-width: 90%;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #5469d4;
    box-shadow: 0 0 0 1px #5469d4;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #5469d4;
    box-shadow: 0 0 0 1px #5469d4;
  }
`;

const Button = styled.button`
  background-color: #5469d4;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: #4050b5;
  }
  
  &:disabled {
    background-color: #a0a8d0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e53935;
  font-size: 14px;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: #43a047;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  text-align: center;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3000/api/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
      
      setSuccess(true);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <FormCard>
        <Title>Forgot Password</Title>
        <Subtitle>Enter your email address below to receive a password reset link</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="role">Account Type</Label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading || success}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </Select>
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {success ? (
            <SuccessMessage>
              Password reset link has been sent to your email. Please check your inbox.
            </SuccessMessage>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Reset Password'}
            </Button>
          )}
        </Form>
      </FormCard>
    </Container>
  );
};

export default ForgotPassword;