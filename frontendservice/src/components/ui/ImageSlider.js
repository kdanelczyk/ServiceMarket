import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Wbudowane style CSS w komponencie
const styles = {
    imageSlider: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    },
    sliderImages: {
        display: 'flex',
        transition: 'transform 0.3s ease-in-out',
    },
    sliderImage: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
        margin: '0 5px',
        opacity: '0.6',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        cursor: 'pointer',
    },
    activeSliderImage: {
        transform: 'scale(1.1)',
        opacity: '1',
    },
    sliderButton: {
        background: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '18px',
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    leftButton: {
        left: '10px',
    },
    rightButton: {
        right: '10px',
    },
    disabledButton: {
        opacity: '0.3',
        cursor: 'not-allowed',
    }
};

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleImageClick = (index) => {
        // Odczytanie taskId z URL (przy założeniu, że jest w ścieżce)
        const taskId = window.location.pathname.split('/')[3];  // Zakładając, że URL jest w formie "/tasks/offers/{taskId}"
        navigate(`/tasks/image/${taskId}/${index}`);
    };

    return (
        <div style={styles.imageSlider}>
            <button
                style={{ ...styles.sliderButton, ...styles.leftButton }}
                onClick={handlePrevious}
                disabled={currentIndex === 0}
            >
                &#8592;
            </button>

            <div style={styles.sliderImages}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Task Image ${index + 1}`}
                        style={{
                            ...styles.sliderImage,
                            ...(currentIndex === index ? styles.activeSliderImage : {}),
                        }}
                        onClick={() => handleImageClick(index)}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                ))}
            </div>

            <button
                style={{ ...styles.sliderButton, ...styles.rightButton }}
                onClick={handleNext}
                disabled={currentIndex === images.length - 1}
            >
                &#8594;
            </button>
        </div>
    );
};

export default ImageSlider;
