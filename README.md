<h1 align="center">
  NestJS, TypeORM, Postgres & Docker Backend part of Economic Dashboard
</h1>

In this repository, you will find the backend part of the Economic Dashboard. The backend is built with NestJS, TypeORM, Postgres & Docker. The backend is responsible for handling all the business logic and data storage for the Economic Dashboard. The backend is built with a modular architecture, which makes it easy to add new features and endpoints.

The frontend part of the Economic Dashboard can be found in the following repository: [Economic Dashboard Frontend](https://github.com/MarkusIngerslev/next-economic-frontend).

## Table of Contents

1. [Endpoints](#endpoints) _Work in progress_

   - [Authentication & User management](#authentication--user-management)
   - [Income & Expense management](#income--expense-management)
   - [Categories](#categories)
   - [Statistics](#statistics)
   - [Transactions](#transactions)
   - [Automaic notifications/reminders](#automaic-notificationsreminders)
   - [Export Data](#export-data)

1. [Installation](#installation) _Still missing_
1. [Running the app](#running-the-app) _Still missing_
1. [Test](#test) _Still missing_
1. [TODO](#todo) _Work in progress_

## Endpoints

In this section, you will find a complet list of all the endpoints that are available in the backend. The endpoints are divided into different sections based on their functionality. Most of the endpoints are protected and require a valid JWT-token to access. The only endpoints that are not protected are the ones for authentication.

Some of the sections will also display a json scheme, to showcase what the request body should look like when sending a request to the endpoint. The json scheme is only a guideline and not a strict requirement. The json scheme is only there to help you understand what the request body should look like.

### Authentication & User management

Endpoints for authentication and user management.

- `GET /users` - Fetch information about all users (admin only)
- `GET /users/profile` - Fetch information about the current user
- `PUT /auth/admin/update-user-roles/:id` - Update a single users role (admin only)
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
- `PUT /income/:id` - Update a single income
- `DELETE /income/:id` - Delete a single income

##### JSON Schema for income

```json
{
  "amount": 25000,
  "category": "Løn",
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
- `PUT /expense/:id` - Update a single expense
- `DELETE /expense/:id` - Delete a single expense

##### JSON Schema for expense

```json
{
  "amount": 150,
  "category": "Mad",
  "date": "2025-03-02",
  "description": "McDonalds"
}
```

#### Categories

- `GET /categories` - Fetch all categories
- `POST /categories` - Create a new category
- `GET /categories/:id` - Fetch a single category
- `PUT /categories/:id` - Update a single category
- `DELETE /categories/:id` - Delete a single category

##### JSON Schema for category

```json
{
  "name": "Transport"
}
```

#### Statistics

- `GET /statistics` - Fetch a summery of the users incomes and expenses (total income, total expense, total balance)
- `GET /statistics/:month` - Fetch a specific months summery
- `POST /statistics/budget` - Create a new budget for a month/category
- `GET /statistics/budget/:month` - Fetch a specific months budget

##### JSON Schema for budget

```json
{
  "month": "2025-03",
  "category": "Mad",
  "amount": 2000
}
```

#### Transaktions

- `GET /transactions` - Fetch all transactions
- `GET /transactions/:id` - Fetch a single transaction
- `POST /transactions` - Create a new transaction
- `PUT /transactions/:id` - Update a single transaction
- `DELETE /transactions/:id` - Delete a single transaction

##### JSON Schema for transaction

```json
{
  "type": "expense",
  "amount": 500,
  "category": "Shopping",
  "date": "2025-03-10",
  "description": "Køb af nye sko"
}
```

#### Automaic notifications/reminders

These are endpoints for automatic notifications/reminders about budget overspending and such.

- `GET /notifications` - Fetch all notifications
- `POST /notifications` - Create a new notification
- `DELETE /notifications/:id` - Delete a single notification

#### Export Data

These are endpoints for exporting data to a file in different formats.

- `GET /export/csv` - Exports all transaktions to a CSV-file
- `GET /export/pdf` - Exports all transaktions to a PDF-file

#### Dashboard (Frontend)

These are endpoints for the frontend dashboard.

- `GET /dashboard/stats` - Fetch statistics for the dashboard
- `GET /dashboard/trends` - Fetch budgets for the dashboard

## Installation

## Running the app

## Test

## TODO

This todo list is a list of things left to implement in the backend.

1. [x] Implement JWT and role based authentication
   - [x] Implement JWT authentication
   - [x] Implement role based authentication
   - [x] Implement guards for the endpoints
   - [x] Implement so admin role can access all endpoints (also the ones not specified as admin only)
1. [x] Implement the endpoints for the authentication
   - [x] Implement the endpoint for fetching the current logged ind user
   - [x] Implement the endpoint for fetching all users (admin only)
   - [x] Implement the endpoint for updating a single user role (admin only)
   - [x] Implement the endpoint for logging in
1. [x] Implement the endpoints for the incomes
   - [x] Implement the endpoint for fetching all incomes (admin only)
   - [x] Implement the endpoint for fetching all of a users incomes
   - [x] Implement the endpoint for fetching a single users incomes (admin only)
   - [x] Implement the endpoint for creating a new income
   - [x] Implement the endpoint for fetching a single income
   - [x] Implement the endpoint for updating a single income
   - [x] Implement the endpoint for deleting a single income
1. [x] Implement the endpoints for the expenses
   - [x] Implement the endpoint for fetching all incomes (admin only)
   - [x] Implement the endpoint for fetching all of a users expenses
   - [x] Implement the endpoint for fetching a single users expenses (admin only)
   - [x] Implement the endpoint for creating a new expense
   - [x] Implement the endpoint for fetching a single expense
   - [x] Implement the endpoint for updating a single expense
   - [x] Implement the endpoint for deleting a single expense
1. [ ] Implement the endpoints for the categories
   - [ ] Implement the endpoint for fetching all categories
   - [ ] Implement the endpoint for fetching a single category
   - [ ] Implement the endpoint for creating a new category
   - [ ] Implement the endpoint for updating a single category
   - [ ] Implement the endpoint for deleting a single category
1. [ ] Implement the endpoints for the statistics
   - [ ] Implement the endpoint for fetching the statistics
   - [ ] Implement the endpoint for fetching a specific months statistics
   - [ ] Implement the endpoint for creating a new budget
   - [ ] Implement the endpoint for fetching a specific months budget
1. [ ] Implement the endpoints for the transactions
   - [ ] Implement the endpoint for fetching all transactions
   - [ ] Implement the endpoint for fetching a single transaction
   - [ ] Implement the endpoint for creating a new transaction
   - [ ] Implement the endpoint for updating a single transaction
   - [ ] Implement the endpoint for deleting a single transaction
1. [ ] Implement the endpoints for the notifications
   - [ ] Implement the endpoint for fetching all notifications
   - [ ] Implement the endpoint for creating a new notification
   - [ ] Implement the endpoint for deleting a single notification
1. [ ] Implement the endpoints for the export data
   - [ ] Implement the endpoint for exporting all transactions to a CSV-file
   - [ ] Implement the endpoint for exporting all transactions to a PDF-file
1. [ ] Implement the endpoints for the dashboard
   - [ ] Implement the endpoint for the stats
   - [ ] Implement the endpoint for the trends
