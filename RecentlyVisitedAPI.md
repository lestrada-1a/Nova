# Recently Visited API

Supports the "Recently Visited" quick-access sidebar section. Tracks the last items a user accessed (issues, boards, projects, pages), allows recording new visits, and persists the sidebar collapsed/expanded preference per user.

---

## Recently Visited Items

- GET /api/v1/recently-visited  
> Retrieves the authenticated user's recently visited items, ordered by recency (most recent first). Returns up to 10 items grouped by type.  
Headers: Authorization: Bearer <token>  
Query parameters:  
  - `limit` (optional, integer, default: 10, max: 10) — number of items to return  
Response: 200 OK,  
```json
{
  "items": [
    {
      "itemId": "uuid",
      "type": "issue" | "board" | "project",
      "title": "string",
      "url": "string",
      "visitedAt": "ISO 8601 timestamp"
    }
  ]
}
```

- POST /api/v1/recently-visited  
> Records a new visit. If the item already exists in the user's history it is moved to the top. The list is capped at 10 items; the oldest entry is evicted when the cap is exceeded.  
Headers: Authorization: Bearer <token>  
Request:  
```json
{
  "itemId": "uuid",
  "type": "issue" | "board" | "project",
  "title": "string",
  "url": "string"
}
```  
Response: 201 Created,  
```json
{
  "itemId": "uuid",
  "visitedAt": "ISO 8601 timestamp"
}
```

- DELETE /api/v1/recently-visited/{itemId}  
> Removes a single item from the user's recently visited history.  
Headers: Authorization: Bearer <token>  
Path parameter: `itemId` — the UUID of the item to remove  
Response: 204 No Content

---

## Sidebar Preferences

- GET /api/v1/user/preferences/sidebar  
> Retrieves the authenticated user's sidebar display preferences, including the collapsed/expanded state of the Recently Visited section.  
Headers: Authorization: Bearer <token>  
Response: 200 OK,  
```json
{
  "recentlyVisitedCollapsed": false
}
```

- PUT /api/v1/user/preferences/sidebar  
> Updates the authenticated user's sidebar display preferences.  
Headers: Authorization: Bearer <token>  
Request:  
```json
{
  "recentlyVisitedCollapsed": true | false
}
```  
Response: 200 OK,  
```json
{
  "success": true
}
```
