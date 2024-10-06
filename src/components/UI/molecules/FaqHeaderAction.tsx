import "./FaqHeaderAction.css"
import {base64Add,base64Download,base64Login} from "../../../assets/base64Icons"
import IconButton from "../atoms/button/IconButton"

const FaqHeaderAction = ()=>{

  const isAdmin = false

  return (
    <div className="faq-header-action">
      {isAdmin &&
      <>  
        <IconButton>
          <img src={base64Add} alt="Add Icon"/>
        </IconButton>
        <IconButton>
          <img src={base64Download} alt="Download Icon"/>
        </IconButton>
      </>
      }
      <IconButton>
        <img src={base64Login} alt="Login Icon"/>
      </IconButton>
    </div>
  )
}

export default FaqHeaderAction