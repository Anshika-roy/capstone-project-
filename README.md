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
