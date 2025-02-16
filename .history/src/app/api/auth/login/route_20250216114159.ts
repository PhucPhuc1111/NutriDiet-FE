// /pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://nutridietapi-be.azurewebsites.net/swagger/v1/swagger.json';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    // Add other response fields if needed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password }: LoginRequest = req.body;

        try {
            const response = await axios.post<LoginResponse>(API_URL, { email, password });
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Login failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}