import React, { useEffect, useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./AddFaqModal.css"
import TextEditor from "../../atoms/input/TextEditor"
import Select, { OptionsWithGroup } from "../../atoms/input/Select"
import PlainInput from "../../atoms/input/PlainInput"
import TextArea from "../../atoms/input/TextArea"
import { addFaqValidation } from "../../../../validation/faqValidation"
import ErrorInput from "../../atoms/error/ErrorInput"
import { postFaq } from "../../../../api/api"
import { useAuth } from "../../../../hooks/useAuth"
import { useFaqCategory } from "../../../../hooks/useFaqCategory"
import Alert from "../alert/Alert"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const AddFaqModal = ({showModalState}:Props)=>{

  const navigate = useNavigate()
  
  const {token} = useAuth()
  const {faqCategory} = useFaqCategory()

  // STATE
  const [show,setShow] = showModalState
  const [subCatOptions,setSubCatOptions] = useState<OptionsWithGroup[]>([])

  // ALERT STATE
  const [showSuccessAlert,setShowSuccessAlert] = useState<boolean>(false)
  const [showErrorAlert,setShowErrorAlert] = useState<boolean>(false)
  const [errorMsg,setErrorMsg] = useState<string>("Failed add new FAQ!")

  // DATA STATE
  const [answer,setAnswer] = useState<string>("")
  const [subCategoryId,setSubCategoryId] = useState<string | undefined>("")
  const [questions,setQuestions] = useState<string>("")
  const [title,setTitle] = useState<string>("")

  // ERROR STATE
  const [errors, setErrors] = useState<{
    title?: string,
    subCategoryId?: string,
    questions?: string,
    answer?: string,
  }>({});

  const handleCancelClick = ()=>{
    setShow(false)
  }

  const handleAddClick = ()=>{
    const input = {
      answer,
      subCategoryId,
      questions,
      title
    }

    const validationRes = addFaqValidation.safeParse(input)

    if(!validationRes.success){
      const fError = validationRes.error.format()
      setErrors({
        title: fError.title?._errors?.[0],
        subCategoryId: fError.subCategoryId?._errors?.[0],
        questions: fError.questions?._errors?.[0],
        answer: fError.answer?._errors?.[0],
      });
    }else{
      setErrors({})

      // FORMAT QUESTIONS YANG AWALNYA STRING KE ARRAY STRING, DIPISAH BERDASARKAN KOMA/,
      const questionsArr = questions.split(",").map(val=>val.trimStart())

      postFaq(token,{
        title,
        answer,
        id_sub_category: subCategoryId || "",
        questions: questionsArr
      })
        .then(result=>{
          if(result.status === 200){
            setShowSuccessAlert(true)
          }
        })
        .catch(err=>{
          if(err instanceof AxiosError){

            setShowErrorAlert(true)
            setErrorMsg(err.response?.data.data.errors)
          }
        })
    }
  }

  const handleSuccessAddFaq = ()=>{
    setShow(false)
    navigate(0)
  }

  useEffect(()=>{
    if(!show){
      setTitle('');
      setSubCategoryId('');
      setQuestions('');
      setAnswer('');
      setErrors({});
    }
  },[show])

  useEffect(()=>{
    if(faqCategory && faqCategory.length > 0){
      const map = faqCategory.map(val=>{
        const label = val.name
        const options = val.sub_category.filter(subCat => subCat != null).map(subCat=>{
          return {
            key: subCat.sub_category,
            value: subCat._id
          }
        })

        return {
          label,
          options
        }
      })
      
      setSubCatOptions(map)
    }
  },[faqCategory])

  if(show) return (
    <Modal focusLock={false}>
      <ModalHeader/>
      <ModalContent>
        <section className="add-faq-section">
          
          <div className="add-faq-grid">
            <div className="add-faq-input-group" style={{flex: 1}}>
              <span>Title:</span>
              <PlainInput value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="FAQ Title"/>
              {errors.title && <ErrorInput message={errors.title}/>}
            </div>
            <div className="add-faq-input-group" style={{flex: 1}}>
              <span>Category:</span>
              <Select optionsWithGroup={subCatOptions} state={[subCategoryId,setSubCategoryId]}/>
              {errors.subCategoryId && <ErrorInput message={errors.subCategoryId}/>}
            </div>
          </div>
          
          <div className="add-faq-input-group">
            <span>Questions:</span>
            <TextArea value={questions} onChange={(e)=>setQuestions(e.target.value)} placeholder="Comma-seperated, ex:Pertanyaan 1,Pertanyaan 2,Pertanyaan 3"/>
            {errors.questions && <ErrorInput message={errors.questions}/>}
          </div>
          
          <div className="add-faq-input-group">
            <span>Answer:</span>
            <TextEditor dataState={[answer,setAnswer]}/>
            {errors.answer && <ErrorInput message={errors.answer}/>}
          </div>
          
        </section>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleAddClick}>
            <span>Add</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert state="success" onNext={handleSuccessAddFaq} message="Added new FAQ to database!" showState={[showSuccessAlert,setShowSuccessAlert]}/>
      <Alert state="error" message={errorMsg} showState={[showErrorAlert,setShowErrorAlert]}/>
    </Modal>
  )

  return <></>
}

export default AddFaqModal