import React from "react"
import "./ModalContent.css"

interface Props{
  children:React.ReactNode
}

const ModalContent = ({children}:Props) => {
  return (
    <div className="faqu-modal-content">
      {children}
    </div>
  )
}

export default ModalContent