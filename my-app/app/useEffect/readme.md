### 1️ Auto-Updating Clock

**Problem:** Display current time that updates every second.

**Event Handlers Used:**
- `setInterval` - Browser API to execute code repeatedly
- `clearInterval` - Cleanup function to stop interval

1. CREATE state variable 'time' initialized with current time
2. WHEN component mounts:
   a. START interval that runs every 1000ms
   b. INSIDE interval: UPDATE time state with new current time
3. WHEN component unmounts:
   a. CLEAR the interval to prevent memory leak
4. RENDER the time on screen


**How It Works:**
1. `useState` creates a state variable that holds time string
2. `useEffect` with empty `[]` runs only once after first render
3. `setInterval` executes the callback every 1000ms (1 second)
4. `setTime` updates state, causing React to re-render
5. `clearInterval` in cleanup prevents interval from running after unmount


### 2️⃣ Fetch Data from API

**Problem:** Load user list from API when page loads.

**Event Handlers Used:**
- `fetch` / `axios.get` - HTTP request
- `async/await` - Handle asynchronous operations

1. CREATE state variable 'users' initialized as empty array
2. WHEN component mounts:
   a. CALL API using fetch/axios
   b. WAIT for response
   c. UPDATE users state with received data
   d. HANDLE errors if request fails
3. RENDER list of users

**How It Works:**
1. `useState([])` initializes empty array for users
2. `useEffect` runs after component mounts
3. `async/await` handles asynchronous API call
4. `setUsers` updates state with API response
5. React re-renders with new data
6. `.map()` iterates over users array to create list items

### 3️⃣ Search Filter

**Problem:** Filter items as user types in search box.

**Event Handlers Used:**
- `onChange` - Fired when input value changes
- `e.target.value` - Gets current input value

1. CREATE state 'query' for search text (empty initially)
2. CREATE state 'results' for filtered items
3. DEFINE array of items to search through
4. WHEN query changes:
   a. FILTER items array based on query
   b. UPDATE results state with filtered items
5. WHEN user types in input:
   a. UPDATE query state with input value
6. RENDER search input and filtered results

**How It Works:**
1. `onChange` event fires every time user types
2. `e.target.value` gets current input value
3. `setQuery` updates query state
4. `useEffect` watches query (dependency array)
5. When query changes, effect runs filter logic
6. `filter()` + `includes()` finds matching items
7. `setResults` triggers re-render with filtered list

### 4️⃣ Dark Mode Toggle (Persistent)

**Problem:** Toggle theme and remember user preference.

**Event Handlers Used:**
- `onClick` - Button click event
- `localStorage.getItem` - Read from browser storage
- `localStorage.setItem` - Write to browser storage

1. CREATE state 'dark' initialized as false
2. WHEN component mounts:
   a. READ saved theme from localStorage
   b. UPDATE dark state with saved value
3. WHEN dark state changes:
   a. SAVE current value to localStorage
4. WHEN user clicks button:
   a. TOGGLE dark state
5. RENDER UI with appropriate theme

**How It Works:**
1. **First useEffect** (mount): Reads from localStorage on load
2. **Second useEffect** (dark changes): Writes to localStorage
3. `onClick` toggles boolean state using `!dark`
4. Inline styles change based on `dark` value
5. localStorage persists data across browser sessions
6. Multiple useEffects handle different concerns (separation of concerns)

### 5️⃣ Window Resize Listener

**Problem:** Track and display window width dynamically.

**Event Handlers Used:**
- `window.addEventListener("resize")` - Listen for window resize
- `window.removeEventListener("resize")` - Cleanup listener
- `window.innerWidth` - Get current window width

1. CREATE state 'width' initialized with current window width
2. WHEN component mounts:
   a. DEFINE handler function to update width
   b. ADD resize event listener with handler
3. WHEN window resizes:
   a. CALL handler function
   b. UPDATE width state with new window width
4. WHEN component unmounts:
   a. REMOVE resize event listener
5. RENDER current width

**How It Works:**
1. `window.innerWidth` gives viewport width in pixels
2. `addEventListener` attaches event handler to window
3. Every resize triggers `handleResize` function
4. `setWidth` updates state, causing re-render
5. **Cleanup function** removes listener to prevent:
   - Memory leaks
   - Multiple listeners if component re-mounts
6. Empty dependency array ensures listener is added only once

---

### 6️⃣ Form Auto-Save

**Problem:** Automatically save form input to prevent data loss.

**Event Handlers Used:**
- `onChange` - Input change event
- `localStorage.getItem` - Load saved text
- `localStorage.setItem` - Save text

