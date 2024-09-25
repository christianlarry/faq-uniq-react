import "./AccordionContent.css"

const AccordionContent = ({children,className,...props}:React.HTMLAttributes<HTMLDivElement>)=>{
  return (
    <div className={`accordion-content ${className||""}`} {...props}>
      <div className="accordion-content-wrap">
        {children}
      </div>
    </div>
  )
}

export default AccordionContent