import "./ManageUsersModal.css"

import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"
import UsersListItem from "../../molecules/list-item/UsersListItem"
import { getUsers } from "../../../../api/api"
import FetchLoader from "../../atoms/loader/FetchLoader"
import ErrorText from "../../atoms/error/ErrorText"
import IconButton from "../../atoms/button/IconButton"
import { base64Add } from "../../../../assets/base64Icons"
import { useState } from "react"
import AddUserModal from "./AddUserModal"

interface Props {
  onClose: () => void
}

const ManageUsersModal = ({ onClose }: Props) => {

  const usersResult = getUsers()

  // STATE
  const [isShowAddUserModal,setIsShowAddUserModal] = useState<boolean>(false)

  const handleAddBtnClick = ()=>{
    setIsShowAddUserModal(true)
  }

  const handleCloseUserModal = ()=>{
    setIsShowAddUserModal(false)
    usersResult.mutate()
  }

  return (
    <Modal onClose={onClose}>
      <ModalHeader withXMark>
        <div>
          <IconButton onClick={handleAddBtnClick}>
            <img src={base64Add} alt="Add Icon" />
          </IconButton>
        </div>
      </ModalHeader>
      <ModalContent>

        <div className="manage-user-container">

          <div className="users-lists">

            {usersResult.isLoading && <FetchLoader message="Loading" />}

            {usersResult.data && usersResult.data.data.map(user => (
              <UsersListItem
                key={user._id}
                data={{
                  _id: user._id,
                  email: user.email,
                  password: user.password,
                  username: user.username
                }} />
            ))}

            {usersResult.error && <ErrorText />}

          </div>

        </div>

      </ModalContent>

      {isShowAddUserModal && <AddUserModal onClose={handleCloseUserModal}/>}
    </Modal>
  )
}

export default ManageUsersModal