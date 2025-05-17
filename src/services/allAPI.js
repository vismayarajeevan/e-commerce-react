import commonAPI from "./commonAPI"
import SERVER_URL from "./serverURL"


export const registerAPI = async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/auth/register`,reqBody)
}

export const verifyOtpAPI = async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/auth/verifyotp`,reqBody)
}


export const resendOtpAPI = async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/auth/resendotp`,reqBody)
}

export const loginOtpAPI = async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/auth/login`,reqBody)
}

export const getAllProductAPI = async()=>{
    return await commonAPI('GET',`${SERVER_URL}/api/all-products`,{})
}

export const addWishlistAPI = async(productId, reqHeader) => {
    return await commonAPI('POST', `${SERVER_URL}/api/wishlist/add`, { productId }, reqHeader)
}

export const getWishlistAPI = async(reqHeader) => {
    return await commonAPI('GET', `${SERVER_URL}/api/wishlist`, null, reqHeader)
}

export const removeFromWishlistAPI = async(productId, reqHeader) => {
    return await commonAPI('DELETE', `${SERVER_URL}/api/wishlist/${productId}`, {}, reqHeader)
}