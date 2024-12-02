import React from "react";

const PodcastFilter = ({ inputFilter, setInputFilter, count }) => (
  <div className="flex-container">
    <p className="count-badge">{count}</p>
    <input
      type="text"
      placeholder="Filter podcast..."
      value={inputFilter}
      onChange={(e) => setInputFilter(e.target.value)}
      className="filter-input"
    />
  </div>
);

export default PodcastFilter;
