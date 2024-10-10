import "./Input.css"
import { IconType } from "react-icons";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  IconElement?:IconType
}

const Input = ({
  IconElement,
  type = "text",
  className,
  ...props
}:Props) => {

  const randomId = Math.random().toString(36).substring(2, 2 + 10);

  return (
    <div className="input-box">
      <div className="input-group">
        {IconElement &&
        <label className="input-label" htmlFor={randomId}>
          <IconElement/>
        </label>
        }
        <input {...props} id={randomId} className={`input-control ${className?className:""}`} type={type} />
      </div>
    </div>
  )
}

export default Input