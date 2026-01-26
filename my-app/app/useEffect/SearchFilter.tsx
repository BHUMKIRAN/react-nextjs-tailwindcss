import { useState, useEffect } from "react";

function SearchFilter() {
  // Step 1 & 2: Create states
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Step 3: Define items to search
  const items = ["Apple", "Banana", "Orange", "Grape", "Mango", "Strawberry"];

  // Step 4: Run filter whenever query changes
  useEffect(() => {
    // Filter items that include the query text
    const filtered = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    // Update results
    setResults(filtered);
  }, [query]); // Dependency: re-run when query changes

  // Step 5 & 6: Render input and results
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)} // Update query on input change
        placeholder="Search fruits..."
      />
      <ul>
        {results.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilter;