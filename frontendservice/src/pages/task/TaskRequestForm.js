import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import useTaskRequest from '../../hooks/useTaskRequest';

const TaskRequestForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        taskRequest,
        setTaskRequest,
        loading,
        error,
        success,
        createTask,
        updateTask
    } = useTaskRequest(id, location.pathname);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskRequest.title || !taskRequest.description || !taskRequest.price || !taskRequest.location || !taskRequest.deadline) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', taskRequest.title);
            formData.append('description', taskRequest.description);
            formData.append('price', taskRequest.price);
            formData.append('location', taskRequest.location);
            formData.append('deadline', taskRequest.deadline);

            if (taskRequest.images.length > 0) {
                taskRequest.images.forEach((image) => {
                    formData.append('images', image);
                });
            }

            let response;

            if (location.pathname.includes('new')) {
                const categoryId = location.pathname.split('/').pop();
                response = await createTask(categoryId, formData);
            } else if (location.pathname.includes('edit')) {
                response = await updateTask(id, formData);
            }

            if (response && Object.keys(response).length > 0) {
                alert('Task Request saved successfully!');
                const taskId = response.id;
                navigate(`/tasks/request/${taskId}`);
            } else {
                alert('Failed to save task offer');
            }
        } catch (error) {
            alert('Failed to save task request!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskRequest((prevTaskRequest) => ({
            ...prevTaskRequest,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setTaskRequest((prevTaskRequest) => ({
            ...prevTaskRequest,
            images: files
        }));
    };

    const fields = [
        {
            key: 'title',
            label: 'Task Title',
            type: 'text',
            value: taskRequest.title,
            onChange: handleChange,
            required: true,
            minLength: 3,
            maxLength: 100,
            placeholder: 'Task Title'
        },
        {
            key: 'description',
            label: 'Task Description',
            type: 'textarea',
            value: taskRequest.description,
            onChange: handleChange,
            required: true,
            minLength: 10,
            placeholder: 'Task Description'
        },
        {
            key: 'price',
            label: 'Price',
            type: 'number',
            value: taskRequest.price,
            onChange: handleChange,
            required: true,
            min: 0,
            placeholder: 'Price'
        },
        {
            key: 'location',
            label: 'Location',
            type: 'text',
            value: taskRequest.location,
            onChange: handleChange,
            required: true,
            placeholder: 'Location'
        },
        {
            key: 'deadline',
            label: 'Deadline',
            type: 'datetime-local',
            value: taskRequest.deadline,
            onChange: handleChange,
            required: true
        },
        {
            key: 'images',
            label: 'Images',
            type: 'file',
            onChange: handleImageChange,
            accept: 'image/*',
            multiple: true,
            required: true
        }
    ];

    return (
        <StyledForm
            title={id ? "Edit Task Request" : "Create Task Request"}
            fields={fields}
            onSubmit={handleSubmit}
        >
            {loading && <p>Loading task details...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StyledButton type="submit">{id ? "Save Changes" : "Create Task Request"}</StyledButton>
        </StyledForm>
    );
};

export default TaskRequestForm;
