import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import { useTaskOffer } from '../../hooks/useTaskOffer'; // Importowanie hooka

const TaskOfferForm = () => {
    const { id } = useParams(); // Pobieramy ID zadania z URL
    const location = useLocation();
    const navigate = useNavigate();

    const { taskOffer, loading, error, success, createOffer, updateOffer } = useTaskOffer(id); // Hook useTaskOffer

    const [images, setImages] = useState([]);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        price: '',
        expiryDate: '',
        images: [],
    });

    useEffect(() => {
        if (id && location.pathname.includes('edit')) {
            setTaskData(taskOffer || {}); // Jeżeli edytujemy, ładujemy dane zadania
        }
    }, [taskOffer, id, location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setTaskData((prevData) => ({
            ...prevData,
            images: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, description, price, expiryDate, images } = taskData;

        if (!title || !description || !price || !expiryDate) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('expiryDate', expiryDate);

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            if (id) {
                // Jeśli istnieje ID, wykonujemy aktualizację oferty
                await updateOffer(id, formData);
            } else {
                // Jeśli ID nie ma, tworzymy nową ofertę
                await createOffer('categoryId', formData); // 'categoryId' można pobrać z URL, jeśli to konieczne
            }

            if (success) {
                alert('Task offer saved successfully!');
                navigate(`/tasks/offers/${taskOffer.id}`);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save task offer');
        }
    };

    return (
        <StyledForm title={id ? "Edit Task Offer" : "Create Task Offer"} onSubmit={handleSubmit}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
                placeholder="Task Title"
            />

            <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                required
                placeholder="Task Description"
            />

            <input
                type="number"
                name="price"
                value={taskData.price}
                onChange={handleChange}
                required
                placeholder="Price"
            />

            <input
                type="datetime-local"
                name="expiryDate"
                value={taskData.expiryDate}
                onChange={handleChange}
                required
            />

            <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />

            <StyledButton type="submit">
                {id ? "Save Changes" : "Create Task Offer"}
            </StyledButton>
        </StyledForm>
    );
};

export default TaskOfferForm;
