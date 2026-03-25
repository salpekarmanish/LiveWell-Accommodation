import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Autocomplete from "react-google-autocomplete";

const LocationPicker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState([19.076, 72.8777]); // Default: Mumbai
    const [searchInput, setSearchInput] = useState("");
    const mapRef = useRef();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    onLocationSelect({ lat: latitude, lng: longitude });
                },
                (err) => console.error("Geolocation Error:", err),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    const handleLocationSelect = (lat, lng) => {
        onLocationSelect({ lat, lng });
      };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                onLocationSelect({ lat, lng });
            },
        });
        return null;
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Search Bar */}
            <Autocomplete
                apiKey=""
                onPlaceSelected={(place) => {
                    if (!place.geometry) {
                        console.error("Selected place has no geometry data:", place);
                        return;
                    }

                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();

                    // Update the position state
                    setPosition([lat, lng]);

                    // Force the map to center on the new location
                    if (mapRef.current) {
                        mapRef.current.flyTo([lat, lng], 15); // Adjust zoom level as needed
                    }

                    // Send selected location data
                    onLocationSelect({ lat, lng });
                }}

                options={{
                    types: ["geocode"],
                    componentRestrictions: { country: "in" }, // Restrict to India (optional)
                }}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                placeholder="Search for a location..."
            />

            {/* Map */}
            <div style={{ height: "400px", width: "100%" }}>
                <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} 
                ref={mapRef}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} />
                    <MapClickHandler />
                </MapContainer>
            </div>
        </div>
    );
};

export default LocationPicker;
