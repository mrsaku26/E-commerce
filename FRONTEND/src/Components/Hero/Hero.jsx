import React from 'react'
import './Hero.css'
import arrow_icon from '../Assests/arrow.png'
import hand_icon from '../Assests/hand_icon.png'
import hero_image from '../Assests/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-im">
         <p>news</p>
         <img src={hand_icon} alt="" />
        </div>
        <p>collections</p>
        <p>for everyone</p>
        <div className="hero-btn">
         <button>Latest Collections</button>
         <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
         <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero