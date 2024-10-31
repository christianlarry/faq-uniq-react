import { useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import { deleteFaq } from "../../../../api/api"

import { AxiosError } from "axios"
import Alert from "../alert/Alert"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../loading-screen/LoadingScreen"

interface Props{
  onClose:()=>void
  id:string
  title:string
}

const DeleteFaqModal = ({
  onClose,
  title,
  id
}:Props)=>{

  const navigate = useNavigate()

  const [showErrorAlert,setShowErrorAlert] = useState<boolean>(false)
  const [showSuccessAlert,setShowSuccessAlert] = useState<boolean>(false)
  const [errMessage,setErrMessage] = useState<string>("Failed on deleting FAQ!")

  // REQUEST STATE
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const handleCancelClick = ()=>{
    onClose()
  }

  const handleDeleteClick = async ()=>{

    setIsLoading(true)

    try {
      const result = await deleteFaq(id)

      if(result.status === 200){
        setShowSuccessAlert(true)
      }
      
    } catch (err) {
      if(err instanceof AxiosError){
        setShowErrorAlert(true)
        setErrMessage(err.response?.data.errors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessDeleteFaq = ()=>{
    onClose()
    navigate("/")
  }

  return (
    <Modal size="sm" onClose={onClose}>
      <ModalContent>
        <p>
          Are you sure to delete this FAQ?<br/><br/>
          <span style={{fontStyle:"italic"}}>
            Title: {title} 
            <br/>
            ID: {id}
          </span>
        </p>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleDeleteClick}>
            <span>Delete</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert state="error" onNext={()=>onClose()} message={errMessage} showState={[showErrorAlert,setShowErrorAlert]}/>
      <Alert state="success" onNext={handleSuccessDeleteFaq} message="Success delete FAQ!" showState={[showSuccessAlert,setShowSuccessAlert]}/>

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default DeleteFaqModal