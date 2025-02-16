import axios from 'axios';

const API_URL = 'https://nutridietapi-be.azurewebsites.net/api/user/login';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    // Add other response fields if needed
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(API_URL, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};