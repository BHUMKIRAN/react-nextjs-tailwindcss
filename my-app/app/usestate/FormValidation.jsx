"use client";
import { useState } from "react";

function ValidationForm() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.email.includes("@")) err.email = "Invalid email";
    if (form.password.length < 6) err.password = "Min 6 chars";
    setErrors(err);
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {errors.password && <p>{errors.password}</p>}

      <button onClick={validate}>Submit</button>
    </div>
  );
}
export default ValidationForm;