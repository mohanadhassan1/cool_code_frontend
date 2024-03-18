import axiosInstance from './axiosInstance';

const getTasks = async () => {
    try {
        const response = await axiosInstance.get('/tasks');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred while fetching tasks');
    }
};

export { getTasks };
