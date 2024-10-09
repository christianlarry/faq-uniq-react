import { FaChevronDown } from "react-icons/fa6"
import GradientBox from "../../atoms/box/GradientBox"
import AccordionContainer from "../../atoms/accordion/AccordionContainer"
import AccordionLabel from "../../atoms/accordion/AccordionLabel"

import "./FaqAccordion.css"
import AccordionContent from "../../atoms/accordion/AccordionContent"
import AdminActionMenu from "../button-group/AdminActionMenu"

import ReactMarkdown from "react-markdown"

interface Props{
  title:string,
  answer:string
}

const FaqAccordion = ({title,answer}:Props) => {

  // LOGIC TO CHECK IF USER IS ADMIN
  const isAdmin = true

  return (
    <GradientBox>
      <AccordionContainer>
        <AccordionLabel className="faq-accordion-label">
          <div className="faq-accordion-label-left">
            <i className="faq-accordion-chevron">
              <FaChevronDown />
            </i>
            <span className="faq-accordion-title">{title}</span>
          </div>
          {isAdmin && <div className="faq-admin-action-wrap"><AdminActionMenu/></div>}
        </AccordionLabel>
        <AccordionContent>
          <div className="faq-accordion-content">
            <h5 style={{marginBottom: "1rem"}}><b>Jawaban pertanyaan:  </b></h5>
            <div className="faq-accordion-content-answer">
              {/* <div dangerouslySetInnerHTML={{__html: answer}}/> */}
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          </div>
        </AccordionContent>
      </AccordionContainer>
    </GradientBox>
  )
}

export default FaqAccordion