import axios, { AxiosResponse } from "axios"
import useSWR, { SWRConfiguration } from "swr"
import { FaqCategoryResponseModel, FaqResponseModel } from "../interfaces/faqInterfaces"
import { LoginModel } from "../interfaces/userInterfaces"

// INIT VARIABEL
const api_baseUrl = "http://localhost:3000/api/v1/"

// FETCHER
export const fetcher = async <T>(url:string,query:string=''):Promise<T>=>{
  const response:AxiosResponse<T> = await axios.get(api_baseUrl+url+query)
  
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