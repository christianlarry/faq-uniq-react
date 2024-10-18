import React from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const DeleteFaqModal = ({showModalState}:Props)=>{

  const [show,setShow] = showModalState

  const handleCancelClick = ()=>{
    setShow(false)
  }

  if(show) return (
    <Modal size="sm">
      <ModalContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nihil expedita sed id labore quam, cum voluptatum magni! Facere optio aperiam tenetur minus id asperiores consequuntur ea repellat reprehenderit deserunt.
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button>
            <span>Delete</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )

  return <></>
}

export default DeleteFaqModal