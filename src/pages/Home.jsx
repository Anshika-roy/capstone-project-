// src/pages/Home.jsx
//
// The landing page. Shows a hero section and a handful of "featured"
// destinations (just the first 3 items from our data array), each
// linking into the Explore page or straight to a details page.

import { Link } from "react-router-dom";
import DestinationGrid from "../components/DestinationGrid";
import { useDestinations } from "../hooks/useDestinations";
import "./Home.css";

function Home() {
  const { destinations, isLoading, error } = useDestinations();
  const featured = destinations.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Travel Destination Explorer</p>
          <h1>
            Six states.<br />One journey<br />worth mapping.
          </h1>
          <p className="hero-sub">
            Compare beaches, mountains, backwaters and heritage cities across India,
            then dive into the details before you pack a bag.
          </p>
          <Link to="/explore" className="hero-cta">Explore destinations →</Link>
        </div>
        <div className="hero-image">
          <img src="https://picsum.photos/seed/india-travel-hero/800/900" alt="A scenic Indian travel destination" />
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <h2>Popular right now</h2>
          <Link to="/explore" className="section-link">View all →</Link>
        </div>
        {isLoading && <p className="data-status">Loading live destinations...</p>}
        {error && <p className="data-status data-status-error">{error}</p>}
        <p className="form-link"><Link to="/premium">Premium planning guide</Link></p>
        <DestinationGrid destinationList={featured} />
      </section>
    </div>
  );
}

export default Home;
