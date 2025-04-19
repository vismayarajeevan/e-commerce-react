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