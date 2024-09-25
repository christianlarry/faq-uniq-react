import { useContext } from "react"
import { AccordionContext } from "../components/UI/atoms/accordion/AccordionContainer"

const useAccordion = ()=>{
  const context = useContext(AccordionContext)
  if(!context) throw new Error("Accordion context must be used within Accordion Provider")

  return context
}

export default useAccordion