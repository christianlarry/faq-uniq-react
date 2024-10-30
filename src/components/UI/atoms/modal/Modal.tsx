import { useEffect } from "react"
import FocusLock from "react-focus-lock"

import "./Modal.css"
import { ModalContext } from "../../../../hooks/useModal"

interface Props {
  children: React.ReactNode,
  onClose:()=>void,
  size?: "lg" | "sm" | "md",
  focusLock?: boolean
}

const Modal = ({
  size = "lg",
  children,
  focusLock = true,
  onClose
}: Props) => {

  useEffect(() => {
    document.body.classList.add("modal-open")

    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [])

  if (focusLock) return (
    <ModalContext.Provider value={{onClose}}>
      <FocusLock>
        <div className="faqu-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <div className="faqu-modal-wrapper">
            <div className={`faqu-modal-container ${size}`}>
              {children}
            </div>
          </div>
        </div>
      </FocusLock>
    </ModalContext.Provider>
  )

  return (
    <ModalContext.Provider value={{onClose}}>
      <FocusLock>
        <div className="faqu-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <div className="faqu-modal-wrapper">
            <div className={`faqu-modal-container ${size}`}>
              {children}
            </div>
          </div>
        </div>
      </FocusLock>
    </ModalContext.Provider>
  )
}

export default Modal