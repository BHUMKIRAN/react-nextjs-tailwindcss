// App.tsx
"use client"
import { LanguageProvider } from "./languageContext";
import ThemeContextProvider from "./themeContext";
import FontContextProvider from "./fontContext";
import SettingsPanel from "./SettingsPanel";
import Content from "./Content";

function App() {
  return (
    <ThemeContextProvider>
      <FontContextProvider>
        <LanguageProvider>
          <div>
            <SettingsPanel />
            <Content />
          </div>
        </LanguageProvider>
      </FontContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
