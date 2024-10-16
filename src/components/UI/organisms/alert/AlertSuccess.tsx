import Lottie from "lottie-react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

import successAnimation from "../../../../assets/json/lottie/success.json"
import React from "react"

import "./AlertSuccess.css"

interface Props{
  message:string,
  onNext?:()=>void
  nextText?:string
  showState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const AlertSuccess = ({
  message,
  nextText="OK",
  onNext=()=>{},
  showState

}:Props) => {

  const [show,setShow] = showState

  const handleOkClick = ()=>{
    onNext()
    
    setShow(false)
  }

  if(show) return (
    <Modal size="sm">
      <ModalContent>
        <div className="alert-success-wrapper">
          <Lottie animationData={successAnimation} loop={false}/>
          <span className="alert-success-message">
            {message}
          </span>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="alert-footer">
          <Button paddingSize="normal" onClick={handleOkClick}>
            <span>{nextText}</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )

  return (
    <></>
  )
}

export default AlertSuccess