import { FaPen, FaTrash } from "react-icons/fa6"

import "./AdminActionMenu.css"
import React, { useState } from "react"
import { createPortal } from "react-dom"
import DeleteFaqModal from "../../organisms/modal/DeleteFaqModal"
import EditFaqModal from "../../organisms/modal/EditFaqModal"

interface Props{
  data:{
    title:string,
    id:string
  }
}

const AdminActionMenu = ({data}:Props)=>{

  const [showDeleteFaqModal,setShowDeleteFaqModal] = useState<boolean>(false)
  const [showEditFaqModal,setShowEditFaqModal] = useState<boolean>(false)

  const handleDeleteFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    setShowDeleteFaqModal(true)
  }

  const handleEditFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    setShowEditFaqModal(true)
  }

  return (
    <>
      <div className="faq-admin-action-btn">
        <i onClick={handleEditFaq}>
          <FaPen/>
        </i>
        <i onClick={handleDeleteFaq}>
          <FaTrash/>
        </i>
      </div>

      {createPortal((
        <>
          {showDeleteFaqModal && <DeleteFaqModal data={data} onClose={()=>setShowDeleteFaqModal(false)}/>}
          {showEditFaqModal && <EditFaqModal onClose={()=>setShowEditFaqModal(false)}/>}
        </>
      ),document.body)}
    </>
  )
}

export default AdminActionMenu