<h1 align="center">
  Final Project backend - ØkoSmart 
  
</h1>

In this repository, you will find the backend part of the Economic Dashboard. The backend is built with NestJS, TypeORM, Postgres & Docker. The backend is responsible for handling all the business logic and data storage for the Economic Dashboard. The backend is built with a modular architecture, which makes it easy to add new features and endpoints.

The frontend part of the Economic Dashboard can be found in the following repository: [Final Project Frontend - ØkoSmart](https://github.com/MarkusIngerslev/next-economic-frontend).

### Table of Contents

1. [Endpoints](#endpoints)

   - [Authentication & User management](#authentication--user-management)
   - [Income & Expense management](#income--expense-management)
   - [Categories](#categories)
   - [AI](#AI)

1. [Installation](#installation)
1. [Running the app](#running-the-app)

## Endpoints

In this section, you will find a complet list of all the endpoints that are available in the backend. The endpoints are divided into different sections based on their functionality. Most of the endpoints are protected and require a valid JWT-token to access. The only endpoints that are not protected are the ones for authentication.

Some of the sections will also display a json scheme, to showcase what the request body should look like when sending a request to the endpoint. The json scheme is only a guideline and not a strict requirement. The json scheme is only there to help you understand what the request body should look like.

### Authentication & User management

Endpoints for authentication and user management.

- `GET /users` - Fetch information about all users (admin only)
- `GET /users/profile` - Fetch information about the current user
- `PATCH /users/update-profile` - Update information about the current user
- `PATCH /auth/admin/update-user-roles/:id` - Update a single users role (admin only)
- `POST /auth/register` - Register a new user **firstName**, **lastName**, **email**, **password**
- `POST /auth/login` - Login and get JWT-token

### Income & Expense management

Endpoints for managing incomes and expenses.

#### Income

- `GET /income` - Fetch all incomes (admin only)
- `GET /income/me` - Fetch all incomes for logged in user
- `GET /income/:id` - Fetch a single income
- `GET /income/user/:userId` - Fetch all incomes for a single user (admin only)
- `POST /income` - Create a new income
- `PATCH /income/:id` - Update a single income
- `DELETE /income/:id` - Delete a single income

##### JSON Schema for income

```json
{
  "amount": 25000,
  "categoryId": "360ef06c-d673-4457-b1e0-b6ea1c7b023f",
  "date": "2025-03-01",
  "description": "Løn fra arbejde"
}
```

#### Expense

- `GET /expense` - Fetch all expenses (admin only)
- `GET /expense/me` - Fetch all expenses for logged in user
- `GET /expense/:id` - Fetch a single expense
- `GET /expense/user/:userId` - Fetch all expenses for a single user (admin only)
- `POST /expense` - Create a new expense
- `PATCH /expense/:id` - Update a single expense
- `DELETE /expense/:id` - Delete a single expense

##### JSON Schema for expense

```json
{
  "amount": 150,
  "categoryId": "360ef06c-d673-4457-b1e0-b6ea1c7b023f",
  "date": "2025-03-02",
  "description": "McDonalds"
}
```

### Categories

Endpoints for managing categories.

- `GET /category` - Fetch all categories
- `GET /category/:id` - Fetch a single category
- `POST /category` - Create a new category
- `PATCH /category/:id` - Update a single category
- `DELETE /category/:id` - Delete a single category

##### JSON Schema for category

```json
{
  "id": "360ef06c-d673-4457-b1e0-b6ea1c7b023f",
  "name": "Transport",
  "type": "expense"
}
```

### AI

Endpoints for AI completions.

- `POST /ai/completion` - Get AI completion based on user input or input + history
- `POST /ai/contextual-completion` - Get AI completion based on user input and context or input + history + context

##### JSON Schema for AI completion

```json
{
  "message": "Hvordan kan jeg helt konkret spare flere penge?",
  "history": [
    {
      "role": "user",
      "content": "Jeg har brug for at spare penge"
    },
    {
      "role": "assistant",
      "content": "Du kan spare penge ved at lave en budgetplan"
    }
  ]
}
```

```json
{
  "message": "Hvordan kan jeg helt konkret spare flere penge?",
  "history": [
    {
      "role": "user",
      "content": "Jeg har brug for at spare penge"
    },
    {
      "role": "assistant",
      "content": "Du kan spare penge ved at lave en budgetplan"
    }
  ],
  "contextData": {
    "income": [
      {
        "name": "Streaming Service A",
        "amount": 129,
        "category": "Entertainment",
        "date": "2025-01-01",
        "description": "Monthly subscription"
      },
      {
        "name": "Streaming Service B",
        "amount": 99,
        "category": "Entertainment",
        "date": "2025-01-15",
        "description": "Monthly subscription"
      }
    ]
  }
}
```

## Installation

The backend is build with NestJS, TypeORM, Postgres & Docker. To run the backend, you need to have two things installed on your machine, first is Docker second is pnpm. The database is configured to run with Docker, so you don't need to install any dependencies manually.

#### Dotenv

The backend uses a `.env` file to store environment variables. You can create a `.env` file in the root of the project and add the following variables:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
PORT=5050
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC=3600
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

#### Docker

First you need to install [Docker](https://www.docker.com/get-started) on your machine. Once you have Docker installed, you can run the following command to start the database:

```bash
   docker compose up -d
```

This will start the Postgres database in a Docker container. The database will be available on `localhost:5432` and the database name is `postgres`. The username and password for the database is also `postgres`.

#### pnpm

To install the dependencies, you need to have [pnpm](https://pnpm.io/installation) installed on your machine. To install pnpm, you can run the following command:

```bash
npm install -g pnpm
```

## Running the app

Once you have pnpm installed, you can run the following command to install the dependencies:

```bash
pnpm install
```

Followed by:

```bash
pnpm start
```

You should now be able to access the backend on `http://localhost:5050`.

### Uninstall pnpm afterwards

If you don't want to keep pnpm installed on your machine, you can uninstall it by running the following command:

```bash
npm uninstall -g pnpm
```

This will remove pnpm from your machine.

**_This project was created by Markus Ingerslev Olsen_**
