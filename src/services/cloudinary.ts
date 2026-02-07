import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '@/config/api';

interface SignatureResponse {
    signature: string;
    timestamp: number;
    cloud_name: string;
    api_key: string;
}

interface UploadResponse {
    secure_url: string;
    public_id: string;
    [key: string]: any;
}

export const cloudinaryService = {
    // Get upload signature from backend
    getSignature: async (): Promise<SignatureResponse> => {
        const response = await axios.get(`${API_BASE_URL}/api/upload/sign`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    // Upload file directly to Cloudinary
    uploadFile: async (file: File): Promise<string> => {
        try {
            // 1. Get signature
            const { signature, timestamp, cloud_name, api_key } = await cloudinaryService.getSignature();

            // 2. Prepare FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', api_key);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', 'savanna/uploads'); // Must match backend signature params
            // Optional: Add folder if you want to enforce it here, 
            // but if signature includes folder, it must match.
            // Our backend signature didn't specify folder, so Cloudinary will use valid defaults or root.
            // Ideally, backend should specify folder in signature for organization.

            // 3. Upload to Cloudinary
            const uploadRes = await axios.post<UploadResponse>(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    // No auth headers for Cloudinary call itself
                }
            );

            return uploadRes.data.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload image. Please try again.');
        }
    }
};
