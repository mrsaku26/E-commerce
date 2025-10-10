import React, { useEffect, useState } from 'react'
import './Newcollection.css'

import Item from '../Item/Item'

const Newcollections = () => {
  const[newcollections,setNewcollection]=useState([])

  const collecions=async()=>{
    let data=await fetch('https://e-commerce-flip.vercel.app/newcollection')
    let res=await data.json()
    setNewcollection(res)
  }

  useEffect(()=>{
    collecions()
  },[])
  return (

     <div className="newcollection">
      <div className="newcollection-title">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="newcollection-container">
          {newcollections.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
      </div>
   </div>
  )
}

export default Newcollections