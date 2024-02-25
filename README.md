# Homework for the Leap company

Homework that includes a Full Stack exercise
[![Watch the video](https://img.youtube.com/vi/kqjWiuLyyTk/maxresdefault.jpg)](https://www.youtube.com/watch?v=kqjWiuLyyTk)

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/sagiv1996/home-assignment-leap.git
```

2. Run docker-compose:

```bash
docker-compose up -d
```

## Backend

This backend server is built using Nest.js and provides APIs for user management and authentication.

### Features

- **\*User Management**: Allows creating, reading, updating, and deleting users.
- **Authentication**: Provides authentication functionality with JWT tokens.
- **Token Verification**: Verifies user tokens for authentication before processing requests.
- **CORS Whitelist**: Restricts CORS access to specified domains.

## APIs

### User Management

- **Create User**

  - **Method**: POST
  - **URL**: `/user/`
  - **Parameters**: createUserDto
  - **Description**: Creates a new user.

- **Find All Users**

  - **Method**: GET
  - **URL**: `/user/`
  - **Parameters**: page
  - **Description**: Retrieves all users, paginated.

- **Find User By ID**

  - **Method**: GET
  - **URL**: `/user/:id`
  - **Parameters**: id
  - **Description**: Retrieves a user by ID.

- **Update User**

  - **Method**: PUT
  - **URL**: `/user/:id`
  - **Parameters**: id, updateUserDto
  - **Description**: Updates a user by ID.

- **Delete User**
  - **Method**: DELETE
  - **URL**: `/user/:id`
  - **Parameters**: id
  - **Description**: Deletes a user by ID.

### Authentication

- **User Login**
  - **Method**: POST
  - **URL**: `/auth/login`
  - **Parameters**: loginDto
  - **Description**: Authenticates a user and generates a JWT token.

## Environment Variables

- **EXTERNAL_API**: Base URL of the external API where user-related data is sent.
- **JWT_SECRET**: Secret key used for JWT token generation and verification.
- **USER_EMAIL**: Default email address used for user-related actions.
- **USER_PASSWORD**: Default password used for user-related actions.

## Frontend

This application is built using Nuxt.js (Nuxt3) and handles user management functionalities including viewing, editing, deleting, and creating users.

## Features

- **User Management**: View, edit, delete, and create users.
- **Dark Mode / Light Mode**: Supports both dark and light mode for user interface customization.
- **Middleware**: Includes middleware to redirect users to the login screen if they are not logged in.

## Usage

### To access the pages and functions of the application, you must log in using the credentials provided on the server side using:

1. Email: Fixed email variable that exists in the backend.
2. Password: Fixed password variable that exists in the backend.

- If you attempt to access pages without logging in, the middleware will redirect you to the login screen.
