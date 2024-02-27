# Backend Project - Node.js Express.js MongoDB

This is a backend project implemented using Node.js, Express.js, and MongoDB. The project includes user registration, login, and logout functionalities with additional features such as image upload to Cloudinary and JWT token-based authentication.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- MongoDB
- Multer
- Cloudinary
- JWT (JSON Web Tokens)
- Mongoose
- Bcrypt

## Project Structure

### 1. User Controller (`user.controller.js`)

- **Register User:** Handles user registration, including validation, checking for existing users, image upload to Cloudinary, and user creation in the MongoDB database.

- **Login User:** Manages user login by validating credentials, generating access and refresh tokens, and setting cookies.

- **Logout User:** Clears user session by removing cookies.

### 2. User Router (`user.router.js`)

Defines routes for user-related actions, including registration, login, and logout. Utilizes middleware for file upload (`multer.middleware.js`) and authentication (`auth.middleware.js`).

### 3. Auth Middleware (`auth.middleware.js`)

Middleware to verify JWT tokens for user authentication. Ensures secure access to protected routes.

### 4. Multer Middleware (`multer.middleware.js`)

Middleware for handling file uploads using Multer. Configures storage and defines file upload fields for avatar and cover images.

### 5. User Model (`user.model.js`)

Defines the MongoDB schema for the User model. Includes methods for hashing passwords, checking password correctness, and generating access and refresh tokens.

### 6. Video Model (`video.model.js`)

Defines the MongoDB schema for the Video model, which includes details about video files, thumbnails, titles, descriptions, durations, and ownership.

### 7. API Error (`api.error.js`)

Custom class for handling API errors with specific status codes, messages, and details.

### 8. API Response (`api.response.js`)

Class representing the structure of API responses with status codes, data, and messages.

### 9. Async Handler (`async.handler.js`)

Middleware for handling asynchronous functions, ensuring proper error handling.

### 10. Cloudinary (`cloudinary.js`)

Module for interacting with the Cloudinary service, including file upload and error handling.

### 11. `app.js`

Main entry point for the application, where the Express app is configured, middleware is applied, and routes are defined.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and Cloudinary account.
4. Configure environment variables in a `.env` file (refer to `.env.example`).
5. Start the server using `npm start`.

## Usage

1. Register a new user using the `/api/v1/users/register` endpoint.
2. Login with the registered user credentials using the `/api/v1/users/login` endpoint.
3. Logout using the `/api/v1/users/logout` endpoint.

Feel free to explore additional functionalities and customize the project as needed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, contact [Brijesh Patra] at [brijeshpatra25@gmail.com].
