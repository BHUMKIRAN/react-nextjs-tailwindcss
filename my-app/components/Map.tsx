"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Essential CSS
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// --- Sub-Component: Search Bar ---
function SearchField() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);
    return () => { map.removeControl(searchControl); };
  }, [map]);
  return null;
}

// --- Sub-Component: Blue Dot & Location Logic ---
function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
    },
  });

  const blueDotIcon = L.divIcon({
    className: "user-location-dot",
    iconSize: [16, 16],
  });

  return position === null ? null : (
    <Marker position={position} icon={blueDotIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// --- Main Map Component ---
export default function Map() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        center={[27.7172, 85.3240]} // Kathmandu Default
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <SearchField />
        <LocationMarker />

        {/* Locate Me Button */}
        <div style={{ position: "absolute", top: "100px", left: "10px", zIndex: 1000 }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              // We access the map instance via a trick or just use useMap in a child
              window.dispatchEvent(new CustomEvent("trigger-locate"));
            }}
            style={{
              padding: "10px",
              backgroundColor: "white",
              border: "2px solid rgba(0,0,0,0.2)",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            📍 Locate Me
          </button>
        </div>
        <LocateAction />
      </MapContainer>

      <style jsx global>{`
        .user-location-dot {
          background-color: #2196F3;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(0,0,0,0.4);
        }
        .user-location-dot::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2196F3;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Helper component to trigger location from the custom button
function LocateAction() {
  const map = useMap();
  useEffect(() => {
    const handleLocate = () => map.locate();
    window.addEventListener("trigger-locate", handleLocate);
    return () => window.removeEventListener("trigger-locate", handleLocate);
  }, [map]);
  return null;
}