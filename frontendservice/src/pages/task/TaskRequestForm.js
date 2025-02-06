import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../../components/ui/StyledButton';
import StyledForm from '../../components/ui/StyledForm';
import { createTaskRequest, getTaskById, updateTaskRequest } from '../../services/api';

const TaskRequestForm = () => {
    const { id } = useParams(); // Pobieramy ID zadania z URL (jeśli jest)
    const location = useLocation(); // Uzyskujemy dostęp do całego URL
    const navigate = useNavigate(); // Inicjalizujemy useNavigate
    const [taskRequest, setTaskRequest] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        deadline: '',
        images: [] // Dodajemy pole do przechowywania zdjęć
    });
    const [isLoading, setIsLoading] = useState(false); // Dodajemy stan ładowania
    const [error, setError] = useState(null); // Stan błędu
    const token = localStorage.getItem('token'); // Pobieramy token JWT

    useEffect(() => {
        if (id && location.pathname.includes('edit')) {
            // Jeśli edytujemy istniejące zadanie
            const fetchTaskRequest = async () => {
                setIsLoading(true); // Rozpoczynamy ładowanie
                try {
                    const response = await getTaskById(id); // Pobieramy dane zadania
                    setTaskRequest(response.data); // Ustawiamy dane zadania w stanie
                } catch (error) {
                    console.error('Error fetching task request:', error);
                    setError('Failed to fetch task request details');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTaskRequest();
        }
    }, [id, location.pathname, token]);

    // Funkcja do obsługi wysyłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja formularza
        if (!taskRequest.title || !taskRequest.description || !taskRequest.price || !taskRequest.location || !taskRequest.deadline) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log("Submitting form with data:", taskRequest);

        try {
            const formData = new FormData();

            // Dodajemy atrybuty do FormData
            formData.append('title', taskRequest.title);
            formData.append('description', taskRequest.description);
            formData.append('price', taskRequest.price);
            formData.append('location', taskRequest.location);
            formData.append('deadline', taskRequest.deadline);

            // Dodajemy obrazy, jeśli są
            if (taskRequest.images.length > 0) {
                taskRequest.images.forEach((image) => {
                    formData.append('images', image); // Przesyłamy obrazy jako pliki
                });
            }

            console.log("Form data prepared:", formData);

            let response;

            // Jeśli URL zawiera 'new', tworzymy zadanie przypisane do kategorii
            if (location.pathname.includes('new')) {
                const categoryId = location.pathname.split('/').pop(); // Pobieramy ID kategorii z URL
                console.log("Creating new task in category:", categoryId);
                response = await createTaskRequest(categoryId, formData, token); // Wywołanie metody create
            }
            // Jeśli URL zawiera 'edit', edytujemy zadanie
            else if (location.pathname.includes('edit')) {
                console.log("Updating task with ID:", id);
                response = await updateTaskRequest(id, formData, token); // Wywołanie metody update
            }

            // Logowanie odpowiedzi z backendu
            console.log("Response from backend:", response);

            if (response?.status === 201) {
                alert('Task Request created successfully!');
                const taskId = response?.data?.id; // Zakładamy, że `response.data.id` zawiera `taskId` w odpowiedzi
                navigate(`/tasks/request/${taskId}`); // Przekierowanie do szczegółów zadania
            } else if (response?.status === 200) {
                alert('Task Request updated successfully!');
                const taskId = response?.data?.id; // Zakładamy, że `response.data.id` zawiera `taskId` w odpowiedzi
                navigate(`/tasks/request/${taskId}`); // Przekierowanie do szczegółów zadania
            } else {
                alert('Failed to save task offer');
            }
        } catch (error) {
            console.error('Error saving task request:', error);
            setError('Failed to save task request');
        } finally {
            setIsLoading(false); // Zakończenie ładowania
        }
    };

    // Funkcja do zmiany wartości w formularzu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskRequest((prevTaskRequest) => ({
            ...prevTaskRequest,
            [name]: value
        }));
    };

    // Funkcja do obsługi wgrywania obrazków
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Pobieramy pliki
        setTaskRequest((prevTaskRequest) => ({
            ...prevTaskRequest,
            images: files // Zapisujemy pliki w stanie
        }));
    };

    return (
        <StyledForm title={id ? "Edit Task Request" : "Create Task Request"} onSubmit={handleSubmit}>
            {isLoading && <p>Loading task details...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                name="title"
                value={taskRequest.title}
                onChange={handleChange}
                required
                placeholder="Task Title"
                minLength={3}
                maxLength={100}
            />
            <textarea
                name="description"
                value={taskRequest.description}
                onChange={handleChange}
                required
                placeholder="Task Description"
                minLength={10}
            />
            <input
                type="number"
                name="price"
                value={taskRequest.price}
                onChange={handleChange}
                required
                placeholder="Price"
                min="0"
            />
            <input
                type="text"
                name="location"
                value={taskRequest.location}
                onChange={handleChange}
                required
                placeholder="Location"
            />
            <input
                type="datetime-local"
                name="deadline"
                value={taskRequest.deadline}
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
            <StyledButton type="submit">{id ? "Save Changes" : "Create Task Request"}</StyledButton>
        </StyledForm>
    );
};

export default TaskRequestForm;
