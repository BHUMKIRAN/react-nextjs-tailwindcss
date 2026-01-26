### React Leaflet

npm install leaflet react-leaflet leaflet-geosearch leaflet-defaulticon-compatibility
npm install -D @types/leaflet

### Why Dynamic Import?

Next.js renders components on the **server by default**, but Leaflet depends on the browser’s `window` object.

To avoid the `window is not defined` error:

```ts
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
```

✔ This ensures the map loads **only on the client**.

##  Component Breakdown

### `SearchField` – Location Search

**Purpose:**
Allows users to search locations by name or address.

**How it works:**

* Uses `leaflet-geosearch`
* Powered by **OpenStreetMap (Nominatim)**
* Hooks into the Leaflet instance using `useMap()`
* Automatically **flies** to searched coordinates

---

### `LocationMarker` – Animated Blue Dot

**Purpose:**
Displays the user’s real-time location.

**How it works:**

* Listens to the `locationfound` event
* Stores coordinates in React state
* Uses `L.divIcon` instead of default markers

**Visual Design:**

* Solid blue center dot
* Pulsing ring animation using CSS

```css
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3); opacity: 0; }
}
```

---

###  Locate Button (Custom Event Bridge)

**Problem:**
React buttons can’t directly access Leaflet’s internal map instance.

**Solution:**
Uses a `CustomEvent` to bridge React → Leaflet.

**Flow:**

```
Button Click
   ↓
CustomEvent fired
   ↓
map.locate()
   ↓
locationfound event
```

---

## 🎨 Styling & UX

### GPS Blue Dot Styling

```css
.user-location-dot {
  width: 14px;
  height: 14px;
  background: #1e90ff;
  border-radius: 50%;
  position: relative;
}

.user-location-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: pulse 2s infinite;
  background: rgba(30, 144, 255, 0.4);
}
```

### Layout Rules

* Map fills **100% height** of parent container
* Responsive and mobile-friendly
* No layout shift on load

---

## ⚠️ Common Issues & Fixes

| Issue                      | Solution                                         |
| -------------------------- | ------------------------------------------------ |
| `appendChild` error        | Disable React Strict Mode or ensure `ssr: false` |
| Map is grey / blank        | Import `leaflet/dist/leaflet.css` at top         |
| Marker icons missing       | Use `leaflet-defaulticon-compatibility`          |
| Location permission denied | Requires **HTTPS** (works on localhost)          |

---

## 🔄 Data Flow

```
User Action (Search / Locate)
        ↓
Leaflet Engine
        ↓
Coordinates Retrieved
        ↓
React State Updated
        ↓
DOM Render (Blue Dot + Popup)
```
