import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

interface Props{
  showModalState: [boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const DownloadFaqModal = ({
  showModalState
}:Props)=>{

  const [show,setShow] = showModalState

  const handleCancelClick = ()=>{
    setShow(false)
  }

  if(show) return (
    <Modal size="sm">
      <ModalHeader />
      <ModalContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quibusdam, maxime ratione harum saepe corporis et cupiditate voluptas alias, suscipit maiores debitis! Minus doloribus, nam suscipit nesciunt ea dolores quibusdam!</p>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button>
            <span>Download</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )

  return <></>
}

export default DownloadFaqModal