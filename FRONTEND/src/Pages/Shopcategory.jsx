import React, { useContext } from 'react'
import './Shopcategory.css'
import dropdown_icon from '../Components/Assests/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { ShopContext } from '../Components/Context/Context'

const shopCategroy = (props) => {
  const {all_product}=useContext(ShopContext)
  return (
    <div className='shopcategory'>
      <div className="shopcategory-banner">
        <img src={props.banner} alt="" />
      </div>
      <div className="shopcategory-sort">
        <div><span>Showing 1-12 </span>out of 36 products</div>
        <div className="shopcategory-img">
          <p>Sort by</p>
          <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-container">
        {
          all_product.map((item,index)=>{
            if(item.category===props.category){
              return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              console.log('Not found')
            }
          })
        }
      </div>
      <div className="shopcategory-loadmore">
        <p>Explore More</p>
      </div>
    </div>
  )
}

export default shopCategroy
