# Homework: Contacts REST API

## Description

This project is a RESTful API for managing user contacts. Contacts are stored in a PostgreSQL database, and interaction with the database is handled via the Sequelize ORM. The API provides functionality to create, read, update, and delete contacts, as well as update the favorite status of contacts.

---

## Features

- **Retrieve a list of contacts** — returns all contacts from the database.
- **Retrieve a contact by ID** — returns a specific contact by its unique identifier.
- **Add a new contact** — creates a contact with input data validation.
- **Update a contact (PUT)** — fully updates the contact's data.
- **Update the favorite status of a contact (PATCH)** — partially updates the `favorite` field.
- **Delete a contact** — deletes a contact by ID.
- **Automatic management of `createdAt` and `updatedAt` fields** — Sequelize automatically adds and updates these fields when records are created or modified.
- **Data validation** — uses the Joi library to validate input data.
- **Error handling** — provides proper error responses with status codes and messages.

---

## Technologies

- **Node.js** — server-side platform.
- **Express.js** — framework for building REST APIs.
- **PostgreSQL** — relational database.
- **Sequelize** — ORM for working with PostgreSQL.
- **Joi** — library for data validation.
- **Postman** — tool for API testing.

---

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository_URL>
   cd <folder_name>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure the database connection in the configuration file (e.g., `.env`):

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   ```

4. Run migrations (if applicable):

   ```
   npx sequelize-cli db:migrate
   ```

5. Start the server:

   ```
   npm start
   ```

6. Test the API using Postman or another tool with the following endpoints:

   | Method | Endpoint                     | Description                 |
   | ------ | ---------------------------- | --------------------------- |
   | GET    | `/api/contacts`              | Retrieve all contacts       |
   | GET    | `/api/contacts/:id`          | Retrieve a contact by ID    |
   | POST   | `/api/contacts`              | Add a new contact           |
   | PUT    | `/api/contacts/:id`          | Fully update a contact      |
   | PATCH  | `/api/contacts/:id/favorite` | Update the `favorite` field |
   | DELETE | `/api/contacts/:id`          | Delete a contact            |

---

## Example Request for Updating Favorite (PATCH)

```
PATCH /api/contacts/3/favorite
Content-Type: application/json

{
  "favorite": true
}
```

## Results

- Successfully implemented all required functionalities.
- Below is a screenshot of the output showcasing the results of executed commands:

![Task Results](/screenshots/SCR_1.png)
