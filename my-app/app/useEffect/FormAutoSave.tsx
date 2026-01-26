import { useState, useEffect } from "react";

function AutoSaveForm() {
  // Step 1: Create state for text
  const [text, setText] = useState("");

  // Step 2: Load saved text on mount
  useEffect(() => {
    const saved = localStorage.getItem("formText");
    if (saved) {
      setText(saved);
    }
  }, []);

  // Step 3: Auto-save text on every change
  useEffect(() => {
    localStorage.setItem("formText", text);
  }, [text]); // Runs whenever text changes

  // Step 4 & 5: Render controlled textarea
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
      rows={10}
      cols={50}
      placeholder="Start typing... Your text is auto-saved!"
    />
  );
}

export default AutoSaveForm;