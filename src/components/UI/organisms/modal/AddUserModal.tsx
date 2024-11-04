import { useRef, useState } from "react"
import Button from "../../atoms/button/Button"
import PlainInput from "../../atoms/input/PlainInput"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"
import FormRow from "../../molecules/form-layout/FormRow"
import InputGroup from "../../molecules/input-group/InputGroup"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { PostUserModel } from "../../../../interfaces/userInterfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { addUserValidation } from "../../../../validation/userValidation"
import { registerUser } from "../../../../api/api"
import { AxiosError } from "axios"
import LoadingScreen from "../loading-screen/LoadingScreen"
import Alert from "../alert/Alert"

interface Props{
  onClose:()=>void
}

const AddUserModal = ({
  onClose
}:Props)=>{

  // STATE
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isPostedUser,setIsPostedUser] = useState<boolean>(false)
  const [isFailedPostUser,setIsFailedPostUser] = useState<boolean>(false)

  const [failedPostUserMsg,setFailedPostUserMsg] = useState<string>("Failed add user!")

  // REF
  const addUserFormRef = useRef<HTMLFormElement>(null)

  // USE FORM
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(addUserValidation),
    mode: "all"
  })

  // EVENT HANDLER
  const handleAddClick = ()=>{
    if(addUserFormRef.current){
      addUserFormRef.current.requestSubmit()
    }
  }

  const onSubmit:SubmitHandler<PostUserModel> = async (data)=>{
    setIsLoading(true)

    try {
      const result = await registerUser(data)
      
      if(result.status === 200){
        setIsPostedUser(true)
      }
      
    } catch (err) {
      setIsFailedPostUser(true)

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
          <form ref={addUserFormRef} onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <InputGroup label="Username:" htmlFor="username" errors={errors.username?.message}>
                <Controller
                name="username"
                control={control}
                render={({field})=>(
                  <PlainInput
                  {...field}
                  placeholder="Username" 
                  id="username" />
                )}
                />
                
              </InputGroup>

              <InputGroup label="Email:" htmlFor="email" errors={errors.email?.message}>
                <Controller
                name="email"
                control={control}
                render={({field})=>(
                  <PlainInput
                  {...field}
                  type="email"
                  placeholder="Email" 
                  id="email" />
                )}
                />
              </InputGroup>

              <InputGroup label="Password:" htmlFor="password"  errors={errors.password?.message}>
                
                <Controller
                  name="password"
                  control={control}
                  render={({field})=>(
                    <PlainInput
                    {...field}
                    type="password"
                    placeholder="Password" 
                    id="password"/>
                  )}
                  />
              </InputGroup>
            </FormRow>
          </form>
        </section>

      </ModalContent>

      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleAddClick}>
            <span>Add</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert
        state="success"
        message="Success add new user to DB!"
        showState={[isPostedUser,setIsPostedUser]}
        onNext={onClose}
      />

      <Alert
        state="error"
        message={failedPostUserMsg}
        showState={[isFailedPostUser,setIsFailedPostUser]}
        onNext={()=>setIsFailedPostUser(false)}
      />

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default AddUserModal