import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createSubscriptionOrder, verifySubscriptionPayment } from "../lib/api";
import "./Contact.css";

function Paywall() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const upgrade = async () => {
    setIsLoading(true);
    setStatus("");
    try {
      const response = await createSubscriptionOrder();
      if (!window.Razorpay) throw new Error("Razorpay Checkout is unavailable.");
      const checkout = new window.Razorpay({
        key: response.data.keyId,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "Travel Destination Explorer",
        description: "Pro destination planning subscription",
        order_id: response.data.orderId,
        handler: async (payment) => {
          try {
            await verifySubscriptionPayment(payment);
            const user = JSON.parse(localStorage.getItem("travelExplorerLogin") || "{}");
            localStorage.setItem("travelExplorerLogin", JSON.stringify({ ...user, subscription: "PREMIUM" }));
            setStatus("Premium Active. Your premium planning guide is unlocked.");
            navigate("/premium");
          } catch (error) {
            setStatus(error.message || "Payment verification failed. Premium remains locked.");
          }
        },
        modal: { ondismiss: () => { setIsLoading(false); setStatus("Payment cancelled. Your Free plan is unchanged."); } }
      });
      checkout.on("payment.failed", () => { setIsLoading(false); setStatus("Payment failed. Your Free plan is unchanged."); });
      checkout.open();
    } catch (error) {
      setIsLoading(false);
      setStatus(error.message || "Unable to start checkout.");
    }
  };

  return (
    <div className="static-page contact-page">
      <h1>Travel Explorer Pro</h1>
      <p>Unlock a focused destination planning guide while keeping the existing Explore experience free.</p>
      <div className="contact-success">
        <h2>Free plan</h2><p>Browse destinations, search, filter, and view destination details.</p>
        <h2>Premium plan · INR 500</h2><p>Unlock the premium destination planning guide and keep all free features.</p>
        <p><strong>Current plan: Free</strong></p>
        <button className="submit-btn" onClick={upgrade} disabled={isLoading}>{isLoading ? "Starting checkout..." : "Upgrade to Pro"}</button>
        {status && <p className="payment-message">{status}</p>}
      </div>
      <p className="form-link"><Link to="/home">Back to Home</Link></p>
    </div>
  );
}

export default Paywall;
