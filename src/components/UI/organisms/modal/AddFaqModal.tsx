import React, { useEffect, useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./AddFaqModal.css"
import TextEditor from "../../atoms/input/TextEditor"
import Select from "../../atoms/input/Select"
import PlainInput from "../../atoms/input/PlainInput"
import TextArea from "../../atoms/input/TextArea"
import { addFaqValidation } from "../../../../validation/faqValidation"
import ErrorInput from "../../atoms/error/ErrorInput"
import { postFaq } from "../../../../api/api"
import { useAuth } from "../../../../hooks/useAuth"
import { useFaqCategory } from "../../../../hooks/useFaqCategory"

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const AddFaqModal = ({showModalState}:Props)=>{
  
  const {token} = useAuth()
  const {faqCategory} = useFaqCategory()

  // STATE
  const [show,setShow] = showModalState

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

      const questionsArr = questions.split(",").map(val=>val.trimStart())

      postFaq(token,{
        title,
        answer,
        id_sub_category: subCategoryId || "",
        questions: questionsArr
      })
        .then(result=>{
          console.log(result.status)
        })
        .catch(err=>{
          console.log(err)
        })
    }
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
              <Select options={options} state={[subCategoryId,setSubCategoryId]}/>
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
    </Modal>
  )

  return <></>
}

export default AddFaqModal