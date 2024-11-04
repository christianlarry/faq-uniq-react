import "./ManageUsersModal.css"

import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"
import UsersListItem from "../../molecules/list-item/UsersListItem"
import { getUsers } from "../../../../api/api"
import FetchLoader from "../../atoms/loader/FetchLoader"
import ErrorText from "../../atoms/error/ErrorText"

interface Props{
  onClose:()=>void
}

const ManageUsersModal = ({onClose}:Props)=>{

  const usersResult = getUsers()

  return (
    <Modal onClose={onClose}>
      <ModalHeader withXMark/>
      <ModalContent>

        <div className="manage-user-container">

          {usersResult.isLoading && <FetchLoader message="Loading"/>}

          {usersResult.data && usersResult.data.data.map(user=>(
            <UsersListItem 
            key={user._id}
            data={{
              _id: user._id,
              email: user.email,
              password: user.password,
              username: user.username
              }}/>
          ))}

          {usersResult.error && <ErrorText/>}
          
        </div>

      </ModalContent>
    </Modal>
  )
}

export default ManageUsersModal