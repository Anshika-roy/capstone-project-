// src/components/DestinationGrid.jsx
//
// Takes an array of destinations as a prop and renders one
// <DestinationCard> per item using map(). This is the core example
// of "displaying data dynamically" instead of hard-coding HTML.

import DestinationCard from "./DestinationCard";
import "./DestinationGrid.css";

function DestinationGrid({ destinationList }) {
  if (destinationList.length === 0) {
    return <p className="no-results">No destinations match your search. Try a different keyword or category.</p>;
  }

  return (
    <div className="destination-grid">
      {destinationList.map((destination) => (
        // "key" must be a unique, stable value -- we use destination.id.
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}

export default DestinationGrid;
