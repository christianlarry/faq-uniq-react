import { FaXmark } from "react-icons/fa6"
import IconButton from "../../atoms/button/IconButton"

import "./ModalHeader.css"
import { useModal } from "../../../../hooks/useModal"

interface Props{
  children?: React.ReactNode
  withXMark?:boolean
}

const ModalHeader = ({
  children,
  withXMark=false
}:Props) => {

  const {onClose} = useModal()

  return (
    <div className="faqu-modal-header">
      <div className="faqu-modal-header-content">
        {children}
      </div>
      {withXMark &&
      <IconButton className="faqu-modal-xmark" onClick={()=>onClose()}>
        <FaXmark />
      </IconButton>
      }
    </div>
  )
}

export default ModalHeader