"use client";
import React, { useState } from "react";

const MultipleCounters = () => {
  const [counter, setCounter] = useState([]);

  const addCounter = () => {
    setCounter([...counter, { id: Date.now(), value: 0 }]);
  };
  const updateCounter = (id, val) => {
    setCounter(
      counter.map((item) =>
        item.id === id ? { ...item, value: item.value + val } : item
      )
    );
  };
  return (
    <div>
      <button onClick={addCounter}>Add Counter</button>

      {counter.map((c) => (
        <div key={c.id}>
          <button onClick={() => updateCounter(c.id, -1)}>-</button>
          {c.value}
          <button onClick={() => updateCounter(c.id, 1)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default MultipleCounters;
