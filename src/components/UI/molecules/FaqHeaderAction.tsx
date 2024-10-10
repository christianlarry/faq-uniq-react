import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import LoginModal from "../organisms/modal/LoginModal"

const FaqHeaderAction = ()=>{

  const isAdmin = false
  // STATE
  const [showLoginModal,setShowLoginModal] = useState<boolean>(false)

  // EVENT HANDLER
  const handleLoginClick = ()=>{
    setShowLoginModal(true)
  }

  return (
    <>
      <div className="faq-header-action">
        {isAdmin &&
        <>  
          <IconButton>
            <img src={base64Add} alt="Add Icon"/>
          </IconButton>
          <IconButton>
            <img src={base64Download} alt="Download Icon"/>
          </IconButton>
        </>
        }
        <IconButton onClick={handleLoginClick}>
          <img src={base64Login} alt="Login Icon"/>
        </IconButton>
      </div>
      

      {createPortal((
        <>
          {showLoginModal &&
            <LoginModal showModalSet={setShowLoginModal}/>
          }
        </>
      ),document.body)}
    </>
  )
}

export default FaqHeaderAction