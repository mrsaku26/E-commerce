import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offer from '../Components/Offer/Offer'
import Newcollections from '../Components/Newcollections/Newcollections'
import Exclusive from '../Components/Exclusiveoffer/Exclusive'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offer/>
      <Newcollections/>
      <Exclusive/>
    </div>
  )
}

export default Shop
