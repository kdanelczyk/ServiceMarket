import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StyledDetail from '../../components/ui/StyledDetail';
import { useUser } from '../../hooks/useUser';
import { getUsername, getUserRole } from '../../utils/auth';

const UserDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user, loading, error, deleteUser } = useUser(userId);
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const userRole = getUserRole(token);
    const username = getUsername(token);

    const handleEdit = () => {
        navigate(`/users/edit/${userId}`);
    };


    const handleDelete = async () => {
        const success = await deleteUser(userId);

        if (success) {
            navigate('/users/page?page=0&size=16');
        }
    };

    if (loading) return <div>Loading user data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <StyledDetail
            title={`${user.username}`}
            onGoBack={() => navigate('/users/page?page=0&size=16')}
            {...(userRole === 'ROLE_SUPER_ADMIN' || username === user.username ? { onEdit: handleEdit } : {})}
            {...(userRole === 'ROLE_SUPER_ADMIN' || username === user.username ? { onDelete: handleDelete } : {})}
        >
            <div style={styles.detailItem}>
                <label style={styles.label}>Email:</label>
                <span style={styles.value}>{user.email}</span>
            </div>
            <div style={styles.detailItem}>
                <label style={styles.label}>Phone:</label>
                <span style={styles.value}>{user.phone}</span>
            </div>
            <div style={styles.detailItem}>
                <label style={styles.label}>City:</label>
                <span style={styles.value}>{user.city}</span>
            </div>
            <div style={styles.detailItem}>
                <label style={styles.label}>Role:</label>
                <span style={styles.value}>{user.role?.name}</span>
            </div>
            <div style={styles.detailItem}>
                <label style={styles.label}>Created At:</label>
                <span style={styles.value}>
                    {new Date(user.createdAt).toLocaleDateString()}
                </span>
            </div>
        </StyledDetail>
    );

};

const styles = {
    detailItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#2a2a2a',
        borderRadius: '6px'
    },
    label: {
        color: '#a0a0a0',
        fontSize: '14px',
        marginBottom: '5px',
        display: 'block'
    },
    value: {
        color: '#ffffff',
        fontSize: '16px'
    }
};

export default UserDetail;