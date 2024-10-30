import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"

import React from "react"

interface Props{
  message:string,
  onNext:()=>void
  onCancel?:()=>void
  showState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const AlertConfirm = ({
  message,
  onCancel=()=>{},
  onNext=()=>{},
  showState

}:Props) => {

  const [show,setShow] = showState

  const handleNextClick = ()=>{
    onNext()
    setShow(false)
  }

  const handleCancelClick = ()=>{
    onCancel()
    setShow(false)
  }

  if(show) return (
    <Modal size="sm" onClose={()=>setShow(false)}>
      <ModalContent>
        <div className="alert-confirm-wrapper" style={{padding: "10px 0"}}>
          <p style={{fontSize: 22}}>{message}</p>
        </div>
      </ModalContent>
      <ModalFooter>
        <div style={{display: "flex",gap: "5px",justifyContent: "end"}}>
          <Button paddingSize="normal" onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button paddingSize="normal" onClick={handleNextClick}>
            <span>Next</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )

  return (<></>)
}

export default AlertConfirm