// src/components/DestinationCard.jsx
//
// Receives one "destination" object as a prop and renders a card for it.
// Also demonstrates LOCAL component state with useState: each card keeps
// track of its own "isFavorite" boolean, independent of every other card.

import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./DestinationCard.css";

function DestinationCard({ destination }) {
  // useState returns [currentValue, functionToUpdateIt].
  // Every DestinationCard instance gets its OWN isFavorite state.
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    // Never mutate state directly -- always call the setter with the new value.
    setIsFavorite((previous) => !previous);
  };

  return (
    <article className="destination-card">
      <div className="card-image-wrap">
        <img src={destination.image} alt={destination.name} loading="lazy" />
        <button
          className={isFavorite ? "favorite-btn active" : "favorite-btn"}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <span className="card-category">{destination.category}</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3>{destination.name}</h3>
          <Rating value={destination.rating} />
        </div>
        <p className="card-state">{destination.state}</p>
        <p className="card-desc">{destination.shortDescription}</p>

        <Link to={`/destination/${destination.id}`} className="view-details-btn">
          View Details →
        </Link>
      </div>
    </article>
  );
}

export default DestinationCard;
