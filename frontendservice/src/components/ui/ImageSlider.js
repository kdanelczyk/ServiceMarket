import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        cursor: 'pointer',
    },
    activeSliderImage: {
        transform: 'scale(1.05)', // Mniejsze powiększenie
        opacity: '1',
    }
};

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleImageClick = (index) => {
        const taskId = window.location.pathname.split('/')[3];
        navigate(`/tasks/image/${taskId}/${index}`);
    };

    return (
        <div style={styles.imageSlider}>
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
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} // Mniejsze powiększenie
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
