import axiosInstance from './axiosInstance';

const login = async (userData) => {
    try {
        const response = await axiosInstance.post('/login', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred during login');
    }
};

const signup = async (userData) => {
    try {
        const response = await axiosInstance.post('/signup', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred during signup');
    }
};

export { login, signup };
