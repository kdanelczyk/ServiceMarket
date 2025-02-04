import { jwtDecode } from 'jwt-decode';

/**
 * @param {string} token
 * @returns {string}
 */
export const getUsername = (token) => {
    if (!token) return '';
    try {
        const decoded = jwtDecode(token);
        return decoded.sub || '';
    } catch (error) {
        console.error('Error decoding token:', error);
        return '';
    }
};

/**
 * @param {string} token
 * @returns {string}
 */
export const getUserRole = (token) => {
    if (!token) return '';
    try {
        const decoded = jwtDecode(token);
        return decoded.roles && decoded.roles[0] ? decoded.roles[0] : '';
    } catch (error) {
        console.error('Error decoding token:', error);
        return '';
    }

};
