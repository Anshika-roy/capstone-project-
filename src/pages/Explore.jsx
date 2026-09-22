// src/pages/Explore.jsx
//
// This page OWNS the state for search + category filtering, and passes
// both the state values and the setter functions down as props to the
// SearchBar and CategoryFilter components ("lifting state up").
// It then derives a filtered list and hands it to DestinationGrid.

import { useState } from "react";
import destinations, { categories } from "../data/destinations";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import DestinationGrid from "../components/DestinationGrid";
import "./Explore.css";

function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Recomputed on every render -- fine for a small, local array like this.
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "All" || destination.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

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

      <p className="results-count">
        {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? "s" : ""} found
      </p>

      <DestinationGrid destinationList={filteredDestinations} />
    </div>
  );
}

export default Explore;
