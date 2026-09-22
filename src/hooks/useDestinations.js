import { useEffect, useState } from "react";
import { getDestinations } from "../lib/api";
import fallbackDestinations from "../data/destinations";

export function useDestinations() {
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    getDestinations()
      .then((items) => {
        if (!isCurrent) return;
        if (items.length > 0) {
          setDestinations(items);
          setError("");
        } else {
          setDestinations(fallbackDestinations);
          setError("No live destinations are published yet. Showing the saved destination guide.");
        }
      })
      .catch(() => {
        if (isCurrent) setError("Live destinations are unavailable. Showing the saved destination guide.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { destinations, isLoading, error };
}
