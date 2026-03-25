import React, { useState, useEffect } from 'react';
import { Camera, Building, Home, Upload, CheckCircle, XCircle, Clock, MapPin, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Spinner = styled.div`
  animation: spin 1s linear infinite;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(to right, #3498db, #8e44ad);
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  bottom: -50px;
  left: 2rem;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
`;

const PropertyDocUploadLabel = styled.label`
  background-color: #8e44ad;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-top: 1rem;

  &:hover {
    background-color: #732d91;
  }

  input {
    display: none;
  }

  svg {
    color: white;
  }
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #8e44ad;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &:hover {
    background-color: #732d91;
  }

  input {
    display: none;
  }

  svg {
    color: white;
  }
`;

const ProfileDetails = styled.div`
  padding: 6rem 2rem 2rem;
`;

const ProfileName = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const ProfileEmail = styled.p`
  color: #666;
  font-size: 1.25rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #666;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  background-color: ${props => props.verified ? '#d4edda' : '#f8d7da'};
  color: ${props => props.verified ? '#155724' : '#721c24'};
  margin-right: 1rem;
  cursor: ${props => props.verified ? 'default' : 'pointer'};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BasicInfoCard = styled(Card)`
  padding: 3rem;
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const InfoGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: #666;
`;

const InfoText = styled.p`
  font-size: 1.25rem;
  color: #333;
`;

const StatsCard = styled(Card)`
  padding: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const StatItem = styled.div`
  background-color: ${props => props.bgColor};
  padding: 1.5rem;
  border-radius: 8px;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #666;
`;

const StatValue = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  color: ${props => props.color};
`;

const PropertiesList = styled(Card)`
  padding: 3rem;
`;

const PropertyCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const PropertyName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;

const PropertyInfo = styled.p`
  color: #666;
  font-size: 1.25rem;
`;

const PropertyDetails = styled.div`
  margin-top: 0.75rem;
`;

const PropertyDetail = styled.p`
  font-size: 1rem;
  color: #666;
`;

const PropertyPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
`;

const PropertyAvailability = styled.span`
  font-size: 1rem;
  color: #666;
`;

const EditableField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1.25rem;
  color: #333;
  margin-top: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const SaveButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`;

const PropertyRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyRowImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 1.5rem;
`;

const PropertyRowInfo = styled.div`
  flex: 1;
`;

const PropertyRowPrice = styled.div`
  font-weight: bold;
  color: #3498db;
  font-size: 1.5rem;
`;

const PropertyDocContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const BasicInfoContainer = styled.div`
  ${'' /* margin-bottom: 1.5rem; */}

  &:first-child {
    margin-bottom: 1.5rem;
  }
`;

const PropertyDocImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  ${'' /* margin-bottom: 1rem; */}
`;

const ShowMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'user';
  const userId = user?._id;
  const [emailOtpSent, setEmailOtpSent] = useState(false);


  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData?.data) {
      setEditedData({
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
        email: userData.data.email,
        phone: userData.data.phone,
        address: userData.data.address || '',
        city: userData.data.city || '',
        state: userData.data.state || '',
        country: userData.data.country || '',
      });
    }
  }, [userData]);

  const sendEmailOtp = async () => {
    setEmailOtpSent(true);
    try {
      await axios.post('http://localhost:3000/api/users/email/sendOtp', {
        role: role,
        id: userId
      });
      toast.success('OTP sent to your email');
      navigate("/verify-otp?method=email");
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const sendMobileOtp = async () => {
    try {
      // verifyMobileOtp(userData?.data?.phone);
      navigate("/verify-otp?method=mobile");
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };


  const handleShowMore = () => {
    const path = role === 'owner' ? 'properties' : 'bookings';
    navigate(`/all-${path}`);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}/${role}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch profile data');
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const endpoint = role === 'user'
        ? `http://localhost:3000/api/users/${userId}`
        : `http://localhost:3000/api/owners/${userId}`;

      await axios.put(endpoint, editedData);
      toast.success('Profile updated successfully');
      setHasChanges(false);
      fetchUserData();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const navigateToProperty = (propertyId) => {
    navigate(`/property-detail/${propertyId}`);
  };

  const handleImageUpload = async (event, type = 'photo') => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append(type, file);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/upload/media/${role}/${userId}/${type}`,
        formData
      );

      toast.success('Image uploaded successfully');
      fetchUserData(); // Refresh data to show new image
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  if (loading) return (
    <CenteredContainer>
      <Spinner />
    </CenteredContainer>
  );

  return (
    <Container>
      <Content>
        {/* Profile Header */}
        <Card>
          <Header>
            <ProfileImageContainer>
              <ProfileImage
                src={userData?.data?.photo ? `http://localhost:3000${userData.data.photo}` : '/assets/profileImg.jpeg'}
                alt="Profile"
              />
              <UploadLabel>
                <Camera size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'photo')}
                />
              </UploadLabel>
            </ProfileImageContainer>
          </Header>
          <ProfileDetails>
            <div className="flex gap-4">
              <InfoGroup>
                <InfoLabel>First Name</InfoLabel>
                <EditableField
                  value={editedData.firstName || ''}
                  disabled
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>Last Name</InfoLabel>
                <EditableField
                  value={editedData.lastName || ''}
                  disabled
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </InfoGroup>
            </div>
            <InfoGroup>
              <InfoLabel>Email</InfoLabel>
              <EditableField
                value={editedData.email || ''}
                disabled
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </InfoGroup>
            <ProfileInfo>
              <InfoItem>
                <Building size={16} className="mr-1" />
                {userData?.data?.role?.toUpperCase()}
              </InfoItem>
            </ProfileInfo>
            <StatusContainer>
              <StatusBadge
                verified={userData?.data?.emailVerified}
                onClick={() => {
                  if (!userData?.data?.emailVerified) sendEmailOtp();
                }}
                disabled={emailOtpSent}
              >
                {userData?.data?.emailVerified ? 'Email Verified' : 'Email Unverified'}
              </StatusBadge>
              <StatusBadge
                verified={userData?.data?.numberVerified}
                // onClick={() => {
                //   if (!userData?.data?.numberVerified) sendMobileOtp();
                // }}
              >
                {userData?.data?.numberVerified ? 'Phone Verified' : 'Phone Unverified'}
              </StatusBadge>
            </StatusContainer>
          </ProfileDetails>
        </Card>

        {/* Content Grid */}
        <Grid>
          {/* Basic Info Card */}
          <BasicInfoContainer>
            <BasicInfoCard>
              <CardTitle>Basic Information</CardTitle>
              <InfoGroup>
                <InfoLabel>Phone</InfoLabel>
                <EditableField
                  disabled
                  value={editedData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>Address</InfoLabel>
                <EditableField
                  value={editedData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>City</InfoLabel>
                <EditableField
                  value={editedData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>State</InfoLabel>
                <EditableField
                  value={editedData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </InfoGroup>
              <InfoGroup>
                <InfoLabel>Country</InfoLabel>
                <EditableField
                  value={editedData.country || ''}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                />
              </InfoGroup>
              {hasChanges && (
                <SaveButton onClick={handleSave}>
                  <Save size={20} />
                  Save Changes
                </SaveButton>
              )}
            </BasicInfoCard>

            {role === 'owner' && (
              <BasicInfoCard>
                <CardTitle>Property Document</CardTitle>
                <PropertyDocContainer>
                  <PropertyDocImage
                    src={`http://localhost:3000${userData?.data?.propertyDoc}` || '/assets/reviewer-1.jpg'}
                    alt="Property Document"
                  />
                  <InfoGroup>
                    <InfoLabel>Property Document</InfoLabel>
                    <PropertyDocUploadLabel>
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        onChange={(e) => handleImageUpload(e, 'propertyDoc')}
                      />
                    </PropertyDocUploadLabel>
                  </InfoGroup>
                </PropertyDocContainer>
              </BasicInfoCard>
            )}
          </BasicInfoContainer>

          {/* Properties/Bookings List */}
          <PropertiesList>
            <CardTitle>{role === 'owner' ? 'Your Properties' : 'Your Bookings'}</CardTitle>
            {role === 'owner' ? (
              userData?.flats?.slice(0, 3).map((flat) => (
                <PropertyRow key={flat._id} onClick={() => navigateToProperty(flat._id)}>
                  <PropertyRowImage
                    src={`http://localhost:3000${flat.images[0]}`}
                    alt={flat.name}
                  />
                  <PropertyRowInfo>
                    <PropertyName>{flat.name}</PropertyName>
                    <PropertyInfo>{flat.type} • {flat.roomTitle}</PropertyInfo>
                    <PropertyDetail>
                      <MapPin size={16} className="inline mr-2" />
                      {flat.city}, {flat.state}
                    </PropertyDetail>
                  </PropertyRowInfo>
                  <PropertyRowPrice>₹{flat.cost}</PropertyRowPrice>
                </PropertyRow>
              ))
            ) : (
              userData?.bookings?.slice(0, 3).map((booking) => (
                booking.isDeleted === false && <PropertyRow key={booking._id} onClick={() => navigateToProperty(booking.flatId._id)}>
                  <PropertyRowImage
                    src={`http://localhost:3000${booking.flatId.images[0]}`}
                    alt={booking.flatId.name}
                  />
                  <PropertyRowInfo>
                    <PropertyName>{booking.flatId.name}</PropertyName>
                    <PropertyInfo>{booking.flatId.type} • {booking.flatId.roomTitle}</PropertyInfo>
                    <PropertyDetail>
                      <Clock size={16} className="inline mr-2" />
                      Booked: {new Date(booking.createdAt).toLocaleDateString()}
                    </PropertyDetail>
                  </PropertyRowInfo>
                  <PropertyRowPrice>₹{booking.cost}</PropertyRowPrice>
                </PropertyRow>
              ))
            )}
            {role === 'owner' && userData?.flats?.length === 0 && <p>No Flats Found ):</p>}
            {role !== 'owner' && userData?.bookings?.length === 0 && <p>No Bookings Found ):</p>}
            {userData?.flats && userData?.flats?.length != 0 && <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>}
            {userData?.bookings && userData?.bookings?.length != 0 && <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>}
          </PropertiesList>
        </Grid>
      </Content>


    </Container>
  );
};

export default Profile;