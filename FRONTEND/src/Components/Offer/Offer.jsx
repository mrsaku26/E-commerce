import React from 'react'
import './Offer.css'
import exclusive_image from '../Assests/exclusive_image.png'

const Offer = () => {
  return (
    <div className="offer">
      <div className="offer-left">
         <h1>Excluseive</h1>
         <h1 className='you'>Offer For You</h1>
         <p>ONLY ON BEST SELLER PRODUCTS</p>
         <div className="offer-btn">
            <button>Check Now</button>
         </div>
      </div>
      <div className="offer-right">
         <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offer