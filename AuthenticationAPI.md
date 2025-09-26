# Authentication Workflow

1. Obtain Access Token

- Endpoint: /api/v2/auth/oauth/token
- Required: client_id, client_secret, authorization_code, redirect_uri
- Example:
> POST /api/v2/auth/oauth/token
Content-Type: application/x-www-form-urlencoded
grant_type=authorization_code&code=AUTH_CODE&redirect_uri=REDIRECT_URI&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
- Response:
>{
  "access_token": "ACCESS_TOKEN",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "REFRESH_TOKEN"
}


2. Use Access Token

- Include in all requests:
> Authorization: Bearer ACCESS_TOKEN


3. Refresh Token

- Endpoint: /api/v2/auth/refresh

- Example:
>POST /api/v2/auth/refresh
Content-Type: application/json
{
  "refresh_token": "REFRESH_TOKEN"
}
