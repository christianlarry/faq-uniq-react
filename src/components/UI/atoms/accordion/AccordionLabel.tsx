import React, { useEffect } from "react"
import useAccordion from "../../../../hooks/useAccordion"
import "./AccordionLabel.css"

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{
  alwaysOpen?:boolean
}

const AccordionLabel = ({
  children, 
  className, 
  onClick,
  alwaysOpen=false,
  ...props}:Props)=>{

  const {isShow,setIsShow} = useAccordion()
  useEffect(()=>{
    if(alwaysOpen){
      setIsShow(true)
    }
  },[isShow])

  const handleAccordionLabelClick = (e:React.MouseEvent<HTMLLabelElement>)=>{
    onClick && onClick(e)
    if(!alwaysOpen){
      setIsShow(!isShow)
    }
  }

  return (
    <label className={`accordion-label ${className||""}`} onClick={handleAccordionLabelClick} {...props}>
      {children}
    </label>
  )
}

export default AccordionLabel