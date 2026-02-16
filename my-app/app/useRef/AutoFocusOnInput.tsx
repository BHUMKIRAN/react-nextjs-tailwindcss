"use client"
import React, { useRef } from 'react'

const AutoFocusOnInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="auto-focus"
      />

      <button onClick={handleClick}>
        Click me to focus
      </button>
    </div>
  )
}

export default AutoFocusOnInput
