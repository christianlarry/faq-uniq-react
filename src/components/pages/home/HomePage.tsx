import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

const HomePage = ()=>{

  return (
    <div>
      <div className="faq-question-lists">
        <FaqAccordion/>
        <FaqAccordion/>  
      </div>
    </div>
  )
}

export default HomePage