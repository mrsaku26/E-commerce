import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Components/Context/Context'
import Breadcrum from '../Components/Breadcrum/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const{all_product}=useContext(ShopContext)
  const{productid}=useParams()
  const product=all_product.find((e)=>e.id===Number(productid))
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <Descriptionbox/>
    </div>
  )
}

export default Product