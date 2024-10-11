import { FaKey, FaUser } from "react-icons/fa6"
import Button from "../../atoms/button/Button"
import Input from "../../atoms/input/Input"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./LoginModal.css"
import React from "react"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { LoginFormModel } from "../../../../interfaces/formInputInterfaces"
import { LoginValidationSchema } from "../../../../validation/loginValidation"

interface Props{
  showModalSet:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({showModalSet}:Props) => {

  // USEFORM
  const { 
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm<LoginFormModel>({
    resolver: zodResolver(LoginValidationSchema),
    mode: "all"
  })

  // HANDLER
  const handleLogin = (data:LoginFormModel)=>{
    console.log(data)
  }

  return (
    <Modal>
      <ModalHeader showModal={showModalSet} />
      <ModalContent>
        <div className="login-modal-content">
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="login-modal-input-group">
                <Input 
                  {...register("email",{required:true})}
                  IconElement={FaUser} 
                  placeholder="E-Mail"
                  errors={errors.email && errors.email.message}
                />
                <Input 
                  {...register("password",{required:true})}
                  IconElement={FaKey} 
                  placeholder="Password" 
                  type="password"
                  errors={errors.password && errors.password.message}
                />
              </div>
              <Button className="login-btn" type="submit">
                <span>Login</span>
              </Button>
            </form>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal