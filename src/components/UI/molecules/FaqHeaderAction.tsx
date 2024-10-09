import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"
import { createPortal } from "react-dom"
import { useState } from "react"

import Modal from "../atoms/modal/Modal"
import ModalHeader from "../atoms/modal/ModalHeader"
import ModalContent from "../atoms/modal/ModalContent"

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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque molestias laboriosam natus error provident, voluptatibus aut porro distinctio? Laborum magnam, odit corporis ad minus ex. Beatae repellendus perspiciatis corporis ex?</p>
              </ModalContent>
            </Modal>
          }
        </>
      ),document.body)}
    </>
  )
}

export default FaqHeaderAction