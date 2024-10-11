import { FaCircleExclamation } from "react-icons/fa6"
import "./ErrorInput.css"

interface Props {
  message: string
}

const ErrorInput = ({ message }: Props) => {
  return (
    <p className="input-errors">
      <i>
        <FaCircleExclamation />
      </i>
      {message}
    </p>
  )
}

export default ErrorInput