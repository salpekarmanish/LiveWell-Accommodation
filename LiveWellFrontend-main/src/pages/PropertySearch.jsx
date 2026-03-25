import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHome, FaFilter, FaStar, FaMapMarkerAlt, FaRupeeSign, FaBed, FaUsers, FaSwimmingPool, FaUtensils, FaDumbbell, FaWifi } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import PropertyCardSearch from '../ui/PropertyCardSearch'
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background: ${props => props.variant === 'clear' ? '#f44336' : '#2196f3'};
  color: white;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    opacity: 0.9;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 17rem;
`;

const NoResultsMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
  padding: 50px;
  border-radius: 8px;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const PropertySearch = () => {
    const [filters, setFilters] = useState({
        state: '',
        city: '',
        pincode: '',
        type: '',
        priceRange: '5000-10000',
        ownerSearch: false,
    });

    const [searchResults, setSearchResults] = useState([]);
    const [country, setCountry] = useState(null);
    const [currentState, setCurrentState] = useState(null);
    const [currentCity, setCurrentCity] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [bhkFilter, setBhkFilter] = useState('');
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [sortByPrice, setSortByPrice] = useState('');
    const [sortByRating, setSortByRating] = useState('');
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
    const user = JSON.parse(localStorage.getItem('user')) || null;

    const priceRanges = [
        '5000-10000',
        '10000-15000',
        '15000-20000',
        '20000-25000'
    ];

    useEffect(() => {
        setIsSearchEnabled(currentState && currentCity && filters.type);
    }, [filters]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const { state, city, type, priceRange, ownerSearch } = filters;
        console.log('Searching with filters:', currentState, currentCity, type, priceRange, ownerSearch, userLocation.latitude, userLocation.longitude);
        const query = new URLSearchParams({
            state: state || currentState.name,
            city: city || currentCity.name,
            flatType: type,
            priceRange,
            ownerSearch,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        }).toString();

        try {
            const response = await fetch(`http://localhost:3000/api/flat/search?${query}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error('Failed to fetch search results');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    };

    const handleClear = () => {
        setFilters({
            state: '',
            city: '',
            pincode: '',
            type: '',
            priceRange: '5000-10000'
        });
        setSortBy('');
        setBhkFilter('');
        setSearchResults([]);
    };

    const getFilteredAndSortedResults = () => {
        let results = [...searchResults];

        if (bhkFilter && filters.type === 'Flat') {
            results = results.filter(property => property.bhk === parseInt(bhkFilter));
        }

        if (sortByPrice === 'price-asc') {
            results.sort((a, b) => a.cost - b.cost);
        } else if (sortByPrice === 'price-desc') {
            results.sort((a, b) => b.cost - a.cost);
        }

        if (sortByRating === 'rating-asc') {
            results.sort((a, b) => a.rating - b.rating);
        } else if (sortByRating === 'rating-desc') {
            results.sort((a, b) => b.rating - a.rating);
        }

        return results;
    };

    return (
        <Container>
            <SearchContainer>
                <SearchForm onSubmit={handleSearch}>
                    <StateSelect
                        countryid={101}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(_state) => setCurrentState(_state)}
                        onTextChange={(_txt) => console.log(_txt)}
                        defaultValue={currentState}
                        placeHolder="Select State"
                    />
                    <CitySelect
                        countryid={101}
                        stateid={currentState?.id}
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(_city) => setCurrentCity(_city)}
                        onTextChange={(_txt) => console.log(_txt)}
                        defaultValue={currentCity}
                        placeHolder="Select City"
                    />

                    <Input
                        placeholder="Pincode (optional)"
                        value={filters.pincode}
                        onChange={(e) => setFilters({ ...filters, pincode: e.target.value })}
                    />

                    <Select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Flat">Flat</option>
                        <option value="PG">PG</option>
                        <option value="Hostel">Hostel</option>
                    </Select>

                    {
                        user?.role !== 'user' && (
                            <Select
                                value={filters.ownerSearch}
                                onChange={(e) => setFilters({ ...filters, ownerSearch: e.target.value })}
                                required
                            >
                                {/* <option value=""></option> */}
                                <option value="true">Buy Property</option>
                                <option value="false">Search Property</option>
                            </Select>
                        )
                    }

                    <Select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                        {priceRanges.map(range => (
                            <option key={range} value={range}>₹{range}</option>
                        ))}
                    </Select>

                    <Button type="submit" disabled={!isSearchEnabled}>
                        <FaSearch /> Search
                    </Button>

                    <Button type="button" variant="clear" onClick={handleClear}>
                        <MdClear /> Clear
                    </Button>
                </SearchForm>
            </SearchContainer>

            {searchResults.length > 0 && (
                <FiltersContainer>
                    <Select value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
                        <option value="">Sort by Price</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </Select>

                    <Select value={sortByRating} onChange={(e) => setSortByRating(e.target.value)}>
                        <option value="">Sort by Rating</option>
                        <option value="rating-asc">Rating: Low to High</option>
                        <option value="rating-desc">Rating: High to Low</option>
                    </Select>

                    {filters.type === 'Flat' && (
                        <Select value={bhkFilter} onChange={(e) => setBhkFilter(e.target.value)}>
                            <option value="">Select BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                        </Select>
                    )}
                </FiltersContainer>
            )}


            <ResultsGrid>
                {searchResults.length > 0 ? (
                    getFilteredAndSortedResults().map(property => (
                        <PropertyCardSearch key={property.id} property={property} />
                    ))
                ) : (
                    <NoResultsMessage>No {filters.type} found</NoResultsMessage>
                )}
            </ResultsGrid>
        </Container>
    );
};

export default PropertySearch;