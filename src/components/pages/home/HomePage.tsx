import { useEffect, useState } from "react"
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

import axios from "axios"
import { FaqModel } from "../../../interfaces/faqInterfaces"
import { useLocation } from "react-router-dom"

const HomePage = ()=>{
  
  // STATE
  const [allFaq,setAllFaq] = useState<FaqModel[]>()
  const [faq,setFaq] = useState<FaqModel[]>()

  const getFaq = async ()=>{
    const result = await axios.get("http://localhost:3000/api/v1/faq")
    const data = result.data

    setFaq(data.data)
  }

  const getFaqByCategoryId = async (id:string)=>{
    const result = await axios.get(`http://localhost:3000/api/v1/faq?category=${id}`)
    const data = result.data

    setFaq(data.data)
  }

  // LOCATION
  const location = useLocation()

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get("category")

    if(category){
      getFaqByCategoryId(category)
    }else{
      getFaq()
    }

  },[location])

  return (
    <>
      <section className="faq-question-lists">
        {faq && faq.map((val,i)=>(
          <div key={i}>
          {val &&
            <FaqAccordion title={val.title} answer={val.answer}/>
          }
          </div>
        ))}
      </section>
    </>
  )
}

export default HomePage