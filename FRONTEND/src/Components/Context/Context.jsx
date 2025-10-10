import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


export const ShopContext=createContext(null)
const getDefaultCart=()=>{
  let cart={}
   for (let index = 0; index < 300+1; index++) {
      cart[index]=0
   }
   return cart
}

const Context = (props) => {
   const[all_product,setallproduct]=useState([])
   const[cartNo,setCartNo]=useState(getDefaultCart())

   // Resets all carts after logout

   const resetCard=()=>{
      setCartNo(getDefaultCart())
   }

   // All Products data

   useEffect(()=>{
      const product=async()=>{
         const datas= await fetch('https://e-commerce-flip.vercel.app/allproduct')
      const res= await datas.json()
      setallproduct(res)

      }
      product()
      allcartdata()
   },[])

   // Show all cartDatas

   const allcartdata=async()=>{
      const data=await fetch('https://e-commerce-flip.vercel.app/getcartdata',{
         method:'POST',
         headers:{
            'user-token':`${localStorage.getItem('user-token')}`,
            'Content-type':'application/json'
         },
         body:''
      })
      const res= await data.json()
      setCartNo(res)
      
   }
   
   // Add to cart

   const AddtoCart=async(itemid)=>{
      setCartNo((prev)=>({...prev,[itemid]:prev[itemid]+1}))
      
      const data=await fetch('https://e-commerce-flip.vercel.app/addtocart',{
         method:'POST',
         headers:{
            'user-token':`${localStorage.getItem('user-token')}`,
            'Content-type':'Application/json'
         },
         body:JSON.stringify({"itemid":itemid})
      })
      const res= await data.json()
   }

   // Remove to cart

      const RemovetoCart=async(itemid)=>{
      setCartNo((prev)=>({...prev,[itemid]:prev[itemid]-1}))

       const data=await fetch('https://e-commerce-flip.vercel.app/removetocart',{
         method:'POST',
         headers:{
            'user-token':`${localStorage.getItem('user-token')}`,
            'Content-type':'Application/json'
         },
         body:JSON.stringify({"itemid":itemid})
      })
      const res= await data.json()
   }

      const getTotalCartAmount=()=>{
         let totalAmount=0
         for(const item in cartNo){
            if(cartNo[item]>0){
               let iteminfo = all_product.find((product)=>product.id===Number(item))
               totalAmount+=iteminfo.new_price*cartNo[item]
            }
           
         }
          return totalAmount
      }

      const totalCartNumber=()=>{
         let total=0
         for(const item in cartNo){
            if(cartNo[item]>0){
               total+=cartNo[item]
            }
         }
         return total
      }

   const contextValue={all_product,AddtoCart,RemovetoCart,cartNo,getTotalCartAmount,totalCartNumber,resetCard}


  return (

   <ShopContext.Provider value={contextValue}>
      {props.children}
   </ShopContext.Provider>
  
  )
}

export default Context