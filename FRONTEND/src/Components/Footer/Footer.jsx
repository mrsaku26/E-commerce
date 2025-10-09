import React from 'react'
import './Footer.css'
import logo from '../Assests/logo_big.png'
import whatsapp from '../Assests/whatsapp_icon.png'
import insta from '../Assests/insta.png'
import pintester_icon from '../Assests/pintester_icon.png'

const Footer = () => {
  return (
   <div className="footer">
      <div className="footer-img">
         <img src={logo} alt="" />
         <h1>SHOPPER</h1>
      </div>
      <div className="footer-mid">
         <ul>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
         </ul>
      </div>
      <div className="footer-icon">
         <img className='icons' src={insta} alt="" />
         <img className='icons' src={pintester_icon} alt="" />
         <img className='icons' src={whatsapp} alt="" />
      </div>
      <hr />
      <div className="copy-right">
         <p>Copyright @ 2025-All right Reserved</p>
      </div>
   </div>
  )
}

export default Footer