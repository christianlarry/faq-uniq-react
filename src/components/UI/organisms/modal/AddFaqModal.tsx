import React from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./AddFaqModal.css"
import TextEditor from "../../atoms/input/TextEditor"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const AddFaqModal = ({showModalState}:Props)=>{

  const [show,setShow] = showModalState

  const handleCancelClick = ()=>{
    setShow(false)
  }

  if(show) return (
    <Modal>
      <ModalHeader/>
      <ModalContent>
        <section>
          <div className="add-faq-editor">
            <TextEditor/>
          </div>
        </section>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button>
            <span>Add</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )

  return <></>
}

export default AddFaqModal