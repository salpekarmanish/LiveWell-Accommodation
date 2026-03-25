// ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    color: #333;
  }
  
  &:focus {
    outline: none;
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

const PasswordRequirements = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  font-size: 13px;
  color: #666;
  
  li {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    
    &.valid {
      color: #43a047;
    }
    
    &.invalid {
      color: #e53935;
    }
    
    span {
      margin-left: 5px;
    }
  }
`;

// Icons for password visibility toggle
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  // Extract resetToken from URL
  const { resetToken } = useParams();
  
  // If no token in params, extract from URL path
  useEffect(() => {
    if (!resetToken) {
      const pathSegments = window.location.pathname.split('/');
      const tokenFromPath = pathSegments[pathSegments.length - 1];
      if (tokenFromPath && tokenFromPath !== 'resetPassword') {
        // We found a token in the URL path
        console.log("Token found in URL path:", tokenFromPath);
        // You could store this in state if needed
      }
    }
  }, [resetToken]);
  
  // Get token either from params or URL
  const getResetToken = () => {
    if (resetToken) return resetToken;
    
    const pathSegments = window.location.pathname.split('/');
    const tokenFromPath = pathSegments[pathSegments.length - 1];
    if (tokenFromPath && tokenFromPath !== 'resetPassword') {
      return tokenFromPath;
    }
    return null;
  };
  
  // Validate password requirements
  useEffect(() => {
    // Check if password meets requirements (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(regex.test(password));
    
    // Check if passwords match
    setPasswordsMatch(password === confirmPassword || confirmPassword === '');
  }, [password, confirmPassword]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!isValidPassword) {
      setError('Password does not meet the requirements');
      return;
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }
    
    const token = getResetToken();
    if (!token) {
      setError('Reset token is missing. Please use the link from your email.');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`http://localhost:3000/api/auth/resetPassword/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          role,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
      
      setSuccess(true);
      
      // On success, redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle password visibility
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  
  const toggleShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Check password strength
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const hasMinLength = password.length >= 8;
  
  if (success) {
    return (
      <Container>
        <FormCard>
          <Title>Password Reset Successful</Title>
          <SuccessMessage>
            Your password has been reset successfully! Redirecting to login page...
          </SuccessMessage>
        </FormCard>
      </Container>
    );
  }
  
  return (
    <Container>
      <FormCard>
        <Title>Reset Password</Title>
        <Subtitle>Create your new password</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <InputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle type="button" onClick={toggleShowPassword}>
                {!showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </PasswordToggle>
            </InputWrapper>
            
            {password && (
              <PasswordRequirements>
                <li className={hasMinLength ? 'valid' : 'invalid'}>
                  {hasMinLength ? '✓' : '✗'} <span>At least 8 characters</span>
                </li>
                <li className={hasUpperCase ? 'valid' : 'invalid'}>
                  {hasUpperCase ? '✓' : '✗'} <span>At least 1 uppercase letter</span>
                </li>
                <li className={hasLowerCase ? 'valid' : 'invalid'}>
                  {hasLowerCase ? '✓' : '✗'} <span>At least 1 lowercase letter</span>
                </li>
                <li className={hasNumber ? 'valid' : 'invalid'}>
                  {hasNumber ? '✓' : '✗'} <span>At least 1 number</span>
                </li>
                <li className={hasSpecialChar ? 'valid' : 'invalid'}>
                  {hasSpecialChar ? '✓' : '✗'} <span>At least 1 special character (@$!%*?&)</span>
                </li>
              </PasswordRequirements>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputWrapper>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <PasswordToggle type="button" onClick={toggleShowConfirmPassword}>
                {!showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </PasswordToggle>
            </InputWrapper>
            {!passwordsMatch && confirmPassword && (
              <ErrorMessage>Passwords do not match</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="role">Account Type</Label>
            <Select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </Select>
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ResetPassword;