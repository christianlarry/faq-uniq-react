import { FaPen, FaTrash } from "react-icons/fa6"

import "./AdminActionMenu.css"
import React, { useState } from "react"
import { createPortal } from "react-dom"
import DeleteFaqModal from "../../organisms/modal/DeleteFaqModal"
import EditFaqModal from "../../organisms/modal/EditFaqModal"

const AdminActionMenu = ()=>{

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
          <DeleteFaqModal showModalState={[showDeleteFaqModal,setShowDeleteFaqModal]}/>
          <EditFaqModal showModalState={[showEditFaqModal,setShowEditFaqModal]}/>
        </>
      ),document.body)}
    </>
  )
}

export default AdminActionMenu