import { FaKey, FaUser } from "react-icons/fa6"
import Button from "../../atoms/button/Button"
import Input from "../../atoms/input/Input"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./LoginModal.css"

interface Props{
  showModalSet:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({showModalSet}:Props) => {
  return (
    <Modal>
      <ModalHeader showModal={showModalSet} />
      <ModalContent>
        <div className="login-modal-content">
          <div>
            <h2>Login</h2>
            <form>
              <div className="login-modal-input-group">
                <Input IconElement={FaUser} placeholder="E-Mail" />
                <Input IconElement={FaKey} placeholder="Password" type="password" />
              </div>
              <Button className="login-btn">
                <span>Login</span>
              </Button>
            </form>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal