import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login,base64Logout, base64Users} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import LoginModal from "../organisms/modal/LoginModal"
import { useAuth } from "../../../hooks/useAuth"
import AlertSuccess from "../organisms/alert/AlertSuccess"
import AlertConfirm from "../organisms/alert/AlertConfirm"
import AddFaqModal from "../organisms/modal/AddFaqModal"
import DownloadFaqModal from "../organisms/modal/DownloadFaqModal"

const FaqHeaderAction = ()=>{

  const {isAuthenticated,logout} = useAuth()

  // STATE
  const [showLoginModal,setShowLoginModal] = useState<boolean>(false)
  const [showAddFaqModal,setShowAddFaqModal] = useState<boolean>(false)
  const [showDownloadFaqModal,setShowDownloadFaqModal] = useState<boolean>(false)

  const confirmLogoutState = useState<boolean>(false)
  const isLogoutState = useState<boolean>(false)

  // EVENT HANDLER
  const handleLoginClick = ()=>{
    setShowLoginModal(true)
  }

  const handleLogoutButtonClick = ()=>{
    confirmLogoutState[1](true)
  }

  const handleLogout = ()=>{
    logout()
    isLogoutState[1](true)
  }

  const handleDownloadClick = ()=>{
    setShowDownloadFaqModal(true)
  }

  const handleAddClick = ()=>{
    setShowAddFaqModal(true)
  }

  const handleManageUsersClick = ()=>{
    alert("Manage users bro!!")
  }

  return (
    <>
      <div className="faq-header-action">
        {isAuthenticated &&
        <>  
          <IconButton title="Logout" onClick={handleLogoutButtonClick}>
            <img src={base64Logout} alt="Logout Icon"/>
          </IconButton>
          <IconButton title="Add FAQ" onClick={handleAddClick}>
            <img src={base64Add} alt="Add Icon"/>
          </IconButton>
          <IconButton title="Download FAQ" onClick={handleDownloadClick}>
            <img src={base64Download} alt="Download Icon"/>
          </IconButton>
          <IconButton title="Manage Users" onClick={handleManageUsersClick}>
            <img src={base64Users} alt="Manage Users Icon"/>
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

          <AddFaqModal showModalState={[showAddFaqModal,setShowAddFaqModal]}/>
          <DownloadFaqModal showModalState={[showDownloadFaqModal,setShowDownloadFaqModal]}/>

          <AlertConfirm 
          message="Confirm logout?"
          showState={confirmLogoutState}
          onNext={handleLogout}
          />

          <AlertSuccess
          message="Logout success!"
          showState={isLogoutState}
          />
        </>
      ),document.body)}
    </>
  )
}

export default FaqHeaderAction