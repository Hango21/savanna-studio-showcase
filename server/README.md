# Savanna Photo Studio Backend

Backend API for Savanna Photo Studio, built with Node.js, Express, MongoDB, and Cloudinary.

## Setup

1.  **Install Dependencies**
    ```bash
    cd server
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the `server` directory based on `.env.example`.
    Fill in your MongoDB URI and Cloudinary credentials.

    ```
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

3.  **Seed Database (Optional)**
    To create an initial admin user (username: `admin`, password: `admin123`):
    ```bash
    npm run seed
    ```

4.  **Start Server**
    ```bash
    npm run dev
    ```

## API Endpoints

### Auth
- `POST /api/auth/login` - Admin login

### Slideshow
- `GET /api/slides` - Get all slides
- `POST /api/slides` - Create slide (Admin, Form-data with image)
- `DELETE /api/slides/:id` - Delete slide (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Photos
- `GET /api/photos` - Get all photos
- `POST /api/photos` - Create photo (Admin, Form-data with image)
- `DELETE /api/photos/:id` - Delete photo (Admin)
