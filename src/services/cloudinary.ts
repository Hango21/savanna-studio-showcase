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

    // Compress image before upload
    compressImage: async (file: File): Promise<Blob | File> => {
        // Only compress images > 1MB
        if (file.size < 1024 * 1024) return file;

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1080;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                resolve(file);
                            }
                        },
                        'image/jpeg',
                        0.8 // 80% quality
                    );
                };
            };
        });
    },

    // Upload file directly to Cloudinary
    uploadFile: async (file: File): Promise<string> => {
        try {
            // 1. Compress image
            const compressedFile = await cloudinaryService.compressImage(file);

            // 2. Get signature
            const { signature, timestamp, cloud_name, api_key } = await cloudinaryService.getSignature();

            // 3. Prepare FormData
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('api_key', api_key);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', 'savanna/uploads');

            // 4. Upload to Cloudinary
            const uploadRes = await axios.post<UploadResponse>(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return uploadRes.data.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload image. Please try again.');
        }
    }
};
