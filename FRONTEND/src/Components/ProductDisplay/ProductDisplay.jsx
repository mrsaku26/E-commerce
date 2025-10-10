import React, { useContext } from 'react'
import star_icon from '../Assests/star_icon.png'
import star_dull_icon from '../Assests/star_dull_icon.png'
import { ShopContext } from '../Context/Context'

const ProductDisplay = (props) => {
   const {product}=props;
   const{AddtoCart}=useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
         <div className="left-samll">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
         </div>
         <div className="left-big">
            <img src={product.image} alt="" />
         </div>
      </div>
      <div className="productdisplay-right">
         <h1>{product.name}</h1>
         <div className="right-star">
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src={star_dull_icon} alt="" />
         <p>(132)</p>
      </div>
      <div className="right-price">
         <p className='old'>${product.old_price}</p>
         <p className='new'>${product.new_price}</p>
      </div>
      <div className="right-about">
         <p>Easy to wear, light to move, perfect for comfort in any season.</p>
      </div>
      <div className="right-size">
         <h1>Select Size</h1>
         <div>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
         </div>
      </div>
      <div className="right-cart">
         <button onClick={()=>{AddtoCart(product.id)}}>ADD TO CART</button>
      </div>
      <div className="right-category">
      <div className='rightct'>  <p><span>Category: </span>{product.category}</p></div>
         <div className='rightct'><p><span>Tags: </span> Modern,Latest</p></div>
      </div>
      </div>
      
    </div>
  )
}

export default ProductDisplay