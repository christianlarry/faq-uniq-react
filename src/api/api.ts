import axios, { AxiosResponse } from "axios"
import useSWR, { SWRConfiguration } from "swr"
import { FaqCategoryResponseModel, FaqResponseModel, PostFaqModel } from "../interfaces/faqInterfaces"
import { LoginModel, UserResponseModel } from "../interfaces/userInterfaces"

// INIT VARIABEL
const api_baseUrl = "http://localhost:3000/api/v1/"

// FETCHER
export const fetcher = async <T>(url:string,query:string=''):Promise<T>=>{

  const token = localStorage.getItem("token")

  const response:AxiosResponse<T> = await axios.get(api_baseUrl+url+query,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return response.data
}

// GET TOKEN
const getToken = ()=>{
  const lsTokenKey = "token"

  return localStorage.getItem(lsTokenKey) || ""
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

// DELETE
export const deleteUser = async (id:string)=>{

  const token = getToken()

  return await axios.delete(`${api_baseUrl}/user/${id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}