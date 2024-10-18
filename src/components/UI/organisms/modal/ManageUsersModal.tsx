import React from "react"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const ManageUsersModal = ({showModalState}:Props)=>{

  const [show,setShow] = showModalState

  if(show) return (
    <Modal>
      <ModalHeader showModal={setShow}/>
      <ModalContent>

        <div className="manage-users-container">
          
        </div>

      </ModalContent>
    </Modal>
  )

  return <></>
}

export default ManageUsersModal