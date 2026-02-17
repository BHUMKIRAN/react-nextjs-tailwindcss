// contexts/LanguageContext.tsx
import { createContext, useState, ReactNode } from "react";

// defining the type for language
export type Language = "EN" | "NP";

// creating the type for context 
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

 const LanguageContext  = createContext({
  language: "EN",
  setLanguage: () => {},
});

 const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("EN");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export { LanguageContext, LanguageProvider };
