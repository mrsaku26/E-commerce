import React, { useContext } from 'react'
import './Cart.css'
import { ShopContext } from '../Components/Context/Context'
import cross_icon from '../Components/Assests/cross_icon.png'

const Cart = () => {
  const{all_product,cartNo,RemovetoCart,getTotalCartAmount}=useContext(ShopContext)
  return (
    <div className="cart">
      <div className="cart-top">
        <p>Product</p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total </p>
      <p>Remove</p>
      </div>
      <hr />
      {
        all_product.map((e)=>{
          if(cartNo[e.id]>0){
            return <div>
               <div key={e.id} className="cart-top cart-format">
            <img className='images' src={e.image} alt="" />
            <p>{e.name}</p>
            <p>${e.new_price}</p>
            <button className="cartitems-quantity">
              {cartNo[e.id]}
            </button>
            <p>${e.new_price*cartNo[e.id]}</p>
            <img src={cross_icon} alt="" onClick={()=>{RemovetoCart(e.id)}} className='remove'/>
          </div>
          <hr className='hr'/>
              </div>
              
          }else{
            console.log('')
          }
        })
      }
      <div className="cart-main">
        <div className="main-left">
          <h1>Cart Totals</h1>
         <div> <p>Subtotal</p> <p className='gaps'>${getTotalCartAmount()}</p></div>
          <hr />
          <div><p>Shipping Fee</p> <p className='gaps'>Free</p></div>
          <hr />
         
          <div><h2>Total</h2>
          <h2 className='gapss'> {getTotalCartAmount()}</h2></div>
          <div className="left-btn">
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
        <div className="main-right">
          <p>If you have a promo code, Enter it here</p>
          <div className="right-input">
            <input type="text" name="" id="" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart