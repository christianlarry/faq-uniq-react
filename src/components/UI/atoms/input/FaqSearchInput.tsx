import { FaSearch } from "react-icons/fa"
import "./FaqSearchInput.css"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Input = () => {

  // STATE
  const [inputValue,setInputValue] = useState<string>("") 
  const [page,setPage] = useState()

  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleSearchIconClick = ()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  }

  const handleOnKeydown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const inputValue = e.currentTarget.value
    const key = e.key

    if(key === "Enter"){
      if(inputValue){
        navigate(`?search=${inputValue}`)
      }else{
        // ! PR, IF PAGE IS INDEX THEN DO NOT RUN THIS CODE
        navigate("/")
      }
    }
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.currentTarget.value)
    
    // ! PR, IF PAGE IS INDEX THEN DO NOT RUN THIS CODE
    if(e.currentTarget.value === "") navigate("/")
  }

  // GET SEARCH VALUE IF IT WAS
  const location = useLocation()
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search)
    const search = queryParams.get("search")

    if(search){
      setInputValue(search)
    }
  },[location])

  return (
    <div className="faq-uniq-input-wrap">
      <FaSearch className="search-icon" onClick={handleSearchIconClick}/>
      <input ref={inputRef} className="faq-uniq-input" onKeyDown={handleOnKeydown} type="search" placeholder="Got any questions?" value={inputValue} onChange={handleInputChange}/>
    </div>

  )

}

export default Input