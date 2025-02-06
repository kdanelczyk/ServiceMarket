import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import useTaskOffer from '../../hooks/useTaskOffer';

const TaskOfferForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        taskOffer,
        setTaskOffer,
        loading,
        error,
        success,
        createTask,
        updateTask
    } = useTaskOffer(id, location.pathname);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskOffer.title || !taskOffer.description || !taskOffer.price || !taskOffer.expiryDate) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', taskOffer.title);
            formData.append('description', taskOffer.description);
            formData.append('price', taskOffer.price);
            formData.append('expiryDate', taskOffer.expiryDate);

            if (taskOffer.images.length > 0) {
                taskOffer.images.forEach((image) => {
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
                alert('Task Offer saved successfully!');
                const taskId = response.id;
                navigate(`/tasks/offer/${taskId}`);
            } else {
                alert('Failed to save task offer');
            }
        } catch (error) {
            alert('Failed to save task offer!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskOffer((prevTaskOffer) => ({
            ...prevTaskOffer,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setTaskOffer((prevTaskOffer) => ({
            ...prevTaskOffer,
            images: files
        }));
    };

    const fields = [
        {
            key: 'title',
            label: 'Task Title',
            type: 'text',
            value: taskOffer.title,
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
            value: taskOffer.description,
            onChange: handleChange,
            required: true,
            minLength: 10,
            placeholder: 'Task Description'
        },
        {
            key: 'price',
            label: 'Price',
            type: 'number',
            value: taskOffer.price,
            onChange: handleChange,
            required: true,
            min: 0,
            placeholder: 'Price'
        },
        {
            key: 'expiryDate',
            label: 'Expiry Date',
            type: 'datetime-local',
            value: taskOffer.expiryDate,
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
            title={id ? "Edit Task Offer" : "Create Task Offer"}
            fields={fields}
            onSubmit={handleSubmit}
        >
            {loading && <p>Loading task details...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StyledButton type="submit">{id ? "Save Changes" : "Create Task Offer"}</StyledButton>
        </StyledForm>
    );
};

export default TaskOfferForm;
