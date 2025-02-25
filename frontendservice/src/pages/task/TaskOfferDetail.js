import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageSlider from '../../components/ui/ImageSlider';
import StyledDetail from '../../components/ui/StyledDetail';
import TaskInfoButton from '../../components/ui/TaskInfoButton';
import useTaskOffer from '../../hooks/useTaskOffer';

const TaskOfferDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const { taskOffer, loading, error, deleteTask } = useTaskOffer(id, window.location.pathname);

    useEffect(() => {
        if (taskOffer && taskOffer.images && Array.isArray(taskOffer.images)) {
            const base64Images = taskOffer.images.map((image) => `data:image/jpeg;base64,${image.data}`);
            setImages(base64Images);
        }
    }, [taskOffer]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/tasks/offers/edit/${id}`);
    };

    const handleDelete = async () => {
        const isDeleted = await deleteTask(id);
        if (isDeleted) {
            navigate('/tasks/page?page=0&size=10');
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
            createdBy={taskOffer.createdBy} // Przekazujemy createdBy do StyledDetail
        >
            <p>{taskOffer.description}</p>
            {images.length > 0 ? (
                <ImageSlider images={images} />
            ) : (
                <p style={{ textAlign: 'center', color: 'gray' }}>No images available for this offer.</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '0.85em', color: 'gray' }}>
                <p><strong>Price:</strong> ${taskOffer.price}</p>
                <p><strong>Expiry date:</strong> {new Date(taskOffer.expiryDate).toLocaleDateString()}</p>
            </div>
            <TaskInfoButton taskId={id} style={{ marginTop: '20px', textAlign: 'center' }} />
        </StyledDetail>
    );
};

export default TaskOfferDetail;
