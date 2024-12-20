import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { popularProductsApi } from '../../services/allApi'

const Popular = () => {

   
    const [popularProducts,setPopularProducts]=useState([])

    // popular product api 


    const popularproduct=async()=>{
       const result = await popularProductsApi()

       setPopularProducts(result.data.popular_in_women)

       
       
      
    }
    

    useEffect(()=>{


      popularproduct()


    },[])

    console.log(popularProducts);
    
    

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        
        {popularProducts.map((item,i)=>{

        
          
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
       
      </div>
    </div>
  )
}

export default Popular
