// src/pages/DestinationDetails.jsx
//
// DYNAMIC ROUTING: this page is rendered for the route "/destination/:id"
// (see App.jsx). useParams() reads the ":id" part of the current URL,
// e.g. visiting /destination/goa gives us { id: "goa" }.
// We then look that id up in our local data array.

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinations from "../data/destinations";
import { createPaymentOrder, getDestination } from "../lib/api";
import Rating from "../components/Rating";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(() => destinations.find((item) => item.id === id));
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [paymentState, setPaymentState] = useState("idle");
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    let isCurrent = true;
    const localDestination = destinations.find((item) => item.id === id);

    setDestination(localDestination);
    setIsLoading(true);
    setLoadError("");

    getDestination(id)
      .then((item) => {
        if (isCurrent) setDestination(item);
      })
      .catch(() => {
        if (isCurrent && !localDestination) setLoadError("This destination is unavailable right now.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  const startPayment = async () => {
    const amountMatch = String(destination.budget || "").match(/Rs\.\s*([\d,]+)/i);
    const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 500;

    setPaymentState("loading");
    setPaymentMessage("");
    try {
      const response = await createPaymentOrder(amount);
      const { orderId, keyId, amount: orderAmount, currency } = response.data;
      if (!window.Razorpay) throw new Error("Payment checkout is unavailable. Please try again later.");

      const checkout = new window.Razorpay({
        key: keyId,
        amount: orderAmount,
        currency,
        name: "Travel Destination Explorer",
        description: `Test booking for ${destination.name}`,
        order_id: orderId,
        handler: () => {
          setPaymentState("success");
          setPaymentMessage("Payment completed in Razorpay test mode.");
        },
        modal: { ondismiss: () => setPaymentState("idle") }
      });
      checkout.on("payment.failed", () => {
        setPaymentState("error");
        setPaymentMessage("Payment was not completed. Please try again.");
      });
      checkout.open();
    } catch (error) {
      setPaymentState("error");
      setPaymentMessage(error.message || "Unable to start payment.");
    }
  };

  if (isLoading && !destination) return <div className="not-found"><p className="data-status">Loading destination...</p></div>;

  if (!destination || loadError) {
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
            <button className="submit-btn booking-btn" onClick={startPayment} disabled={paymentState === "loading" || paymentState === "success"}>
              {paymentState === "loading" ? "Starting checkout..." : paymentState === "success" ? "Payment complete" : "Pay Now (Test)"}
            </button>
            {paymentMessage && <p className={paymentState === "error" ? "payment-message payment-error" : "payment-message"}>{paymentMessage}</p>}
            {paymentState === "error" && <button className="favorite-pill retry-btn" onClick={startPayment}>Retry payment</button>}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default DestinationDetails;
