import { useEffect, useState } from "react"
import Button from "../../atoms/button/Button"
import Modal from "../../atoms/modal/Modal"
import ModalContent from "../../atoms/modal/ModalContent"
import ModalFooter from "../../atoms/modal/ModalFooter"
import ModalHeader from "../../atoms/modal/ModalHeader"

import "./FormFaqModal.css"
import TextEditor from "../../atoms/input/TextEditor"
import PlainInput from "../../atoms/input/PlainInput"
import TextArea from "../../atoms/input/TextArea"
import { addFaqValidation } from "../../../../validation/faqValidation"
import ErrorInput from "../../atoms/error/ErrorInput"
import { useFaqCategory } from "../../../../hooks/useFaqCategory"
import CustomSelect from "../../atoms/input/CustomSelect"
import { GroupBase, MultiValue, OptionsOrGroups } from "react-select"
import { FormFaqData } from "../../../../interfaces/faqInterfaces"
import { AxiosError, AxiosResponse } from "axios"
import Alert from "../alert/Alert"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../loading-screen/LoadingScreen"

interface OptionType {
  label: string
  value: string
}

interface Props {
  onClose: () => void
  onSubmit: (data: FormFaqData) => Promise<AxiosResponse<any, any>>
  submitText?: string
  defaultValues?: {
    answer: string,
    subCategoryId: MultiValue<OptionType>,
    questions: string,
    title: string
  },
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
  const { faqCategory } = useFaqCategory()

  // STATE
  const [subCatOptions, setSubCatOptions] = useState<OptionsOrGroups<OptionType, GroupBase<OptionType>>>([])

  // DATA STATE
  const [answer, setAnswer] = useState<string>(defaultValues?.answer || "")
  const [subCategoryId, setSubCategoryId] = useState<MultiValue<OptionType>>(defaultValues?.subCategoryId || [])
  const [questions, setQuestions] = useState<string>(defaultValues?.questions || "")
  const [title, setTitle] = useState<string>(defaultValues?.title || "")

  // ERROR/LOADING STATE
  const [errors, setErrors] = useState<{
    title?: string,
    subCategoryId?: string,
    questions?: string,
    answer?: string,
  }>({});
  const [isLoading,setIsLoading] = useState<boolean>(false)

  // ALERT STATE
  const [errorMsg, setErrorMsg] = useState<string>("Failed add new FAQ!")
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

  const handleSubCategoryChange = (selected: MultiValue<OptionType>) => {
    setSubCategoryId(selected)
  }

  const handleCancelClick = () => {
    onClose()
  }

  const handleSuccessAddFaq = ()=>{
    onClose()
    navigate(0)
  }

  const handleSubmit = async () => {

    const input = {
      answer,
      subCategoryId: subCategoryId.map(val => val.value),
      questions,
      title
    }

    const validationRes = addFaqValidation.safeParse(input)

    if (!validationRes.success) {
      const fError = validationRes.error.format()
      setErrors({
        title: fError.title?._errors?.[0],
        subCategoryId: fError.subCategoryId?._errors?.[0],
        questions: fError.questions?._errors?.[0],
        answer: fError.answer?._errors?.[0],
      });
    } else {
      setErrors({})
      setIsLoading(true)

      // FORMAT QUESTIONS YANG AWALNYA STRING KE ARRAY STRING, DIPISAH BERDASARKAN KOMA/,
      const questionsArr = questions.split(",").map(val => val.trimStart())

      // JALANKAN ON SUBMIT
      try {

        const submitData = {
          title: validationRes.data.title,
          answer: validationRes.data.answer,
          subCategoryId: subCategoryId.map(val => val.value),
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
  }

  useEffect(() => {
    if (faqCategory && faqCategory.length > 0) {
      const map = faqCategory.map(val => {
        const label = val.name
        const options = val.sub_category.filter(subCat => subCat != null).map(subCat => {
          return {
            label: subCat.sub_category,
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
  }, [faqCategory])

  return (
    <Modal focusLock={false} onClose={onClose}>
      <ModalHeader />
      <ModalContent>
        <section className="form-faq-section">

          <div className="form-faq-grid">
            <div className="form-faq-input-group" style={{ flex: 1 }}>
              <span>Title:</span>
              <PlainInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="FAQ Title" />
              {errors.title && <ErrorInput message={errors.title} />}
            </div>
            <div className="form-faq-input-group" style={{ flex: 1 }}>
              <span>Category:</span>
              {/* <Select optionsWithGroup={subCatOptions} state={[subCategoryId,setSubCategoryId]}/> */}
              <CustomSelect
                options={subCatOptions}
                isMulti
                onChange={handleSubCategoryChange}
                value={subCategoryId}
              />
              {errors.subCategoryId && <ErrorInput message={errors.subCategoryId} />}
            </div>
          </div>

          <div className="form-faq-input-group">
            <span>Questions <span style={{fontStyle: "italic",color: "var(--input-text-color)"}}>(comma-seperated)</span>:</span>
            <TextArea rows={4} value={questions} onChange={(e) => setQuestions(e.target.value)} placeholder="Comma-seperated, ex:Pertanyaan 1,Pertanyaan 2,Pertanyaan 3" />
            {errors.questions && <ErrorInput message={errors.questions} />}
          </div>

          <div className="form-faq-input-group">
            <span>Answer:</span>
            <TextEditor dataState={[answer, setAnswer]} />
            {errors.answer && <ErrorInput message={errors.answer} />}
          </div>

        </section>
      </ModalContent>
      <ModalFooter>
        <div className="modal-footer-btn-wrap">
          <Button onClick={handleCancelClick}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleSubmit}>
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