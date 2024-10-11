import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login,base64Logout} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import LoginModal from "../organisms/modal/LoginModal"
import { useAuth } from "../../../hooks/useAuth"

const FaqHeaderAction = ()=>{

  const {isAuthenticated,logout} = useAuth()

  // STATE
  const [showLoginModal,setShowLoginModal] = useState<boolean>(false)

  // EVENT HANDLER
  const handleLoginClick = ()=>{
    setShowLoginModal(true)
  }

  const handleLogoutClick = ()=>{
    logout()
  }

  const handleDownloadClick = ()=>{
    alert("CLICKED DOWNLOAD")
  }

  const handleAddClick = ()=>{
    alert("ADD CLICKED")
  }

  return (
    <>
      <div className="faq-header-action">
        {isAuthenticated &&
        <>  
          <IconButton title="Add FAQ" onClick={handleAddClick}>
            <img src={base64Add} alt="Add Icon"/>
          </IconButton>
          <IconButton title="Download FAQ">
            <img src={base64Download} alt="Download Icon" onClick={handleDownloadClick}/>
          </IconButton>
          <IconButton title="Logout" onClick={handleLogoutClick}>
            <img src={base64Logout} alt="Logout Icon"/>
          </IconButton>
        </>
        }
        {!isAuthenticated &&
          <IconButton onClick={handleLoginClick} title="Login">
            <img src={base64Login} alt="Login Icon"/>
          </IconButton>
        }
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