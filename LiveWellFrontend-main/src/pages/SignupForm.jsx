import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  width: 100%;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #357abd;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  grid-column: 1 / -1;
  color: ${props => props.type === 'error' ? '#dc3545' : '#28a745'};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    aadharCard: '',
    role: 'user',
    gender:'male',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.aadharCard || !formData.password) {
      setError('All fields are required');
      return false;
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    if (!formData.aadharCard.match(/^\d{12}$/)) {
      setError('Please enter a valid 12-digit Aadhar number');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const result = await response.json();

      setSuccess('Account created successfully!');
      toast.success('Account created successfully! Redirecting to login...');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        aadharCard: '',
        role: 'user',
        password: ''
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate(`/profile/${result.data._id}`);
      }, 2000);
    } catch (err) {
      const errorMessage = 'Failed to create account. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </InputGroup>

          <InputGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </InputGroup>

          <InputGroup>
            <Label>Aadhar Card Number</Label>
            <Input
              type="text"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
              placeholder="Enter 12-digit Aadhar number"
            />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="user">Male</option>
              <option value="owner">Female</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Role</Label>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </InputGroup>

          {error && (
            <StatusMessage type="error">
              <AlertCircle size={16} />
              {error}
            </StatusMessage>
          )}

          {success && (
            <StatusMessage type="success">
              <CheckCircle size={16} />
              {success}
            </StatusMessage>
          )}

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </ButtonContainer>
        </Form>
      </FormCard>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default SignupForm;