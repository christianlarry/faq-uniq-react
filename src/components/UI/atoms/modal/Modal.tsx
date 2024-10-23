import { useEffect } from "react"
import FocusLock from "react-focus-lock"

import "./Modal.css"

interface Props {
  children: React.ReactNode,
  size?: "lg" | "sm" | "md",
  focusLock?: boolean
}

const Modal = ({
  size = "lg",
  children,
  focusLock = true
}: Props) => {

  useEffect(() => {
    document.body.classList.add("modal-open")

    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [])

  if (focusLock) return (
    <FocusLock>
      <div className="faqu-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="faqu-modal-wrapper">
          <div className={`faqu-modal-container ${size}`}>
            {children}
          </div>
        </div>
      </div>
    </FocusLock>
  )

  return (
    <div className="faqu-modal" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <div className="faqu-modal-wrapper">
        <div className={`faqu-modal-container ${size}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal