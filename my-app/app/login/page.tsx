"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage =()=>{
    const router = useRouter()
  return (
    <div className=" flex item-center justify-center  ">
        <div className='flex flex-col item-center justify-center bg-gray-200 p-4  rounded-3xl h-[400] w-auto'>
  <div>
                <h1 className="flex justify-between text-2xl font-bold mb-4">
                    <div>
                        Login
                    </div>
                    <div className='cursor-pointer' onClick={()=>router.back()}>
                        X
                    </div>
                    </h1>
                <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Name" className="border w-full p-2 mb-2" />
        </div>
        <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" className="border w-full p-2 mb-2" />
        </div>
        <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" className="border w-full p-2 mb-4" />
        </div>
      
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
        </div>
        </div>
        
      
    </div>
  )
}

export default LoginPage