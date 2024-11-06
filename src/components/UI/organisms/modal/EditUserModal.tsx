import { useRef, useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"
import {SubmitHandler} from "react-hook-form"
import { EditUserModel, UserModel } from "../../../../interfaces/userInterfaces"
import { updateUser } from "../../../../api/api"
import { AxiosError } from "axios"
import LoadingScreen from "../loading-screen/LoadingScreen"
import Alert from "../alert/Alert"
import EditUserForm from "../form/EditUserForm"

interface Props{
  onClose:()=>void
  data:UserModel
}

const EditUserModal = ({
  onClose,
  data
}:Props)=>{

  // STATE
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isEditedUser,setIsEditedUser] = useState<boolean>(false)
  const [isEditedPostUser,setIsFailedEditUser] = useState<boolean>(false)

  const [failedRequestMsg,setFailedRequestMsg] = useState<string>("Failed edit user!")

  // REF
  const editUserFormRef = useRef<HTMLFormElement>(null)

  // EVENT HANDLER
  const handleAddClick = ()=>{
    if(editUserFormRef.current){
      editUserFormRef.current.requestSubmit()
    }
  }

  const onSubmit:SubmitHandler<EditUserModel> = async (formData)=>{
    try {
    
      const isDataEqual = formData.email===data.email && formData.username===data.username
      
      if(isDataEqual) throw new Error("Nothing's changed, mate!")
      
      setIsLoading(true)
      const result = await updateUser(data._id,formData)
      
      if(result.status === 200){
        setIsEditedUser(true)
      }
      
    } catch (err) {
      setIsFailedEditUser(true)

      if(err instanceof AxiosError && err.response){
        setFailedRequestMsg(err.response.data.errors)
      }else if(err instanceof Error){
        setFailedRequestMsg(err.message)
      }
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} size="sm">
      <ModalHeader/>
      <ModalContent>

        <section>
          <EditUserForm 
          ref={editUserFormRef} 
          onSubmit={onSubmit} 
          defaultValues={{
            email:data.email,
            username:data.username
          }}
          />
        </section>

      </ModalContent>

      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleAddClick}>
            <span>Update</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert
        state="success"
        message="Success add new user to DB!"
        showState={[isEditedUser,setIsEditedUser]}
        onNext={onClose}
      />

      <Alert
        state="error"
        message={failedRequestMsg}
        showState={[isEditedPostUser,setIsFailedEditUser]}
        onNext={()=>setIsFailedEditUser(false)}
      />

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default EditUserModal