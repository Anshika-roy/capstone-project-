const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://capstone-project-d5cd.onrender.com/api";
const API_BASE_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, "");

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "The request could not be completed.");
  }

  return payload;
};

const normalizeDestination = (destination) => ({
  ...destination,
  id: destination.id || destination._id,
  image: destination.image || destination.images?.[0] || "https://picsum.photos/seed/travel-destination/900/600",
  shortDescription: destination.shortDescription || destination.description || "Explore this destination with Travel Destination Explorer.",
  description: destination.description || destination.shortDescription || "Destination details are not available yet.",
  attractions: destination.attractions || [],
  activities: destination.activities || [],
  bestTimeToVisit: destination.bestTimeToVisit || "Check local conditions before travelling.",
  budget: destination.budget || "Contact us for an estimate.",
  rating: Number(destination.rating || 0)
});

export const getDestinations = async () => {
  const payload = await request("/destinations");
  return (payload.data || []).map(normalizeDestination);
};

export const getDestination = async (id) => {
  const payload = await request(`/destinations/${encodeURIComponent(id)}`);
  return normalizeDestination(payload.data);
};

export const submitEnquiry = (formData) => request("/form", {
  method: "POST",
  body: JSON.stringify(formData)
});

export const createPaymentOrder = (amount) => request("/payment", {
  method: "POST",
  body: JSON.stringify({ amount, currency: "INR" })
});

export { API_BASE_URL };
