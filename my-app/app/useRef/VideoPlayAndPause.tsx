"use client"
import { useRef } from "react";

function VideoPlayer() {
  // Step 1: Create ref for video element
  const videoRef = useRef(null);

  // Step 2: Play function
  const handlePlay = () => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).play();
    }
  };

  // Step 3: Pause function
  const handlePause = () => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).pause();
    }
  };

  // Step 4 & 5: Render video and controls
  return (
    <div>
      <video
        ref={videoRef}
        width="600"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div>
        <button onClick={handlePlay}>▶ Play</button>
        <button onClick={handlePause}>⏸ Pause</button>
      </div>
    </div>
  );
}

export default VideoPlayer;