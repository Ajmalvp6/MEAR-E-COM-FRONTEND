import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { relatedProductApi } from '../../services/allApi'
import { useParams } from 'react-router-dom'

const RelatedProducts = () => {


  const {productId} = useParams()

  const [data_product,setData_product] = useState([])

  

  const relatedProduct=async ()=>{


    const response = await relatedProductApi(productId)

    setData_product(response.data.relatedProducts);
    

    
    
    
    
  }

  useEffect(()=>{
    relatedProduct()
  },[])
  
  return (
    <div className='relatedproducts'>

        <h1>Related Products</h1>
        <hr />

        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
      
    </div>
  )
}

export default RelatedProducts
