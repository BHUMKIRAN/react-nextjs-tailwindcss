import React, { useState } from "react";

const CounterApp = () => {
  const [count, setcount] = useState(0);

  const handleIncrement = () => {
    setcount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setcount((prev) => prev - 1);
  };
  const handleReset = () => {
    setcount(0);
  };
  return (
    <div>
      <h1>CounterApp</h1>
      <button type="button" onClick={handleIncrement}>
        +
      </button>
      <span>{count}</span>
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default CounterApp;
