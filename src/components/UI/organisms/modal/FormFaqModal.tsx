import { useRef, useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./FormFaqModal.css"
import { EditFaqFormModel, FormFaqData } from "../../../../interfaces/faqInterfaces"
import { AxiosError, AxiosResponse } from "axios"
import Alert from "../alert/Alert"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../loading-screen/LoadingScreen"
import EditFaqForm from "../form/EditFaqForm"
import { SubmitHandler } from "react-hook-form"

interface Props {
  onClose: () => void
  onSubmit: (data: FormFaqData) => Promise<AxiosResponse<any, any>>
  submitText?: string
  defaultValues?: EditFaqFormModel,
  successText?:string
}

const FormFaqModal = ({
  onClose,
  onSubmit,
  submitText = "Submit",
  defaultValues,
  successText = "Operation success"
}: Props) => {

  const navigate = useNavigate()

  // REF
  const editFaqFormRef = useRef<HTMLFormElement>(null)

  const [isLoading,setIsLoading] = useState<boolean>(false)

  // ALERT STATE
  const [errorMsg, setErrorMsg] = useState<string>("Failed add new FAQ!")
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

  const handleCancelClick = () => {
    onClose()
  }

  const handleSuccessAddFaq = ()=>{
    onClose()
    navigate(0)
  }

  const handleSubmitBtnClick = ()=>{
    if(editFaqFormRef.current){
      editFaqFormRef.current.requestSubmit()
    }
  }

  const handleSubmit:SubmitHandler<EditFaqFormModel> = async (formData) => {
      setIsLoading(true)

      // FORMAT QUESTIONS YANG AWALNYA STRING KE ARRAY STRING, DIPISAH BERDASARKAN KOMA/,
      const questionsArr = formData.questions.split(",").map(val => val.trimStart())

      // JALANKAN ON SUBMIT
      try {

        const submitData = {
          title: formData.title,
          answer: formData.answer,
          subCategoryId: formData.subCategoryId.map(val => val.value),
          questions: questionsArr
        }

        // CEK APAKAH DEFAULT VALUES DAN INPUT TERBARU SAMA ATAU TIDAK
        if(defaultValues){
          const checkDataEqual = (
            submitData.title === defaultValues.title &&
            submitData.answer === defaultValues.answer &&
            submitData.questions.join(", ") === defaultValues.questions &&
            submitData.subCategoryId.join(",") === defaultValues.subCategoryId.map(val=>val.value).join(",")
          )

          if(checkDataEqual) throw new Error("No updates made, data is the same.")
        }

        const result = await onSubmit(submitData)

        if (result.status === 200) {
          setShowSuccessAlert(true)
        }
      } catch (err) {
        setShowErrorAlert(true)
        if (err instanceof AxiosError) {
          setErrorMsg(err.response?.data.errors)
        }else if (err instanceof Error){
          setErrorMsg(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    
  }

  return (
    <Modal focusLock={false} onClose={onClose}>
      <ModalHeader />
      <ModalContent>
        <section>

          <EditFaqForm 
            onSubmit={handleSubmit} 
            ref={editFaqFormRef}
            defaultValues={defaultValues}
          />

        </section>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleSubmitBtnClick}>
            <span>{submitText}</span>
          </Button>
        </div>
      </ModalFooter>

      <Alert state="success" onNext={handleSuccessAddFaq} message={successText} showState={[showSuccessAlert, setShowSuccessAlert]} />
      <Alert state="error" message={errorMsg} showState={[showErrorAlert, setShowErrorAlert]} />

      {isLoading && <LoadingScreen/>}
    </Modal>
  )
}

export default FormFaqModal