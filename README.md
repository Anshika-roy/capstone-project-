# Travel Destination Explorer — Experiment 3

React.js frontend for the Advanced Web Technology capstone project.
No backend (MongoDB/Express/Node) is used in this experiment — data lives in
`src/data/destinations.js`.

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

## Folder structure

```
src/
├── components/   Navbar, Footer, DestinationCard, SearchBar,
│                 CategoryFilter, Rating, DestinationGrid
├── pages/        Home, Explore, DestinationDetails, About, Contact
├── data/         destinations.js (local array of 6 destinations)
├── App.jsx       Route definitions
├── main.jsx      React + Router entry point
└── App.css       Global styles / CSS variables
```
