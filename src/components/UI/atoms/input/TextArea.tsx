import { forwardRef } from "react"
import "./TextArea.css"

const TextArea = forwardRef<HTMLTextAreaElement,React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({
  className,
  ...props
},ref)=>{
  return (  
    <textarea ref={ref} className={`faq-textarea ${className?className:""}`} {...props}/>
  )
})

export default TextArea