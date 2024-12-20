import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { newCollectionApi } from '../../services/allApi'

const NewCollections = () => {


  const [new_collection,setNew_collection]=useState([])


  // newCollection api 

  const newcollection=async()=>{
    const result = await newCollectionApi()
    setNew_collection(result.data.newCollection)
    
  }
  

  useEffect(()=>{


    newcollection()
    

  },[])

  
  


  return (
    <div className='new-collections'>

        <h1>New Collections</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections
