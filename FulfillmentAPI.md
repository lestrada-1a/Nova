# Fulfillment API

Integrates with the pilot card manufacturer/fulfillment partner to manage print jobs and shipment tracking. Supports a design-to-ship cycle time target of ≤48 hours.

---

## Print Jobs

- POST /api/v1/fulfillment/jobs  
> Creates a new print job for an approved card design.  
Headers: Authorization: Bearer <token>  
Request: { "designId": "uuid", "customerId": "uuid", "quantity": "integer", "shippingAddress": { "line1": "string", "line2": "string", "city": "string", "state": "string", "postalCode": "string", "country": "string" } }  
Response: 201 Created, { "jobId": "uuid", "status": "accepted", "createdAt": "ISO8601" }

- GET /api/v1/fulfillment/jobs/:jobId  
> Retrieves the current status and details of a print job.  
Headers: Authorization: Bearer <token>  
Response: 200 OK, { "jobId": "uuid", "designId": "uuid", "customerId": "uuid", "status": "accepted|printed|personalized|shipped", "trackingNumber": "string|null", "carrier": "string|null", "estimatedDelivery": "ISO8601|null", "updatedAt": "ISO8601" }

---

## Status Webhooks

Webhook events are sent by the fulfillment partner to notify the platform of print job state changes.

- POST /api/v1/fulfillment/webhooks  
> Receives inbound status events from the fulfillment partner. The platform verifies the request signature using the shared `X-Fulfillment-Signature` header before processing.  
Headers: X-Fulfillment-Signature: <hmac-sha256-signature>  
Request: { "jobId": "uuid", "event": "accepted|printed|personalized|shipped", "timestamp": "ISO8601", "trackingNumber": "string|null", "carrier": "string|null", "estimatedDelivery": "ISO8601|null" }  
Response: 200 OK, { "received": true }

Webhook event lifecycle:
1. `accepted` – fulfillment partner has received and queued the job
2. `printed` – card has been printed
3. `personalized` – card has been personalized (embossed/encoded)
4. `shipped` – card has been dispatched; `trackingNumber`, `carrier`, and `estimatedDelivery` are populated

---

## Customer Tracking

- GET /api/v1/fulfillment/jobs/:jobId/tracking  
> Returns the customer-visible tracking information for a print job. Tracking details become available once the `shipped` webhook event is received.  
Headers: Authorization: Bearer <token>  
Response: 200 OK, { "jobId": "uuid", "status": "accepted|printed|personalized|shipped", "trackingNumber": "string|null", "carrier": "string|null", "estimatedDelivery": "ISO8601|null", "trackingUrl": "string|null" }
