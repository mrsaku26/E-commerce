import React from 'react'
import '../../Components/Styles/Breadcrum.css'
import arrow_icon from '../Assests/breadcrum_arrow.png'

const Breadcrum = (props) => {
  const{product}=props;
  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      <p>{product.category}</p> <img src={arrow_icon} alt="" />
      <p>{product.name}</p>
     
    </div>
  )
}

export default Breadcrum