import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/Context'
import nav_dropdown from '../Assests/nav_dropdown.png'

const Navbar = () => {
  const{totalCartNumber,resetCard}=useContext(ShopContext)
   const[menu,setMenu]=useState('shop')
   const menuRef=useRef()

 const dropdown_toggle=(e)=>{
  menuRef.current.classList.toggle('nav-visible')
  e.target.classList.toggle('open')
 }

  return (
    <div className='navbar'>
      <Link to='/' style={{textDecoration:'none'}}><div className="nav-left">
         <img src={logo} alt="" />
         <h2>SHOPPER</h2>
      </div></Link>
      <img src={nav_dropdown} alt="" className='nav-dropdown' onClick={dropdown_toggle}/>
       <div ref={menuRef} className="nav-mid">
            <ul  className='nav-menu'>
               <li onClick={()=>{setMenu('shop')}}><Link to='/' style={{textDecoration:'none'}}>Shop</Link> {menu==='shop'?<hr/>:<></>}</li>
               
               <li onClick={()=>{setMenu('mens')}}><Link to='/mens' style={{textDecoration:'none'}}>Mens</Link>{menu==='mens'?<hr/>:<></>}</li>
               
                <li onClick={()=>{setMenu('womens')}}><Link to='/womens' style={{textDecoration:'none'}}>Womens </Link>{menu==='womens'?<hr/>:<></>}</li>
               
               <li onClick={()=>{setMenu('kids')}}><Link to='/kids' style={{textDecoration:'none'}}>Kids </Link>{menu==='kids'?<hr/>:<></>}</li>
               
            </ul>
         </div>
         <div className="nav-right">
           {
            localStorage.getItem('user-token')?
            <button onClick={()=>{localStorage.removeItem('user-token');resetCard()}}>Logout</button>: <Link to='/login'><button>Login</button></Link>
           }
           <Link to='/cart'> <img src={cart_icon} alt="" /></Link>
           <div className="nav-right-icon">
             <p>{totalCartNumber()}</p>
           </div>
         </div>
    </div>
  )
}

export default Navbar
