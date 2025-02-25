import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageSlider from '../../components/ui/ImageSlider';
import StyledDetail from '../../components/ui/StyledDetail';
import useTaskRequest from '../../hooks/useTaskRequest';
const TaskRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const { taskRequest, loading, error, deleteTask } = useTaskRequest(id, window.location.pathname);

    useEffect(() => {
        if (taskRequest && taskRequest.images && Array.isArray(taskRequest.images)) {
            const base64Images = taskRequest.images.map((image) => `data:image/jpeg;base64,${image.data}`);
            setImages(base64Images);
        }
    }, [taskRequest]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/tasks/requests/edit/${id}`);
    };

    const handleDelete = async () => {
        const isDeleted = await deleteTask(id);
        if (isDeleted) {
            navigate('/tasks/page?page=0&size=16');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!taskRequest) return <div>Task request not found or has been deleted.</div>;

    return (
        <StyledDetail
            title={taskRequest.title}
            onGoBack={handleGoBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
        >
            <p>{taskRequest.description}</p>
            <p><strong>Location:</strong> {taskRequest.location}</p>

            {images.length > 0 ? (
                <ImageSlider images={images} />
            ) : (
                <p style={{ textAlign: 'center', color: 'gray' }}>No images available for this request.</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '0.85em', color: 'gray' }}>
                <p><strong>Price:</strong> ${taskRequest.price}</p>
                <p><strong>Deadline:</strong> {new Date(taskRequest.deadline).toLocaleDateString()}</p>
                <br></br>
            </div>
        </StyledDetail>
    );
};

export default TaskRequestDetail;