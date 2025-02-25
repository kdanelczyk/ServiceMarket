import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImage } from '../../services/api';

const FullscreenImageViewer = () => {
    const { taskId } = useParams(); // Pobieramy ID zadania z URL
    const navigate = useNavigate();
    const [images, setImages] = useState([]); // Tablica obrazów
    const [currentIndex, setCurrentIndex] = useState(0); // Aktualny indeks zdjęcia
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            const fetchedImages = [];
            try {
                let index = 0;
                while (true) {
                    const response = await getImage(taskId, index);
                    const binaryString = new Uint8Array(response.data).reduce(
                        (acc, byte) => acc + String.fromCharCode(byte),
                        ''
                    );
                    fetchedImages.push(`data:image/jpeg;base64,${btoa(binaryString)}`);
                    index++;
                }
            } catch (error) {
                if (fetchedImages.length === 0) {
                    console.error('Error fetching images:', error);
                    alert('No images found for this task.');
                    navigate(-1); // Cofnij, jeśli brak obrazów
                }
            }
            setImages(fetchedImages);
            setLoading(false);
        };

        fetchImages();
    }, [taskId, navigate]);

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

    const handleClose = () => {
        navigate(-1); // Wracamy do poprzedniej strony
    };

    if (loading) return <p>Loading images...</p>;

    if (!images.length) return <p>No images available.</p>;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            {/* Przycisk zamknięcia */}
            <button
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                }}
            >
                &times;
            </button>

            {/* Obraz */}
            <img
                src={images[currentIndex]}
                alt={`Task ${taskId} Image ${currentIndex + 1}`}
                style={{
                    maxWidth: '90%',
                    maxHeight: '80%',
                    borderRadius: '10px',
                    objectFit: 'contain',
                }}
            />

            {/* Nawigacja */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '20px',
                    padding: '0 20px',
                }}
            >
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    style={{
                        backgroundColor: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
                        opacity: currentIndex > 0 ? 1 : 0.5,
                    }}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === images.length - 1}
                    style={{
                        backgroundColor: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: currentIndex < images.length - 1 ? 'pointer' : 'not-allowed',
                        opacity: currentIndex < images.length - 1 ? 1 : 0.5,
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FullscreenImageViewer;
