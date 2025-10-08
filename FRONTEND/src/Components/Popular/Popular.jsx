import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {

  const[popular,setPopular]=useState([])

  const addingpopular=async()=>{
    const data=await fetch('http://localhost:3000/popularinwomen')
    let res=await data.json()
    setPopular(res)
  }

  useEffect(()=>{
    addingpopular()
  },[])
  return (
    <div className="popular">
      <div className="popular-title">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-container">
          {popular.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Popular