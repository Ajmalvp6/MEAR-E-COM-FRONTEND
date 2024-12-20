import { BaseUrl } from "./baseUrl";
import { commonApi } from "./commonApi";




// imageUpload_Api

export const imageUploadApi=async(bodyData,headers)=>{
  return await commonApi('post',`${BaseUrl}/upload`,bodyData,headers)
}


// addProductApi 

export const addProductApi=async(bodyData)=>{
  return await commonApi('post',`${BaseUrl}/addproduct`,bodyData,{})
}

// getAllProductsApi 

export const allProductsApi=async()=>{
  return await commonApi('get',`${BaseUrl}/allproducts`,{},{})
}

// remove product 

export const removeProductApi=async(bodyData,headers)=>{
  return await commonApi('post',`${BaseUrl}/removeproduct`,bodyData,headers)
}