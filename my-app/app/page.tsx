"use client"
import dynamic from "next/dynamic";

// Force SSR off for the map
const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
      <p>Initializing Map Engine...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <MapWithNoSSR />
    </main>
  );
}