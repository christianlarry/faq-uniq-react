import { useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

import { AxiosError } from "axios"
import Alert from "../alert/Alert"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../loading-screen/LoadingScreen"
import { deleteUser } from "../../../../api/api"
import { UserModel } from "../../../../interfaces/userInterfaces"

interface Props{
  onClose:()=>void
  data:UserModel
}

const DeleteUserModal = ({
  onClose,
  data
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
      const result = await deleteUser(data._id)

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

  const handleSuccessDeleting = ()=>{
    onClose()
    navigate("/")
  }

  return (
    <Modal size="sm" onClose={onClose}>
      <ModalContent>
        <p>
          Are you sure to delete this user?<br/><br/>
          <span style={{fontStyle:"italic"}}>
            Username: {data.username} 
            <br/>
            Email: {data.email}
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
      <Alert state="success" onNext={handleSuccessDeleting} message={`Success delete user ${data.username}!`} showState={[showSuccessAlert,setShowSuccessAlert]}/>

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default DeleteUserModal