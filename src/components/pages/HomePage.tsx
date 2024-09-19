import { useEffect, useState } from "react"
import { getFaq } from "../../services/api"
import { FaqModel } from "../../interfaces/faqInterfaces"

import "./HomePage.css"
import FaqAccordion from "./FaqAccordion"

const HomePage = ()=>{

  const [faqAllData,setFaqAllData] = useState<FaqModel[]>()
  const [faq,setFaq] = useState<FaqModel[]>()

  const searchFaq = (q:string)=>{
    if(faqAllData && faqAllData.length !== 0){
      const data = faqAllData.filter(val=>{
        const filteredQuestions = val.questions.filter(valq => valq.includes(q))
        if(filteredQuestions.length === 0) return false
        return true
      })

      setFaq(data)
    }
  }

  const handleSearchKeydown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      searchFaq(e.currentTarget.value)
    }
  }

  const showAllFaqData = ()=>{
    getFaq().then(val=>{
      setFaqAllData(val.data)
      setFaq(val.data)
    })
  }

  useEffect(()=>{
    showAllFaqData()
  },[])

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Frequently Asked Questions</h1>
        <input type="search" placeholder="Cari pertanyaan!" onKeyDown={handleSearchKeydown}/>
        <ul>
          {faq && faq.map((val,i)=>(
            <li key={i}>
              <FaqAccordion {...val}/> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage