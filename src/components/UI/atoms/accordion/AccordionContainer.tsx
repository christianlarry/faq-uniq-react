import { createContext, useState } from "react"
import "./AccordionContainer.css"

// ACCORDION CONTEXT START
interface AccordionContextInterface {
  isShow: boolean,
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccordionContext = createContext<AccordionContextInterface | undefined>(undefined)
// ACCORDION CONTEXT END


const AccordionContainer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <AccordionContext.Provider value={{isShow,setIsShow}}>
      <div className={`accordion-container${isShow ? " show" : ""}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export default AccordionContainer