**Home Assignment: REST API with File Upload**

### Overview

Implemented a Node.js/Express REST API for user management with avatar upload functionality using Multer. Key features include user registration with Gravatar-based avatars, login/logout, and avatar updates via file upload.

### Features

1. **Static File Handling**

   - `public/avatars` for serving static avatar images
   - `temp` folder for temporary uploads
   - Express static middleware configuration

2. **User Model**

   - Added `avatarURL` field (STRING)
   - Gravatar integration for default avatars

3. **Endpoints**

   - `POST /auth/register` - Create user with Gravatar
   - `POST /auth/login` - JWT authentication
   - `PATCH /auth/avatars` - Avatar update (Multer middleware)
   - `GET /users/current` - Current user info

4. **File Upload**
   - Multer configuration for temp storage
   - File validation (size/type via middleware)
   - Atomic file operations with cleanup

## Results

- Successfully implemented all required functionalities.
- Below is a screenshot of the output showcasing the results of executed commands:

![Task Results](/screenshots/SCR_1.png)
![Task Results](/screenshots/SCR_2.png)
![Task Results](/screenshots/SCR_3.png)
![Task Results](/screenshots/SCR_4.png)
