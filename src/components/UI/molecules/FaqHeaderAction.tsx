import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login,base64Logout, base64Users} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import LoginModal from "../organisms/modal/LoginModal"
import { useAuth } from "../../../hooks/useAuth"
import AlertSuccess from "../organisms/alert/Alert"
import AlertConfirm from "../organisms/alert/AlertConfirm"
import DownloadFaqModal from "../organisms/modal/DownloadFaqModal"
import ManageUsersModal from "../organisms/modal/ManageUsersModal"
import { postFaq } from "../../../api/api"
import { FormFaqData } from "../../../interfaces/faqInterfaces"
import { AxiosError } from "axios"
import FormFaqModal from "../organisms/modal/FormFaqModal"

const FaqHeaderAction = ()=>{

  const {isAuthenticated,logout,token} = useAuth()

  // STATE
  const [showLoginModal,setShowLoginModal] = useState<boolean>(false)
  const [showAddFaqModal,setShowAddFaqModal] = useState<boolean>(false)
  const [showDownloadFaqModal,setShowDownloadFaqModal] = useState<boolean>(false)
  const [showManageUsersModal,setShowManageUsersModal] = useState<boolean>(false)

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
    setShowManageUsersModal(true)
  }

  const handleAddFaqSubmit = ({title,answer,questions,subCategoryId}:FormFaqData)=>{
    postFaq(token,{
      title,
      answer,
      id_sub_category: subCategoryId,
      questions: questions
    })
      .then(result=>{
        if(result.status === 200){
          // setShowSuccessAlert(true)
        }
      })
      .catch(err=>{
        if(err instanceof AxiosError){

          // setShowErrorAlert(true)
          // setErrorMsg(err.response?.data.data.errors)
        }
      })
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
          {showLoginModal && <LoginModal onClose={()=>setShowLoginModal(false)}/>}
          {showAddFaqModal && 
            <FormFaqModal 
              onClose={()=>setShowAddFaqModal(false)} 
              onSubmit={handleAddFaqSubmit}
              submitText="Add"
            />
          }
          {showDownloadFaqModal && <DownloadFaqModal onClose={()=>setShowDownloadFaqModal(false)}/>}
          {showManageUsersModal && <ManageUsersModal onClose={()=>setShowManageUsersModal(false)}/>}

          <AlertConfirm 
          message="Confirm logout?"
          showState={confirmLogoutState}
          onNext={handleLogout}
          />

          <AlertSuccess
          state="success"
          message="Logout success!"
          showState={isLogoutState}
          />
        </>
      ),document.body)}
    </>
  )
}

export default FaqHeaderAction