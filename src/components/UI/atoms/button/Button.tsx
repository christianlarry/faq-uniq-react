import "./Button.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  paddingSize?: "small"|"normal"
}

const Button = ({
  children,
  paddingSize="normal",
  className,
  type="button",
  ...props
}:Props)=>{
  return (
    <button className={`button ${className?className:""} p-${paddingSize}`} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button