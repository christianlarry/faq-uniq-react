import { createContext, useContext } from "react";
import { FaqModel } from "../interfaces/faqInterfaces";
import { getFaq } from "../api/api";

interface AllFaqContextInterface{
  faq:FaqModel[],
  error:any
}

export const AllFaqContext = createContext<AllFaqContextInterface|undefined>(undefined)

export const AllFaqProvider = ({
  children
}:{children:React.ReactNode})=>{

  const {data,error} = getFaq()
  
  return (
    <AllFaqContext.Provider value={{faq:data?data.data:[],error}}>
      {children}
    </AllFaqContext.Provider>
  )
}

export const useAllFaq = ()=>{
  const context = useContext(AllFaqContext)
  if(!context) throw new Error("useAllFaq hooks must be use within AllFaqContext Provider!")

  return context
}