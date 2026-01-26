import { useState, useEffect } from "react";

function TimeBasedTheme() {
  // Step 1: Create theme state
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    // Step 2: Determine theme based on time
    const hour = new Date().getHours();

    // Night: 6 PM (18:00) to 6 AM (06:00)
    if (hour >= 18 || hour < 6) {
      setTheme("night");
    } else {
      setTheme("day");
    }
  }, []); // Run once on mount

  // Step 3: Render with dynamic theme
  return (
    <div
      style={{
        background: theme === "night" ? "#1a1a2e" : "#f0f0f0",
        color: theme === "night" ? "#eee" : "#333",
        padding: "50px",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      <h1>🌙 Current Theme: {theme}</h1>
      <p>
        {theme === "night"
          ? "It's nighttime — dark theme is active"
          : "It's daytime — light theme is active"}
      </p>
    </div>
  );
}

export default TimeBasedTheme;