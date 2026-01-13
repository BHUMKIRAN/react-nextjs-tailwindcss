"use client";
import { useState } from "react";

const items = ["Email 1", "Email 2", "Email 3"];

const SelectAllCheckbox = () => {
  const [selected, setSelected] = useState([]);

  const toggleAll = () => {
    setSelected(selected.length === items.length ? [] : items);
  };

  const toggleOne = (item) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item]
    );
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={selected.length === items.length}
        onChange={toggleAll}
      />{" "}
      Select All
      {items.map((item) => (
        <div key={item}>
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleOne(item)}
          />
          {item}
        </div>
      ))}
    </div>
  );
};

export default SelectAllCheckbox;
