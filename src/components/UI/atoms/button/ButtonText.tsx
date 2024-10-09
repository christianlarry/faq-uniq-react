import "./ButtonText.css"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text:string
}

const ButtonText = ({
  text,
  className,
  ...props
}:Props)=>{
  return (
    <button className={`button-text ${className?className:""}`} type="button" {...props}>
      <span>{text}</span>
    </button>
  )
}

export default ButtonText