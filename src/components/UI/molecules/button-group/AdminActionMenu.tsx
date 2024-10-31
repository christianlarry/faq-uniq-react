import { FaPen, FaTrash } from "react-icons/fa6"

import "./AdminActionMenu.css"
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import DeleteFaqModal from "../../organisms/modal/DeleteFaqModal"
import FormFaqModal from "../../organisms/modal/FormFaqModal"
import { FaqModel } from "../../../../interfaces/faqInterfaces"

import {marked} from "marked"

interface Props{
  data:FaqModel
}

const AdminActionMenu = ({data}:Props)=>{


  const [answerDV,setAnswerDV] = useState<string>("")

  useEffect(()=>{
    if(data.htmlAnswer){
      setAnswerDV(data.htmlAnswer)
      return
    }

    setAnswerDV(marked(data.answer).toString())
  },[])

  const [showDeleteFaqModal,setShowDeleteFaqModal] = useState<boolean>(false)
  const [showEditFaqModal,setShowEditFaqModal] = useState<boolean>(false)

  const handleDeleteFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    setShowDeleteFaqModal(true)
  }

  const handleEditFaq = (e:React.MouseEvent<HTMLElement>)=>{
    e.stopPropagation()

    setShowEditFaqModal(true)
  }

  const handleEditFaqSubmit = ()=>{
    alert("Submit")
  }

  return (
    <>
      <div className="faq-admin-action-btn">
        <i onClick={handleEditFaq}>
          <FaPen/>
        </i>
        <i onClick={handleDeleteFaq}>
          <FaTrash/>
        </i>
      </div>

      {createPortal((
        <>
          {showDeleteFaqModal && <DeleteFaqModal id={data._id} title={data.title} onClose={()=>setShowDeleteFaqModal(false)}/>}
          {showEditFaqModal && 
            <FormFaqModal 
              onClose={()=>setShowEditFaqModal(false)} 
              onSubmit={handleEditFaqSubmit}
              submitText="Update"
              defaultValues={{
                title: data.title,
                answer: answerDV,
                questions: data.questions.join(", "),
                subCategoryId: data.sub_category.map(val=>({value:val._id,label:val.sub_category}))
              }}
            />
          }
        </>
      ),document.body)}
    </>
  )
}

export default AdminActionMenu