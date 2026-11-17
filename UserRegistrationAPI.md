# User Registration

- POST /api/v1/register  
> Registers a new user account.  
Content-Type: application/json  
Request: { "name": "string", "email": "string", "password": "string", "confirmPassword": "string" }  
Response: 201 Created, { "userId": "uuid" }

## Validation Rules

All fields are validated server-side before an account is created. Leading and trailing whitespace is trimmed from `name` and `email` before validation. Every field is checked and all failures are returned together, so a client can show every problem at once.

| Field | Required | Rules | Error code | Error message |
|---|---|---|---|---|
| `name` | Yes | Must be present and non-empty after trimming | `NAME_REQUIRED` | "Name is required." |
| `name` | | 2 to 50 characters | `NAME_LENGTH` | "Name must be between 2 and 50 characters." |
| `name` | | Letters, spaces, hyphens and apostrophes only | `NAME_INVALID_CHARACTERS` | "Name may contain only letters, spaces, hyphens and apostrophes." |
| `email` | Yes | Must be present and non-empty after trimming | `EMAIL_REQUIRED` | "Email is required." |
| `email` | | At most 254 characters | `EMAIL_LENGTH` | "Email must be at most 254 characters." |
| `email` | | Must be a valid address in the form `local@domain.tld` | `EMAIL_INVALID_FORMAT` | "Email must be a valid email address." |
| `email` | | Must not belong to an existing account (case-insensitive); checked last, only if the rules above pass | `EMAIL_ALREADY_REGISTERED` | "An account with this email already exists." |
| `password` | Yes | Must be present | `PASSWORD_REQUIRED` | "Password is required." |
| `password` | | 8 to 128 characters | `PASSWORD_LENGTH` | "Password must be between 8 and 128 characters." |
| `password` | | Must contain at least one uppercase letter, one lowercase letter and one digit | `PASSWORD_WEAK` | "Password must contain an uppercase letter, a lowercase letter and a digit." |
| `confirmPassword` | Yes | Must be present | `CONFIRM_PASSWORD_REQUIRED` | "Password confirmation is required." |
| `confirmPassword` | | Must exactly match `password` | `PASSWORD_MISMATCH` | "Passwords do not match." |

Unknown fields in the request body are rejected with `UNKNOWN_FIELD` ("Unknown field: <field>."). A field with the wrong JSON type (for example a number instead of a string) is rejected with `INVALID_TYPE` ("<field> must be a string.").

## Error Response

Invalid requests return `400 Bad Request` and no account is created. The one exception is `EMAIL_ALREADY_REGISTERED`, which returns `409 Conflict`.

```json
{
  "error": "VALIDATION_FAILED",
  "details": [
    { "field": "email", "code": "EMAIL_INVALID_FORMAT", "message": "Email must be a valid email address." },
    { "field": "password", "code": "PASSWORD_LENGTH", "message": "Password must be between 8 and 128 characters." }
  ]
}
```

Per field, only the first failing rule is reported.

## Example

> POST /api/v1/register  
Content-Type: application/json  
{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "Analytical1", "confirmPassword": "Analytical1" }

Response: 201 Created
> { "userId": "3f2b8c1e-5a47-4d0e-9b1a-6c2d7e8f9a01" }
