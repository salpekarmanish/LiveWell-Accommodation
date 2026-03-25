import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const UploadSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const DropZone = styled.div`
  ${'' /* border: 2px dashed #3498db; */}
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    border-color: #2980b9;
  }
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PreviewItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 0, 0, 0.9);
  }
`;

const UploadButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 0.5rem;
  text-align: center;
`;

const MediaUploadPage = () => {
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [panoramicImages, setPanoramicImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { flatId } = useParams();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            setError('You can only upload up to 5 images at a time');
            return;
        }

        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length !== files.length) {
            setError('Please select only image files');
            return;
        }

        setImages(prevImages => {
            const newImages = [...prevImages, ...files];
            if (newImages.length > 5) {
                setError('Maximum 5 images allowed');
                return prevImages;
            }
            setError('');
            return newImages;
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];

        if (file && !file.type.startsWith('video/')) {
            setError('Please select a valid video file');
            return;
        }

        setVideo(file);
        setError('');
    };

    const handlePanoramicImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            setError('You can only upload up to 5 panoramic images at a time');
            return;
        }

        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length !== files.length) {
            setError('Please select only image files');
            return;
        }

        setPanoramicImages(prevImages => {
            const newImages = [...prevImages, ...files];
            if (newImages.length > 5) {
                setError('Maximum 5 panoramic images allowed');
                return prevImages;
            }
            setError('');
            return newImages;
        });
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
    };

    const removePanoramicImage = (index) => {
        setPanoramicImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Upload images
            if (images.length > 0) {
                const imageFormData = new FormData();
                images.forEach(image => {
                    imageFormData.append('images', image);
                });

                const imageResponse = await fetch(`http://localhost:3000/api/flats/upload/images/${flatId}`, {
                    method: 'POST',
                    body: imageFormData,
                });

                if (!imageResponse.ok) {
                    throw new Error('Failed to upload images');
                }

                setSuccess('Images uploaded successfully!');
            }

            // Upload panoramic images
            if (panoramicImages.length > 0) {
                const panoramicImageFormData = new FormData();
                panoramicImages.forEach(image => {
                    panoramicImageFormData.append('paranomicImages', image);
                });

                const panoramicImageResponse = await fetch(`http://localhost:3000/api/flats/upload/panoramicImages/${flatId}`, {
                    method: 'POST',
                    body: panoramicImageFormData,
                });

                if (!panoramicImageResponse.ok) {
                    throw new Error('Failed to upload panoramic images');
                }

                setSuccess(prev => (prev ? prev + ' Panoramic images uploaded successfully!' : 'Panoramic images uploaded successfully!'));
            }

            // Upload video
            if (video) {
                const videoFormData = new FormData();
                videoFormData.append('video', video);

                const videoResponse = await fetch(`http://localhost:3000/api/flats/upload/video/${flatId}`, {
                    method: 'POST',
                    body: videoFormData,
                });

                if (!videoResponse.ok) {
                    throw new Error('Failed to upload video');
                }

                setSuccess(prev => (prev ? prev + ' Video uploaded successfully!' : 'Video uploaded successfully!'));
            }
            navigate(`/flat/update/${flatId}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <UploadSection>
                <Title>Upload Images (Max 5)</Title>
                <DropZone as="label" htmlFor="image-upload">
                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <p>Click or drag images here</p>
                </DropZone>
                <PreviewContainer>
                    {images.map((image, index) => (
                        <PreviewItem key={index}>
                            <PreviewImage src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <RemoveButton onClick={() => removeImage(index)}>×</RemoveButton>
                        </PreviewItem>
                    ))}
                </PreviewContainer>
            </UploadSection>

            <UploadSection>
                <Title>Upload Panoramic Images (Max 5)</Title>
                <DropZone as="label" htmlFor="panoramic-image-upload">
                    <input
                        id="panoramic-image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePanoramicImageChange}
                        style={{ display: 'none' }}
                    />
                    <p>Click or drag panoramic images here</p>
                </DropZone>
                <PreviewContainer>
                    {panoramicImages.map((image, index) => (
                        <PreviewItem key={index}>
                            <PreviewImage src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                            <RemoveButton onClick={() => removePanoramicImage(index)}>×</RemoveButton>
                        </PreviewItem>
                    ))}
                </PreviewContainer>
            </UploadSection>

            <UploadSection>
                <Title>Upload Video (Max 1)</Title>
                <DropZone as="label" htmlFor="video-upload">
                    <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        style={{ display: 'none' }}
                    />
                    <p>Click or drag video here</p>
                </DropZone>
                {video && (
                    <PreviewContainer>
                        <PreviewItem>
                            <video width="100%" height="100%" controls>
                                <source src={URL.createObjectURL(video)} type={video.type} />
                                Your browser does not support the video tag.
                            </video>
                            <RemoveButton onClick={removeVideo}>×</RemoveButton>
                        </PreviewItem>
                    </PreviewContainer>
                )}
            </UploadSection>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <UploadButton
                onClick={handleUpload}
                disabled={loading || (images.length === 0 && !video && panoramicImages.length === 0)}
            >
                {loading ? <Spinner /> : 'Upload Media'}
            </UploadButton>
        </Container>
    );
};

export default MediaUploadPage;