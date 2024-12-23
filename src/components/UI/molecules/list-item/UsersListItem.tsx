import { FaEnvelope, FaPen, FaTrash, FaUser } from "react-icons/fa6"
import Input from "../../atoms/input/Input"
import IconButton from "../../atoms/button/IconButton"

import "./UsersListItem.css"
import { UserModel } from "../../../../interfaces/userInterfaces"
import { useState } from "react"
import DeleteUserModal from "../../organisms/modal/DeleteUserModal"
import { mutate } from "swr"
import EditUserModal from "../../organisms/modal/EditUserModal"

interface Props{
  data:UserModel
}

const UsersListItem = ({data}:Props) => {

  const [isShowDeleteModal,setIsShowDeleteModal] = useState<boolean>(false)
  const [isShowEditModal,setIsShowEditModal] = useState<boolean>(false)

  const handleDeleteBtnClick = ()=>{
    setIsShowDeleteModal(true)
  }

  const handleEditBtnClick = ()=>{
    setIsShowEditModal(true)
  }

  return (
    <>
      <div className="users-item">
        <div className="users-item-username">
          <Input IconElement={FaUser} readOnly disabled value={data.username} />
        </div>
        <div className="users-item-email">
          <Input IconElement={FaEnvelope} readOnly disabled value={data.email} />
        </div>
        <div className="users-item-action">
          <IconButton onClick={handleEditBtnClick}>
            <i><FaPen /></i>
          </IconButton>
          <IconButton onClick={handleDeleteBtnClick}>
            <i><FaTrash /></i>
          </IconButton>
        </div>
      </div>

      {isShowDeleteModal &&
        <DeleteUserModal 
          data={data}
          onClose={()=>{setIsShowDeleteModal(false);mutate("user")}} 
        />
      }

      {isShowEditModal &&
        <EditUserModal
          onClose={()=>{setIsShowEditModal(false);mutate("user")}}
          data={data}
        />
      }
    </>
  )
}

export default UsersListItem