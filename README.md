# Task Management API

A RESTful Task Management API built with **Node.js, Express.js, MongoDB, and JWT authentication**.

The API allows users to register, authenticate securely, manage their own tasks, and search, filter, and paginate task data.

## Features

### Authentication & User Management

* User registration
* Password hashing using bcrypt
* User login
* JWT-based authentication
* Protected routes
* Authenticated user profile
* Duplicate email handling
* Secure authentication error responses

### Task Management

Authenticated users can:

* Create tasks
* View all their tasks
* View a single task
* Update tasks
* Delete tasks

Each task contains:

* Title
* Description
* Status
* Priority
* Due date
* Creation date
* Associated user

### Search, Filtering & Pagination

The task listing API supports:

* Search by title or description
* Filter by status
* Filter by priority
* Pagination using `page` and `limit`
* Combining search and filters

Example:

```http
GET /api/tasks?status=Completed&page=1&limit=10
```
## Tech Stack

* **Node.js** — Runtime environment
* **Express.js** — REST API framework
* **MongoDB** — Database
* **Mongoose** — MongoDB ODM
* **JWT** — Authentication
* **bcryptjs** — Password hashing
* **dotenv** — Environment variable management
* **Nodemon** — Development server

## Architecture

The project follows a layered architecture to separate responsibilities between different parts of the application.

```text
Client
  │
  ▼
Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Repositories
  │
  ▼
Models
  │
  ▼
MongoDB
```

### Routes

Responsible for defining API endpoints and connecting them with controllers.

### Controllers

Handle HTTP requests and responses. Controllers receive request data, call the appropriate service, and return the API response.

### Services

Contain application/business logic and coordinate operations between controllers and repositories.

### Repositories

Responsible for database operations and keep database access separate from business logic.

### Models

Define the MongoDB document structure and validation rules using Mongoose.

### Middleware

The project uses middleware for:

* JWT authentication
* Centralized error handling

---

## Project Structure

```text
task-management-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── task.model.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │   └── task.repository.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── task.service.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   └── jwt.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
``

## Authentication Flow

### Registration

```text
Client
  │
  │ POST /api/auth/register
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Auth Service
  │
  ├── Check existing email
  ├── Hash password
  │
  ▼
User Repository
  │
  ▼
MongoDB
```

Passwords are hashed using `bcryptjs` before being stored in the database.

The API does not return the stored password hash in the registration response.

### Login

```text
Client
  │
  │ POST /api/auth/login
  ▼
Controller
  │
  ▼
Auth Service
  │
  ├── Find user
  ├── Compare password
  └── Generate JWT
  │
  ▼
Client receives JWT
```

The JWT is then sent with protected requests using:

```http
Authorization: Bearer <JWT>
```

### Protected Requests

The authentication middleware verifies the JWT and attaches the authenticated user's information to the request.

```text
JWT
 │
 ▼
Authentication Middleware
 │
 ├── Invalid → 401
 │
 └── Valid
      │
      ▼
   Controller
```

## Task Ownership

Each task is associated with the user who created it.

Task queries use the authenticated user's ID when accessing task data. This ensures that a user can only access, update, or delete their own tasks.

For example:

```text
User A
  └── Task 1
  └── Task 2

User B
  └── Task 3
  └── Task 4
```

User A cannot access User B's tasks through the API.

## Task Validation

### Status

Allowed values:

```text
Pending
In Progress
Completed
```

### Priority

Allowed values:

```text
Low
Medium
High
```

Mongoose schema validation is used to enforce these values.
## API Endpoints

### Authentication

| Method | Endpoint             | Authentication | Description                       |
| ------ | -------------------- | -------------- | --------------------------------- |
| POST   | `/api/auth/register` | No             | Register a new user               |
| POST   | `/api/auth/login`    | No             | Authenticate user and receive JWT |
| GET    | `/api/auth/profile`  | Yes            | Get authenticated user's profile  |

### Tasks

| Method | Endpoint         | Authentication | Description                    |
| ------ | ---------------- | -------------- | ------------------------------ |
| POST   | `/api/tasks`     | Yes            | Create a task                  |
| GET    | `/api/tasks`     | Yes            | Get authenticated user's tasks |
| GET    | `/api/tasks/:id` | Yes            | Get a single task              |
| PUT    | `/api/tasks/:id` | Yes            | Update a task                  |
| DELETE | `/api/tasks/:id` | Yes            | Delete a task                  |

---

## Task List Query Parameters

The task listing endpoint supports the following query parameters:

| Parameter  | Description                  |
| ---------- | ---------------------------- |
| `search`   | Search title and description |
| `status`   | Filter by task status        |
| `priority` | Filter by task priority      |
| `page`     | Page number                  |
| `limit`    | Number of tasks per page     |

### Examples

Get all tasks:

```http
GET /api/tasks
```

Search:

```http
GET /api/tasks?search=API
```

Filter by status:

```http
GET /api/tasks?status=Completed
```

Filter by priority:

```http
GET /api/tasks?priority=High
```

Search and filter:

```http
GET /api/tasks?search=API&status=Completed
```

Pagination:

```http
GET /api/tasks?page=1&limit=10
```

Combined query:

```http
GET /api/tasks?status=Completed&priority=High&page=1&limit=10
```

---

## Error Handling

The application uses centralized error handling through an Express error-handling middleware.

The API handles common errors including:

* Validation errors
* Invalid MongoDB IDs
* Authentication errors
* Resource not found errors
* Duplicate user registration
* Invalid login credentials
* Unexpected server errors

Example:

```json
{
  "message": "Task not found"
}
```

For invalid IDs:

```json
{
  "message": "Invalid ID"
}
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management-api
JWT_SECRET=your_secret_key
```

Do not commit the actual `.env` file to GitHub.

Use `.env.example` as a template for required environment variables.

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the project:

```bash
cd task-management-api
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```text
.env
```

Add the required environment variables.

## Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
node src/server.js
```

The server will run on:

```text
http://localhost:5000
```
## Testing with Postman

A Postman collection is included with the project for testing the API.

The collection covers:

* User registration
* User login
* User profile
* Task creation
* Task listing
* Search
* Status filtering
* Priority filtering
* Pagination
* Single task retrieval
* Task update
* Task deletion

Protected endpoints require a valid JWT in the Authorization header:

``http
Authorization: Bearer <JWT>
``
## Security Considerations

The API implements the following security measures:

* Passwords are hashed using bcrypt
* Protected endpoints require JWT authentication
* Users can only access their own tasks
* Input validation is handled through Mongoose schema validation
* Authentication errors do not expose sensitive information
* Password hashes are not returned in user API responses
* Environment secrets are stored outside the source code

## Future Improvements

This project intentionally focuses on the requirements of the Task Management API assignment.

Possible future improvements could include:

* Automated API tests
* API rate limiting
* Request logging
* API documentation with Swagger/OpenAPI
* Production deployment
* Database indexing for larger datasets

## Author

Built as a backend development project to demonstrate practical experience with REST API development, authentication, database operations, layered architecture, validation, error handling, and API design.