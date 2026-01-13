import React, { useState } from 'react'

const CartQuantity = () => {

    const price = 100;
    const [qty , setqty] = useState(1);
    const totalPrice = price * qty;
  return (
    <div>
        <button 
        type="button"
        onClick={() => qty > 1 ? setqty(qty-1) : setqty(1) }
        >-</button>
        <span>{qty}</span>
        <button 
        type="button"
        onClick={() => setqty(qty+1)}
        >+</button>
        <h1>Total:{totalPrice}</h1>
    </div>
  )
}

export default CartQuantity