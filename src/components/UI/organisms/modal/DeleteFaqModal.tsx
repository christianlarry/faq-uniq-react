import React, { useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import { deleteFaq } from "../../../../api/api"

import { AxiosError } from "axios"
import Alert from "../alert/Alert"
import { useNavigate } from "react-router-dom"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
  data:{
    id:string,
    title:string
  }
}

const DeleteFaqModal = ({showModalState,data}:Props)=>{

  const navigate = useNavigate()

  const [show,setShow] = showModalState

  const [showErrorAlert,setShowErrorAlert] = useState<boolean>(false)
  const [showSuccessAlert,setShowSuccessAlert] = useState<boolean>(false)

  const handleCancelClick = ()=>{
    setShow(false)
  }

  const handleDeleteClick = async ()=>{
    try {
      const result = await deleteFaq(data.id)

      if(result.status === 200){
        setShowSuccessAlert(true)
      }
      
    } catch (err) {
      if(err instanceof AxiosError){
        setShowErrorAlert(true)
      }
    }
  }

  const handleSuccessDeleteFaq = ()=>{
    setShow(false)
    navigate("/")
  }

  if(show) return (
    <Modal size="sm">
      <ModalContent>
        <p>
          Are you sure to delete this FAQ?<br/><br/>
          <span style={{fontStyle:"italic"}}>
            Title: {data.title} 
            <br/>
            ID: {data.id}
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

      <Alert state="error" onNext={()=>setShow(false)} message="Failed on deleting FAQ!" showState={[showErrorAlert,setShowErrorAlert]}/>
      <Alert state="success" onNext={handleSuccessDeleteFaq} message="Success delete FAQ!" showState={[showSuccessAlert,setShowSuccessAlert]}/>
    </Modal>
  )

  return <></>
}

export default DeleteFaqModal