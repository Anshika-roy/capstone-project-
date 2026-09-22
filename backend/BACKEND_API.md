# Travel Destination Explorer API

Base URL: `http://localhost:5000`

## Health

### `GET /api/health`

```json
{
  "success": true,
  "message": "Travel Destination Explorer backend is running!"
}
```

## Experiment 5: destinations

### `GET /api/destinations`

Returns destinations. Optional query parameters are `search`, `category`, `state`, `country`, and `budget`.

Example:

```text
GET /api/destinations?search=Goa&category=Beach
```

### `GET /api/destinations/:id`

Returns one destination.

### `POST /api/destinations`

```json
{
  "name": "Goa",
  "state": "Goa",
  "country": "India",
  "description": "A beach destination",
  "category": "Beach",
  "budget": "Medium"
}
```

## Experiment 6: Node HTTP

Run:

```bash
node experiments/exp6-node-http.js
```

Then open `http://localhost:6006`.

## Experiment 7: Express form

### `POST /api/form`

```json
{
  "name": "Anshi",
  "email": "student@example.com"
}
```

The HTML form is [experiments/exp7-form.html](experiments/exp7-form.html).

## Experiment 8: Razorpay test mode

### `POST /api/payment`

Configure these environment variables with Razorpay Test Mode credentials:

```text
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Request:

```json
{
  "amount": 500,
  "currency": "INR"
}
```

`amount` is supplied in rupees and converted to paise before the Razorpay Orders API call. The example creates an order for `50000` paise.

Successful response shape:

```json
{
  "success": true,
  "message": "Razorpay test order created",
  "data": {
    "orderId": "order_example",
    "amount": 50000,
    "currency": "INR",
    "status": "created",
    "keyId": "rzp_test_example"
  }
}
```

The response includes the public Key ID for later Razorpay Checkout use. It never includes `RAZORPAY_KEY_SECRET`. The backend does not receive or store raw card information.

Person 1 can later pass `orderId`, `amount`, `currency`, and `keyId` to Razorpay Checkout. The frontend must never receive the key secret.

When test credentials are missing or the key ID is not a Test Mode key, the endpoint returns:

```json
{
  "success": false,
  "message": "Razorpay test mode is not configured"
}
```

No real money is used. Use Razorpay Test/Sandbox Mode only.

## Errors

```json
{
  "success": false,
  "message": "Readable error message"
}
```
