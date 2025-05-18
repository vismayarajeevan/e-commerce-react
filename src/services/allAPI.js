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

// Add to cart API
export const addToCartAPI = async (productId, quantity, reqHeader) => {
    return await commonAPI('POST', `${SERVER_URL}/api/cart/add`, { productId, quantity }, reqHeader)
}

// Get cart API
export const getCartAPI = async (reqHeader) => {
    return await commonAPI('GET', `${SERVER_URL}/api/cart`, null, reqHeader)
}

// Increment cart item API
export const incrementCartItemAPI = async (productId, reqHeader) => {
    return await commonAPI('PUT', `${SERVER_URL}/api/cart/increment/${productId}`, {}, reqHeader)
}

// Decrement cart item API
export const decrementCartItemAPI = async (productId, reqHeader) => {
    return await commonAPI('PUT', `${SERVER_URL}/api/cart/decrement/${productId}`, {}, reqHeader)
}

// Remove from cart API
export const removeFromCartAPI = async (productId, reqHeader) => {
    return await commonAPI('DELETE', `${SERVER_URL}/api/cart/remove/${productId}`, null, reqHeader)
}