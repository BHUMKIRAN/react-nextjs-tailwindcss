# React useRef — 10 Real-World Problems

A complete guide with **pseudocode**, **use cases**, **line-by-line explanations**, and **copy-paste ready solutions**.

---

## 📋 Table of Contents

- [What is useRef?](#what-is-useref)
- [Basic Level (1-3)](#-basic-level)
- [Medium Level (4-6)](#-medium-level)
- [Hard Level (7-10)](#-hard-level)
- [useRef vs useState](#useref-vs-usestate)
- [Project Structure](#-project-structure)
- [How to Run](#-how-to-run)

---

## What is useRef?

**useRef** is a React Hook that:
1. **Persists values** between renders WITHOUT causing re-renders
2. **Accesses DOM elements** directly
3. **Stores mutable values** that don't trigger UI updates

**Syntax:**
```jsx
const refContainer = useRef(initialValue);
```

**Key Properties:**
- `refContainer.current` - holds the actual value
- Changes to `.current` do NOT trigger re-renders
- Value persists across component re-renders

---

## 🟢 BASIC LEVEL

### 1️⃣ Auto-Focus Input on Page Load

**Problem:** Automatically focus an input field when the component mounts.

**Use Case:** Login forms, search bars, comment sections

**Pseudocode:**
```
1. CREATE a ref using useRef(null)
2. ATTACH ref to input element
3. WHEN component mounts:
   a. ACCESS the input element via ref.current
   b. CALL .focus() method on the element
4. RENDER input with ref attached
```

**Solution:**
```jsx
import { useRef, useEffect } from "react";

function AutoFocusInput() {
  // Step 1: Create ref to hold input element
  const inputRef = useRef(null);

  useEffect(() => {
    // Step 3: Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Run once on mount

  // Step 2 & 4: Attach ref to input
  return (
    <div>
      <h2>Login Form</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Username (auto-focused)"
      />
    </div>
  );
}

export default AutoFocusInput;
```

**How It Works:**
1. `useRef(null)` creates a ref object with `current` property set to null
2. `ref={inputRef}` connects the ref to the actual DOM input element
3. After render, `inputRef.current` points to the DOM node
4. `.focus()` is a native DOM method that focuses the element
5. User sees cursor blinking in input immediately

---

### 2️⃣ Count Renders Without Causing Re-render

**Problem:** Track how many times a component has rendered without triggering additional renders.

**Use Case:** Performance monitoring, debugging

**Pseudocode:**
```
1. CREATE a ref initialized to 0
2. CREATE state for any user interaction
3. WHEN component renders:
   a. INCREMENT ref.current by 1
4. RENDER the render count and interactive element
```

**Solution:**
```jsx
import { useRef, useState } from "react";

function RenderCounter() {
  // Step 1: Create ref to count renders
  const renderCount = useRef(0);
  
  // Step 2: State to trigger re-renders
  const [name, setName] = useState("");

  // Step 3: Increment on every render
  renderCount.current = renderCount.current + 1;

  // Step 4: Display count and input
  return (
    <div>
      <h2>Component Rendered: {renderCount.current} times</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type to trigger re-renders..."
      />
      <p>Current input: {name}</p>
    </div>
  );
}

export default RenderCounter;
```

**How It Works:**
1. `renderCount.current` increments on every render
2. Unlike useState, changing `ref.current` does NOT cause re-render
3. When `name` state changes, component re-renders
4. Render count updates but doesn't cause infinite loop
5. **Important:** This code runs on every render (not in useEffect)

---

### 3️⃣ Store Previous State Value

**Problem:** Access the previous value of state after it updates.

**Use Case:** Comparing old vs new values, undo functionality

**Pseudocode:**
```
1. CREATE state for current value
2. CREATE ref to store previous value
3. WHEN component renders:
   a. DISPLAY both current and previous values
4. AFTER render completes:
   a. UPDATE ref with current value (for next render)
5. RENDER input and comparison display
```

**Solution:**
```jsx
import { useRef, useState, useEffect } from "react";

function PreviousValue() {
  // Step 1: Current state
  const [count, setCount] = useState(0);
  
  // Step 2: Ref to store previous value
  const prevCountRef = useRef();

  // Step 4: Update ref after render
  useEffect(() => {
    prevCountRef.current = count;
  });

  // Step 3 & 5: Display and interaction
  return (
    <div>
      <h2>Current Count: {count}</h2>
      <h3>Previous Count: {prevCountRef.current}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default PreviousValue;
```

**How It Works:**
1. First render: `prevCountRef.current` is `undefined`
2. After render, useEffect sets `prevCountRef.current = count`
3. On next render, ref holds the previous value
4. State updates trigger re-render, but ref doesn't
5. This creates a "lag" effect where ref is always one step behind

---

## 🟡 MEDIUM LEVEL

### 4️⃣ Video Player with Play/Pause Control

**Problem:** Control a video element using custom buttons.

**Use Case:** Custom video players, media applications

**Pseudocode:**
```
1. CREATE ref for video element
2. CREATE function to play video
   a. ACCESS video via ref.current
   b. CALL .play() method
3. CREATE function to pause video
   a. ACCESS video via ref.current
   b. CALL .pause() method
4. RENDER video element with ref
5. RENDER custom play/pause buttons
```

**How It Works:**
1. `ref={videoRef}` connects ref to video DOM element
2. `videoRef.current` gives direct access to native video element
3. `.play()` and `.pause()` are native HTML5 video methods
4. No state needed - we're directly manipulating the DOM
5. Refs are perfect for accessing imperative APIs

---

### 5️⃣ Scroll to Specific Section

**Problem:** Scroll to a specific element when button is clicked.

**Use Case:** "Jump to section" buttons, table of contents, FAQ navigation

**Pseudocode:**
```
1. CREATE refs for each section element
2. CREATE scroll handler function
   a. ACCEPT ref as parameter
   b. ACCESS element via ref.current
   c. CALL .scrollIntoView() method
3. RENDER multiple sections with refs
4. RENDER navigation buttons
```

**Solution:**
```jsx
import { useRef } from "react";

function ScrollToSection() {
  // Step 1: Create refs for each section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  // Step 2: Scroll handler
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Step 3 & 4: Render navigation and sections
  return (
    <div>
      {/* Navigation */}
      <div style={{ position: "fixed", top: 0, background: "#fff", padding: "10px" }}>
        <button onClick={() => scrollToSection(section1Ref)}>Go to Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Go to Section 3</button>
      </div>

      {/* Sections */}
      <div style={{ marginTop: "60px" }}>
        <div ref={section1Ref} style={{ height: "100vh", background: "#ffcccc", padding: "20px" }}>
          <h2>Section 1</h2>
          <p>This is the first section.</p>
        </div>
        <div ref={section2Ref} style={{ height: "100vh", background: "#ccffcc", padding: "20px" }}>
          <h2>Section 2</h2>
          <p>This is the second section.</p>
        </div>
        <div ref={section3Ref} style={{ height: "100vh", background: "#ccccff", padding: "20px" }}>
          <h2>Section 3</h2>
          <p>This is the third section.</p>
        </div>
      </div>
    </div>
  );
}

export default ScrollToSection;
```

**How It Works:**
1. Each section gets its own ref
2. `scrollIntoView()` is a native DOM method
3. `behavior: "smooth"` creates animated scrolling
4. `block: "start"` aligns element to top of viewport
5. Multiple refs can coexist without issues

---

### 6️⃣ Uncontrolled Form with useRef

**Problem:** Handle form submission without controlled components.

**Use Case:** Simple forms, file uploads, performance optimization

**Pseudocode:**
```
1. CREATE refs for each form input
2. CREATE submit handler function
   a. PREVENT default form submission
   b. ACCESS values via ref.current.value
   c. PROCESS form data
   d. OPTIONALLY clear inputs
3. RENDER form with refs attached
```

**Solution:**
```jsx
import { useRef } from "react";

function UncontrolledForm() {
  // Step 1: Create refs for inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Step 2: Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Access values via refs
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };

    console.log("Form Data:", formData);
    alert(`Submitted: ${formData.name}`);

    // Optional: Clear form
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  // Step 3: Render form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input ref={nameRef} type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input ref={emailRef} type="email" required />
      </div>
      <div>
        <label>Message:</label>
        <textarea ref={messageRef} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
```

**How It Works:**
1. Refs store references to input elements
2. No state needed - inputs manage their own values
3. `ref.current.value` reads current input value
4. Form doesn't re-render on every keystroke (better performance)
5. **Uncontrolled** = input value is controlled by DOM, not React

---

## 🔴 HARD LEVEL

### 7️⃣ Click Outside to Close (Modal/Dropdown)

**Problem:** Close a component when user clicks outside of it.

**Use Case:** Modals, dropdowns, context menus, tooltips

**Pseudocode:**
```
1. CREATE state for open/closed status
2. CREATE ref for the component container
3. WHEN component mounts:
   a. ADD click event listener to document
4. WHEN user clicks anywhere:
   a. IF click is outside ref element:
      - CLOSE the component
5. WHEN component unmounts:
   a. REMOVE event listener
6. RENDER component with ref
```

**Solution:**
```jsx
import { useRef, useState, useEffect } from "react";

function ClickOutsideDropdown() {
  // Step 1: State for dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Step 2: Ref for dropdown container
  const dropdownRef = useRef(null);

  // Step 3, 4, 5: Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Step 6: Render
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>
      
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            marginTop: "10px",
            padding: "20px",
            background: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        >
          <h3>Dropdown Content</h3>
          <p>Click outside to close me!</p>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClickOutsideDropdown;
```

**How It Works:**
1. `dropdownRef.current.contains(event.target)` checks if click is inside element
2. If click is outside, `setIsOpen(false)` closes dropdown
3. Event listener only added when dropdown is open (optimization)
4. Cleanup removes listener to prevent memory leaks
5. Common pattern for modals, menus, and overlays

---

### 8️⃣ Debounced Search Input (Performance)

**Problem:** Avoid making API calls on every keystroke during search.

**Use Case:** Search bars, autocomplete, live validation

**Pseudocode:**
```
1. CREATE state for search query
2. CREATE ref to store timeout ID
3. WHEN user types:
   a. UPDATE search query state
   b. CLEAR previous timeout
   c. SET new timeout
   d. AFTER delay, perform search
4. WHEN component unmounts:
   a. CLEAR any pending timeouts
5. RENDER search input
```

**Solution:**
```jsx
import { useState, useRef, useEffect } from "react";

function DebouncedSearch() {
  // Step 1: State for search query
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  // Step 2: Ref to store timeout ID
  const timeoutRef = useRef(null);

  // Step 3: Handle input change with debounce
  const handleSearch = (value) => {
    setQuery(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      // Perform search after 500ms delay
      console.log("Searching for:", value);
      // Simulate API call
      setResults([`Result for "${value}" 1`, `Result for "${value}" 2`]);
    }, 500);
  };

  // Step 4: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Step 5: Render
  return (
    <div>
      <h2>Debounced Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Type to search (500ms delay)..."
      />
      <div>
        <h3>Results:</h3>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DebouncedSearch;
```

**How It Works:**
1. `timeoutRef.current` stores the timeout ID
2. Each keystroke clears previous timeout and sets new one
3. Search only executes if user stops typing for 500ms
4. Ref persists timeout ID across re-renders without causing extra renders
5. **Debouncing** reduces API calls from hundreds to one

---

### 9️⃣ Measuring Element Dimensions

**Problem:** Get width and height of a DOM element dynamically.

**Use Case:** Responsive charts, tooltips, dynamic layouts

**Pseudocode:**
```
1. CREATE ref for target element
2. CREATE state for dimensions
3. WHEN component mounts or window resizes:
   a. ACCESS element via ref
   b. GET dimensions using getBoundingClientRect()
   c. UPDATE state with dimensions
4. RENDER element with ref
5. DISPLAY dimensions
```

**Solution:**
```jsx
import { useRef, useState, useEffect } from "react";

function MeasureElement() {
  // Step 1: Ref for element
  const boxRef = useRef(null);
  
  // Step 2: State for dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Step 3: Measure on mount and resize
  useEffect(() => {
    const measureBox = () => {
      if (boxRef.current) {
        const { width, height } = boxRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Measure initially
    measureBox();

    // Measure on window resize
    window.addEventListener("resize", measureBox);

    // Cleanup
    return () => window.removeEventListener("resize", measureBox);
  }, []);

  // Step 4 & 5: Render
  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: "50%",
          minHeight: "200px",
          background: "#4CAF50",
          padding: "20px",
          color: "white",
          margin: "20px 0"
        }}
      >
        <h2>Resize the window!</h2>
        <p>This box is 50% of screen width</p>
      </div>
      
      <div>
        <h3>Box Dimensions:</h3>
        <p>Width: {dimensions.width.toFixed(2)}px</p>
        <p>Height: {dimensions.height.toFixed(2)}px</p>
      </div>
    </div>
  );
}

export default MeasureElement;
```

**How It Works:**
1. `getBoundingClientRect()` returns element size and position
2. Returns object with `width`, `height`, `top`, `left`, etc.
3. Resize listener updates dimensions dynamically
4. Useful for positioning tooltips, popovers, or responsive components
5. Ref gives direct DOM access without querying document

---

### 🔟 Interval with Cleanup (Timer with Start/Stop)

**Problem:** Create a timer with start/stop controls that properly cleans up.

**Use Case:** Stopwatches, countdown timers, game timers

**Pseudocode:**
```
1. CREATE state for time and running status
2. CREATE ref to store interval ID
3. CREATE start function:
   a. SET running state to true
   b. CREATE interval that updates time
   c. STORE interval ID in ref
4. CREATE stop function:
   a. CLEAR interval using ref
   b. SET running state to false
5. CREATE reset function:
   a. STOP timer
   b. RESET time to zero
6. WHEN component unmounts:
   a. CLEAR interval
7. RENDER timer display and controls
```

**Solution:**
```jsx
import { useState, useRef } from "react";

function TimerWithControls() {
  // Step 1: State for time and running status
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Step 2: Ref to store interval ID
  const intervalRef = useRef(null);

  // Step 3: Start timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  // Step 4: Stop timer
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  // Step 5: Reset timer
  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  // Step 6: Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Step 7: Render
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Timer: {time}s</h1>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimerWithControls;
```

**How It Works:**
1. `intervalRef.current` stores the interval ID
2. Ref persists across renders without causing re-renders
3. Can access and clear interval from any function
4. State controls UI, ref controls side effect
5. Cleanup in useEffect prevents memory leak
6. **Why ref?** Because interval ID doesn't need to trigger re-renders

---

## useRef vs useState

| Feature | useState | useRef |
|---------|----------|--------|
| **Triggers re-render** | ✅ Yes | ❌ No |
| **Persists across renders** | ✅ Yes | ✅ Yes |
| **Access method** | Direct value | `.current` property |
| **Use for UI data** | ✅ Yes | ❌ No |
| **Use for DOM access** | ❌ No | ✅ Yes |
| **Use for mutable values** | ❌ No | ✅ Yes |
| **Async updates** | ✅ Yes | ❌ No (synchronous) |

**When to use useRef:**
- Accessing DOM elements
- Storing timeout/interval IDs
- Keeping mutable values that don't affect UI
- Storing previous values
- Performance optimization (avoiding re-renders)

**When to use useState:**
- Data that affects what's rendered
- Form inputs (controlled components)
- Toggle states (open/closed, show/hide)
- Any data user should see change

---

## 📂 Project Structure

```
react-useref-practice/
├── src/
│   ├── components/
│   │   ├── AutoFocusInput.jsx
│   │   ├── RenderCounter.jsx
│   │   ├── PreviousValue.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── ScrollToSection.jsx
│   │   ├── UncontrolledForm.jsx
│   │   ├── ClickOutsideDropdown.jsx
│   │   ├── DebouncedSearch.jsx
│   │   ├── MeasureElement.jsx
│   │   └── TimerWithControls.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/yourusername/react-useref-practice.git

# Navigate to project
cd react-useref-practice

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧠 Key Takeaways

1. **useRef doesn't cause re-renders** - perfect for values that don't affect UI
2. **Access DOM directly** - for focus, scroll, media controls
3. **Persist mutable values** - interval IDs, previous values, flags
4. **Always use `.current`** - the actual value is in `.current` property
5. **Cleanup is crucial** - clear intervals, remove listeners
6. **Refs are synchronous** - unlike setState, changes are immediate

---

## 🎯 Interview Tips

- Explain **useRef vs useState** clearly
- Know when **NOT** to use refs (for UI state)
- Understand **DOM manipulation** use cases
- Be ready to explain **.current** property
- Know about **uncontrolled components**
- Understand **cleanup** in useEffect with refs

---

## 🔥 Common Use Cases Summary

1. ✅ **DOM Access** - focus, scroll, media control
2. ✅ **Store IDs** - setTimeout, setInterval, requestAnimationFrame
3. ✅ **Previous Values** - comparing old vs new state
4. ✅ **Avoid Re-renders** - performance optimization
5. ✅ **Uncontrolled Components** - forms without state
6. ✅ **Click Outside Detection** - modals, dropdowns
7. ✅ **Debouncing** - delay API calls
8. ✅ **Measurements** - element dimensions
9. ✅ **Instance Variables** - class component equivalent
10. ✅ **Third-party Library Integration** - D3.js, Chart.js, etc.

---

**Made with ❤️ for React learners**