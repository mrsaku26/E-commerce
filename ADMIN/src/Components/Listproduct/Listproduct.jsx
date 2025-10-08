import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'

const Listproduct = () => {

  const[list,setList]=useState([])

  const products=async()=>{
    let data=await fetch('http://localhost:3000/allproduct')
    let res=await data.json()
    setList(res)
  }

  useEffect(()=>{
    products()
  },[])

  const remove=async(id)=>{
    let data=await fetch('http://localhost:3000/deleteproduct',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({id:id})
    }
    )
    let res=await data.json()
   await products()
  }
  return (
    <div className="listproduct">
      <div className="list-title">
        <h1>All Product List</h1>
      </div>
      <div className="list-details">
       
         <p>Product</p>
         <p>Image</p>
         <p>Old Price</p>
         <p>New Price</p>
         <p>Category</p>
         <p>Remove</p>        
      </div>
      <div className="list-main">
        <hr/>
        {
          list.map((item,inde)=>{
            return <div key={inde} className="list-details list-container">
              <img className='image' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.old_price}</p>
              <p>{item.new_price}</p>
              <p>{item.category}</p>
              <img onClick={()=>remove(item.id)} className='cross' src={cross_icon} alt="" />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Listproduct