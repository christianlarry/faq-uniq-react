import { useNavigate, useParams } from "react-router-dom"
import ButtonText from "../../UI/atoms/button/ButtonText"
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import { useEffect, useRef, useState } from "react"
import { useAllFaq } from "../../../hooks/useAllFaq"
import { FaqModel } from "../../../interfaces/faqInterfaces"
import ErrorText from "../../UI/atoms/error/ErrorText"

const DetailFaqPage = ()=>{

  // HOOKS STATE
  const params = useParams()
  const navigate = useNavigate()
  const {error,faq} = useAllFaq()

  // STATE
  const [faqById,setFaqById] = useState<FaqModel[]>()

  // REF
  const faqSectionRef = useRef<HTMLElement>(null)

  // EVENT HANDLER
  const handleBackClick = ()=>{
    navigate("/")
  }

  // EFFECT
  useEffect(()=>{
    const {id} = params
    
    if(faq && faq.length > 0){
      const filteredFaq = faq.filter(n => n._id === id)
      
      // BERSIHKAN DUPLIKASI
      const clearedFaq:FaqModel[] = []
      filteredFaq.forEach((faq)=>{
        const dups = clearedFaq.find(val=>val._id ===faq._id)
        if(!dups) clearedFaq.push(faq)
      })

      setFaqById(clearedFaq)
    }
  },[faq])

  useEffect(()=>{
    if(faqById && faqSectionRef.current){
      faqSectionRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[faqById])

  return (
    <>
      <section id="faq" ref={faqSectionRef}>
        <div className="section-title" style={{display: "flex",alignItems: "center",gap: "5px"}}>
          <h2>Questions</h2>
          <ButtonText text="Back" onClick={handleBackClick}/>
        </div>
        <div>
          {error &&
          <ErrorText />
          }

          {(faqById && faqById.length>0) && 
          <FaqAccordion
            id={faqById[0]._id}
            title={faqById[0].title}
            answer={faqById[0].answer}
            alwaysOpen
          />
          }

          {(faqById && faqById.length === 0) &&
          <ErrorText message="Ups, Faq not found:("/>
          }
        </div>
      </section>
    </>
  )
}

export default DetailFaqPage