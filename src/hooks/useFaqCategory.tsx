import { createContext, useContext } from "react";
import { FaqCategoryModel } from "../interfaces/faqInterfaces";
import { getFaqCategory } from "../api/api";

interface FaqCategoryContextInterface{
  faqCategory:FaqCategoryModel[],
  error:any
}

export const FaqCategoryContext = createContext<FaqCategoryContextInterface|undefined>(undefined)

export const FaqCategoryProvider = ({
  children
}:{children:React.ReactNode})=>{

  const {data,error} = getFaqCategory()
  
  return (
    <FaqCategoryContext.Provider value={{faqCategory:data?data.data:[],error}}>
      {children}
    </FaqCategoryContext.Provider>
  )
}

export const useFaqCategory = ()=>{
  const context = useContext(FaqCategoryContext)
  if(!context) throw new Error("useFaqCategory hooks must be use within FaqCategoryContext Provider!")

  return context
}