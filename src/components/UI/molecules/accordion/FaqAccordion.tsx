import { FaChevronDown } from "react-icons/fa6"
import GradientBox from "../../atoms/box/GradientBox"
import AccordionContainer from "../../atoms/accordion/AccordionContainer"
import AccordionLabel from "../../atoms/accordion/AccordionLabel"

import "./FaqAccordion.css"
import AccordionContent from "../../atoms/accordion/AccordionContent"

const FaqAccordion = () => {

  return (
    <GradientBox>
      <AccordionContainer>
        <AccordionLabel className="faq-accordion-label">
          <i className="faq-accordion-chevron">
            <FaChevronDown />
          </i>
          <span className="faq-accordion-title">Lorem ipsum dolor sit, amet consectetur adipisicing elit?</span>
        </AccordionLabel>
        <AccordionContent>
          <div className="faq-accordion-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident officiis, perspiciatis, harum atque rem sit cumque veritatis minus eius natus possimus repellendus, temporibus rerum? Quam corporis cumque accusamus inventore omnis?
          </div>
        </AccordionContent>
      </AccordionContainer>
    </GradientBox>
  )
}

export default FaqAccordion