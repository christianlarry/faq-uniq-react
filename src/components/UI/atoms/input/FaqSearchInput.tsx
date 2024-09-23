import { FaSearch } from "react-icons/fa"
import "./FaqSearchInput.css"
import { useRef } from "react"

const Input = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchIconClick = ()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  }

  return (

    <div className="faq-uniq-input-wrap">
      <FaSearch className="search-icon" onClick={handleSearchIconClick}/>
      <input ref={inputRef} className="faq-uniq-input" type="search" placeholder="Got any questions?"/>
    </div>

  )

}

export default Input