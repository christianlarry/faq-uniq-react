import { FaKey, FaUser } from "react-icons/fa6"
import Button from "../../atoms/button/Button"
import Input from "../../atoms/input/Input"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./LoginModal.css"
import { useState } from "react"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { LoginModel } from "../../../../interfaces/userInterfaces"
import { LoginValidationSchema } from "../../../../validation/loginValidation"
import { postLogin } from "../../../../api/api"
import { AxiosError } from "axios"
import ErrorInput from "../../atoms/error/ErrorInput"
import { useNavigate } from "react-router-dom"

import AlertSuccess from "../alert/Alert"
import LoadingScreen from "../loading-screen/LoadingScreen"

interface Props{
  onClose:()=>void
}

const LoginModal = ({onClose}:Props) => {

  // STATE
  const [loginError,setLoginError] = useState<AxiosError<any,any>>()
  const isLoginState = useState<boolean>(false)

  // REQUEST STATE
  const [isLoading,setIsLoading] = useState<boolean>(false)

  // NAVIGATE
  const navigate = useNavigate()

  // USEFORM
  const { 
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm<LoginModel>({
    resolver: zodResolver(LoginValidationSchema),
    mode: "all"
  })

  // HANDLER
  const handleLogin = async (data:LoginModel)=>{

    setIsLoading(true)

    try {
      
      const result = await postLogin(data)
      const token = result.data.data.token

      localStorage.setItem("loginToken",token)

      isLoginState[1](true)

    } catch (err) {
      if(err instanceof AxiosError){
        setLoginError(err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessLogin = ()=>{
    onClose()
    navigate(0)
  }

  return (
    <Modal onClose={onClose}>
      <ModalHeader withXMark />
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
                  autoComplete="off"
                />
                <Input 
                  {...register("password",{required:true})}
                  IconElement={FaKey} 
                  placeholder="Password" 
                  type="password"
                  errors={errors.password && errors.password.message}
                  autoComplete="off"
                />
              </div>
              {loginError &&
              <div style={{alignSelf: "center"}}>
                <ErrorInput message={loginError.response?.data.errors}/>
              </div>
              }
              <Button className="login-btn" type="submit">
                <span>Login</span>
              </Button>
            </form>
          </div>
        </div>
      </ModalContent>
      
      <AlertSuccess 
      state="success"
      message="Success Login" 
      showState={isLoginState}
      onNext={handleSuccessLogin}/>

      {isLoading && <LoadingScreen/>}

    </Modal>
  )
}

export default LoginModal