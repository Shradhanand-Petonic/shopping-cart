import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart =(product)=> {
        const exitingItem = cart.find((item)=> item.id === product.id);
        if(exitingItem){
            const updateItem  = cart.map((item)=> item.id === product.id ? {...item, qty: item.qty + 1}: item);
            setCart(updateItem)
        }else{
            setCart([...cart, {...product, qty: 1}])
        }
    }
    const removeCart = (productId)=>{
        setCart((prev)=> prev.filter((item)=> item.id !== productId))
    }
    
    const increment = (productId)=>{
        setCart((prev)=> prev.map((item)=> item.id === productId ? {...item, qty: item.qty + 1}: item))
    }
    const decrement =(qty, productId)=> {
        if(qty > 1){
            setCart((prev)=> prev.map((item)=> item.id === productId ? {...item, qty: item.qty - 1}: item))
        }else{
            removeCart(productId)
        }
    }

    return (
        <CartContext.Provider value={{cart, setCart, addToCart, removeCart, increment, decrement}}>
            {children}
        </CartContext.Provider>
    )
}