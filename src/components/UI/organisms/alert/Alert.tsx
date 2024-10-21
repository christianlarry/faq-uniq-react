import Lottie from "lottie-react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

import successAnimation from "../../../../assets/json/lottie/success.json"
import errorAnimation from "../../../../assets/json/lottie/error.json"
import React from "react"

import "./Alert.css"

interface Props{
  message:string
  state?:"normal"|"success"|"error"
  onNext?:()=>void
  nextText?:string
  showState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const Alert = ({
  message,
  state="normal",
  nextText="OK",
  onNext=()=>{},
  showState

}:Props) => {

  const [show,setShow] = showState

  const handleOkClick = ()=>{
    onNext()
    
    setShow(false)
  }

  const animation = state==="success"?successAnimation:errorAnimation

  if(show) return (
    <Modal size="sm">

      <ModalContent>
        <div className="alert-wrapper">
          {state !== "normal" &&
          <Lottie animationData={animation} loop={false}/>
          }
          <span className="alert-message">
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

export default Alert