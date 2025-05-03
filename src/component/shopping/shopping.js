import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context-api/CartContext";

const Shopping = ()=> {
    const { cart, addToCart,removeCart, decrement, increment} = useCart();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setVisible]= useState(false);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fix typo: "than" → "then"
        fetch('https://dummyjson.com/products')
          .then((res) => res.json())
          .then((data) => {
            setItem(data.products); // Use data.products (it's an array)
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching products', error);
            setLoading(false);
          });
          //
          
      }, []);
      const limitWords = (text, wordLimit)=> {
        const word = text.split(' ');
        return word.length > wordLimit ? word.slice(0, wordLimit).join(' ') + '...': text
      }
      const handleToggle = ()=> {
        setVisible(!isVisible)
      }
    
    //   const removeFromCart = (productId) => {
    //     setCart((prev) => prev.filter((item) => item.id !== productId));
    //   };

      const navigate = useNavigate();
      

    return (
        <>
            <div className="cart-container">
                <h2>🛍️ Shopping</h2>
                <div onClick={handleToggle}>🛒 {cart.length > 0 && <span>{cart.length}</span>} Shopping Card</div>
                {
                    isVisible && (
                       <>
                       {cart.length > 0 && (
                             <div className="addTocart">
                             <div className="uicart">
                                  <div>
                                  {
                                              cart.map((product)=> (
                                                  <div key={product.id} style={{listStyle: "none", border: "1px solid #aaa", padding: "10px" }}>
                                                      <div>
                                                          <div>
                                                              <img src={product.thumbnail} alt={product.title} style={{width: '50px', height:'50px' }} />
                                                          </div>
                                                          <div>
                                                              <strong>{product.title}</strong> — ${product.price} x {product.qty}
                                                          </div>
                                                          <div>
                                                              Total Amount: ${(product.price * product.qty).toFixed(2)}
                                                          </div>
                                                          <div>
                                                              <button onClick={()=> decrement(product.qty, product.id)}>-</button>{product.qty}
                                                              <button onClick={()=> increment(product.id)}>+</button>
                                                          </div>
   
                                                          <button onClick={()=>removeCart(product.id)}
                                                              style={{
                                                                  marginLeft: '12px',
                                                                  background: '#e74c3c',
                                                                  color: '#fff',
                                                                  border: 'none',
                                                                  padding: '6px 10px',
                                                                  cursor: 'pointer',
                                                                  borderRadius: '4px',
                                                              }}
                                                          >Remove cart</button>
                                                      </div>
                                                  </div>
                                              ))
                                          }
                                           <div>Total Amount: $ 
                                              {
                                                  cart.reduce((sum, product)=> sum + product.price * product.qty, 0).toFixed(2)
                                              }
                                           </div>
                                           <button onClick={() => navigate('/cart', { state: { cart } })}>
                                            Go To Cart
                                            </button>

                                  </div>
                             </div>
                          </div>
                       )}
                       
                       </>
                        
                    )
                }
                {
                    loading ? (
                        <p>Loading ...</p>
                    ) : (
                        <ul>
                            {
                                item.map((product)=> (
                                    <li key={product.id}>
                                        <div>{product.title}</div>
                                        <div>
                                            <img src={product.thumbnail} alt={product.title} />
                                        </div>
                                        <div>
                                            <span>{product.brand}</span>
                                            <span>{product.category}</span>
                                        </div>
                                        <div>
                                            {limitWords(product.description, 10)}
                                        </div>
                                        <div>{product.price}</div>
                                        <button onClick={()=> addToCart(product)}>Add To Cart</button>
                                    </li>
                                ))
                             }
                        </ul>
                    )
                }
            </div>
        </>
    )
}
export default Shopping;