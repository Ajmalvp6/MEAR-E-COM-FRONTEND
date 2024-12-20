import { BaseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"



// login api 

export const loginApi=async(bodyData)=>{
     return await commonApi('post',`${BaseUrl}/login`,bodyData)
}


// register api 

export const registerApi=async(bodyData)=>{
    return await commonApi('post',`${BaseUrl}/register`,bodyData)
}


// all product 

export const getAllProductApi=async()=>{
    return await commonApi('get',`${BaseUrl}/allproducts`,{},{})
}


// new collections 

export const newCollectionApi=async()=>{
    return await commonApi('get',`${BaseUrl}/newCollection`,{},{})
}


// popular products 

export const popularProductsApi=async()=>{
    return await commonApi('get',`${BaseUrl}/popularinwomen`,{},{})
}


// addto cart 

export const addtoCartApi=async(bodyData,headers)=>{
    return await commonApi('post',`${BaseUrl}/addtocart`,bodyData,headers)
}


// getcartproducts Api 

export const getCartProdutcsApi=async(headers)=>{

    return await commonApi('get',`${BaseUrl}/getcartProducts`,{},headers)

}


// removeFromCart Api 

export const removeFromCartApi=async(bodyData,headers)=>{

    return await commonApi('post',`${BaseUrl}/removefromcart`,bodyData,headers)

}