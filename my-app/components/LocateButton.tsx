import { useMap } from "react-leaflet";

export default function LocateButton() {
  const map = useMap();

  const handleLocate = () => {
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng, 16); // Smooth zoom to user's location
    });
  };

  return (
    <button
      onClick={handleLocate}
      style={{
        position: "absolute",
        top: "80px",
        left: "10px",
        zIndex: 1000,
        padding: "8px",
        background: "white",
        cursor: "pointer",
        borderRadius: "4px",
        border: "2px solid rgba(0,0,0,0.2)"
      }}
    >
      📍 Find Me
    </button>
  );
}