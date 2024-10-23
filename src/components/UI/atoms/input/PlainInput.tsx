import React from "react"
import "./PlainInput.css"

const PlainInput = ({
  className,
  ...props
}:React.InputHTMLAttributes<HTMLInputElement>)=>{
  return <input className={`faq-plain-input ${className?className:""}`} {...props}/>
}

export default PlainInput