import { FaChevronDown } from "react-icons/fa6"
import GradientBox from "../../atoms/box/GradientBox"
import AccordionContainer from "../../atoms/accordion/AccordionContainer"
import AccordionLabel from "../../atoms/accordion/AccordionLabel"

import "./FaqAccordion.css"
import AccordionContent from "../../atoms/accordion/AccordionContent"
import AdminActionMenu from "../button-group/AdminActionMenu"

import ReactMarkdown from "react-markdown"
import { useAuth } from "../../../../hooks/useAuth"
import Button from "../../atoms/button/Button"
import ButtonText from "../../atoms/button/ButtonText"
import { useNavigate } from "react-router-dom"
import { FaqModel } from "../../../../interfaces/faqInterfaces"

import DOMPurify from "dompurify"

interface Props{
  alwaysOpen?:boolean
  data:FaqModel
}

const FaqAccordion = ({
  alwaysOpen=false,
  data
}:Props) => {

  const navigate = useNavigate()

  // LOGIC TO CHECK IF USER IS ADMIN
  const {isAuthenticated} = useAuth()

  const handleShareClick = ()=>{
    const shareUrl = `${window.location.origin}/faq/${data._id}`

    navigator.share({
      title: data.title,
      text: "Check out this FAQ!",
      url: shareUrl
    }).then(()=>{
      console.log("Thanks for sharing!")
    }).catch((err)=>{
      console.log("Error sharing: ",err)
    })
  }

  const handleDetailClick = ()=>{
    navigate(`/faq/${data._id}`)
  }

  return (
    <GradientBox gradient="y-t-r">
      <AccordionContainer>
        <AccordionLabel className="faq-accordion-label" alwaysOpen={alwaysOpen}>
          <div className="faq-accordion-label-left">
            {!alwaysOpen &&
            <i className="faq-accordion-chevron">
              <FaChevronDown />
            </i>
            }
            <span className="faq-accordion-title" style={{
              paddingLeft: alwaysOpen?"10px":0
            }}>{data.title}</span>
          </div>
          {isAuthenticated && <div className="faq-admin-action-wrap"><AdminActionMenu data={data}/></div>}
        </AccordionLabel>
        <AccordionContent>
          <div className="faq-accordion-content">
            <h5 style={{marginBottom: "1rem"}}><b>Jawaban pertanyaan:  </b></h5>
            <div className="faq-accordion-content-answer">
              {(data.answer && !data.htmlAnswer) && <ReactMarkdown>{data.answer}</ReactMarkdown>}

              {data.htmlAnswer && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.htmlAnswer)}}/>} 
            </div>
            <div style={{display: "flex",justifyContent: "space-between",gap: "5px",alignItems: "center"}}>
              {!alwaysOpen &&
              <ButtonText text="Detail" onClick={handleDetailClick}/>
              }
              <Button onClick={handleShareClick}>
                <span>Share</span>
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionContainer>
    </GradientBox>
  )
}

export default FaqAccordion