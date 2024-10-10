import { useEffect } from "react"
import FocusLock from "react-focus-lock"

import "./Modal.css"

interface Props{
  children: React.ReactNode
}

const Modal = ({
  children
}:Props)=>{

  useEffect(()=>{
    document.body.classList.add("modal-open")

    return ()=>{
      document.body.classList.remove("modal-open")
    }
  },[])

  return (
    <FocusLock>
      <div className="faqu-modal">
        <div className="faqu-modal-wrapper">
          <div className="faqu-modal-container">
            {children}
          </div>
        </div>
      </div>
    </FocusLock>
  )
}

export default Modal