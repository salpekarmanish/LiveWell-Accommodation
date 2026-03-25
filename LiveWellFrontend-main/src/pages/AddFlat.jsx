import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
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
  background-color:rgb(129, 161, 147);
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

const AddFlat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ownerId = JSON.parse(localStorage.getItem('user'))._id;
    const ownerMobile = JSON.parse(localStorage.getItem('user')).phone;

    const savedFormData = localStorage.getItem('addFlatFormData');

    const initialFormData = {
        ownerId,
        ownerMobile,
        type: 'Flat',
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
        nearby: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isOnSale: false,
        Saleit: false,
        checkInTime: '11:00 Am',
        checkOutTime: '9:00 Pm',
        taxes: 200,
        location: {
            type: 'Point',
            coordinates: [location.state?.latitude || 0, location.state?.longitude || 0]
        },
        totalCost: 0,
    };

    const [latitude, setLatitude] = useState(location.state?.latitude || (savedFormData ? JSON.parse(savedFormData).location.coordinates[0] : 0));
    const [longitude, setLongitude] = useState(location.state?.longitude || (savedFormData ? JSON.parse(savedFormData).location.coordinates[1] : 0));
    
    // Initialize form data from local storage or with default values
    const [formData, setFormData] = useState(savedFormData ? JSON.parse(savedFormData) : initialFormData);

    useEffect(() => {
        // Update coordinates when returning from location picker
        if (location.state?.latitude && location.state?.longitude) {
            setLatitude(location.state.latitude);
            setLongitude(location.state.longitude);
            
            // Update form data with new coordinates
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    coordinates: [location.state.latitude, location.state.longitude]
                }
            }));
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem('addFlatFormData', JSON.stringify(formData));
    }, [formData]);

    const [featureInput, setFeatureInput] = useState('');

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

    const availableFeatures = [
        'WiFi', 'Swimming Pool', 'Restaurant', 'Gym', 'Furnished Room', 'Kitchen and Cooking', 'Parking', 'Housekeeping and Cleaning', 'Power Backup'
    ];

    const handleGetCoordinates = () => {
        // Save current form state before navigating
        localStorage.setItem('addFlatFormData', JSON.stringify(formData));
        navigate('/get-location', { state: { latitude, longitude, origin: 'addFlat' } });
    };

    const addFeature = (feature) => {
        if (!formData.features.includes(feature)) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, feature]
            }));
        }
    };

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
            const response = await fetch('http://localhost:3000/api/flat/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Property added successfully!');
                navigate(`/upload/flat/${data.flat._id}`);
            } else {
                toast.error('Failed to add property');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error adding property');
        }
    };


    useEffect(() => {
        // Cleanup function to remove data when component unmounts
        return () => {
            // Only remove if navigating away from the add flow completely
            // Check if the navigation is not to get-location
            if (!window.location.pathname.includes('/get-location')) {
                localStorage.removeItem('addFlatFormData');
            }
        };
    }, []);


    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit}>
                <Title>Add New Property</Title>

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
                            <Label>Room Sharing</Label>
                            <Input
                                type="number"
                                name="roomSharingForPg"
                                value={formData.roomSharingForPg}
                                onChange={handleChange}
                                required
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

                <Button type="submit">Add Property</Button>
            </FormWrapper>
        </Container>
    );
};

export default AddFlat;