import { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

export default function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  // Custom Blue Dot Icon
  const blueDotIcon = L.divIcon({
    className: "user-location-dot",
    iconSize: [16, 16],
  });

  const map = useMapEvents({
    // This triggers when the 'locate' button is clicked or map.locate() is called
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={blueDotIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}