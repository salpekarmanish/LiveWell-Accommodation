import styled from 'styled-components';
import { Star } from 'lucide-react';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const TitleSection = styled.div`
  flex: 1;
`;

export const PropertyName = styled.h1`
  font-size: 28px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

export const StarIcon = styled(Star)`
  width: 18px;
  height: 18px;
  fill: ${props => props.$filled ? '#FFD700' : '#E0E0E0'};
  stroke: #FFD700;
`;

export const Location = styled.div`
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

export const RatingSection = styled.div`
  text-align: right;
`;

export const RatingBox = styled.div`
  background: #0066cc;
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

export const RatingScore = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const RatingText = styled.div`
  font-size: 14px;
`;

export const MainContent = styled.div``;

export const Contact = styled.div`
  font-size: 16px;
  margin-top: 24px;
`;

export const RoomCard = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const RoomTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 16px 0;
`;

export const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const BookButton = styled.button`
  background: ${({ disabled }) => (disabled ? "#ccc" : "#0066cc")};
  color: ${({ disabled }) => (disabled ? "#666" : "white")};
  border: none;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;
  position: relative;
  margin-top: 16px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#0052a3")};
  }

  /* Tooltip for disabled button */
  &:disabled::after {
    content: "Please verify your details in the profile.";
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    color: white;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out;
  }

  &:disabled:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

export const ReviewSection = styled.div`
  margin-top: 48px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ReviewCard = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const ReviewUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserInfo = styled.div``;

export const UserName = styled.div`
  font-weight: 500;
`;

export const ReviewDate = styled.div`
  color: #666;
  font-size: 12px;
`;

export const MainImage = styled.div`
  grid-row: ${props => props.$imageCount >= 3 ? 'span 2' : 'span 1'};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  min-height: 200px;
`;

export const SmallImage = styled.div`
  background-size: cover;
  background-position: center;
  cursor: pointer;
  min-height: 200px;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start; // This ensures the price section doesn't stretch
`;

export const WriteReviewButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0052a3;
  }
`;

export const PropertyTypeTag = styled.span`
  background: #e3f2fd;
  color: #0066cc;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
`;

export const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const InfoItem = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const PriceSection = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 24px;
  ${'' /* position: sticky; */}
  top: 24px;
`;

export const PriceDisplay = styled.div`
  margin-bottom: 16px;
`;

export const PriceHeader = styled.div`
  display: flex;
  ${'' /* justify-content: space-between; */}
  align-items: center;
  margin-bottom: 12px;
  gap:2rem;
`;

export const PriceInfo = styled.div`
  text-align: right;
`;

export const TotalCostTag = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-top: 1rem;
  background-color: rgba(103, 192, 81, 0.88);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const OriginalPrice = styled.div`
  color: #666;
  text-decoration: line-through;
  font-size: 14px;
`;

export const CurrentPrice = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

export const TaxInfo = styled.div`
  color: #666;
  font-size: 12px;
`;

export const PriceTag = styled.div`
  background: #e3f2fd;
  color: #0066cc;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const AmenityList = styled.div`
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
`;

export const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: ${props => props.$isAvailable ? '#333' : '#666'};

  svg {
    color: ${props => props.$isAvailable ? '#4CAF50' : '#666'};
  }
`;

export const ImportantInfo = styled.div`
  margin: 16px 0;
  font-size: 14px;
  color: #666;

  h4 {
    color: #333;
    margin: 0 0 8px 0;
    font-size: 16px;
  }
`;

export const SaleTag = styled.div`
  background: #fef0f0;
  color: #e53935;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  margin-bottom: 16px;
  display: inline-block;
`;

export const ConfirmationOverlay = styled.div`
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

export const ConfirmationContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

export const ConfirmationTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

export const ConfirmationButton = styled.button`
  background-color: ${props => (props.cancel ? '#e74c3c' : '#3498db')};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => (props.cancel ? '#c0392b' : '#2980b9')};
  }
`;

export const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const RemainingCount = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 8px;
`;

export const MediaBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ViewAllPhotos = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const Gallery = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${props => props.$imageCount >= 3 ? '2fr 1fr 1fr' : props.$imageCount === 2 ? '1fr 1fr' : '1fr'};
  grid-template-rows: ${props => props.$imageCount >= 3 ? '200px 200px' : '400px'};
  gap: 8px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

export const MediaContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const ShowMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ShowLessButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #c82333;
  }
`;