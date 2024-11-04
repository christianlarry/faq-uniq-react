import ErrorInput from "../../atoms/error/ErrorInput"
import "./InputGroup.css"

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  label?:string
  htmlFor?:string
  errors?:string
}

const InputGroup = ({
  label,
  htmlFor,
  errors,
  children,
  className,
  ...props
}:Props)=>{
  return (
    <div className={`input-group ${className?className:""}`} {...props}>
      {label && <label htmlFor={htmlFor}>{label}</label>}

      <div className="input-control">
        {children}
      </div>

      {errors && <ErrorInput message={errors}/>}
    </div>
  )
}

export default InputGroup