import { FaPen, FaTrash } from "react-icons/fa6"

import "./AdminActionMenu.css"

const AdminActionMenu = ()=>{

  const handleDeleteFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    alert("Deleted items")
  }

  const handleEditFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    alert("Edit items")
  }

  return (
    <div className="faq-admin-action-btn">
      <i onClick={handleEditFaq}>
        <FaPen/>
      </i>
      <i onClick={handleDeleteFaq}>
        <FaTrash/>
      </i>
    </div>
  )
}

export default AdminActionMenu