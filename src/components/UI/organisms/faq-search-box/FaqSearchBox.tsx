import FaqSearchInput from "../../atoms/input/FaqSearchInput"
import FaqTitleText from "../../atoms/text/FaqTitleText"
import "./FaqSearchBox.css"

const FaqSearchBox = () => {  

  return (
    <div className="faq-search-box">
      <FaqTitleText/>
      <div style={{width: "100%",maxWidth: 700}}>
        <FaqSearchInput/> 
      </div>
    </div>
  ) 
}

export default FaqSearchBox