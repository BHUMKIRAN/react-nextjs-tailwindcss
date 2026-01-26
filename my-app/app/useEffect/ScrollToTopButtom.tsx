import { useState, useEffect } from "react";

function ScrollTop() {
  // Step 1: Create state for button visibility
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Step 2 & 3: Define scroll handler
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Step 4: Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Step 5: Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scroll animation
    });
  };

  // Step 6: Conditional rendering
  return (
    show && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        ↑ Top
      </button>
    )
  );
}

export default ScrollTop