// components/Content.tsx
import React, { useContext } from "react";
import {themeContext } from "./themeContext";
import { fontContext } from "./fontContext";
import { LanguageContext } from "./languageContext";

const Content = () => {
  const { theme } = useContext(themeContext);
  const { fontSize } = useContext(fontContext);
  const { language } = useContext(LanguageContext);

  // Dynamic style
  const style: React.CSSProperties = {
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#333" : "#f0f0f0",
    padding: "20px",
    fontSize: fontSize === "small" ? "14px" : fontSize === "medium" ? "18px" : "24px",
    minHeight: "100px",
    marginTop: "20px",
    borderRadius: "8px",
  };

  return (
    <div style={style}>
      <h3>Content Area</h3>
      <p>
        {language === "EN"
          ? "Hello! This text changes according to the selected settings."
          : "नमस्ते! यो पाठ चयन गरिएको सेटिङ अनुसार परिवर्तन हुन्छ।"}
      </p>
    </div>
  );
};

export default Content;
