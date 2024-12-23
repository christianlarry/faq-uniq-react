import axios, { AxiosResponse } from "axios"
import useSWR, { SWRConfiguration } from "swr"
import { FaqCategoryResponseModel, FaqResponseModel, PostFaqModel } from "../interfaces/faqInterfaces"
import { EditUserModel, LoginModel, PostUserModel, UpdateUserPasswordModel, UserResponseModel } from "../interfaces/userInterfaces"

// INIT VARIABEL
const api_baseUrl = import.meta.env.VITE_API_BASE_URL || ""
const login_token_key = "loginToken"

// GET TOKEN
const getToken = ()=>{
  const lsTokenKey = login_token_key

  return localStorage.getItem(lsTokenKey) || ""
}

// FETCHER
export const fetcher = async <T>(url:string,query:string=''):Promise<T>=>{

  const token = getToken()

  const response:AxiosResponse<T> = await axios.get(api_baseUrl+url+query,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return response.data
}

// ENDPOINT
export const getFaq = (query?:string,config?:SWRConfiguration)=>useSWR<FaqResponseModel>(
  `faq${query?"?"+query:""}`,
  fetcher,
  config
)

export const getFaqCategory = (config?:SWRConfiguration)=>useSWR<FaqCategoryResponseModel>(
  `faq-category`,
  fetcher,
  config
)

export const getFaqById = (id:string,config?:SWRConfiguration)=>useSWR<FaqResponseModel>(
  `faq/${id}`,
  fetcher,
  config
)

// POST LOGIN
export const postLogin = async (data:LoginModel)=>{
  return await axios.post(`${api_baseUrl}/login`,data)
}

export const postCheckToken = async (token:string)=>{
  return await axios.post(`${api_baseUrl}/check-token`,undefined,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const postFaq = async (data:PostFaqModel)=>{

  const token = getToken()

  return await axios.post(`${api_baseUrl}/faq`,data,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

// DELETE
export const deleteFaq = async (id:string)=>{

  const token = getToken()

  return await axios.delete(`${api_baseUrl}/faq/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

// UPDATE
export const updateFaq = async (id:string,data:PostFaqModel)=>{

  const token = getToken()

  return await axios.put(`${api_baseUrl}/faq/${id}`,data,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

// USERS ENDPOINT
export const getUsers = (config?:SWRConfiguration)=>useSWR<UserResponseModel>(
  `user`,
  fetcher,
  config
)

export const registerUser = async (data:PostUserModel)=>{
  const token = getToken()

  return await axios.post(`${api_baseUrl}/register`,data,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateUser = async (id:string,data:EditUserModel)=>{
  const token = getToken()

  return await axios.put(`${api_baseUrl}/user/${id}`,data,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateUserPassword = async (id:string,data:UpdateUserPasswordModel)=>{
  const token = getToken()

  return await axios.put(`${api_baseUrl}/user/${id}/password`,data,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

// DELETE
export const deleteUser = async (id:string)=>{

  const token = getToken()

  return await axios.delete(`${api_baseUrl}/user/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

// GET CHAINLIT CHATBOT TOKEN
export const postGenerateChainlitToken = async ()=>{
  return await axios.post(`${api_baseUrl}/generate-token`)
}