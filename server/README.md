# Nest.js Backend Server

This backend server is built using Nest.js and provides APIs for user management and authentication.

## Features

- **User Management**: Allows creating, reading, updating, and deleting users.
- **Authentication**: Provides authentication functionality with JWT tokens.
- **External API Interaction**: Sends user-related data to an external API specified in the environment variable `EXTERNAL_API`.
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

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/your/repository.git
```

2. Install dependencies using yarn:

```bash
yarn install
```

3. Set up environment variables:

- Create a .env file in the root directory.
- Define the required environment variables (EXTERNAL_API, JWT_SECRET, USER_EMAIL, USER_PASSWORD) in the .env file.

4. start the server:

```bash
yarn start
```

The server will start running and listening for incoming requests.
