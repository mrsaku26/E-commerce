import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const[button,setbutton]=useState('Login')
    const[formdata,setFormdata]=useState({
      name:'',
      email:'',
      password:''
    })

    const changeHandler=(e)=>{
      setFormdata({...formdata,[e.target.name]:e.target.value})
    }

  const login=async()=>{
      if(!formdata.email || !formdata.password){
      alert("Please entered all required fields")
    }
       try {
       let responsedata;

    let data=await fetch('https://e-commerce-flip.vercel.app/login',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(formdata)
    })

    let res=await data.json()
    responsedata=res

    if(responsedata.success){
      localStorage.setItem('user-token',responsedata.token)
      window.location.replace("/")
      alert("Login successfully")
    }else{
      alert('Email or Password is Incorrect')
    }

    } catch (error) {
      console.error(error)
      alert('Something is wrong')
    }
  }

   const Signup=async()=>{
   
    if(!formdata.name || !formdata.email || !formdata.password){
      alert("Please entered all required fields")
    }

   try {
     let responsedata;

    let data=await fetch('https://e-commerce-flip.vercel.app/signup',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(formdata)
    })

    let res=await data.json()
    responsedata=res

    if(responsedata.success){
      localStorage.setItem('user-token',responsedata.token)
      window.location.replace("/")
      alert("Sign Up successfully")
    }

   } catch (error) {
    console.error(error)
   }
  }


  return (
    <div className="login">
      <div className="login-cont">
        <h1>{button}</h1>
        <div className="login-input">
          {
            button==='Signup'?<input value={formdata.name} onChange={changeHandler} type="text" name="name" id="" placeholder='Your Name'/>:""
          }
          <input value={formdata.email} onChange={changeHandler} type="text" name="email" id="email" placeholder='Email Adress'/>
          <input value={formdata.password} onChange={changeHandler} type="text" name="password" id="password" placeholder='Password'/>
        </div>
        <div className="login-btn">
          <button onClick={()=>{button==='Login'?login():Signup()}}>Continue</button>
        </div>
        {
          button==='Signup'?<div className="login-signup">
          <p>Alreday have an account? <span style={{cursor:'pointer'}} onClick={()=>{setbutton('Login')}}>Login here</span></p>
        </div>: <div className="login-signup">
          <p>Don't have an account? <span style={{cursor:'pointer'}} onClick={()=>{setbutton('Signup')}}>Signup here</span></p>
        </div>
        }
       
        <div className="login-policy">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default Login