**Pseudocode:**
```
1. CREATE state 'text' initialized as empty string
2. WHEN component mounts:
   a. READ saved text from localStorage
   b. IF text exists, UPDATE state with saved text
3. WHEN text state changes:
   a. SAVE current text to localStorage
4. WHEN user types:
   a. UPDATE text state
5. RENDER textarea with text value

**How It Works:**
1. **First useEffect**: Runs once, loads saved data
2. **Second useEffect**: Runs on every `text` change
3. `onChange` captures every keystroke
4. `setText` updates state with new value
5. Second effect immediately saves to localStorage
6. **Controlled component**: textarea value always matches state
7. If user refreshes page, data persists


### 7️⃣ Countdown Timer

**Problem:** Count down from a number to zero, one second at a time.

**Event Handlers Used:**
- `setTimeout` - Execute code after delay
- `clearTimeout` - Cancel scheduled timeout

1. CREATE state 'count' initialized with start value
2. WHEN count changes:
   a. IF count <= 0, STOP (don't set timer)
   b. ELSE:
      - WAIT 1 second using setTimeout
      - DECREASE count by 1
3. WHEN component unmounts or count changes:
   a. CLEAR the timeout
4. RENDER current count

**How It Works:**
1. `setTimeout` schedules code to run after 1000ms
2. After 1 second, count decreases by 1
3. State update triggers effect to run again (because `count` is in dependency array)
4. This creates a **recursive chain** of timeouts
5. When `count <= 0`, no new timeout is set (stops)
6. **Cleanup** ensures old timeouts are cancelled before new ones are set
7. This prevents multiple timers running simultaneously

### 8️⃣ Online/Offline Detection

**Problem:** Detect and display user's network status.

**Event Handlers Used:**
- `window.addEventListener("online")` - Fires when connection is restored
- `window.addEventListener("offline")` - Fires when connection is lost
- `navigator.onLine` - Boolean indicating current online status

1. CREATE state 'online' initialized with current status
2. WHEN component mounts:
   a. DEFINE handler for online event
   b. DEFINE handler for offline event
   c. ADD both event listeners
3. WHEN online event fires:
   a. SET online state to true
4. WHEN offline event fires:
   a. SET online state to false
5. WHEN component unmounts:
   a. REMOVE both event listeners
6. RENDER online/offline message

**How It Works:**
1. `navigator.onLine` returns `true` if connected, `false` if not
2. Browser fires `online` event when connection restored
3. Browser fires `offline` event when connection lost
4. Event handlers update state accordingly
5. React re-renders with new status
6. **Cleanup** prevents memory leaks from orphaned listeners
7. Test by: toggling airplane mode or disconnecting WiFi

### 9️⃣ Scroll-to-Top Button

**Problem:** Show button after scrolling down; scroll to top on click.

**Event Handlers Used:**
- `window.addEventListener("scroll")` - Fires on scroll
- `window.scrollY` - Current vertical scroll position
- `window.scrollTo()` - Programmatically scroll
- `onClick` - Button click event

1. CREATE state 'show' initialized as false
2. WHEN component mounts:
   a. DEFINE scroll handler function
   b. ADD scroll event listener
3. WHEN user scrolls:
   a. IF scrollY > 200:
      - SET show to true
   b. ELSE:
      - SET show to false
4. WHEN component unmounts:
   a. REMOVE scroll listener
5. WHEN button is clicked:
   a. SCROLL window to top smoothly
6. RENDER button only if show is true

**How It Works:**
1. `window.scrollY` gives pixels scrolled from top
2. Scroll listener checks position on every scroll
3. Button appears (`show = true`) when scrolled > 200px
4. `&&` short-circuit: renders button only if `show` is true
5. `scrollTo({ behavior: "smooth" })` animates scroll
6. **Fixed positioning** keeps button in corner
7. Cleanup removes scroll listener to prevent memory leak

### 🔟 Time-Based Theme

**Problem:** Automatically switch theme based on time of day.

**Event Handlers Used:**
- `new Date()` - Get current date/time
- `.getHours()` - Extract hour (0-23)

1. CREATE state 'theme' initialized as "day"
2. WHEN component mounts:
   a. GET current hour from system
   b. IF hour >= 18 OR hour < 6:
      - SET theme to "night"
   c. ELSE:
      - SET theme to "day"
3. RENDER UI with theme-based styling

**How It Works:**
1. `new Date()` creates object with current date/time
2. `.getHours()` extracts hour in 24-hour format (0-23)
3. **Logic**: 
   - 18:00 (6 PM) to 23:59 → night
   - 00:00 to 05:59 → night
   - 06:00 to 17:59 → day
4. State update triggers re-render with new theme
5. Inline styles apply theme colors
6. Runs only once on mount (doesn't update automatically)

---

## Event Handlers Reference

| Event Handler | Type | When It Fires | Use Case |
|--------------|------|---------------|----------|
| `onChange` | React Event | Input value changes | Forms, search |
| `onClick` | React Event | Element is clicked | Buttons, toggles |
| `setInterval` | Browser API | Repeats at interval | Clocks, polling |
| `setTimeout` | Browser API | After delay | Countdowns, debounce |
| `addEventListener("resize")` | Browser API | Window resizes | Responsive UI |
| `addEventListener("scroll")` | Browser API | Page scrolls | Scroll effects |
| `addEventListener("online")` | Browser API | Connection restored | Network status |
| `addEventListener("offline")` | Browser API | Connection lost | Network status |
| `localStorage.getItem` | Browser API | Manual call | Load saved data |
| `localStorage.setItem` | Browser API | Manual call | Save data |
| `fetch` / `axios.get` | Browser/Library API | Manual call | HTTP requests |


## 🧠 Key Takeaways

1. **useEffect is for side effects** (API calls, timers, listeners)
2. **Dependency array controls when effect runs**
   - `[]` → runs once on mount
   - `[count]` → runs when count changes
   - No array → runs after every render
3. **Cleanup prevents memory leaks** (clear intervals, remove listeners)
4. **Multiple useEffects** = separate concerns
5. **Events trigger state updates** → state updates trigger re-renders
