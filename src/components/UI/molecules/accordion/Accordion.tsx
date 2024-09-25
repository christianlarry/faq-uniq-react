import { Link } from "react-router-dom"
import GradientBox from "../../atoms/box/GradientBox"
import { FaChevronDown } from "react-icons/fa6"
import { useState } from "react"

import "./Accordion.css"

const Accordion = ()=>{

  // STATE

  const [isShow,setIsShow] = useState<boolean>(false)

  // EVENT HANDLER
  
  const handleAccordionLabelClick = ()=>{
    setIsShow(!isShow)
  }

  return (
    <GradientBox>
      <div className={`accordion-group${isShow?" show":""}`}>
        <label className="accordion-label" onClick={handleAccordionLabelClick}>
          <i className="accordion-chevron">
            <FaChevronDown/>
          </i>
          <Link to="/" className="accordion-label-link">Lorem ipsum dolor sit, amet consectetur adipisicing elit?</Link>
        </label>
        <div className="accordion-content">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident officiis, perspiciatis, harum atque rem sit cumque veritatis minus eius natus possimus repellendus, temporibus rerum? Quam corporis cumque accusamus inventore omnis?
          </div>
        </div>
      </div>
    </GradientBox>
  )
}

export default Accordion