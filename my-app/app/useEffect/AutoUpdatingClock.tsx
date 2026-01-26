import { useState, useEffect } from "react";

function Clock() {
  // Step 1: Create state to hold current time
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Step 2: Set up interval when component mounts
    const interval = setInterval(() => {
      // Update time every second
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Step 3: Cleanup - remove interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty array = run only once on mount

  // Step 4: Display time
  return <h1>{time}</h1>;
}

export default Clock;