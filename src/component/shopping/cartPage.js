// CartPage.jsx
import React from 'react';
import { useCart } from '../../context-api/CartContext';

const CartPage = (setCart) => {
  const { cart, decrement, increment, removeCart } = useCart();
 
  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
            <table className='table'>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Remove</th>
                </tr>
                {
                    cart.map((item)=>(
                        <tr>
                            <th>
                                <img src={item.thumbnail} alt={item.title} style={{width: '60px', height: '60px'}} />
                            </th>
                            <th>{item.title}</th>
                            <th>{(item.price * item.qty).toFixed(2)}</th>
                            <th>
                                <div>
                                    <button onClick={()=> decrement(item.qty, item.id)}>-</button>{item.qty}
                                    <button onClick={()=> increment(item.id)}>+</button>
                                </div>
                            </th>
                            <th>
                              <button onClick={()=> removeCart(item.id)}>Remove Item</button>
                            </th>
                        </tr>
                    ))
                }
                <tr>
                  <th colSpan={4}>Total Amount</th>
                  <th>
                    {
                      cart.reduce((sum, product)=> sum + product.price * product.qty, 0).toFixed(2)
                    }
                  </th>
                </tr>
            </table> 
        </>       
      )}
    </div>
  );
};

export default CartPage;
