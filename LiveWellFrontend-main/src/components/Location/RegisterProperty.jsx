import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LocationPicker from "./LocationPicker";
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1500px;
  margin: 10px auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const LocationText = styled.p`
  color: #34495e;
  font-size: 2rem;
  margin-top: 1rem;
  text-align: center;
`;

const RegisterProperty = () => {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { latitude, longitude, origin, flatId } = state || {};

  const handleSubmit = () => {
    console.log("Submitting property with location:", location);
    console.log("Origin:", origin);
    if (origin === 'addFlat') {
      navigate('/addFlat', { state: { latitude: location.lat, longitude: location.lng } });
    } else if (origin === 'updateFlat') {
      localStorage.setItem('location', JSON.stringify(location))
      navigate(`/flat/update/${flatId}`, { state: { latitude: location.lat, longitude: location.lng, skipFetch: true} });
    }
    // Send to backend
  };

  return (
    <Container>
      <Title>Register Your Property</Title>
      <LocationPicker onLocationSelect={setLocation} />
      {location && <LocationText>Selected Location: {location.lat}, {location.lng}</LocationText>}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Container>
  );
};

export default RegisterProperty;
