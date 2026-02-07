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
