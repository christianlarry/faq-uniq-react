import { FaSearch } from "react-icons/fa"
import "./FaqSearchInput.css"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Input = () => {

  // STATE
  const [inputValue,setInputValue] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  // FOCUS ON INPUT WHEN SEARCH ICON CLICK
  const handleSearchIconClick = ()=>{
    if(inputRef.current){
      inputRef.current.focus()
    }
  }

  const navigateToHome = ()=>{
    if(location.search){
      navigate("/")
    }
  }

  const handleOnKeydown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const inputValue = e.currentTarget.value
    const key = e.key

    if(key === "Enter"){
      if(inputValue){
        navigate(`?search=${inputValue}`)
      }else{
        navigateToHome()
      }
    }
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.currentTarget.value)
    
    if(e.currentTarget.value === "") navigateToHome()
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