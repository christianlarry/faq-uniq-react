import { FaXmark } from "react-icons/fa6"
import IconButton from "../../atoms/button/IconButton"

import "./ModalHeader.css"

interface Props{
  children?: React.ReactNode,
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalHeader = ({
  children,
  showModal
}:Props) => {
  return (
    <div className="faqu-modal-header">
      <div className="faqu-modal-header-content">
        {children}
      </div>
      <IconButton className="faqu-modal-xmark" onClick={()=>showModal(false)}>
        <FaXmark />
      </IconButton>
    </div>
  )
}

export default ModalHeader