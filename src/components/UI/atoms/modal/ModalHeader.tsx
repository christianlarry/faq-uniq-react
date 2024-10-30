import { FaXmark } from "react-icons/fa6"
import IconButton from "../../atoms/button/IconButton"

import "./ModalHeader.css"

interface Props{
  children?: React.ReactNode,
  onClose?:()=>void
}

const ModalHeader = ({
  children,
  onClose
}:Props) => {
  return (
    <div className="faqu-modal-header">
      <div className="faqu-modal-header-content">
        {children}
      </div>
      {onClose &&
      <IconButton className="faqu-modal-xmark" onClick={()=>onClose()}>
        <FaXmark />
      </IconButton>
      }
    </div>
  )
}

export default ModalHeader