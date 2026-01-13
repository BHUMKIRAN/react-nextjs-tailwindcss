import React, { useState } from 'react'

const ControlledFormInput = () => {

    const [form , setform] = useState({
        name : "",
        email : ""
    })

    const handlechange = (e) =>{
        setform({
            ...form,
            [e.target.name] : e.target.value
        })
    }
  return (
    <div>
        <input 
        type="text" 
        name="name" 
        id="" 
        placeholder='Name'
        value={form.name}
        onChange={handlechange}
        />
        <input 
        type="email" 
        name="email" 
        id="" 
        placeholder='Email'
        value={form.email}
        onChange={handlechange}
        />
        <h2>Name: {form.name}</h2>
        <h2>Email :{form.email}</h2>
    </div>
  )
}

export default ControlledFormInput