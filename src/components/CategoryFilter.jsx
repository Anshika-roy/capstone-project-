// src/components/CategoryFilter.jsx
//
// Renders one button per category using map(). Also a controlled
// component: "activeCategory" and "onCategoryChange" both come from
// the parent (Explore page) as props.

import "./CategoryFilter.css";

function CategoryFilter({ categoryList, activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categoryList.map((category) => (
        <button
          key={category}
          className={category === activeCategory ? "category-pill active" : "category-pill"}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
