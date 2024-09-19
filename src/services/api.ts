import axios, { AxiosResponse } from "axios"
import { FaqModel } from "../interfaces/faqInterfaces"


// API VARIABEL
const api_baseurl = "http://localhost:3000/api/"

// FETCHER
const fetcher = async <T>(url:string,query:string=""):Promise<T>=>{
  const response:AxiosResponse<T> = await axios.get(api_baseurl+url+query,{
    method: "GET",

  })
  return response.data
}

// MODEL
interface GetFaqResponseModel{
  data:FaqModel[]
}

// ENDPOINT!
export const getFaq = ()=>{
  return fetcher<GetFaqResponseModel>("faq")
}