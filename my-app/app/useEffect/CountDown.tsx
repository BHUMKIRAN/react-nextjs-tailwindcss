import { useState, useEffect } from "react";

function Countdown({ start }) {
  // Step 1: Initialize count with start value
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Step 2a: Stop if count reaches 0
    if (count <= 0) return;

    // Step 2b: Set timeout to decrease count
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    // Step 3: Cleanup timeout
    return () => clearTimeout(timer);
  }, [count]); // Re-run effect when count changes

  // Step 4: Display count
  return (
    <div>
      <h1>{count === 0 ? "Time's Up!" : count}</h1>
      <Countdown start={10} />
    </div>
    
  );
}

export default Countdown