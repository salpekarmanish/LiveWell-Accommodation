import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaHome, FaParking } from 'react-icons/fa';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { FaKitchenSet } from "react-icons/fa6";
import { ImPowerCord } from 'react-icons/im';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FormWrapper = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;

  h2 {
    color: #34495e;
    margin-bottom: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const FeatureInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const FeatureTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const FeatureTag = styled.div`
  background-color: rgb(129, 161, 147);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const MediaSection = styled.div`
  margin-top: 2rem;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  img, video {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: rgba(255, 0, 0, 0.9);
  }
`;

const AvailableFeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const AvailableFeatureTag = styled.div`
  background-color: #ddd;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
        case 'wifi': return <FaWifi size={20} />;
        case 'swimming pool': return <FaSwimmingPool size={20} />;
        case 'restaurant': return <FaUtensils size={20} />;
        case 'gym': return <FaDumbbell size={20} />;
        case 'furnished room': return <FaHome size={20} />;
        case 'kitchen and cooking': return <FaKitchenSet size={20} />;
        case 'parking': return <FaParking size={20} />;
        case 'housekeeping and cleaning': return <MdOutlineCleaningServices size={20} />;
        case 'power backup': return <ImPowerCord size={20} />;
        default: return null;
    }
};

const UpdateFlat = () => {
    const { flatId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [featureInput, setFeatureInput] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        if (location.state) {
            setLatitude(location.state.latitude);
            setLongitude(location.state.longitude);
        }
    }, [location.state]);

    const availableFeatures = [
        'WiFi', 'Swimming Pool', 'Restaurant', 'Gym', 'Furnished Room', 'Kitchen and Cooking', 'Parking', 'Housekeeping and Cleaning', 'Power Backup'
    ];

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        roomTitle: '',
        description: '',
        fits: 0,
        bathrooms: 0,
        bedrooms: 0,
        kitchens: 0,
        livingRooms: 0,
        roomSharingForPg: 0,
        isForGirls: false,
        isRefundable: false,
        isAC: false,
        meals: false,
        bhk: 1,
        cost: 0,
        originalCost: 0,
        totalRooms: 0,
        availableRooms: 0,
        capacity: 0,
        features: [],
        images: [],
        paranomicImages: [],
        videos: [],
        street: '',
        nearby: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isOnSale: false,
        Saleit: false,
        checkInTime: '11:00 Am',
        checkOutTime: '9:00 Pm',
        taxes: 0,
        location: {
            type: 'Point',
            coordinates: [latitude, longitude]
        },
        totalCost: 0,
    });

    const handleGetCoordinates = () => {
        // Save the current form state to localStorage before navigating
        localStorage.setItem('formDataTemp', JSON.stringify(formData));
        navigate('/get-location', { state: { latitude, longitude, origin: 'updateFlat', flatId } });
    };

    useEffect(() => {
        const fetchFlatDetails = async () => {
            console.log('Fetching flat details...');
            try {
                // Check if we have temporary form data in localStorage
                const savedFormData = localStorage.getItem('formDataTemp');

                if (savedFormData) {
                    // If we have saved form data, use it instead of fetching
                    const parsedFormData = JSON.parse(savedFormData);
                    setFormData(parsedFormData);

                    // Get location from localStorage if available
                    const storedLocation = JSON.parse(localStorage.getItem('location')) || { lat: 0, lng: 0 };
                    if (storedLocation) {
                        setLatitude(storedLocation.lat);
                        setLongitude(storedLocation.lng);

                        // Update the coordinates in the form data
                        setFormData(prev => ({
                            ...prev,
                            location: {
                                type: 'Point',
                                coordinates: [storedLocation.lat, storedLocation.lng]
                            }
                        }));
                    }

                    // Clear the temporary form data
                    localStorage.removeItem('formDataTemp');
                    setLoading(false);
                } else {
                    // If no saved form data, fetch from API
                    const response = await fetch(`http://localhost:3000/api/flat/${flatId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch flat details');
                    }
                    const data = await response.json();

                    const storedLocation = JSON.parse(localStorage.getItem('location')) || { lat: 0, lng: 0 };
                    if (storedLocation) {
                        setLatitude(storedLocation.lat);
                        setLongitude(storedLocation.lng);
                    }

                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        location: {
                            type: 'Point',
                            coordinates: [
                                data.location?.coordinates[0] || storedLocation.lat,
                                data.location?.coordinates[1] || storedLocation.lng
                            ]
                        }
                    }));
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching flat details:', error);
                toast.error('Failed to load flat details');
                navigate('/dashboard');
            }
        };

        fetchFlatDetails();
    }, [flatId, navigate]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'latitude' || name === 'longitude') {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    coordinates: name === 'latitude'
                        ? [parseFloat(value), prev.location.coordinates[1]]
                        : [prev.location.coordinates[0], parseFloat(value)]
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const addFeature = (feature) => {
        if (!formData.features.includes(feature)) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, feature]
            }));
        }
    };

    const handleFeatureKeyDown = (e) => {
        if (e.key === 'Enter' && featureInput.trim()) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput.trim()]
            }));
            setFeatureInput('');
        }
    };

    const removeFeature = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleDeleteImage = async (index) => {
        try {
            // Create a copy of the images array without the deleted image
            const updatedImages = [...formData.images];
            updatedImages.splice(index, 1);

            // Update the state
            setFormData(prev => ({
                ...prev,
                images: updatedImages
            }));

            // Update on server
            const response = await fetch(`http://localhost:3000/api/flat/update/${flatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ images: updatedImages }),
            });

            if (!response.ok) {
                throw new Error('Failed to update images');
            }

            toast.success('Image deleted successfully');

        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    const handleDeleteParanomicImage = async (index) => {
        try {
            // Create a copy of the images array without the deleted image
            const updatedImages = [...formData.paranomicImages];
            updatedImages.splice(index, 1);

            // Update the state
            setFormData(prev => ({
                ...prev,
                paranomicImages: updatedImages
            }));

            // Update on server
            const response = await fetch(`http://localhost:3000/api/flat/update/${flatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paranomicImages: updatedImages }),
            });

            if (!response.ok) {
                throw new Error('Failed to update images');
            }

            toast.success('Paranomic Image deleted successfully');

        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    const handleDeleteVideo = async (index) => {
        try {
            // Create a copy of the videos array without the deleted video
            const updatedVideos = [...formData.videos];
            updatedVideos.splice(index, 1);

            // Update the state
            setFormData(prev => ({
                ...prev,
                videos: updatedVideos
            }));

            // Update on server
            const response = await fetch(`http://localhost:3000/api/flat/update/${flatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videos: updatedVideos }),
            });

            if (!response.ok) {
                throw new Error('Failed to update videos');
            }

            toast.success('Video deleted successfully');
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error('Failed to delete video');
        }
    };

    const handleDeleteAllMedia = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/flats/media/${flatId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete media');
            }

            setFormData(prev => ({
                ...prev,
                images: [],
                videos: []
            }));

            toast.success('All media deleted successfully');
        } catch (error) {
            console.error('Error deleting all media:', error);
            toast.error('Failed to delete media');
        }
    };

    const formatText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedFormData = {
            ...formData,
            city: formatText(formData.city),
            state: formatText(formData.state)
        };
        
        try {
            const response = await fetch(`http://localhost:3000/api/flat/update/${flatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Property updated successfully!');
                navigate(`/property-detail/${flatId}`);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to update property');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error updating property');
        }
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit}>
                <Title>Update Property</Title>

                <Section>
                    <h2>Basic Information</h2>
                    <Grid>
                        <FormGroup>
                            <Label>Property Type</Label>
                            <Select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Flat">Flat</option>
                                <option value="Hostel">Hostel</option>
                                <option value="PG">PG</option>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Property Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Room Title</Label>
                            <Input
                                type="text"
                                name="roomTitle"
                                value={formData.roomTitle}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>

                    <FormGroup>
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Section>

                <Section>
                    <h2>Property Details</h2>
                    <Grid>
                        <FormGroup>
                            <Label>Number of Bathrooms</Label>
                            <Input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Number of Bedrooms</Label>
                            <Input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Number of Kitchens</Label>
                            <Input
                                type="number"
                                name="kitchens"
                                value={formData.kitchens}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Number of Living Rooms</Label>
                            <Input
                                type="number"
                                name="livingRooms"
                                value={formData.livingRooms}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>BHK</Label>
                            <Input
                                type="number"
                                name="bhk"
                                value={formData.bhk}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Cost (₹)</Label>
                            <Input
                                type="number"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Original Cost (₹)</Label>
                            <Input
                                type="number"
                                name="originalCost"
                                value={formData.originalCost}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Property Saling Cost (₹)</Label>
                            <Input
                                type="number"
                                name="totalCost"
                                value={formData.totalCost}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Grid>
                </Section>

                <Section>
                    <h2>Capacity and Availability</h2>
                    <Grid>
                        <FormGroup>
                            <Label>Total Rooms</Label>
                            <Input
                                type="number"
                                name="totalRooms"
                                value={formData.totalRooms}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Available Rooms</Label>
                            <Input
                                type="number"
                                name="availableRooms"
                                value={formData.availableRooms}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Room Sharing (for PG)</Label>
                            <Input
                                type="number"
                                name="roomSharingForPg"
                                value={formData.roomSharingForPg}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Capacity</Label>
                            <Input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Taxes (₹)</Label>
                            <Input
                                type="number"
                                name="taxes"
                                value={formData.taxes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Grid>
                </Section>

                <Section>
                    <h2>Check-in/Check-out Times</h2>
                    <Grid>
                        <FormGroup>
                            <Label>Check-in Time</Label>
                            <Input
                                type="text"
                                name="checkInTime"
                                value={formData.checkInTime}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Check-out Time</Label>
                            <Input
                                type="text"
                                name="checkOutTime"
                                value={formData.checkOutTime}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Grid>
                </Section>

                <Section>
                    <h2>Features</h2>
                    <FormGroup>
                        <Label>Add Features (Press Enter to add)</Label>
                        <FeatureInput
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyDown={handleFeatureKeyDown}
                            placeholder="Type a feature and press Enter..."
                        />
                        <FeatureTagsContainer>
                            {formData.features.map((feature, index) => (
                                <FeatureTag key={index}>
                                    {feature}
                                    <button type="button" onClick={() => removeFeature(index)}>×</button>
                                </FeatureTag>
                            ))}
                        </FeatureTagsContainer>
                    </FormGroup>
                    <AvailableFeaturesContainer>
                        {availableFeatures.map((feature, index) => (
                            <AvailableFeatureTag key={index} onClick={() => addFeature(feature)}>
                                {getFeatureIcon(feature)}
                                {feature}
                            </AvailableFeatureTag>
                        ))}
                    </AvailableFeaturesContainer>
                </Section>

                <Section>
                    <h2>Amenities</h2>
                    <Grid>
                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="isAC"
                                    checked={formData.isAC}
                                    onChange={handleChange}
                                />
                                Air Conditioning
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="isForGirls"
                                    checked={formData.isForGirls}
                                    onChange={handleChange}
                                />
                                For Girls
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="meals"
                                    checked={formData.meals}
                                    onChange={handleChange}
                                />
                                Meals Included
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="isRefundable"
                                    checked={formData.isRefundable}
                                    onChange={handleChange}
                                />
                                Refundable
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="isOnSale"
                                    checked={formData.isOnSale}
                                    onChange={handleChange}
                                />
                                On Sale
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <Checkbox
                                    type="checkbox"
                                    name="Saleit"
                                    checked={formData.Saleit}
                                    onChange={handleChange}
                                />
                                Sale It
                            </Label>
                        </FormGroup>
                    </Grid>
                </Section>

                <Section>
                    <h2>Location</h2>
                    <Grid>
                        <FormGroup>
                            <Label>Street</Label>
                            <Input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Near By(also add distance)</Label>
                            <Input
                                type="text"
                                name="nearby"
                                value={formData.nearby}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>City</Label>
                            <Input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>State</Label>
                            <Input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Zip Code</Label>
                            <Input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Country</Label>
                            <Input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Latitude</Label>
                            <Input
                                type="text"
                                name="latitude"
                                placeholder='Enter Latitude'
                                value={formData.location.coordinates[0]}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Longitude</Label>
                            <Input
                                type="text"
                                name="longitude"
                                placeholder='Enter Longitude'
                                value={formData.location.coordinates[1]}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type="button" onClick={handleGetCoordinates}>Get Coordinates</Button>
                    </Grid>
                </Section>

                <Section>
                    <h2>Media</h2>
                    {/* <Button 
                        type="button" 
                        style={{ 
                            marginBottom: '1rem', 
                            backgroundColor: '#e74c3c',
                            maxWidth: '200px'
                        }} 
                        onClick={handleDeleteAllMedia}
                    >
                        Delete All Media
                    </Button> */}

                    <MediaSection>
                        <h3>Images</h3>
                        <MediaGrid>
                            {formData.images.map((image, index) => (
                                <MediaItem key={index}>
                                    <img
                                        src={`http://localhost:3000${image}`}
                                        alt={`Property ${index + 1}`}
                                    />
                                    <DeleteButton onClick={() => handleDeleteImage(index)}>×</DeleteButton>
                                </MediaItem>
                            ))}
                        </MediaGrid>
                    </MediaSection>

                    <MediaSection>
                        <h3>Paranomic Images</h3>
                        <MediaGrid>
                            {formData.paranomicImages.map((image, index) => (
                                <MediaItem key={index}>
                                    <img
                                        src={`http://localhost:3000${image}`}
                                        alt={`Property ${index + 1}`}
                                    />
                                    <DeleteButton onClick={() => handleDeleteParanomicImage(index)}>×</DeleteButton>
                                </MediaItem>
                            ))}
                        </MediaGrid>
                    </MediaSection>

                    {formData.videos.length > 0 && (
                        <MediaSection>
                            <h3>Videos</h3>
                            <MediaGrid>
                                {formData.videos.map((video, index) => (
                                    <MediaItem key={index}>
                                        <video controls>
                                            <source src={`http://localhost:3000${video}`} />
                                            Your browser does not support the video tag.
                                        </video>
                                        <DeleteButton onClick={() => handleDeleteVideo(index)}>×</DeleteButton>
                                    </MediaItem>
                                ))}
                            </MediaGrid>
                        </MediaSection>
                    )}

                    <Button
                        type="button"
                        style={{
                            marginTop: '1rem',
                            backgroundColor: '#2ecc71',
                            maxWidth: '200px'
                        }}
                        onClick={() => navigate(`/upload/flat/${flatId}`)}
                    >
                        Add New Media
                    </Button>
                </Section>

                <Button type="submit">Update Property</Button>
            </FormWrapper>
        </Container>
    );
};

export default UpdateFlat;