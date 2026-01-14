import React from "react";

const SearchField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchField;
