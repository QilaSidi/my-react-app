import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api; // Ensures a default export
