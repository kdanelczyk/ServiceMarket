import axios from 'axios';

const isDocker = window.location.hostname !== 'localhost';
const API_URL_MARKET = isDocker ? 'http://service-market:8080' : 'http://localhost:8080';
const API_URL_USER = isDocker ? 'http://user-service:8085' : 'http://localhost:8085';

// Category API calls
export const getCategories = (page, size) =>
    axios.get(`${API_URL_MARKET}/categories/page`, { params: { page, size } });

export const getCategoryById = (id, token) =>
    axios.get(`${API_URL_MARKET}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createCategory = (categoryData, token) =>
    axios.post(`${API_URL_MARKET}/categories`, categoryData, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateCategory = (id, categoryData, token) =>
    axios.put(`${API_URL_MARKET}/categories/${id}`, categoryData, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteCategory = (id, token) =>
    axios.delete(`${API_URL_MARKET}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

// Tasks API calls
export const getTaskOffers = (page, size) =>
    axios.get(`${API_URL_MARKET}/tasks/offers/page`, { params: { page, size } });

export const getTaskRequests = (page, size) =>
    axios.get(`${API_URL_MARKET}/tasks/requests/page`, { params: { page, size } });

export const getTaskRequestsByCategory = (categoryId, page, size) =>
    axios.get(`${API_URL_MARKET}/tasks/requests/category/${categoryId}/page`, {
        params: { page, size }
    });

export const getTaskOffersByCategory = (categoryId, page, size) =>
    axios.get(`${API_URL_MARKET}/tasks/offers/category/${categoryId}/page`, {
        params: { page, size }
    });

export const getTaskById = (id) =>
    axios.get(`${API_URL_MARKET}/tasks/${id}`);

export const getImage = (taskId, index) =>
    axios.get(`${API_URL_MARKET}/tasks/image/${taskId}/${index}`, {
        responseType: 'arraybuffer',
    });

export const getInfoAboutTaskIfLoggedIn = (id, token) =>
    axios.get(`${API_URL_MARKET}/tasks/info/loggedIn/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getInfoAboutTaskIfNotLoggedIn = (id, name, email) =>
    axios.get(`${API_URL_MARKET}/tasks/info/notloggedIn/${id}`, name, email);

export const createTaskRequest = (categoryId, taskRequestInput, token) =>
    axios.post(`${API_URL_MARKET}/tasks/requests/category/${categoryId}`, taskRequestInput, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createTaskOffer = (categoryId, taskOfferInput, token) =>
    axios.post(`${API_URL_MARKET}/tasks/offers/category/${categoryId}`, taskOfferInput, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateTaskRequest = (id, taskRequestInput, token) =>
    axios.put(`${API_URL_MARKET}/tasks/requests/${id}`, taskRequestInput, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateTaskOffer = (id, taskOfferInput, token) =>
    axios.put(`${API_URL_MARKET}/tasks/offers/${id}`, taskOfferInput, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteTask = (id, token) =>
    axios.delete(`${API_URL_MARKET}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

// Auth API calls
export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL_USER}/auth/signup`, data);
        return response;
    } catch (error) {
        console.error('Error during signup API call:', error.response || error.message);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL_USER}/auth/login`, data);
        return response;
    } catch (error) {
        console.error('Error during login API call:', error.response || error.message);
        throw error;
    }
};

export const logout = async (token) => {
    try {
        const response = await axios.post(
            `${API_URL_USER}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error during logout API call:', error.response || error.message);
        throw error;
    }
};

//User API calls
export const getMe = (token) => {
    console.log('Authorization Header:', `Bearer ${token}`);
    return axios.get(`${API_URL_USER}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getAllUsers = (token, page = 0, size = 10) =>
    axios.get(`${API_URL_USER}/users/page`, {
        params: { page, size },
        headers: { Authorization: `Bearer ${token}` },
    });

export const getUserById = (id, token) =>
    axios.get(`${API_URL_USER}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getUserByUsername = (username, token) =>
    axios.get(`${API_URL_USER}/users/username/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getUserByEmail = (email, token) =>
    axios.get(`${API_URL_USER}/users/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateUser = async (id, data, token) => {
    try {
        console.log('Data sent to API for update:', data);

        const response = await axios.put(`${API_URL_USER}/auth/users/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Response from updateUser API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during updateUser API call:', error.response || error.message);
        throw error;
    }
}

export const deleteUserById = (id, token) =>
    axios.delete(`${API_URL_USER}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteMe = (token) =>
    axios.delete(`${API_URL_USER}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
