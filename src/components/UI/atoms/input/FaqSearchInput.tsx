import { FaSearch } from "react-icons/fa"
import "./FaqSearchInput.css"

const Input = () => {

  return (

    <div className="faq-uniq-input-wrap">
      <FaSearch className="search-icon" />
      <input className="faq-uniq-input" type="search" placeholder="Got any questions?" />
    </div>

  )

}

export default Input