import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Home, Building, Users, BarChart2, MapPin, Calendar, User, PieChart as PieChartIcon } from 'lucide-react';
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// Styled Components
const DashboardContainer = styled.div`
  padding: 1.5rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)'};
  border-radius: 0.75rem;
  padding: 1.25rem;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

const CardIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.1;
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const FilterSelect = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 160px;
`;

const FilterInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100px;
  height: 47px;
`;

const FilterButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-end;
  margin-top: 2rem;
  height: 46px;

  &:hover {
    background-color: #4338ca;
  }
`;

const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6b7280;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  padding: 1rem;
  text-align: center;
  border: 1px solid #fee2e2;
  background-color: #fef2f2;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const ChartCardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChartCard = styled.div`
  flex: 1;
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsDashboard = () => {
  // State for loading and error handling
  const [loading, setLoading] = useState({
    summary: true,
    flatCount: true,
    bookingCount: true,
    topUserCities: true,
    topOwnerCities: true
  });

  const [error, setError] = useState({
    summary: null,
    flatCount: null,
    bookingCount: null,
    topUserCities: null,
    topOwnerCities: null
  });

  // State for BHK counts summary cards
  const [bhkSummary, setBhkSummary] = useState({
    bhkCounts: [],
    hostelCount: 0,
    pgCount: 0
  });

  // State for filterable chart data
  const [stateOptions] = useState(['Maharashtra']);
  const [cityOptions] = useState(['Pune', 'Mumbai', 'Nagpur', 'Aurangabad']);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 15000 });
  const [filteredChartData, setFilteredChartData] = useState({
    bhkCounts: [],
    hostelCount: 0,
    pgCount: 0
  });

  // State for state-city chart
  const [stateCityData, setStateCityData] = useState([]);

  // State for booking count by state-city
  const [bookingData, setBookingData] = useState([]);

  // State for top cities by user count
  const [topCitiesByUser, setTopCitiesByUser] = useState([]);

  // State for top cities by owner count
  const [topCitiesByOwner, setTopCitiesByOwner] = useState([]);

  // Fetch data functions
  const fetchSummaryData = async () => {
    setLoading(prev => ({ ...prev, summary: true }));
    try {
      const response = await fetch('http://localhost:3000/api/admin/flat-count-by-bhk', {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch summary data`);
      }

      const data = await response.json();
      setBhkSummary(data);
      setError(prev => ({ ...prev, summary: null }));
    } catch (err) {
      console.error("Error fetching summary data:", err);
      setError(prev => ({ ...prev, summary: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, summary: false }));
    }
  };

  const fetchStateCityData = async () => {
    setLoading(prev => ({ ...prev, flatCount: true }));
    try {
      const response = await fetch(`http://localhost:3000/api/admin/flat-count-by-state-city?state=${selectedState?.name}`, {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch state-city data`);
      }

      const data = await response.json();
      console.log(data);

      // Transform the data to the expected format if needed
      // This assumes the API returns an array of objects with city and count properties
      const formattedData = Array.isArray(data) ? data :
        // If not an array, check if it has cities property (potential structure)
        (data.cities ? data.cities.map(item => ({
          city: item.city || item._id || item.name,
          count: item.count || item.total || 0
        })) : []);

      setStateCityData(formattedData);
      setError(prev => ({ ...prev, flatCount: null }));
    } catch (err) {
      console.error("Error fetching state-city data:", err);
      setError(prev => ({ ...prev, flatCount: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, flatCount: false }));
    }
  };

  const fetchFilteredData = async () => {
    setLoading(prev => ({ ...prev, filteredData: true }));
    try {
      // Build query params
      let queryParams = `state=${selectedState.name}`;
      if (selectedCity) queryParams += `&city=${selectedCity.name}`;
      queryParams += `&minPrice=${priceRange.min}&maxPrice=${priceRange.max}`;

      const response = await fetch(`http://localhost:3000/api/admin/flat-data-by-state-city-price?${queryParams}`, {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch filtered data`);
      }

      const data = await response.json();
      setFilteredChartData(data);
      setError(prev => ({ ...prev, filteredData: null }));
    } catch (err) {
      console.error("Error fetching filtered data:", err);
      setError(prev => ({ ...prev, filteredData: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, filteredData: false }));
    }
  };

  const fetchBookingData = async () => {
    setLoading(prev => ({ ...prev, bookingCount: true }));
    try {
      // Build query params
      let queryParams = `state=${selectedState.name}`;
      if (selectedCity) queryParams += `&city=${selectedCity.name}`;

      const response = await fetch(`http://localhost:3000/api/admin/booking-count-by-state-city?${queryParams}`, {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch booking data`);
      }

      const data = await response.json();

      // Transform the data to the expected format if needed
      // This example assumes the API returns monthly booking data
      // You may need to adjust this based on your actual API response
      const formattedData = Array.isArray(data) ? data :
        (data.bookings ? data.bookings : []);

      setBookingData(formattedData);
      setError(prev => ({ ...prev, bookingCount: null }));
    } catch (err) {
      console.error("Error fetching booking data:", err);
      setError(prev => ({ ...prev, bookingCount: err.message }));

      // Fallback data for visualization purposes
      setBookingData([
        { month: "Jan", count: 12 },
        { month: "Feb", count: 19 },
        { month: "Mar", count: 15 },
        { month: "Apr", count: 21 },
        { month: "May", count: 25 }
      ]);
    } finally {
      setLoading(prev => ({ ...prev, bookingCount: false }));
    }
  };

  const fetchTopUserCities = async () => {
    setLoading(prev => ({ ...prev, topUserCities: true }));
    try {
      const response = await fetch('http://localhost:3000/api/admin/top-city-by-user-count', {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch top user cities`);
      }

      const data = await response.json();

      // Transform API response to the expected format
      // The API returns: { "topCities": [{"_id": "AURANGABAD", "count": 5}, {"_id": "Pune", "count": 1}] }
      const formattedData = data.topCities ?
        data.topCities.map(item => ({
          city: item._id,
          count: item.count
        })) : [];

      setTopCitiesByUser(formattedData);
      setError(prev => ({ ...prev, topUserCities: null }));
    } catch (err) {
      console.error("Error fetching top user cities:", err);
      setError(prev => ({ ...prev, topUserCities: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, topUserCities: false }));
    }
  };

  const fetchTopOwnerCities = async () => {
    setLoading(prev => ({ ...prev, topOwnerCities: true }));
    try {
      const response = await fetch('http://localhost:3000/api/admin/top-city-by-owner-count', {
        headers: { 'accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch top owner cities`);
      }

      const data = await response.json();

      // Transform API response to the expected format
      // Assuming the API returns similar format as top-city-by-user-count
      const formattedData = data.topCities ?
        data.topCities.map(item => ({
          city: item._id,
          count: item.count
        })) : [];

      setTopCitiesByOwner(formattedData);
      setError(prev => ({ ...prev, topOwnerCities: null }));
    } catch (err) {
      console.error("Error fetching top owner cities:", err);
      setError(prev => ({ ...prev, topOwnerCities: err.message }));
    } finally {
      setLoading(prev => ({ ...prev, topOwnerCities: false }));
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchSummaryData();
    fetchStateCityData();
    fetchFilteredData();
    fetchTopUserCities();
    fetchTopOwnerCities();
    fetchBookingData();
  }, [selectedCity, selectedState]);

  // Handle filter changes
  const handleFilterChange = async () => {
    fetchFilteredData();
    fetchBookingData();
  };

  // Transform BHK data for chart
  const prepareBhkChartData = (data) => {
    const chartData = [...data.bhkCounts];
    chartData.push({ bhk: 'Hostel', count: data.hostelCount });
    chartData.push({ bhk: 'PG', count: data.pgCount });
    return chartData;
  };

  // Prepare pie chart data
  const preparePieData = (data) => {
    return data.map(item => ({
      name: item.city,
      value: item.count
    }));
  };


  const prepareDonutChartData = (data) => {
    if (!data || !Array.isArray(data.bhkCounts)) {
      console.error("Invalid data for donut chart:", data);
      return [];
    }

    return data.bhkCounts.map(item => ({
      bhk: item.bhk,
      count: item.count
    }));
  };



  return (
    <DashboardContainer>
      <DashboardTitle>Property Analytics Dashboard</DashboardTitle>

      {/* Summary Cards */}
      {error.summary && <ErrorMessage>Error loading summary data: {error.summary}</ErrorMessage>}
      {loading.summary ? (
        <LoadingIndicator>Loading summary data...</LoadingIndicator>
      ) : (
        <CardGrid>
          {bhkSummary.bhkCounts.map((item, index) => (
            <SummaryCard
              key={item.bhk}
              gradient={`linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899'][index % 3]} 0%, ${['#4f46e5', '#7c3aed', '#db2777'][index % 3]} 100%)`}
            >
              <CardIconContainer>
                <Home size={64} />
              </CardIconContainer>
              <CardTitle>{item.bhk}</CardTitle>
              <CardValue>{item.count}</CardValue>
              <CardDescription>Total Properties</CardDescription>
            </SummaryCard>
          ))}
          <SummaryCard gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
            <CardIconContainer>
              <Building size={64} />
            </CardIconContainer>
            <CardTitle>Hostel</CardTitle>
            <CardValue>{bhkSummary.hostelCount}</CardValue>
            <CardDescription>Total Properties</CardDescription>
          </SummaryCard>
          <SummaryCard gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)">
            <CardIconContainer>
              <Users size={64} />
            </CardIconContainer>
            <CardTitle>PG</CardTitle>
            <CardValue>{bhkSummary.pgCount}</CardValue>
            <CardDescription>Total Properties</CardDescription>
          </SummaryCard>
        </CardGrid>
      )}

      {/* Filtered Bar Chart */}
      <ChartContainer>
        <ChartTitle>
          <ChartIcon><BarChart2 size={20} /></ChartIcon>
          Property Distribution by Filters
        </ChartTitle>

        <FilterContainer>
          <FilterGroup>
            <FilterLabel>State</FilterLabel>
            {/* <FilterSelect
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {stateOptions.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </FilterSelect> */}

            <StateSelect
              countryid={101}
              containerClassName="form-group"
              inputClassName=""
              onChange={(_state) => setSelectedState(_state)}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={selectedState}
              placeHolder="Select State"
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>City (Optional)</FilterLabel>

            <CitySelect
              countryid={101}
              stateid={selectedState?.id}
              containerClassName="form-group"
              inputClassName=""
              onChange={(_city) => setSelectedCity(_city)}
              onTextChange={(_txt) => console.log(_txt)}
              defaultValue={selectedCity}
              placeHolder="Select City"
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Min Price</FilterLabel>
            <FilterInput
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
              placeholder="Min"
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Max Price</FilterLabel>
            <FilterInput
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
              placeholder="Max"
            />
          </FilterGroup>

          <FilterGroup>
            <FilterButton onClick={handleFilterChange}>
              Apply Filters
            </FilterButton>
          </FilterGroup>
        </FilterContainer>

        <>
          {error.filteredData && <ErrorMessage>Error loading filtered data: {error.filteredData}</ErrorMessage>}
          {loading.filteredData ? (
            <LoadingIndicator>Loading data...</LoadingIndicator>
          ) : (
            <ChartCardContainer>
              {/* Bar Chart Card */}
              <ChartCard>
                <ChartTitle>
                  <ChartIcon><BarChart2 size={20} /></ChartIcon>
                  Property Type Distribution
                </ChartTitle>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareBhkChartData(filteredChartData)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bhk" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              {/* Donut Chart Card */}
              <ChartCard>
                <ChartTitle>
                  <ChartIcon><PieChartIcon size={20} /></ChartIcon>
                  Property Type Breakdown
                </ChartTitle>
                <div style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareBhkChartData(filteredChartData)}
                        dataKey="count"
                        nameKey="bhk"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#4f46e5"
                        label={({ bhk, percent }) => `${bhk}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={true}
                      >
                        {prepareBhkChartData(filteredChartData).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} properties`, props.payload.bhk]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </ChartCardContainer>
          )}
        </>
      </ChartContainer>

      {/* Second Row Charts (State-City & Booking Count) */}
      <ChartRow>
        {/* State-City Bar Chart */}
        <ChartContainer>
          <ChartTitle>
            <ChartIcon><MapPin size={20} /></ChartIcon>
            Property Distribution by City in {selectedState.name}
          </ChartTitle>

          {error.flatCount && <ErrorMessage>Error loading city data: {error.flatCount}</ErrorMessage>}
          {loading.flatCount ? (
            <LoadingIndicator>Loading city data...</LoadingIndicator>
          ) : (
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateCityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartContainer>

        {/* Booking Count Chart */}
        <ChartContainer>
          <ChartTitle>
            <ChartIcon><Calendar size={20} /></ChartIcon>
            Booking Count by Month {selectedCity ? `in ${selectedCity.name}` : ''}
          </ChartTitle>

          {error.bookingCount && <ErrorMessage>Error loading booking data: {error.bookingCount}</ErrorMessage>}
          {loading.bookingCount ? (
            <LoadingIndicator>Loading booking data...</LoadingIndicator>
          ) : (
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartContainer>
      </ChartRow>

      {/* Third Row Charts (Top Cities by User & Owner) */}
      <ChartRow>
        {/* Top Cities by User Count Pie Chart */}
        <ChartContainer>
          <ChartTitle>
            <ChartIcon><User size={20} /></ChartIcon>
            Top Cities by User Count
          </ChartTitle>

          {error.topUserCities && <ErrorMessage>Error loading user city data: {error.topUserCities}</ErrorMessage>}
          {loading.topUserCities ? (
            <LoadingIndicator>Loading user distribution data...</LoadingIndicator>
          ) : (
            topCitiesByUser.length > 0 ? (
              <div style={{ height: "320px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Pie
                      data={preparePieData(topCitiesByUser)}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {preparePieData(topCitiesByUser).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                No user city data available
              </div>
            )
          )}
        </ChartContainer>

        {/* Top Cities by Owner Count Pie Chart */}
        <ChartContainer>
          <ChartTitle>
            <ChartIcon><PieChartIcon size={20} /></ChartIcon>
            Top Cities by Owner Count
          </ChartTitle>

          {error.topOwnerCities && <ErrorMessage>Error loading owner city data: {error.topOwnerCities}</ErrorMessage>}
          {loading.topOwnerCities ? (
            <LoadingIndicator>Loading owner distribution data...</LoadingIndicator>
          ) : (
            topCitiesByOwner.length > 0 ? (
              <div style={{ height: "320px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <Pie
                      data={preparePieData(topCitiesByOwner)}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {preparePieData(topCitiesByOwner).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} owners`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                No owner city data available
              </div>
            )
          )}
        </ChartContainer>
      </ChartRow>
    </DashboardContainer>
  );
};

export default AnalyticsDashboard;