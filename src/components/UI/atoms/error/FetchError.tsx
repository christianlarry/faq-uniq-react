import { FaCircleExclamation } from "react-icons/fa6"
import "./FetchError.css"

interface Props{
  message?:string
}

const FetchError = ({message="Error fetching data!"}:Props)=>{
  return (
    <div className="fetch-error">
      <FaCircleExclamation/>
      <p>{message}</p>
    </div>
  )
}

export default FetchError