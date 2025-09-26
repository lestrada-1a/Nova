- GET /api/v1/content/feed  
> Retrieves the main content feed.  
Headers: Authorization: Bearer <token>  
Response: 200 OK, [ { "contentId": "uuid", "title": "string", "body": "string" } ]

- POST /api/v1/content  
> Creates new content.  
Request: { "title": "string", "body": "string" }  
Response: 201 Created, { "contentId": "uuid" }
