import { useState, useEffect } from "react";

function OnlineStatus() {
  // Step 1: Initialize with current status
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Step 2 & 3: Define event handlers
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Step 5: Cleanup - remove listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Step 6: Display status
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>
        You are currently{" "}
        <span style={{ color: online ? "green" : "red" }}>
          {online ? "Online ✓" : "Offline ✗"}
        </span>
      </h2>
    </div>
  );
}

export default OnlineStatus