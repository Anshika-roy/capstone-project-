// src/pages/DestinationDetails.jsx
//
// DYNAMIC ROUTING: this page is rendered for the route "/destination/:id"
// (see App.jsx). useParams() reads the ":id" part of the current URL,
// e.g. visiting /destination/goa gives us { id: "goa" }.
// We then look that id up in our local data array.

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";
import Rating from "../components/Rating";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id);

  const [isFavorite, setIsFavorite] = useState(false);

  if (!destination) {
    return (
      <div className="not-found">
        <h2>Destination not found</h2>
        <p>We couldn't find "{id}" in our list.</p>
        <Link to="/explore">← Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/explore" className="back-link">← Back to Explore</Link>

      <div className="details-hero">
        <img src={destination.image} alt={destination.name} />
        <div className="details-hero-overlay">
          <span className="details-category">{destination.category}</span>
          <h1>{destination.name}</h1>
          <p>{destination.state}</p>
        </div>
      </div>

      <div className="details-content">
        <div className="details-main">
          <div className="details-top-row">
            <Rating value={destination.rating} />
            <button
              className={isFavorite ? "favorite-pill active" : "favorite-pill"}
              onClick={() => setIsFavorite((prev) => !prev)}
            >
              {isFavorite ? "♥ Saved to favorites" : "♡ Add to favorites"}
            </button>
          </div>

          <h2>About {destination.name}</h2>
          <p className="details-description">{destination.description}</p>

          <h2>Top Attractions</h2>
          <ul className="chip-list">
            {destination.attractions.map((attraction) => (
              <li key={attraction}>{attraction}</li>
            ))}
          </ul>

          <h2>Things to Do</h2>
          <ul className="chip-list activities">
            {destination.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>

        <aside className="details-sidebar">
          <div className="sidebar-card">
            <h3>Trip Info</h3>
            <div className="sidebar-row">
              <span className="sidebar-label">Estimated Budget</span>
              <span className="sidebar-value">{destination.budget}</span>
            </div>
            <div className="sidebar-row">
              <span className="sidebar-label">Best Time to Visit</span>
              <span className="sidebar-value">{destination.bestTimeToVisit}</span>
            </div>
            <div className="sidebar-row">
              <span className="sidebar-label">Rating</span>
              <span className="sidebar-value"><Rating value={destination.rating} /></span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default DestinationDetails;
