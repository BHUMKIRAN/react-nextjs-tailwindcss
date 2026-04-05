import React, { lazy } from 'react'
 import { Suspense } from 'react'

const Fruits = lazy(()=>import('./fruitsList'))
const page = () => {
  return (
    
    <Suspense fallback={<div>Loading...</div>}>
      <Fruits/>
    </Suspense>
    
  )
}

export default page