import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"

interface Props{
  onClose:()=>void
}

const ManageUsersModal = ({onClose}:Props)=>{

  return (
    <Modal>
      <ModalHeader onClose={onClose}/>
      <ModalContent>

        <div className="manage-users-container">
          
        </div>

      </ModalContent>
    </Modal>
  )
}

export default ManageUsersModal