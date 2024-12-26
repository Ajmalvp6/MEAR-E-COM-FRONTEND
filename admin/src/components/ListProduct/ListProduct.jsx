import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import { allProductsApi, removeProductApi } from '../../services/allApis'
import cross_icon from '../../Assets/cross_icon.png'
import { BaseUrl } from '../../services/baseUrl'
import { Bounce, toast } from 'react-toastify'






const ListProduct = () => {

  const [allproducts,setAllproducts]=useState([])

  const getallproducts=async()=>{

    const result = await allProductsApi()

    const products = result?.data?.Products

    setAllproducts(products)

  }


  // remove product api

  const productRemove=async(id,name)=>{

    
    

    const headers ={
      "content-type":"application/json"
    }

    const bodyData = JSON.stringify({id})

    await removeProductApi(bodyData,headers)

    
    toast.success(`${name} removed successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });

    getallproducts()
  }



  useEffect(()=>{
    getallproducts()
  },[])

  
  

 
  

  return (
    <div className='list-product'>

      <h1>All Product List</h1>

      <div className="listproduct-format-main">
        <p>Prodct</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listprduct-allproducts">

        <hr />


        {allproducts?.map((product,index)=>{
          return <> <div key={index} className="listproduct-format-main listproduct-format">
              
            <img src={`${BaseUrl}/uploads/${product.image}`} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>productRemove(product.id,product.name)} className="listproduct-remove-icon" src={cross_icon} alt=""  />
          </div>
          <hr />
          </>
        })}

      </div>
      
    </div>
  )
}

export default ListProduct
