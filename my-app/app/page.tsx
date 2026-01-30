"use client"
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (msg) => {
      console.log("From server:", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      {/* <MapWithNoSSR /> */}
       <button
      onClick={() => socket.emit("message", "Hello from Next.js")}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Send Message
    </button>
    </main>
  );
}

