# User Profile

- GET /api/v1/profile  
> Retrieves the authenticated user's profile.  
Headers: Authorization: Bearer <token>  
Response: 200 OK, { "userId": "uuid", "name": "string", "email": "string" }

- PUT /api/v1/profile  
> Updates user profile information.  
Request: { "name": "string", "avatarUrl": "string" }  
Response: 200 OK, { "success": true }
