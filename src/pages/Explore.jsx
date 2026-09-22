// src/pages/Explore.jsx
//
// This page OWNS the state for search + category filtering, and passes
// both the state values and the setter functions down as props to the
// SearchBar and CategoryFilter components ("lifting state up").
// It then derives a filtered list and hands it to DestinationGrid.

import { useMemo, useState } from "react";
import { categories } from "../data/destinations";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import DestinationGrid from "../components/DestinationGrid";
import { useDestinations } from "../hooks/useDestinations";
import "./Explore.css";

function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { destinations, isLoading, error } = useDestinations();

  // Recomputed on every render -- fine for a small, local array like this.
  const filteredDestinations = useMemo(() => destinations.filter((destination) => {
    const name = destination.name || "";
    const state = destination.state || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "All" || destination.category === activeCategory;

    return matchesSearch && matchesCategory;
  }), [destinations, searchTerm, activeCategory]);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explore Destinations</h1>
        <p>Search by name or state, or filter by the kind of trip you're after.</p>
      </div>

      <div className="explore-controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categoryList={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {isLoading && <p className="data-status">Loading live destinations...</p>}
      {error && <p className="data-status data-status-error">{error}</p>}

      <p className="results-count">
        {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? "s" : ""} found
      </p>

      <DestinationGrid destinationList={filteredDestinations} />
    </div>
  );
}

export default Explore;
