import { createContext, useContext } from "react"

interface ModalContextInterface {
  onClose: () => void
}

export const ModalContext = createContext<ModalContextInterface | undefined>(undefined)

export const useModal = ()=>{
  const context = useContext(ModalContext)
  if(!context) throw new Error("useModal must be used within ModalContextProvider!")
  return context
}