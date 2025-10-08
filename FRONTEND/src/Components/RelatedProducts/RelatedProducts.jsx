import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import related from '../Assests/data'

const RelatedProducts = () => {
  return (
 <div className="related">
      <div className="related-title">
        <h1>RELATED PRODUCTS</h1>
        <hr />
        <div className="related-container">
          {related.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts