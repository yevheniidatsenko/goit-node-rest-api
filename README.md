# Home Assignment: Email Verification in Node.js REST API

## Description

This project extends a REST API for managing contacts by adding user email verification after registration. The verification process uses Nodemailer and the ukr.net SMTP service to send confirmation emails. The implementation ensures that only verified users can log in, enhancing security and data integrity.

## Features

- **User Registration with Email Verification:**

  - On registration, the user receives an email with a unique verification link.
  - The user's `verify` status is set to `false` and a `verificationToken` is generated and stored in the database.

- **Email Verification Endpoint:**

  - `GET /auth/verify/:verificationToken`
  - When the user clicks the link, the API verifies the token.
  - On first use, the token is cleared, `verify` is set to `true`, and a success message is returned.
  - If the link is used again or invalid, a 404 error with `User not found` is returned.

- **Login Restrictions:**

  - Only users with a verified email (`verify: true`) can log in.

- **Resend Verification Email:**
  - `POST /auth/verify` with `{ "email": "user@example.com" }`
  - Allows unverified users to request another verification email.
  - If the email is missing or already verified, appropriate error messages and status codes are returned.

## Technical Details

- **Stack:** Node.js, Express, Sequelize, Nodemailer, ukr.net SMTP
- **User Model:** Includes `verify` (boolean, default `false`) and `verificationToken` (string)
- **Token Generation:** Uses `nanoid` for unique verification tokens
- **Email Sending:** Uses Nodemailer with ukr.net SMTP integration
- **Error Handling:** Returns clear JSON messages and status codes for all scenarios

## Usage

1. **Register a new user:**  
   `POST /auth/register`  
   → User receives a verification email

2. **Verify email:**  
   `GET /auth/verify/:verificationToken`  
   → On first click: 200 OK, "Verification successful"  
   → On repeat/invalid: 404 Not Found, "User not found"

3. **Resend verification email:**  
   `POST /auth/verify` with body `{ "email": "user@example.com" }`  
   → 200 OK if sent, 400 if already verified or missing email

4. **Login:**  
   Only possible after successful email verification

## Results

- Successfully implemented all required functionalities.
- Below is a screenshot of the output showcasing the results of executed commands:

![Task Results](/screenshots/SCR_1.png)
![Task Results](/screenshots/SCR_2.png)
