import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {

  const[image,setImage]=useState(false)

  const[inputValue,setInputValue]=useState({
    'name':'',
    'image':'',
    'old_price':'',
    'new_price':'',
    'category':'men'
  })

  const changeHandler=(e)=>{
    setInputValue({...inputValue,[e.target.name]:e.target.value})
  }

  const imageHandler=(e)=>{
    setImage(e.target.files[0])
  }
  
    const Addproduct=async()=>{
     
      let responsedata;
      let product=inputValue;

      let formData =new FormData;
      formData.append('product',image)

      let data=await fetch('https://e-commerce-flip.vercel.app/upload',{
        method:'POST',
        body:formData
      })
      let res= await data.json()
      responsedata=res

      if(responsedata.success){
        product.image=responsedata.image_url
        console.log(product)
      }

      let dats=await fetch('https://e-commerce-flip.vercel.app/addproduct',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(product)
      })
      let resp=await dats.json()
      let value=resp

      if(value.success){
        alert("Prouct Added")
      }
      else{
        alert("Not Added")
      }

    }
  return (
    <div className='addproduct'>
      <div className="product-name">
        <p>Product Name</p>
        <input value={inputValue.name} onChange={changeHandler} name='name' type="text" placeholder='Type here' />
      </div>
      <div className="product-price">
        <div className="product-prices">
          <p>Price</p>
          <input value={inputValue.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="product-prices">
          <p>Offer Price</p>
          <input value={inputValue.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="product-category">
        <p>Product Category</p>
        <select onChange={changeHandler} name='category'>
          <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kid">kid</option>
        </select>
      </div>
      <div className="product-input">
        <label  htmlFor="file-upload">
          <img src={image?URL.createObjectURL(image):upload_area} alt="" />
        </label>
            <input onChange={imageHandler} type="file" id='file-upload' name='image' hidden/>
      </div>
      <div className="product-btn">
        <button onClick={Addproduct}>ADD</button>
      </div>
    </div>
  )
}

export default Addproduct
