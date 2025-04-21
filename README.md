# Authentication and authorisation

## Description

A simple RESTful API for managing user contacts with JWT authentication. Users can register, log in, and perform CRUD operations on their contacts securely.

## Features

- User registration and login with JWT tokens
- Protected routes with authorization middleware
- Create, read, update, and delete contacts
- Automatic timestamps for users and contacts
- Tested with Postman

**Manage Users:**

- Use endpoints like:
  - POST `/api/auth/register` — register a new user
  - POST `/api/auth/login` — login and receive JWT token
  - GET `/api/auth/current` — get current logged-in user info (requires token)
  - POST `/api/auth/logout` — logout the user (requires token)
  - PATCH `/api/auth/users/:id/subscription` — update user subscription (requires token)

**Manage Contacts**

- Use endpoints like:
  - GET `/api/contacts` — list contacts
  - POST `/api/contacts` — create contact
  - PATCH `/api/contacts/:id` — update contact
  - DELETE `/api/contacts/:id` — delete contact

## Results

- Successfully implemented all required functionalities.
- Below is a screenshot of the output showcasing the results of executed commands:

![Task Results](/screenshots/SCR_1.png)
![Task Results](/screenshots/SCR_2.png)
![Task Results](/screenshots/SCR_3.png)
