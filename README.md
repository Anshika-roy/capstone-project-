# Travel Destination Explorer — Advanced Web Technology Capstone

React.js frontend for the Advanced Web Technology capstone project. The
existing destination UI is connected to the Express/Mongoose backend, with
local data retained as a graceful fallback when the API is unavailable.

## Setup

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Backend integration

The frontend uses `VITE_API_URL` as its centralized API base URL. For local
development, set it to `http://localhost:5000/api`. Production builds use the
deployed backend at `https://capstone-project-d5cd.onrender.com/api` unless a
different value is provided at build time.

The Explore and destination detail views use the destinations API, Contact
submits to the enquiry API, and the destination detail page starts the
Razorpay test checkout through the backend payment API. Backend secrets remain
server-side.

## Lab demonstrations

- Registration: `/register` (React/HTML5 validation and localStorage)
- Login: `/login` (React form handling and localStorage)
- Experiment 2: `/experiments/exp2-jquery.html` (jQuery password strength and star rating)
- Experiment 6: `backend/experiments/exp6-node-http.js`
- Experiment 7: `backend/experiments/exp7-form.html` and `POST /api/form`
- Experiment 8: existing `Pay Now (Test)` action on destination details

GitHub Pages provides HTTPS for the frontend and Render provides HTTPS for the
deployed backend. No manual Apache, OpenSSL, Certbot, or Let's Encrypt setup is
claimed by this project.

## Folder structure

```
src/
├── components/   Navbar, Footer, DestinationCard, SearchBar,
│                 CategoryFilter, Rating, DestinationGrid
├── pages/        Home, Explore, DestinationDetails, About, Contact,
│                 Register, Login
├── data/         destinations.js (local array of 6 destinations)
├── App.jsx       Route definitions
├── main.jsx      React + Router entry point
└── App.css       Global styles / CSS variables
```
