import { Fragment, useEffect, useState } from "react"
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

import { useLocation } from "react-router-dom"
import { getFaq } from "../../../api/api"
import FetchLoader from "../../UI/atoms/loader/FetchLoader"

const HomePage = ()=>{

  // STATE
  const [faqApiQuery,setFaqApiQuery] = useState<string>("")

  // SWR
  const faqResult = getFaq(faqApiQuery)

  // LOCATION
  const location = useLocation()

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get("category")
    const subCategory = searchParams.get("sub_category")
    const search = searchParams.get("search")

    if(search){
      setFaqApiQuery(`search=${search}`)
      return
    }
    if(category){
      setFaqApiQuery(`category=${category}`)
    }else if(subCategory){
      setFaqApiQuery(`sub_category=${subCategory}`)
    }else{
      setFaqApiQuery("")
    }

  },[location])

  return (
    <>
      <section className="faq-question-lists">
        {(faqResult.isLoading) &&
          <FetchLoader message="Loading"/>
        }

        {faqResult.data && faqResult.data.data.map((faq,i)=>(
          <Fragment key={i}>
            {faq !== null &&
              <FaqAccordion title={faq.title} answer={faq.answer}/>
            }
          </Fragment>
        ))}

        {faqResult.error &&
          <h1>Some error happen bro</h1>
        }

      </section>
    </>
  )
}

export default HomePage