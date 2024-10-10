import "./Button.css"

const Button = ({
  children,
  className,
  type="button",
  ...props
}:React.ButtonHTMLAttributes<HTMLButtonElement>)=>{
  return (
    <button className={`button ${className?className:""}`} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button