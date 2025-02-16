import type { NextApiRequest, NextApiResponse } from 'next';
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
cdxzcc
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password }: LoginRequest = req.body;

        try {
            const response = await axios.post<LoginResponse>(API_URL, { email, password });
            res.status(200).json(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({ message: error.response?.data || 'Login failed' });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}