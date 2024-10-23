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

interface Props{
  showModalState:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
}

const options = [
  {
    key: "Category A",
    value: "gdkdjlkjgajg"
  }
]

const AddFaqModal = ({showModalState}:Props)=>{
  
  // STATE
  const [show,setShow] = showModalState

  // DATA STATE
  const [answer,setAnswer] = useState<string>("")
  const [categoryId,setCategoryId] = useState<string | undefined>("")
  const [questions,setQuestions] = useState<string>("")
  const [title,setTitle] = useState<string>("")

  // ERROR STATE
  const [errors, setErrors] = useState<{
    title?: string,
    categoryId?: string,
    questions?: string,
    answer?: string,
  }>({});

  const handleCancelClick = ()=>{
    setShow(false)
  }

  const handleAddClick = ()=>{
    const input = {
      answer,
      categoryId,
      questions,
      title
    }

    const validationRes = addFaqValidation.safeParse(input)

    if(!validationRes.success){
      const fError = validationRes.error.format()
      setErrors({
        title: fError.title?._errors?.[0],
        categoryId: fError.categoryId?._errors?.[0],
        questions: fError.questions?._errors?.[0],
        answer: fError.answer?._errors?.[0],
      });
    }else{
      setErrors({})


    }
  }

  useEffect(()=>{
    if(!show){
      setTitle('');
      setCategoryId('');
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
              <Select options={options} state={[categoryId,setCategoryId]}/>
              {errors.categoryId && <ErrorInput message={errors.categoryId}/>}
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