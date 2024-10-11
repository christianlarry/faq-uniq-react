import Lottie from "lottie-react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

import successAnimation from "../../../../assets/json/lottie/success.json"
import React from "react"

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
        <Lottie animationData={successAnimation} loop={false} />
        {message}
      </ModalContent>
      <ModalFooter>
        <Button paddingSize="normal" onClick={handleOkClick}>
          <span>{nextText}</span>
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <></>
  )
}

export default AlertSuccess