import { useState } from "react"
import ReactMarkdown from "react-markdown"

import "./FaqAccordion.css"

const FaqAccordion = (data:{title:string,answer:string}) => {

  const [isCollapse,setIsCollapse] = useState<boolean>(false)

  const handleAccordionLabelClick = ()=>{
    setIsCollapse(!isCollapse)
  }


  // CLASSNAME
  const accordionClassname = `accordion${isCollapse?" collapsed":""}`

  return (
    <div className={accordionClassname}>
      <label className="accordion-label" onClick={handleAccordionLabelClick}>{data.title}</label>
      <div className="accordion-content">
        <ReactMarkdown>{data.answer}</ReactMarkdown>
      </div>
    </div>
  )
}

export default FaqAccordion