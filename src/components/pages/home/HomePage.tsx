import { Fragment, useEffect, useState } from "react"
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

import { useLocation, useNavigate } from "react-router-dom"
import { getFaq } from "../../../api/api"
import FetchLoader from "../../UI/atoms/loader/FetchLoader"
import ButtonText from "../../UI/atoms/button/ButtonText"
import FetchError from "../../UI/atoms/error/FetchError"

const HomePage = ()=>{

  // STATE
  const [faqApiQuery,setFaqApiQuery] = useState<string>("")
  const [isShowResetBtn,setIsShowResetBtn] = useState<boolean>(false)

  // SWR
  const faqResult = getFaq(faqApiQuery)
  const allFaqResult = getFaq(undefined,{
    revalidateOnFocus: false
  })

  // LOCATION
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get("category")
    const subCategory = searchParams.get("sub_category")
    const search = searchParams.get("search")

    // SHOW/HIDE RESET BUTTON
    if(search || category || subCategory){
      setIsShowResetBtn(true)
    }else{
      setIsShowResetBtn(false)
    }

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

  // EVENT HANDLER
  const handleResetFaq = ()=>{
    navigate("/")
  }

  return (
    <>
      <section>
        <div className="section-title faq-section-title">
          <h2>Questions</h2>
          {(faqResult.data && allFaqResult.data) &&
            <span>({faqResult.data.data.length} of {allFaqResult.data.data.length})</span>
          }
          {isShowResetBtn &&
            <ButtonText text="Reset" style={{marginLeft: "5px"}} onClick={handleResetFaq}/>
          }
        </div>
        <div className="faq-question-lists">
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
            <FetchError/>
          }
        </div>
      </section>
    </>
  )
}

export default HomePage