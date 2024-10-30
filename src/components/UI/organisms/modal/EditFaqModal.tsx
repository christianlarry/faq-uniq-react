import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

interface Props{
  onClose:()=>void
}

const EditFaqModal = ({
  onClose
}:Props)=>{

  const handleCancelClick = ()=>{
    onClose()
  }

  return (
    <Modal>
      <ModalHeader/>
      <ModalContent>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis voluptates id nostrum nemo qui fugiat possimus. Eum perspiciatis iusto aspernatur, totam tenetur, enim repellat quidem eius suscipit magnam, nesciunt quo.
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button>
            <span>Edit</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default EditFaqModal