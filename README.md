# URL Shortener API

A URL Shortener API built with Node.js, Express, and MongoDB. The API allows users to shorten URLs, manage their shortened URLs, and track the number of clicks on each shortened URL. User authentication is required to use the API.

## Features

- **User Authentication & Authorization**:
  - Register a new user
  - Log in an existing user
  - Log out the current user
  - View profile data (name and email)
  - Cookie-based authentication
  - Encrypted passwords (bcrypt)

- **URL Shortening**:
  - Shorten a URL with an optional custom short URL
  - Generate a random short URL if a custom one is not provided
  - Validate the original URL

- **URL Management**:
  - Retrieve all shortened URLs created by the user
  - Track the number of clicks on each shortened URL
  - Return total links generated and total clicks for the user

- **URL Redirection**:
  - Redirect to the original URL when accessing the short URL
  - Increment the click count on each redirect

## API Endpoints

### User Authentication

- **Register**:
  - `POST /api/auth/register`
  - Request Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- **Log in**:
  - `POST /api/auth/login`
  - Request Body: `{ "email": "john@example.com", "password": "password123" }`

- **Log out**:
  - `GET /api/auth/logout`

- **View Profile**:
  - `GET /api/auth/profile`

### URL Management

- **Shorten URL**:
  - `POST /api/urls/shorten`
  - Request Body: `{ "originalUrl": "https://example.com", "nameUrl": "Example", "customShortUrl": "exmpl" }`
  - If `customShortUrl` is not provided, a random one will be generated.

- **Get User's URLs**:
  - `GET /api/urls`
  - Response: `{ "success": true, "totalLinksGenerated": 3, "totalClicks": 18, "urls": [...] }`

- **Redirect Short URL**:
  - `GET /api/urls/:shortUrl`
  - Redirects to the original URL and increments the click count.

## Models

### User Model

- `name`: String, required
- `email`: String, required, unique
- `password`: String, required

### URL Model

- `nameUrl`: String, required, default is the original URL
- `originalUrl`: String, required
- `shortUrl`: String, required, unique
- `user`: ObjectId, references the User model, required
- `clicks`: Number, default is 0

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shashankaz/url_shortener_api.git
   cd url_shortener_api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     ```

4. Start the server:
   ```sh
   npm start
   ```

## Usage

- Use a tool like Postman or cURL to interact with the API.
- Register a new user and log in to get the authentication cookie.
- Use the authentication cookie to access the URL shortening and management endpoints.

---