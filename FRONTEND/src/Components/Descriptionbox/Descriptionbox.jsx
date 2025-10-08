import React from 'react'
import './Description.css'

const Descriptionbox = () => {
  return (
    <div className="desc">
      <div className="desc-btn">
         <div className="descc">
            <button className='description'>Description</button>
         <button className='reviews'>Reviews (122)</button>
         </div>
         <div className="descri">
           <p> An e-commerce website is an online platform that facilates the buying and selling of products or services over the internet.it serves as a virtual marketplace where business and indivduals can showcase their products, interact with customers, and conduct transactions without the need for a physical presenc. E-commerce website have gained immense popularity due to their convenience,accessibility, and the global reach they offer.
           </p> <span className='lower'>E-commerce websites typically display products or services aloong with detailed description,images,prices,and any aviable variations (eg.sizes,colors).Each product usually has its own dedicated page with relevant information</span>
         </div>
      </div>
    </div>
  )
}

export default Descriptionbox