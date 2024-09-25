import Accordion from "../../UI/molecules/accordion/Accordion"
import "./HomePage.css"

const HomePage = ()=>{

  return (
    <div>
      <div className="faq-question-lists">
        <Accordion/>
        <Accordion/>  
      </div>
    </div>
  )
}

export default HomePage