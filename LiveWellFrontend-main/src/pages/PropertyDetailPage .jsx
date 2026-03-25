import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Star, MapPin, Clock, Check, Camera, PlayCircle } from 'lucide-react';
import { FaPhone, FaStar, FaMapMarkerAlt, FaClock, FaParking, FaCheck, FaTimes, FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaTrash, FaHome } from 'react-icons/fa';
import { MdOutlineEdit, MdOutlineCleaningServices } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { ImPowerCord } from "react-icons/im";
import PropertyGalleryModal from '../ui/PropertyGalleryModal';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PageContainer, Header, TitleSection, PropertyName, Stars, StarIcon,
  Location, RatingSection, RatingBox, RatingScore, RatingText, MainContent,
  RoomCard, RoomTitle, RoomDetails, DetailItem, BookButton, ReviewSection,
  ReviewHeader, ReviewCard, ReviewUser, UserAvatar, AvatarImage, UserInfo,
  UserName, ReviewDate, MainImage, SmallImage, ContentGrid,
  WriteReviewButton, PropertyTypeTag, FeaturesGrid, FeatureItem,
  RoomInfo, InfoItem, PriceSection, PriceDisplay, PriceHeader,
  PriceInfo, OriginalPrice, CurrentPrice, TaxInfo, PriceTag,
  AmenityList, AmenityItem, ImportantInfo, SaleTag, ConfirmationOverlay,
  ConfirmationContainer, ConfirmationTitle, ConfirmationButtons,
  ConfirmationButton, GalleryOverlay, RemainingCount, MediaBadge,
  ViewAllPhotos, Gallery, MediaContainer, StyledImage, ShowMoreButton, ShowLessButton, Contact, TotalCostTag
} from './PropertyDetailPageStyles';
import ChatContainer from '../components/Chat/ChatContainer';
import InitiateChatButton from '../components/Chat/InitiateChatButton';

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
    default: return <FaCheck size={20} />;
  }
};

const ChatModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 40px;
`;

const ChatWrapper = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1;
  ${'' /* margin:10px; */}

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: #666;
  }
`;

