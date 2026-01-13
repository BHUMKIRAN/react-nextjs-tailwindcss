'use client'
import React, { useState } from 'react'

const ShowAndHidePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState("")

  const handlePasswordVisibility = () => {
    setPasswordVisible(prev => !prev)
  }

  return (
    <div>
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={handlePasswordVisibility}
      >
        {passwordVisible ? "Hide Password" : "Show Password"}
      </button>
    </div>
  )
}

export default ShowAndHidePassword
