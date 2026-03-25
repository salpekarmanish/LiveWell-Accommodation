import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

import ConfirmationPopup from '../components/ConfirmationPopup';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 3rem 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #3498db;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const SmallImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const ComplaintButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const PopupTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PopupInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 2rem;
`;

const PopupSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 2rem;
`;

const PopupTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 2rem;
  resize: none;
`;

const PopupButton = styled(Button)`
  background-color: #3498db;

  &:hover {
    background-color: #2980b9;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const AllProperties = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'user';
  const userId = user?._id;
  const [reloadPage, setReloadPage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [isComplaintPopupOpen, setIsComplaintPopupOpen] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState({
    complaint: '',
    complaintType: 'maintenance'
  });

  useEffect(() => {
    fetchUserData();
  }, [reloadPage]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}/${role}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch profile data', error);
    }
  };

  const navigateToProperty = (propertyId) => {
    navigate(`/property-detail/${propertyId}`);
  };

  const handleSaleToggle = (id, currentStatus) => {
    setCurrentProperty(id);
    setCurrentStatus(currentStatus);
    setIsPopupOpen(true);
  };

  const confirmSaleToggle = async () => {
    try {
      const newStatus = !currentStatus; // Toggle Saleit status
      await axios.put(`http://localhost:3000/api/flat/update/${currentProperty}`, {
        Saleit: newStatus,
      });

      toast.success(newStatus ? "Flat marked as Sold!" : "Sale revoked!", { position: "top-right" });
      setReloadPage(!reloadPage);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating Saleit:", error);
      toast.warn("Failed to update flat status.", { position: "top-right" });
      setIsPopupOpen(false);
    }
  };

  const cancelSaleToggle = () => {
    setIsPopupOpen(false);
  };

  const handleRaiseComplaint = (booking) => {
    setCurrentProperty(booking.flatId._id);
    setCurrentOwner(booking.ownerId._id);
    setIsComplaintPopupOpen(true);
  };

  const handleComplaintChange = (e) => {
    const { name, value } = e.target;
    setComplaintDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData,currentProperty)
    try {
      const { complaint, complaintType } = complaintDetails;
      await axios.post('http://localhost:3000/api/people/complaints', {
        flatId: currentProperty,
        userId,
        ownerId: currentOwner,
        complaint,
        complaintType
      });

      toast.success("Complaint raised successfully!", { position: "top-right" });
      setIsComplaintPopupOpen(false);
    } catch (error) {
      console.error("Error raising complaint:", error);
      toast.error("Failed to raise complaint.", { position: "top-right" });
    }
  };

  return (
    <Container>
      <Content>
        <CardTitle>{role === 'owner' ? 'All Properties' : 'All Bookings'}</CardTitle>
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price</th>
              {role === 'owner' && <th>Sale it</th>}
              {role === 'user' && <th>Raise Complaint</th>}
            </tr>
          </thead>
          <tbody>
            {role === 'owner' ? (
              userData?.flats?.map((flat) => (
                <tr key={flat._id} onClick={() => navigateToProperty(flat._id)}>
                  <td><SmallImage src={`http://localhost:3000${flat.images[0]}`} alt={flat.name} /></td>
                  <td>{flat.name}</td>
                  <td>{flat.type}</td>
                  <td>{flat.city}, {flat.state}</td>
                  <td>₹{flat.cost}</td>
                  <td>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleSaleToggle(flat._id, flat.Saleit);
                      }}
                      style={{
                        background: flat.Saleit ? "#cc0000" : "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      {flat.Saleit ? "Revoke Sale" : "Sale it"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              userData?.bookings?.map((booking) => (
                booking.isDeleted === false && <tr key={booking._id} onClick={() => navigateToProperty(booking.flatId._id)}>
                  <td><SmallImage src={`http://localhost:3000${booking.flatId.images[0]}`} alt={booking.flatId.name} /></td>
                  <td>{booking.flatId.name}</td>
                  <td>{booking.flatId.type}</td>
                  <td>{booking.flatId.city}, {booking.flatId.state}</td>
                  <td>₹{booking.cost}</td>
                  <td>
                    <ComplaintButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleRaiseComplaint(booking);
                      }}
                    >
                      Raise Complaint
                    </ComplaintButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Content>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Confirm Property Sale"
        message="Are you sure you want to sale/revoke this property?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={confirmSaleToggle}
        onCancel={cancelSaleToggle}
        variant="confirm"
      />

      {isComplaintPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupTitle>Raise Complaint</PopupTitle>
            <PopupForm onSubmit={handleComplaintSubmit}>
              <PopupTextarea
                name="complaint"
                placeholder="Enter your complaint"
                value={complaintDetails.complaint}
                onChange={handleComplaintChange}
                required
              />
              <PopupSelect
                name="complaintType"
                value={complaintDetails.complaintType}
                onChange={handleComplaintChange}
                required
              >
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
                <option value="amenities">Amenities</option>
                <option value="neighbor">Neighbor Issues</option>
                <option value="other">Other</option>
              </PopupSelect>
              <ButtonGroup>
                <PopupButton type="submit">Submit Complaint</PopupButton>
                <CancelButton type="button" onClick={() => setIsComplaintPopupOpen(false)}>Cancel</CancelButton>
              </ButtonGroup>
            </PopupForm>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default AllProperties;