const PropertyDetailPage = () => {
  const { flatId } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [hasBooking, setHasBooking] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  const navigate = useNavigate();


  const showRoomDetails = property?.type === 'Flat';
  const showRoomSharing = ['Hostel', 'PG'].includes(property?.type);
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const user = JSON.parse(localStorage.getItem('user'));
  const role = JSON.parse(localStorage.getItem('user')).role;
  const email = JSON.parse(localStorage.getItem('user')).email;
  const isEmailVerified = JSON.parse(localStorage.getItem('user')).emailVerified;
  const isPhone = JSON.parse(localStorage.getItem('user')).numberVerified;
  const gender = JSON.parse(localStorage.getItem('user')).gender;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Check if the current user is the owner
    if (user && property) {
      setIsOwner(user._id === property.ownerId);
    }
  }, [user, property]);

  const handleChatStart = (conversation) => {
    // setSelectedConversation(conversation);
    setIsChatOpen(true);
  };


  // ownerID,ownerPhone, flatId,currentOwner

  const allowBooking = (!property?.isForGirls) || (property?.isForGirls && gender === 'female');
  // console.log(isEmailVerified, isPhone, allowBooking);
  const handleDeleteFlat = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/flat/delete/${flatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Flat deleted successfully!');
        navigate(`/profile/${userId}`); // Redirect to home page or another appropriate page
      } else {
        toast.error('Failed to delete flat');
      }
    } catch (error) {
      console.error('Error deleting flat:', error);
      toast.error('Error deleting flat');
    }
  };

  const openMap = (property) => {
    const { latitude, longitude } = property?.location?.coordinates || {};

    let mapUrl;

    if (latitude && longitude) {
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    } else {
      const address = `${property?.street}, ${property?.city}, ${property?.state}`;
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }

    window.open(mapUrl, '_blank');
  };

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const handleShowLessReviews = () => {
    setVisibleReviews(5);
  };

  const confirmDeleteFlat = () => {
    console.log("clicking confirm")
    setIsConfirmationOpen(true);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/people/feedback/flat/${flatId}`);
      const data = await response.json();
      const reviewsWithFullPhotoUrl = data.map(review => ({
        ...review,
        photoUrl: `http://localhost:3000${review.photoUrl}`
      }));
      setReviews(reviewsWithFullPhotoUrl);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      console.log(flatId);
      const response = await fetch(`http://localhost:3000/api/flat/${flatId}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const fetchBookingStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/userBook/hasBooking/${userId}/${flatId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setHasBooking(data.hasBooking);
      setBookingId(data.bookingId);
    } catch (error) {
      console.error('Error fetching booking status:', error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
    fetchReviews();
    fetchBookingStatus();
  }, [flatId]);

  const addUserBooking = async (bookingData) => {
    try {
      const response = await fetch('http://localhost:3000/api/userBook/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to add booking');
      }

      const data = await response.json();
      toast.success('Booking added successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding booking:', error);
      toast.error('Failed to add booking');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      // const userId = JSON.parse(localStorage.getItem('user'))._id;
      const photoUrl = JSON.parse(localStorage.getItem('user')).photo;

      const response = await axios.post('http://localhost:3000/api/people/feedback', {
        flatId: property._id,
        ownerId: property.ownerId,
        userId,
        photoUrl,
        ...reviewData
      });
      console.log('Review submitted:', response.data);
      // Optionally, refresh the reviews list
      fetchPropertyDetails();
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const initPay = (data, flag=false) => {
    // const email = localStorage.getItem('email') || 'ritesh.prajapati20@vit.edu';
    // console.log(data.amount*100);
    const options = {
      key: "rzp_test_zfG2bjGJ5XlCJ2",
      amount: data.amount,
      currency: data.currency,
      name: property.name,
      description: "Test",
      image: `http://localhost:3000${property.images[0]}`,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "http://localhost:3000/api/payment/verify";
          const verifyResponse = await fetch(verifyURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...response,
              email
            })
          });
          const verifyData = await verifyResponse.json();
          console.log(verifyData);
          const bookingData = {
            userId,
            flatId: property._id,
            ownerId: property.ownerId,
            ownerMobile: property.ownerMobile,
            type: property.type,
            cost: property.cost,
            paymentHistory: [
              {
                paymentId: response.razorpay_payment_id,
                amount: property.cost,
                paymentDate: new Date().toISOString(),
                isSuccessful: true
              }
            ],
            isDeleted: false
          };
          if(flag){
            console.log("buying property");
            buyProperty();
          }else{
            console.log("booking property");
            addUserBooking(bookingData);
          }

        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async (flag = false) => {
    try {
      const orderURL = "http://localhost:3000/api/payment/orders";
      const response = await fetch(orderURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: flag ? property.totalCost/100 : property.cost })
      });
      const data = await response.json();
      console.log(data);
      initPay(data.data, flag);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/userBook/cancel/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Booking cancelled successfully!');
        window.location.reload();
      } else {
        toast.warn('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Error cancelling booking');
    }
  };

  const renderPriceSection = () => {
    if (!property) return null;

    const {
      isOnSale = false,
      isRefundable = false,
      isAC = false,
      originalCost = 0,
      cost = 0,
      taxes = 0,
      type = 'Property',
      totalRooms = 0,
      availableRooms = 0,
      isForGirls = false,
      Saleit = false,
    } = property;

    return (
      <>
        <PriceSection>
          <PriceHeader>
            <PriceTag>
              Per Month
            </PriceTag>
            {isForGirls && <PriceTag>
              Only For Girls
            </PriceTag>}

          </PriceHeader>
          <PriceHeader>
            {Saleit && <SaleTag>Buy {type}, Limited Time Sale!</SaleTag>}
          </PriceHeader>

          <PriceDisplay>

            <PriceInfo>
              {originalCost > cost && (
                <OriginalPrice>₹ {originalCost.toLocaleString()}</OriginalPrice>
              )}
              <CurrentPrice>₹ {cost.toLocaleString()}</CurrentPrice>
              {taxes > 0 && (
                <TaxInfo>+ ₹ {taxes.toLocaleString()} taxes & fees</TaxInfo>
              )}

              {
                Saleit && role === "owner" && (
                  <TotalCostTag>
                    Total Property cost: {property.totalCost}
                  </TotalCostTag>
                )
              }
            </PriceInfo>
          </PriceDisplay>

          <AmenityList>
            <AmenityItem $isAvailable={isAC}>
              {isAC ? <FaCheck size={16} /> : <FaTimes size={16} />}
              {isAC ? 'AC Room Available' : 'Non-AC Room'}
            </AmenityItem>
            <AmenityItem $isAvailable={isRefundable}>
              {isRefundable ? <FaCheck size={16} /> : <FaTimes size={16} />}
              {isRefundable ? 'Refundable' : 'Non-Refundable'}
            </AmenityItem>
            {totalRooms > 0 && (
              <AmenityItem $isAvailable={availableRooms > 0}>
                <FaCheck size={16} />
                {availableRooms} of {totalRooms} rooms available
              </AmenityItem>
            )}
          </AmenityList>

          <ImportantInfo>
            <h4>Important Information</h4>
            <ul>
              {!isRefundable && (
                <li>This booking cannot be cancelled or refunded</li>
              )}
              {type === 'Flat' && (
                <li>Security deposit and maintenance charges may apply</li>
              )}
              {['PG', 'Hostel'].includes(type) && (
                <li>Monthly and quarterly payment options available</li>
              )}
            </ul>
          </ImportantInfo>

          {userId !== property.ownerId && (
            hasBooking ? (
              <BookButton onClick={() => setIsCancelConfirmationOpen(true)}>
                Checkout Property
              </BookButton>
            ) : (
              <BookButton onClick={handlePay} disabled={!isEmailVerified || !isPhone || !allowBooking}>
                {availableRooms > 0 ? 'Book Now' : 'Join Waitlist'}
              </BookButton>
            )
          )}

          {
            Saleit && role === "owner" && userId !== property.ownerId &&
            <BookButton onClick={()=>handlePay(true)} disabled={!isEmailVerified || !isPhone}>
              Buy The property
            </BookButton>
          }

          <Contact>
            Contact Us: <FaPhone style={{ marginRight: "8px", color: "#0066cc" }} />
            {property?.ownerMobile}
          </Contact>
        </PriceSection>

        {user && (
          <InitiateChatButton
            flatId={property?._id}
            ownerId={property?.ownerId}
            currentUser={user}
            onChatStart={handleChatStart}
          />
        )}
      </>
    );
  };

  const renderGallery = () => {
    if (!property) return null;

    const totalMedia = [
      ...(property.images || []),
      ...(property.paranomicImages || []),
      ...(property.videos || [])
    ];
    const displayLimit = 5;
    const hasMoreMedia = totalMedia.length > displayLimit;
    const displayMedia = totalMedia.slice(0, displayLimit);

    const isVideo = (item) => item && (item.endsWith('.mp4') || item.endsWith('.webm'));

    return (
      <Gallery $imageCount={displayMedia.length}>
        {/* Main Image/Video */}
        {displayMedia[0] && (
          <MediaContainer
            style={{ gridRow: displayMedia.length >= 3 ? 'span 2' : 'span 1' }}
            onClick={() => setIsGalleryOpen(true)}
          >
            {isVideo(displayMedia[0]) ? (
              <>
                <StyledImage
                  src={`http://localhost:3000${displayMedia[0]}?thumb=true`}
                  alt="Video thumbnail"
                />
                <MediaBadge>
                  <PlayCircle size={16} />
                  Video
                </MediaBadge>
              </>
            ) : (
              <StyledImage src={`http://localhost:3000${displayMedia[0]}`} alt="Property" />
            )}
          </MediaContainer>
        )}

        {/* Additional Media */}
        {displayMedia.slice(1).map((item, index) => (
          <MediaContainer key={index} onClick={() => setIsGalleryOpen(true)}>
            <StyledImage
              src={isVideo(item) ? `http://localhost:3000${item}?thumb=true` : `http://localhost:3000${item}`}
              alt={isVideo(item) ? "Video thumbnail" : "Property"}
            />
            {isVideo(item) && (
              <MediaBadge>
                <PlayCircle size={16} />
                Video
              </MediaBadge>
            )}
            {/* Overlay for last visible item if there are more */}
            {index === displayMedia.length - 2 && hasMoreMedia && (
              <GalleryOverlay>
                <Camera size={24} />
                <RemainingCount>
                  +{totalMedia.length - displayLimit} more
                </RemainingCount>
              </GalleryOverlay>
            )}
          </MediaContainer>
        ))}

        <ViewAllPhotos onClick={() => setIsGalleryOpen(true)}>
          <Camera size={16} />
          View all media ({totalMedia.length})
        </ViewAllPhotos>
      </Gallery>
    );
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/people/feedback/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Review deleted successfully!');
        window.location.reload();
      } else {
        toast.warn('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  const buyProperty = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/flat/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ownerID: userId, ownerPhone: property.ownerMobile, flatId: property._id, currentOwner: property.currentOwner })
      });

      if (response.ok) {
        // await handlePay(true);
        toast.success('Property bought successfully!');
        fetchPropertyDetails();
      } else {
        toast.warn('Failed to buy property');
      }
    } catch (error) {
      console.error('Error buying property:', error);
      toast.error('Error buying property');
    }
  }

  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <PropertyName>
            {property?.name}
            <PropertyTypeTag>{property?.type}</PropertyTypeTag>
            {role === 'owner' && userId === property?.ownerId && (
              <>
                <MdOutlineEdit
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/flat/update/${flatId}`)}
                />
                <FaTrash
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  onClick={confirmDeleteFlat}
                />
              </>
            )}
          </PropertyName>
          <Stars>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} $filled={star <= Math.floor(property?.rating)} />
            ))}
          </Stars>
          <Location onClick={() => openMap(property)}>
            <MapPin size={16} />
            {property?.street}, {property?.city}, {property?.state}
          </Location>
        </TitleSection>

        <RatingSection>
          <RatingBox>
            <RatingScore>{Math.floor(property?.rating) / 5}</RatingScore>
            <RatingText>{property?.totalRating}+ ratings</RatingText>
          </RatingBox>
        </RatingSection>
      </Header>

      {renderGallery()}

      <ContentGrid>
        <MainContent>
          <RoomCard>
            <RoomTitle>{property?.roomTitle}</RoomTitle>

            {showRoomDetails && (
              <RoomInfo>
                <InfoItem>
                  <h4>Bedrooms</h4>
                  <p>{property?.bedrooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Bathrooms</h4>
                  <p>{property?.bathrooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Living Rooms</h4>
                  <p>{property?.livingRooms}</p>
                </InfoItem>
                <InfoItem>
                  <h4>Kitchens</h4>
                  <p>{property?.kitchens}</p>
                </InfoItem>
              </RoomInfo>
            )}

            {showRoomSharing && (
              <RoomInfo>
                <InfoItem>
                  <h4>Room Sharing</h4>
                  <p>{property?.roomSharingForPg} Person</p>
                </InfoItem>
              </RoomInfo>
            )}

            <RoomDetails>
              <DetailItem>
                <Check size={16} />
                Number of Beds Sharing {property?.roomSharingForPg}
              </DetailItem>
              <DetailItem>
                {/* <Check size={16} /> */}
                {/* Number of Beds Sharing {property?.roomSharingForPg} */}
              </DetailItem>
              <DetailItem>
                <Clock size={16} />
                Morning Timing: {property?.checkInTime}
              </DetailItem>
              <DetailItem>
                <Clock size={16} />
                Evening Timing: {property?.checkOutTime}
              </DetailItem>
            </RoomDetails>

            <FeaturesGrid>
              {property?.features?.map((feature, index) => (
                <FeatureItem key={index}>
                  {getFeatureIcon(feature)}
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </RoomCard>

          <ReviewSection>
            <ReviewHeader>
              <h2>Guest Reviews </h2>
              {userId !== property?.ownerId && (
                <WriteReviewButton onClick={() => setIsReviewFormOpen(true)}>
                  Write a Review
                </WriteReviewButton>
              )}
            </ReviewHeader>

            {reviews.slice(0, visibleReviews).map((review) => (
              <ReviewCard key={review._id}>
                {review.userId === userId && (
                  <FaTrash
                    style={{ cursor: 'pointer', float: 'right' }}
                    onClick={() => handleDeleteReview(review._id)}
                  />
                )}
                <ReviewUser>
                  <UserAvatar>
                    <AvatarImage src={review.photoUrl} alt={review.userName} />
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{review.userName}</UserName>
                    <ReviewDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewDate>
                  </UserInfo>
                </ReviewUser>
                <Stars>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      $filled={star <= Math.floor(review.rating)}
                    />
                  ))}
                </Stars>
                <p>{review.context}</p>
              </ReviewCard>
            ))}

            {reviews.length === 0 && <p>No Review Found ):</p>}
            {visibleReviews < reviews.length && (
              <ShowMoreButton onClick={handleShowMoreReviews}>Show More</ShowMoreButton>
            )}
            {visibleReviews > 5 && (
              <ShowLessButton onClick={handleShowLessReviews}>Show Less</ShowLessButton>
            )}
          </ReviewSection>
        </MainContent>

        <MainContent>
          {renderPriceSection()}
        </MainContent>

      </ContentGrid>


      <PropertyGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property?.images}
        paranomicImages={property?.paranomicImages}
        videoUrl={property?.videos}
      />

      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={handleReviewSubmit}
        flatId={property?._id}
        ownerId={property?.ownerId}
      />

      {isConfirmationOpen && (
        <ConfirmationOverlay>
          <ConfirmationContainer>
            <ConfirmationTitle>Are you sure you want to delete this flat?</ConfirmationTitle>
            <ConfirmationButtons>
              <ConfirmationButton cancel onClick={() => setIsConfirmationOpen(false)}>Cancel</ConfirmationButton>
              <ConfirmationButton onClick={handleDeleteFlat}>Delete</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>
        </ConfirmationOverlay>
      )}

      {isCancelConfirmationOpen && (
        <ConfirmationOverlay>
          <ConfirmationContainer>
            <ConfirmationTitle>Are you sure you want to cancel the booking?</ConfirmationTitle>
            <ConfirmationButtons>
              <ConfirmationButton cancel onClick={() => setIsCancelConfirmationOpen(false)}>Don't Cancel</ConfirmationButton>
              <ConfirmationButton onClick={handleCancelBooking}>Cancel Booking</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>
        </ConfirmationOverlay>
      )}

      <ChatModal isOpen={isChatOpen}>
        <ChatWrapper>
          <CloseButton onClick={() => setIsChatOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
          <ChatContainer
            currentUser={user}
            userType={isOwner ? 'owner' : 'user'}
            initialChat={selectedConversation}
            onClose={() => setIsChatOpen(false)}
            flatName={property?.name}
          />
        </ChatWrapper>
      </ChatModal>

    </PageContainer>
  );
};

export default PropertyDetailPage;