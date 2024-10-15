import { Fragment, useEffect, useRef, useState } from "react"
import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getFaq } from "../../../api/api"
import FetchLoader from "../../UI/atoms/loader/FetchLoader"
import ButtonText from "../../UI/atoms/button/ButtonText"
import ErrorText from "../../UI/atoms/error/ErrorText"
import { FaqModel } from "../../../interfaces/faqInterfaces"
import { useAllFaq } from "../../../hooks/useAllFaq"

const HomePage = ()=>{

  // HOOKS INIT
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const allFaq = useAllFaq()

  // STATE
  const [faqApiQuery,setFaqApiQuery] = useState<string>("")
  const [isShowResetBtn,setIsShowResetBtn] = useState<boolean>(false)
  const [faqById,setFaqById] = useState<FaqModel[]>()

  // REF
  const faqSectionRef = useRef<HTMLElement>(null)

  // SWR
  const faqResult = getFaq(faqApiQuery)

  useEffect(()=>{
    const {id} = params
    
    // IF THERE'S ID PARAMETER IN URL
    if(id && allFaq.faq){
      let faq = allFaq.faq.filter(val => val._id === id)
      
      const filteredFaq = faq.reduce((acc: FaqModel[], current: FaqModel) => {
        // Cek apakah faq dengan _id yang sama sudah ada di acc
        const duplicate = acc.find(item => item._id === current._id);
        
        // Jika tidak ada duplikat, tambahkan ke acc
        if (!duplicate) {
          acc.push(current);
        }
      
        return acc;
      }, []);

      setFaqById(filteredFaq)

    }else{
      setFaqById(undefined)
    }
  },[allFaq.faq])

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

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const category = searchParams.get("category")
    const subCategory = searchParams.get("sub_category")
    const search = searchParams.get("search")

    if(faqResult.data && (category || subCategory || search) && faqSectionRef.current){
      faqSectionRef.current.scrollIntoView({behavior: "smooth"})
    }
  },[faqResult.data])

  // EVENT HANDLER
  const handleResetFaq = ()=>{
    navigate("/")
  }

  return (
    <>
      <section id="faq" ref={faqSectionRef}>
        <div className="section-title faq-section-title">
          <h2>Questions</h2>
          {!faqById && (
            <>
              <span>({faqResult.data ? faqResult.data.data.length:""} of {allFaq.faq ? allFaq.faq.length:""})</span>
              {isShowResetBtn &&
                <ButtonText text="Reset" style={{marginLeft: "5px"}} onClick={handleResetFaq}/>
              }
            </>
          )}
          
        </div>
        <div className="faq-question-lists">
          {(faqResult.isLoading) &&
            <FetchLoader message="Loading"/>
          }

          {faqResult.data &&
            <>
              {!faqById && faqResult.data.data.map((faq,i)=>(
                <Fragment key={i}>
                  {faq !== null &&
                    <FaqAccordion title={faq.title} answer={faq.answer} id={faq._id}/>
                  }
                </Fragment>
              ))}

              {faqById && faqById.map((faq,i)=>(
                <Fragment key={i}>
                  {faq !== null &&
                    <FaqAccordion title={faq.title} answer={faq.answer} id={faq._id}/>
                  }
                </Fragment>
              ))}

              {(faqById && faqById.length === 0) &&
                <ErrorText message="Ups, Faq not found:("/>
              }
            </>
          }

          {(faqResult.data && faqResult.data.data.length === 0) &&
            <ErrorText message="Ups, Faq not found:("/>
          }

          {faqResult.error &&
            <ErrorText/>
          }
        </div>
      </section>
    </>
  )
}

export default HomePage

// TODO Fungsi Tambah,Edit,Hapus FAQ oleh admin. Download FAQ. Search By Context, Popup tambah User
// TODO Penggunaan HTML agar supaya bisa input gambar kedalam FAQ