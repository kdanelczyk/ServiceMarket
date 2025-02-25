import React, { useState } from 'react';
import { getInfoAboutTaskIfLoggedIn, getInfoAboutTaskIfNotLoggedIn } from '../../services/api';
import StyledButton from './StyledButton';
import StyledForm from './StyledForm';

const TaskInfoButton = ({ taskId }) => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isLoggedIn = () => localStorage.getItem('token') !== null;

    const handleTaskInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (isLoggedIn()) {
                await getInfoAboutTaskIfLoggedIn(taskId, token);
                setShowSuccessModal(true);
            } else {
                setShowFormModal(true);
            }
        } catch (error) {
            setError('Failed to fetch task info. Please try again.');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            setError('Please fill in both fields.');
            return;
        }
        try {
            await getInfoAboutTaskIfNotLoggedIn(taskId, name, email);
            setShowFormModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            setError('Error sending task info. Please try again.');
        }
    };

    const fields = [
        { key: 'name', label: 'Name', type: 'text', onChange: (e) => setName(e.target.value), value: name, required: true },
        { key: 'email', label: 'Email', type: 'email', onChange: (e) => setEmail(e.target.value), value: email, required: true },
    ];

    return (
        <>
            <StyledButton onClick={handleTaskInfo} style={{ backgroundColor: '#4CAF50' }}>
                {loading ? 'Loading...' : 'Get More Task Info'}
            </StyledButton>

            {showFormModal && (
                <StyledForm title="Get information" fields={fields} onSubmit={handleSubmit}>
                    <p>Please enter your details and you will receive the offer creator's details by e-mail</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <StyledButton type="submit">Submit</StyledButton>
                        <StyledButton type="button" onClick={() => setShowFormModal(false)}>Cancel</StyledButton>
                    </div>
                </StyledForm>
            )}

            {showSuccessModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#242424', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                        <p>Check your email, the details have been sent to the address you provided.</p>
                        <StyledButton onClick={() => setShowSuccessModal(false)}>Close</StyledButton>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskInfoButton;
