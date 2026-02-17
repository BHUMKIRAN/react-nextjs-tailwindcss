// components/SettingsPanel.tsx
import React, { useContext } from "react";
import { themeContext } from "./themeContext";
import { fontContext } from "./fontContext";
import { LanguageContext } from "./languageContext";

const SettingsPanel = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  const { fontSize, setFontSize } = useContext(fontContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div style={{ padding: "20px", borderBottom: "1px solid gray" }}>
      <h2>Settings Panel</h2>

      {/* Theme Toggle */}
      <div>
        <strong>Theme:</strong> {theme}{" "}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>

      {/* Font Size Selector */}
      <div>
        <strong>Font Size:</strong>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value as any)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Language Selector */}
      <div>
        <strong>Language:</strong>
        <select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
          <option value="EN">English</option>
          <option value="NP">Nepali</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
