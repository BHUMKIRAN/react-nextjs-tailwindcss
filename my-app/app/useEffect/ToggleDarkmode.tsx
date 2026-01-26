import { useState, useEffect } from "react";

function DarkMode() {
  // Step 1: Create state for theme
  const [dark, setDark] = useState(false);

  // Step 2: Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setDark(saved === "true"); // Convert string to boolean
    }
  }, []); // Run once on mount

  // Step 3: Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]); // Run when dark changes

  // Step 4 & 5: Render with theme-based styling
  return (
    <div
      style={{
        background: dark ? "#222" : "#fff",
        color: dark ? "#fff" : "#000",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <button onClick={() => setDark(!dark)}>
        Switch to {dark ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default DarkMode;