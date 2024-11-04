import React from "react"
import "./PlainInput.css"

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

const PlainInput = React.forwardRef<HTMLInputElement, Props>(({className, ...props},ref)=>{
  return <input ref={ref} className={`faq-plain-input ${className?className:""}`} {...props}/>
})

export default PlainInput