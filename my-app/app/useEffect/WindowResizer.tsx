import { useState, useEffect } from "react";

function WindowSize() {
  // Step 1: Initialize with current width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Step 2: Define resize handler
    const handleResize = () => {
      setWidth(window.innerWidth); // Step 3: Update width
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Step 4: Cleanup - remove listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run once on mount

  // Step 5: Display width
  return <h2>Window Width: {width}px</h2>;
}

export default WindowSize;