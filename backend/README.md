# Travel Destination Explorer Backend

Person 2 backend for Advanced Web Technology Lab Experiments 5, 6, 7, 8, and 9. Experiment 8 uses a simple Razorpay test-mode order flow.

## Local setup

```bash
npm install
npm run dev
```

The Express server uses port `5000` by default.

## Environment variables

Create a local `.env` file. It is ignored by Git and must not be committed.

```text
PORT=5000
MONGO_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Use Razorpay Test Mode credentials only. The key secret stays on the backend. Do not put credentials in this README.

## Experiment 5: React, Express, Mongoose, MongoDB

Start the backend with `npm run dev`. Person 1 can call:

```js
const response = await fetch("http://localhost:5000/api/destinations");
const result = await response.json();
```

See [BACKEND_API.md](BACKEND_API.md) for destination API details.

## Experiment 6: Node HTTP server

```bash
node experiments/exp6-node-http.js
```

Open `http://localhost:6006`. The response is a simple Travel Destination Explorer message.

## Experiment 7: Express form processing

Open [experiments/exp7-form.html](experiments/exp7-form.html) while the main server is running. Enter a name and email and submit the form to `POST /api/form`.

## Experiment 8: Razorpay test mode

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to Razorpay Test Mode credentials, restart the server, and call:

```text
POST http://localhost:5000/api/payment
```

Request body:

```json
{
  "amount": 500,
  "currency": "INR"
}
```

The backend treats `amount` as rupees and converts it to paise for Razorpay. Therefore, `500` becomes `50000` paise. It creates a Razorpay test order and returns the order ID, amount, currency, status, and public key ID for later Razorpay Checkout use.

The key secret remains on the backend. The backend never receives or stores raw card details. Use Razorpay Test/Sandbox Mode only; no real money is charged. If credentials are missing, the endpoint returns a configuration error instead of pretending that an order was created.

Person 1 can later use the returned `orderId`, `amount`, `currency`, and `keyId` with the Razorpay Checkout client integration. The key secret must never be sent to the frontend.

## Experiment 9: GitHub and deployment preparation

```bash
git init
git add .
git commit -m "Prepare Travel Destination Explorer backend"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_REPOSITORY_URL` with the repository you create. Do not commit `.env` or credentials.

For a Node.js hosting service:

- Build command: none required
- Start command: `npm start`
- Configure `PORT`, `MONGO_URI`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET`
- Allow the hosting service to access MongoDB Atlas
- Configure CORS for the deployed frontend origin
- Use the deployed backend URL in the React frontend

Domain/DNS preparation means pointing a purchased domain's DNS records at the hosting service. This project does not purchase a domain or deploy automatically.

## Health check

```text
GET http://localhost:5000/api/health
```
