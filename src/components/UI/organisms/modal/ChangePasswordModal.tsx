import { useRef, useState } from "react"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"
import ModalFooter from "../../atoms/modal/ModalFooter"
import Button from "../../atoms/button/Button"
import Alert from "../alert/Alert"
import LoadingScreen from "../loading-screen/LoadingScreen"
import { AxiosError } from "axios"
import ChangePasswordForm from "../form/ChangePasswordForm"
import { UpdateUserPasswordModel, UserModel } from "../../../../interfaces/userInterfaces"
import { SubmitHandler } from "react-hook-form"
import { updateUserPassword } from "../../../../api/api"

interface Props{
  onClose:()=>void
  data:UserModel
}

const ChangePasswordModal = ({
  onClose,
  data
}:Props)=>{

  // STATE
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isUpdatedPassword,setIsUpdatedPassword] = useState<boolean>(false)
  const [isFailedUpdatedPassword,setIsFailedUpdatePassword] = useState<boolean>(false)

  const [failedPostUserMsg,setFailedPostUserMsg] = useState<string>("Failed update password!")

  // REF
  const editPasswordFormRef = useRef<HTMLFormElement>(null)

  // EVENT HANDLER
  const handleSubmitBtnClick = ()=>{
    if(editPasswordFormRef.current){
      editPasswordFormRef.current.requestSubmit()
    }
  }

  const onSubmit:SubmitHandler<UpdateUserPasswordModel> = async (formData)=>{
    setIsLoading(true)

    try {
      const result = await updateUserPassword(data._id,formData)
      
      if(result.status === 200){
        setIsUpdatedPassword(true)
      }
      
    } catch (err) {
      setIsFailedUpdatePassword(true)

      if(err instanceof AxiosError && err.response){
        setFailedPostUserMsg(err.response.data.errors)
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
          <p>Change user {data.username} password</p>
          <br/>
        </section>

        <section>
          <ChangePasswordForm ref={editPasswordFormRef} onSubmit={onSubmit}/>
        </section>

      </ModalContent>

      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleSubmitBtnClick}>
            <span>Update Password</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert
        state="success"
        message={`Success update ${data.username} password!`}
        showState={[isUpdatedPassword,setIsUpdatedPassword]}
        onNext={onClose}
      />

      <Alert
        state="error"
        message={failedPostUserMsg}
        showState={[isFailedUpdatedPassword,setIsFailedUpdatePassword]}
        onNext={()=>setIsFailedUpdatePassword(false)}
      />

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default ChangePasswordModal