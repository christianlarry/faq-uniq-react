import { FaCircleExclamation } from "react-icons/fa6"
import "./ErrorText.css"

interface Props{
  message?:string
}

const ErrorText = ({message="Error fetching data!"}:Props)=>{
  return (
    <div className="fetch-error">
      <FaCircleExclamation/>
      <p>{message}</p>
    </div>
  )
}

export default ErrorText