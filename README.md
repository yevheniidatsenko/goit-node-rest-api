# REST API for Contact Management

This project implements a REST API using Node.js and Express.js for managing a collection of contacts.

## Features

- **GET /api/contacts**: Retrieves all contacts.
- **GET /api/contacts/:id**: Retrieves a contact by ID.
- **DELETE /api/contacts/:id**: Deletes a contact by ID.
- **POST /api/contacts**: Creates a new contact.
- **PUT /api/contacts/:id**: Updates a contact by ID.

## Requirements

- Node.js
- Express.js
- Joi for validation

## Usage

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use Postman to test API endpoints.

## API Endpoints

### GET /api/contacts

Returns all contacts in JSON format.

### GET /api/contacts/:id

Returns a contact by ID in JSON format. Returns "Not found" with a 404 status if the contact does not exist.

### DELETE /api/contacts/:id

Deletes a contact by ID. Returns the deleted contact in JSON format. Returns "Not found" with a 404 status if the contact does not exist.

### POST /api/contacts

Creates a new contact. Requires a JSON body with `name`, `email`, and `phone`. Returns the new contact with a 201 status. Returns an error message with a 400 status if validation fails.

### PUT /api/contacts/:id

Updates a contact by ID. Requires at least one field in the JSON body. Validates fields using Joi. Returns the updated contact with a 200 status. Returns "Not found" with a 404 status if the contact does not exist.

## Results

- Successfully implemented all required functionalities.
- Below is a screenshot of the console output showcasing the results of executed commands:

![Task Results](/assets/SCR_1.png)
![Task Results](/assets/SCR_2.png)
![Task Results](/assets/SCR_3.png)
![Task Results](/assets/SCR_4.png)
![Task Results](/assets/SCR_5.png)
![Task Results](/assets/SCR_6.png)
![Task Results](/assets/SCR_7.png)
![Task Results](/assets/SCR_8.png)
![Task Results](/assets/SCR_9.png)
![Task Results](/assets/SCR_10.png)
