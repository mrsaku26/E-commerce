import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/Shopcategory'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Footer from './Components/Footer/Footer'
import Product from './Pages/Product'
import men_banner from './Components/Assests/banner_mens.png'
import women_banner from './Components/Assests/banner_women.png'
import kids_banner from './Components/Assests/banner_kids.png'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category='men'/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category='women'/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category='kid'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:productid' element={<Product/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
