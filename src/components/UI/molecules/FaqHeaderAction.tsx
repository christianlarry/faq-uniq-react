import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import Modal from "../atoms/modal/Modal"
import ModalHeader from "../atoms/modal/ModalHeader"
import ModalContent from "../atoms/modal/ModalContent"
import Input from "../atoms/input/Input"
import { FaKey, FaUser } from "react-icons/fa6"
import Button from "../atoms/button/Button"

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
            <Modal>
              <ModalHeader showModal={setShowLoginModal}/>
              <ModalContent>
                <div className="login-modal-content">
                  <div>
                    <h2>Login</h2>
                    <div className="login-modal-input-group">
                      <Input IconElement={FaUser} placeholder="E-Mail"/>
                      <Input IconElement={FaKey} placeholder="Password" type="password"/>
                    </div>
                    <Button className="login-btn">
                      <span>Login</span>
                    </Button>
                  </div>
                </div>
              </ModalContent>
            </Modal>
          }
        </>
      ),document.body)}
    </>
  )
}

export default FaqHeaderAction