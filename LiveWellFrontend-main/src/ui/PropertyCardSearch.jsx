import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaHome, FaFilter, FaStar, FaMapMarkerAlt, FaRupeeSign, FaBed, FaUsers, FaSwimmingPool, FaUtensils, FaDumbbell, FaWifi } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropertyGalleryModal from './PropertyGalleryModal';

const PropertyCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-bottom: 16px;
  padding: 12px;
  gap: 16px;
`;

const ImageSection = styled.div`
  width: 280px;
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 35px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid white;
  cursor: pointer;
`;

const ViewAllThumb = styled.div`
  width: 50px;
  height: 35px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const PropertyTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
`;

const RatingSection = styled.div`
  text-align: right;
`;

const RatingBadge = styled.div`
  background: ${props => props.rating >= 4.0 ? '#388e3c' : '#1976d2'};
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const RatingText = styled.div`
  color: #666;
  font-size: 12px;
  line-height: 1.4;
`;

const LocationText = styled.div`
  color: #0066cc;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
  cursor: pointer; /* Add cursor pointer */
  &:hover {
    text-decoration: underline; /* Add underline on hover */
  }
`;

const TagsContainer = styled.div`
  margin: 8px 0;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
  margin-right: 8px;
`;

const AmenitiesSection = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
  color: #666;
  font-size: 13px;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  svg {
    font-size: 16px;
  }
`;

const PropertyDescription = styled.div`
  color: #666;
  font-size: 13px;
  margin: 8px 0;
  line-height: 1.4;
`;

const PriceSection = styled.div`
  margin-left: auto;
  text-align: right;
  min-width: 180px;
`;

const OriginalPrice = styled.div`
  color: #666;
  text-decoration: line-through;
  font-size: 13px;
`;

const CurrentPrice = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 4px 0;
`;

const TaxInfo = styled.div`
  color: #666;
  font-size: 12px;
  margin-bottom: 12px;
`;

const BookButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: #1565c0;
  }
`;

const Separator = styled.div`
  width: 1px;
  background-color: #e0e0e0;
  margin: 0 16px;
  align-self: stretch;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 12px;
`;

const RatingTextHighlight = styled.span`
  color: #1976d2;
  font-weight: 500;
`;

const PropertyCardSearch = ({ property }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/property-detail/${property._id}`, { state: { property } });
  };

  const openMap = (property) => {
    const address = `${property?.street}, ${property?.city}, ${property?.state}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <>
      <PropertyCard>
        <ImageSection>
          <MainImage
            src={`http://localhost:3000${property.images[0]}`}
            alt={property.name}
            onClick={() => setIsGalleryOpen(true)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />
          <ThumbnailContainer>
            {property.images.slice(1, 3).map((img, index) => (
              <Thumbnail
                key={index}
                src={`http://localhost:3000${img}`}
                alt={`${property.name} ${index + 2}`}
                onClick={() => setIsGalleryOpen(true)}
                className="hover:opacity-90 transition-opacity"
              />
            ))}
            <ViewAllThumb
              onClick={() => setIsGalleryOpen(true)}
              className="hover:bg-black/70 transition-colors"
            >
              View All
            </ViewAllThumb>
          </ThumbnailContainer>
        </ImageSection>

        <ContentSection>
          <HeaderSection>
            <div>
              <PropertyTitle>{property.name}</PropertyTitle>
              <LocationText onClick={() => openMap(property)}>
                <FaMapMarkerAlt size={12} />
                {property?.street}, {property?.city}, {property?.state}
              </LocationText>
            </div>
          </HeaderSection>

          <TagsContainer>
            <Tag>{property.type}</Tag>
            {property.type === 'Flat' && <Tag>{property.bhk} BHK</Tag>}
            <Tag>{property.availableRooms} Rooms Available</Tag>
          </TagsContainer>

          <AmenitiesSection>
            {property.features.slice(0, 4).map((feature, index) => (
              <AmenityItem key={index}>
                {feature === 'gym' && <FaDumbbell />}
                {feature === 'pool' && <FaSwimmingPool />}
                {feature === 'restaurant' && <FaUtensils />}
                {feature === 'wifi' && <FaWifi />}
                {feature}
              </AmenityItem>
            ))}
          </AmenitiesSection>
        </ContentSection>

        <Separator />

        <div>
          <RatingContainer>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <RatingTextHighlight>{property.ratingText || 'Good'}</RatingTextHighlight>
              <RatingBadge rating={Math.round(property.rating)}>
                {Math.round(property.rating)}
                <FaStar size={12} />
              </RatingBadge>
            </div>
            <RatingText>
              <br />
              ({property.totalRatings || 500} Ratings)
            </RatingText>
          </RatingContainer>

          <PriceSection>
            <OriginalPrice>₹ {property.originalCost || 20000}</OriginalPrice>
            <CurrentPrice>₹ {property.cost}</CurrentPrice>
            <TaxInfo>+ ₹ {property.taxes || 500} taxes & fees</TaxInfo>
            <BookButton onClick={handleBookNow}>Book Now</BookButton>
          </PriceSection>
        </div>
      </PropertyCard>

      <PropertyGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.images}
        videoUrl={property.videoUrl}
      />
    </>
  );
};

export default PropertyCardSearch;