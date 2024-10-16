import { forwardRef } from "react";
import "./Input.css"
import { IconType } from "react-icons";
import ErrorInput from "../error/ErrorInput";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  IconElement?:IconType
  errors?:string
}

const Input = forwardRef<HTMLInputElement, Props>(({
  IconElement,
  type = "text",
  className,
  errors,
  ...props
},ref) => {

  const randomId = Math.random().toString(36).substring(2, 2 + 10);

  return (
    <div>
      <div className="input-box">
        <div className="input-group">
          {IconElement &&
          <label className="input-label" htmlFor={randomId}>
            <IconElement/>
          </label>
          }
          <input ref={ref} {...props} id={randomId} className={`input-control ${className?className:""}`} type={type} />
        </div>
      </div>
      <div style={{marginTop: 10}}>
        {errors && <ErrorInput message={errors}/>}
      </div>
    </div>
  )
})

export default Input