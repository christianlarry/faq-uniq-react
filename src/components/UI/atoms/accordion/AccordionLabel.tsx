import useAccordion from "../../../../hooks/useAccordion"
import "./AccordionLabel.css"

const AccordionLabel = ({children, className, onClick, ...props}:React.LabelHTMLAttributes<HTMLLabelElement>)=>{

  const {isShow,setIsShow} = useAccordion()

  const handleAccordionLabelClick = (e:React.MouseEvent<HTMLLabelElement>)=>{
    onClick && onClick(e)
    setIsShow(!isShow)
  }

  return (
    <label className={`accordion-label ${className||""}`} onClick={handleAccordionLabelClick} {...props}>
      {children}
    </label>
  )
}

export default AccordionLabel