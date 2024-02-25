# Nuxr3 User Management Application

This application is built using Nuxt.js (Nuxt3) and handles user management functionalities including viewing, editing, deleting, and creating users. It communicates with a backend server whose base URL is specified in the environment variable `NUXT_PUBLIC_API_BASE`.

## Features

- **User Management**: View, edit, delete, and create users.
- **Dark Mode / Light Mode**: Supports both dark and light mode for user interface customization.
- **Middleware**: Includes middleware to redirect users to the login screen if they are not logged in.

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/sagiv1996/home-assignment-leap-front.git
```

2. Install dependencies:

```bash
cd code
yarn i
```

3. Set up environment variables:
   Create a .env file in the root directory.
   Define NUXT_PUBLIC_API_BASE in the .env file with the base URL of your backend server (e.g., NUXT_PUBLIC_API_BASE=http://localhost:3001/api).
   Start the development server (github: https://github.com/sagiv1996/home-assignment-leap-server)

4. Access the application in your browser at http://localhost:3000.

## Usage

### To access the pages and functions of the application, you must log in using the credentials provided on the server side using:

1. Email: email@gmail.com
2. Password: this-is-my-password

- If you attempt to access pages without logging in, the middleware will redirect you to the login screen.
