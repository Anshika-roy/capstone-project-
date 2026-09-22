// src/components/Rating.jsx
//
// A small, reusable "presentational" component. It takes a numeric
// "value" prop (e.g. 4.5) and renders it as filled/half/empty stars.
// It has NO state of its own -- it just displays whatever prop it is given.

import "./Rating.css";

function Rating({ value }) {
  const stars = [1, 2, 3, 4, 5].map((starNumber) => {
    let symbol = "☆"; // empty star
    if (value >= starNumber) {
      symbol = "★"; // full star
    } else if (value >= starNumber - 0.5) {
      symbol = "★"; // treat half as full for simplicity, styled lighter below
    }
    return symbol;
  });

  return (
    <div className="rating" title={`${value} out of 5`}>
      <span className="rating-stars">{stars.join(" ")}</span>
      <span className="rating-value">{value.toFixed(1)}</span>
    </div>
  );
}

export default Rating;
