import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageSlider from '../../components/ui/ImageSlider';
import StyledDetail from '../../components/ui/StyledDetail';
import useTaskOffer from '../../hooks/useTaskOffer'; // Adjust the import path as necessary

const TaskOfferDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const { taskOffer, loading, error, deleteTask } = useTaskOffer(id, window.location.pathname);

    // Update images state when taskOffer.images changes
    useEffect(() => {
        if (taskOffer && taskOffer.images && Array.isArray(taskOffer.images)) {
            const base64Images = taskOffer.images.map((image) => `data:image/jpeg;base64,${image.data}`);
            setImages(base64Images);
        }
    }, [taskOffer]); // Dependency array ensures this runs only when taskROffer changes

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleEdit = () => {
        navigate(`/tasks/offerss/edit/${id}`); // Navigate to the edit page
    };

    const handleDelete = async () => {
        const isDeleted = await deleteTask(id);
        if (isDeleted) {
            navigate('/tasks/page?page=0&size=10'); // Navigate to the tasks list after deletion
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!taskOffer) return <div>Task offer not found or has been deleted.</div>;

    return (
        <StyledDetail
            title={taskOffer.title}
            onGoBack={handleGoBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
        >
            <p><strong>Description:</strong> {taskOffer.description}</p>
            <p><strong>Price:</strong> ${taskOffer.price}</p>
            <p><strong>expiryDate:</strong> {new Date(taskOffer.expiryDate).toLocaleDateString()}</p>
            {images.length > 0 ? (
                <ImageSlider images={images} />
            ) : (
                <p style={{ textAlign: 'center', color: 'gray' }}>No images available for this offer.</p>
            )}
        </StyledDetail>
    );
};

export default TaskOfferDetail;