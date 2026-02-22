"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const RegisterPage = ({ open, setOpen }) => {
 

  if (!open) return null

  return createPortal(
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h1>Register</h1>

        <input type="text" placeholder="enter your name" />
        <input type="email" placeholder="enter your email" />
        <input type="password" placeholder="enter your password" />

        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>,
    document.body
  )
}

export default RegisterPage