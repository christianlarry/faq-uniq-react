import "./TextArea.css"

const TextArea = ({
  className,
  ...props
}:React.TextareaHTMLAttributes<HTMLTextAreaElement>)=>{
  return (  
    <textarea className={`faq-textarea ${className?className:""}`} {...props}/>
  )
}

export default TextArea